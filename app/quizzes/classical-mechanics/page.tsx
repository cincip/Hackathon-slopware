"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client" // Import Supabase client
import { type User } from "@supabase/supabase-js" // Import User type
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Loader2, AlertCircle } from "lucide-react" // Added Loader2, AlertCircle, removed XCircle
import Link from "next/link"
import confetti from "canvas-confetti"
import { useRouter } from "next/navigation" // Import useRouter for redirection
import { useToast } from "@/hooks/use-toast" // Import useToast

// Define interfaces for data structures
interface Answer {
  id: string
  answer_text: string
  // is_correct: boolean; // We might not need is_correct on the client if score calculated by Edge Function
}

interface Question {
  id: string
  question_text: string
  answers: Answer[]
}

interface Quiz {
  id: string
  title: string
  topic_slug: string
}

export default function ClassicalMechanicsQuizPage() {
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  const [user, setUser] = useState<User | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({}) // Store selected answer IDs { questionId: answerId }
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const [quizAttemptId, setQuizAttemptId] = useState<string | null>(null)

  // Fetch user session
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    getUser()
  }, [supabase])

  // Fetch quiz and questions data
  const fetchQuizData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // 1. Fetch the quiz ID based on the slug
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("id, title, topic_slug")
        .eq("topic_slug", "classical-mechanics")
        .single()

      if (quizError) throw new Error(`Failed to fetch quiz: ${quizError.message}`)
      if (!quizData) throw new Error("Quiz not found.")
      setQuiz(quizData)

      // 2. Fetch questions and their answers for the quiz
      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select(`
          id,
          question_text,
          answers (
            id,
            answer_text
          )
        `)
        .eq("quiz_id", quizData.id)

      if (questionsError) throw new Error(`Failed to fetch questions: ${questionsError.message}`)

      // Ensure answers are always an array
      const formattedQuestions = questionsData?.map(q => ({
        ...q,
        answers: Array.isArray(q.answers) ? q.answers : [],
      })) || []

      setQuestions(formattedQuestions)

    } catch (err: any) {
      console.error("Error fetching quiz data:", err)
      setError(err.message || "An unexpected error occurred while loading the quiz.")
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchQuizData()
  }, [fetchQuizData])


  // Handle selecting an answer
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId,
    }))
  }

  // Handle quiz submission
  const handleQuizSubmit = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to submit your quiz attempt.",
        variant: "destructive",
      })
      router.push('/auth?redirect=/quizzes/classical-mechanics') // Redirect to login
      return
    }

    if (Object.keys(selectedAnswers).length !== questions.length) {
       toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      })
      return;
    }


    setIsSubmitting(true)
    setError(null)

    try {
      // 1. Create quiz attempt record
      const { data: attemptData, error: attemptError } = await supabase
        .from("quiz_attempts")
        .insert({ user_id: user.id, quiz_id: quiz!.id })
        .select("id")
        .single()

      if (attemptError) throw new Error(`Failed to create quiz attempt: ${attemptError.message}`)
      if (!attemptData) throw new Error("Failed to get quiz attempt ID.")

      const currentAttemptId = attemptData.id
      setQuizAttemptId(currentAttemptId) // Store attempt ID for potential retry/review

      // 2. Insert selected answers
      const attemptAnswers = Object.entries(selectedAnswers).map(([questionId, answerId]) => ({
        quiz_attempt_id: currentAttemptId,
        question_id: questionId,
        selected_answer_id: answerId,
      }))

      const { error: answersError } = await supabase
        .from("quiz_attempt_answers")
        .insert(attemptAnswers)

      if (answersError) throw new Error(`Failed to save answers: ${answersError.message}`)

      // 3. Invoke Edge Function to calculate score
      const { data: scoreData, error: functionError } = await supabase.functions.invoke(
        "calculate-quiz-score", // Ensure this matches your Edge Function name
        { body: { attemptId: currentAttemptId } }
      )

      if (functionError) throw new Error(`Failed to calculate score: ${functionError.message}`)

      // Assuming the function returns { score: number }
      if (typeof scoreData?.score !== 'number') {
         throw new Error("Invalid score format received from function.")
      }

      setFinalScore(scoreData.score)

      // Confetti for good score (e.g., > 70%)
      if (questions.length > 0 && (scoreData.score / questions.length) * 100 > 70) {
         confetti({
           particleCount: 150,
           spread: 90,
           origin: { y: 0.6 },
         })
      }

       toast({
        title: "Quiz Submitted!",
        description: `Your score has been calculated.`,
      })


    } catch (err: any) {
      console.error("Error submitting quiz:", err)
      setError(err.message || "An unexpected error occurred during submission.")
       toast({
        title: "Submission Error",
        description: err.message || "Could not submit quiz.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const container = { // Keep animations if desired
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // --- RENDER LOGIC ---

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-2 text-lg">Loading Quiz...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
         <Link
            href="/quizzes"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Quizzes
          </Link>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold mr-2">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
         <Button onClick={fetchQuizData} className="mt-4">Try Again</Button>
      </div>
    )
  }

  // Quiz Completed View
  if (finalScore !== null) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
         <Link
            href="/quizzes"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Quizzes
          </Link>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl mx-auto text-center"
        >
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6 pb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Quiz Submitted Successfully!</h2>
              <p className="text-lg mb-4">
                Your score: {finalScore} out of {questions.length}
              </p>
              <div className="text-6xl font-bold mb-6 text-blue-600">
                {questions.length > 0 ? Math.round((finalScore / questions.length) * 100) : 0}%
              </div>
              <Button
                onClick={() => {
                  // Reset state for a new attempt (optional)
                  setSelectedAnswers({})
                  setFinalScore(null)
                  setIsSubmitting(false)
                  setQuizAttemptId(null)
                  // Optionally re-fetch or just reset view
                }}
                className="bg-blue-600 hover:bg-blue-700 mr-2"
              >
                Take Again
              </Button>
               <Link href="/quizzes">
                 <Button variant="outline">Back to Quizzes</Button>
               </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Quiz Taking View
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/quizzes"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">{quiz?.title || "Quiz"}</h1>
        <p className="text-lg text-muted-foreground">
          Select the best answer for each question below.
        </p>
      </motion.div>

      <motion.div
         variants={container}
         initial="hidden"
         animate="show"
         className="space-y-8"
      >
        {questions.map((q, index) => (
          <motion.div key={q.id} variants={item}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white overflow-hidden">
              <CardHeader>
                <CardTitle>Question {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-6">{q.question_text}</p>
                <RadioGroup
                  value={selectedAnswers[q.id] || ""}
                  onValueChange={(value) => handleAnswerSelect(q.id, value)}
                  disabled={isSubmitting}
                >
                  {q.answers.map((ans) => (
                    <div key={ans.id} className="flex items-center space-x-3 mb-4 p-3 rounded-md hover:bg-blue-100 transition-colors duration-150">
                      <RadioGroupItem value={ans.id} id={`${q.id}-${ans.id}`} />
                      <Label htmlFor={`${q.id}-${ans.id}`} className="flex-1 cursor-pointer text-base">
                        {ans.answer_text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

       {/* Submission Area */}
       {questions.length > 0 && (
         <div className="mt-10 text-center">
           {error && ( // Display submission errors here too
             <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
               <strong className="font-bold mr-2">Error!</strong>
               <span className="block sm:inline">{error}</span>
             </div>
           )}
           <Button
             onClick={handleQuizSubmit}
             disabled={isSubmitting || Object.keys(selectedAnswers).length !== questions.length}
             size="lg"
             className="bg-blue-600 hover:bg-blue-700 w-full max-w-xs"
           >
             {isSubmitting ? (
               <>
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
               </>
             ) : (
               "Submit Quiz"
             )}
           </Button>
           {!user && (
              <p className="text-sm text-muted-foreground mt-4">
                <AlertCircle className="inline-block mr-1 h-4 w-4" />
                You need to be <Link href="/auth?redirect=/quizzes/classical-mechanics" className="underline text-blue-600">logged in</Link> to submit your score.
              </p>
           )}
         </div>
       )}
    </div>
  )
}
