"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateAIInsights } from "./dashboard";

export async function upadateUser(data){
    const {userId} = await auth();
    if(!userId) throw new Error("User not authenticated")
    const user = await db.user.findUnique({
        where : {
            clerkUserId : userId
        }
    })
    if(!user) throw new Error("User not authenticated")

    try{
        const result = await db.$transaction(async (tx) => {
            // find industry
            let industryInsight = await tx.industryInsight.findUnique({
                where: { industry: data.industry },
              });
              
              if (!industryInsight) {
                const insights = await generateAIInsights(data.industry);
              
                industryInsight = await tx.industryInsight.create({
                  data: {
                    industry: data.industry,
                    ...insights,
                    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                  },
                });
              }
              
        
            // update user
            const updatedUser = await tx.user.update({
                where: { id: user.id },
                data: {
                    industry: data.industry,
                    experience: data.experience,
                    bio: data.bio,
                    skills: data.skills,
                },
            });
        
            return { updatedUser, industryInsight };
        }, { timeout: 10000 });

        return result.user;
    }catch(err){
        console.log(err)
        throw new Error("Failed to update user")
    }
}

export async function getUserOnboardingStatus(){
    const {userId} = await auth();
    if(!userId) throw new Error("User not authenticated")
    const user = await db.user.findUnique({
        where : {
            clerkUserId : userId
        }
    })
    if(!user) throw new Error("User not authenticated")

    try{
        const user = await db.user.findUnique({
            where : {
                clerkUserId : userId
            },
            select : {
                industry : true,
            },
        })  
        return {
            isOnboarded : user?.industry,
        }
    }catch(err){
        console.log(err)
        throw new Error("Failed to get user onboarding status")
    }
}
