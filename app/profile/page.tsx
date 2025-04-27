"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const [userName, setUserName] = useState("Alex")
  const [progress, setProgress] = useState(0)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)
  const [flashcardsReviewed, setFlashcardsReviewed] = useState(0)
  const [quizzesPassed, setQuizzesPassed] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Animate the counters
    const totalProgress = 42
    const totalLessons = 15
    const totalFlashcards = 87
    const totalQuizzes = 6

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < totalProgress) return prev + 1
        clearInterval(progressInterval)
        return prev
      })
    }, 30)

    const lessonsInterval = setInterval(() => {
      setLessonsCompleted((prev) => {
        if (prev < totalLessons) return prev + 1
        clearInterval(lessonsInterval)
        return prev
      })
    }, 100)

    const flashcardsInterval = setInterval(() => {
      setFlashcardsReviewed((prev) => {
        if (prev < totalFlashcards) return prev + 1
        clearInterval(flashcardsInterval)
        return prev
      })
    }, 20)

    const quizzesInterval = setInterval(() => {
      setQuizzesPassed((prev) => {
        if (prev < totalQuizzes) return prev + 1
        clearInterval(quizzesInterval)
        return prev
      })
    }, 200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(lessonsInterval)
      clearInterval(flashcardsInterval)
      clearInterval(quizzesInterval)
    }
  }, [])

  const container = {
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

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Hello, {userName}!</h1>
        <p className="text-lg text-muted-foreground">Here's an overview of your learning journey in physics</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="grid gap-6 md:grid-cols-2"
      >
        <motion.div variants={item} className="md:col-span-2">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle>Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={progress} className="h-4 bg-blue-100" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{progress}%</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white h-full">
            <CardHeader className="pb-2">
              <CardTitle>Lessons Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-green-600 mb-2">{lessonsCompleted}</div>
              <p className="text-muted-foreground">out of 36 total lessons</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white h-full">
            <CardHeader className="pb-2">
              <CardTitle>Flashcards Reviewed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-purple-600 mb-2">{flashcardsReviewed}</div>
              <p className="text-muted-foreground">cards reviewed in total</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white h-full">
            <CardHeader className="pb-2">
              <CardTitle>Quizzes Passed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-orange-600 mb-2">{quizzesPassed}</div>
              <p className="text-muted-foreground">out of 12 total quizzes</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-white h-full">
            <CardHeader className="pb-2">
              <CardTitle>Study Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-red-600 mb-2">7</div>
              <p className="text-muted-foreground">days in a row</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
