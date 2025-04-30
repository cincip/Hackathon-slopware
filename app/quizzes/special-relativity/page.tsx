"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

export default function SpecialRelativityQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const questions = [
    {
      question: "What is the famous equation that relates mass and energy in special relativity?",
      options: ["F = ma", "E = hf", "E = mc²", "p = mv"],
      correctAnswer: "E = mc²",
    },
    {
      question:
        "According to special relativity, what happens to time for an observer moving at high speeds relative to another observer?",
      options: ["Time speeds up", "Time slows down", "Time remains unchanged", "Time stops completely"],
      correctAnswer: "Time slows down",
    },
    {
      question: "What is the Lorentz factor (γ) in special relativity?",
      options: ["γ = √(1-v²/c²)", "γ = 1/√(1-v²/c²)", "γ = v/c", "γ = c/v"],
      correctAnswer: "γ = 1/√(1-v²/c²)",
    },
    {
      question: "What happens to the length of an object when it moves at relativistic speeds?",
      options: ["It increases", "It decreases", "It remains unchanged", "It becomes infinite"],
      correctAnswer: "It decreases",
    },
    {
      question: "Which of the following is NOT a postulate of special relativity?",
      options: [
        "The laws of physics are the same in all inertial reference frames",
        "The speed of light in vacuum is the same for all observers",
        "Absolute time exists across all reference frames",
        "Space and time are interconnected",
      ],
      correctAnswer: "Absolute time exists across all reference frames",
    },
  ]

  const handleSubmit = () => {
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    setIsSubmitted(true)

    if (correct) {
      setScore(score + 1)
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const handleNext = () => {
    setSelectedAnswer("")
    setIsSubmitted(false)
    setCurrentQuestion(currentQuestion + 1)
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/quizzes"
        className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Quizzes
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Special Relativity Quiz</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge of special relativity with this quiz. Select the correct answer for each question.
        </p>
      </motion.div>

      {currentQuestion < questions.length ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          className="w-full max-w-2xl mx-auto"
        >
          <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-white">
            <CardHeader>
              <CardTitle>
                Question {currentQuestion + 1} of {questions.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium mb-6">{questions[currentQuestion].question}</p>

              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value={option} id={`option-${index}`} disabled={isSubmitted} />
                    <Label
                      htmlFor={`option-${index}`}
                      className={`
                        ${isSubmitted && option === questions[currentQuestion].correctAnswer ? "text-green-600 font-medium" : ""}
                        ${isSubmitted && option === selectedAnswer && option !== questions[currentQuestion].correctAnswer ? "text-red-600 font-medium" : ""}
                      `}
                    >
                      {option}
                      {isSubmitted && option === questions[currentQuestion].correctAnswer && (
                        <CheckCircle className="inline-block ml-2 h-4 w-4 text-green-600" />
                      )}
                      {isSubmitted &&
                        option === selectedAnswer &&
                        option !== questions[currentQuestion].correctAnswer && (
                          <XCircle className="inline-block ml-2 h-4 w-4 text-red-600" />
                        )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                {isSubmitted && (
                  <p className={isCorrect ? "text-green-600" : "text-red-600"}>
                    {isCorrect ? "Correct!" : "Incorrect!"}
                  </p>
                )}
              </div>
              <div>
                {!isSubmitted ? (
                  <Button onClick={handleSubmit} disabled={!selectedAnswer} className="bg-amber-600 hover:bg-amber-700">
                    Submit
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="bg-amber-600 hover:bg-amber-700">
                    Next Question
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl mx-auto text-center"
        >
          <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-white">
            <CardContent className="pt-6 pb-6">
              <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-lg mb-4">
                Your score: {score} out of {questions.length}
              </p>
              <div className="text-6xl font-bold mb-6 text-amber-600">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <Button
                onClick={() => {
                  setCurrentQuestion(0)
                  setScore(0)
                  setSelectedAnswer("")
                  setIsSubmitted(false)
                }}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Restart Quiz
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
