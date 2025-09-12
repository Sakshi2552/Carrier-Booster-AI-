import { getAssessments } from "@/actions/Interview";
import StatsCards from "./_components/stats-card";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";
import React from "react";
const InterviewPage = async () => {
    const assessments = await getAssessments();
    return <div>
        <h1 className="text-6xl font-bold gradient-title mb-5">
           Interview Prepration
        </h1>
        <div className="space-y-6">
            <StatsCards  assessments = {assessments}/>
            <PerformanceChart  assessments = {assessments}/>
            <QuizList  assessments = {assessments}/>
        </div>
    </div>
}
export default InterviewPage;