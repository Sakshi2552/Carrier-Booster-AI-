"use client";
import { generateQuiz, saveQuizResult } from "@/actions/Interview";
import useFetch from "@/hooks/use-fetch";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import QuizResult from "./quiz-result";

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: saveResultData,
  } = useFetch(saveQuizResult);
  console.log(resultData);
  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (ans) => {
    const newAns = [...answers];
    newAns[currentQuestion] = ans;
    setAnswers(newAns);
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
    else {
      finishQuiz();
    }
  }
  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz result saved successfully");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz result");
    }
  }
  const calculateScore = () => {
    let score = 0;
    answers.forEach((ans, index) => {
      if (ans === quizData[index].correctAnswer) {
        score += 1;
      }
    });
    return (score / (quizData.length)) * 100;
  }
  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    saveResultData(null);
  }
  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />
  }
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    )
  }
  if (!quizData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready To test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 specific questions to help you prepare for according to your industries and skills.Take your time and choose the best answer.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={generateQuizFn}>Start Quiz</Button>
        </CardFooter>
      </Card>
    )
  }
  const question = quizData[currentQuestion];
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">
          {question.question}
        </p>
        <RadioGroup className="space-y-2" onValueChange={handleAnswer}
          value={answers[currentQuestion] ?? " "} >
          {question.options.map((option, index) => {
            return (<div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>)
          })}
        </RadioGroup>
        {showExplanation &&
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanaition:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>}
      </CardContent>
      <CardFooter>
        {/* If we does not given the answer then it won't show the explanation */}
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}
        {/* If not last question then show next button */}
        <Button
          onClick={handleNext}
          className="ml-auto"
          disabled={!answers[currentQuestion] || savingResult}
        >
          {savingResult && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
        </Button>
      </CardFooter>
    </Card>
  )
}
export default Quiz;