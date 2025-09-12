"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { format } from "date-fns";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import QuizResult from "./quiz-result";

const QuizList = ({assessments}) => {
    const router = useRouter();
    const [selectedQuiz,setSelectedQuiz] = useState(null);

    return <>
        <Card>
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle className="gradient-title text-3xl md:text-4xl">
                    Recent Quizes</CardTitle>
                <CardDescription>
                    Review your past quiz performance
                </CardDescription>
            </div>
            <Button onClick={()=>router.push("/Interview/mock")}>
                Start New Quiz
            </Button>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
               {assessments.map((assessment,i)=>{
                return (<Card key = {assessment.id} className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick = {()=>setSelectedQuiz(assessment)}
                >
                    <CardHeader>
                      <CardTitle>Quiz {i+1}</CardTitle>
                      <CardDescription>
                        <div>score : {assessment.quizScore.toFixed(1)}%</div>
                        <div>
                            {format(
                                new Date(assessment.createdAt),
                                "MMM dd, yyyy 'at' hh:mm a"
                            )}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                     <p className="text-sm text-muted-foreground"> {assessment.improvementTip}</p>
                    </CardContent>
                  </Card>
                  );
               })}
            </div>

            {/* dialog */}
            <Dialog open={!!selectedQuiz} onOpenChange = {()=> setSelectedQuiz(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                <DialogTitle></DialogTitle>
                </DialogHeader>
                <QuizResult
                result={selectedQuiz}
                onStartNew={()=>router.push("/Interview/mock")}
                hideStartNew
                />
            </DialogContent>
            </Dialog>
        </CardContent>
        </Card>
    </>
}
export default QuizList;