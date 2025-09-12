"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import {Card , CardHeader , CardTitle,CardDescription,CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {toast} from "sonner"; 
// import updateUserfn from "@/actions/user";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { upadateUser } from "@/actions/user";
import { Loader2 } from "lucide-react";



const onboardingForm = ({industries}) => {
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const router = useRouter();
   const {
    loading : updatingLoading,
    fn : updateUserfn,
    data : updateResult,
   } = useFetch(upadateUser)
    const {
        register,
        handleSubmit,
        formState : {errors},
        setValue, 
        watch,
    } =  useForm({
        resolver : zodResolver(onboardingSchema),
    });
    const onSubmit = async (data) => {
        try{
            const formattedIndustry = `${data.industry}-${data.subIndustry.toLowerCase().replace(/ /g, '-')}`;
            await updateUserfn({...data, industry : formattedIndustry});
            await updateUserfn(data);
            router.push('/dashboard');
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if(industries && industries.length > 0){
            setSelectedIndustry(industries[0]);
        }
        if(updateResult?.success && !updatingLoading){
            toast.success("Profile updated successfully");
            router.push('/dashboard');
            router.refresh();
        }
    }, [updateResult,updatingLoading]);
    const watchedIndustry = watch("industry");
    return (<div className="flex items-center justify-center bg-background">
         <Card className="w-full max-w-lg mt-10 mx-2">
            <CardHeader>
            <CardTitle className="gradient-title text-4xl">
                Complete Your Profile
            </CardTitle>
            <CardDescription>
                Select your industry to get personalized career insights and
                recommendations.
            </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                    onValueChange={(value) => {
                        setValue("industry", value);
                        setSelectedIndustry(
                            industries.find((ind) => ind.id === value)
                        );
                        setValue("subIndustry", ""); // Reset sub-industry when industry changes

                    }}
                    >
                        <SelectTrigger id = "industry" className="w-full">
                            <SelectValue placeholder="Selct an Industry" />
                        </SelectTrigger>
                        <SelectContent>
                            {industries.map((ind) => {
                                return <SelectItem key={ind.id} value={ind.id}>{ind.name} </SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                    {errors.industry && (
                        <p className="text-sm text-red-600">{errors.industry.message}</p>
                    )}
                    </div>

                    {watchedIndustry && (
                        <div className="space-y-2">
                    <Label htmlFor="SubIndustry">Specialisation</Label>
                    <Select
                    onValueChange={(value) => {setValue("subIndustry", value)}}>
                        <SelectTrigger id = "subIndustry" className="w-full">
                            <SelectValue placeholder="Selct an SubIndustry" />
                        </SelectTrigger>
                        <SelectContent>
                            {selectedIndustry?.subIndustries.map((ind) => {
                                return <SelectItem key={ind} value={ind}>{ind} </SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                    {errors.subIndustry && (
                        <p className="text-sm text-red-600">{errors.subIndustry.message}</p>
                    )}
                    </div>
                    )
                    }
                    
                    <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id = "experience" 
                    type="number"
                    min={0}
                    max={50}
                    placeholder="Enter your years of experience"
                    {...register("experience")}
                    />
                    {errors.experience && (
                        <p className="text-sm text-red-600">{errors.experience.message}</p>
                    )}
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="Skills">Skills</Label>
                    <Input id = "skills" 
                    placeholder="Eg: Python,C++,Project Management"
                    {...register("skills")}
                    />
                    <p className="text-sm text-muted-foreground">
                        Seperate multiple skills with commas ( , )
                    </p>
                    {errors.skills && (
                        <p className="text-sm text-red-600">{errors.skills.message}</p>
                    )}
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea id = "bio" 
                    placeholder="Tell us about your professional background..."
                    {...register("bio")}
                    />
                    {errors.bio && (
                        <p className="text-sm text-red-600">{errors.bio.message}</p>
                    )}
                    </div>

                    <Button className="w-full" type="submit" disabled={updatingLoading}>
                        {
                            updatingLoading ? <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                            </> : ("Complete Profile")
                        }
                    </Button>
                    
                </form>
                
            </CardContent>
        </Card>
    </div>);
}   
export default onboardingForm;