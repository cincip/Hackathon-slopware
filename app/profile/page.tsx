"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const [userName, setUserName] = useState("Alex")

  // Total Stats
  const [progress, setProgress] = useState(0)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)
  const [flashcardsReviewed, setFlashcardsReviewed] = useState(0)
  const [quizzesPassed, setQuizzesPassed] = useState(0)

  // Weekly Stats
  const [weeklyLessonsCompleted, setWeeklyLessonsCompleted] = useState(0)
  const [weeklyFlashcardsReviewed, setWeeklyFlashcardsReviewed] = useState(0)
  const [weeklyQuizzesPassed, setWeeklyQuizzesPassed] = useState(0)


  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // --- Animate Total Counters ---
    const totalProgressTarget = 42
    const totalLessonsTarget = 15
    const totalFlashcardsTarget = 87
    const totalQuizzesTarget = 6

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < totalProgressTarget) return prev + 1
        clearInterval(progressInterval)
        return prev
      })
    }, 30) // Adjust speed as needed

    const lessonsInterval = setInterval(() => {
      setLessonsCompleted((prev) => {
        if (prev < totalLessonsTarget) return prev + 1
        clearInterval(lessonsInterval)
        return prev
      })
    }, 100) // Adjust speed as needed

    const flashcardsInterval = setInterval(() => {
      setFlashcardsReviewed((prev) => {
        if (prev < totalFlashcardsTarget) return prev + 1
        clearInterval(flashcardsInterval)
        return prev
      })
    }, 20) // Adjust speed as needed

    const quizzesInterval = setInterval(() => {
      setQuizzesPassed((prev) => {
        if (prev < totalQuizzesTarget) return prev + 1
        clearInterval(quizzesInterval)
        return prev
      })
    }, 200) // Adjust speed as needed

    // --- Animate Weekly Counters ---
    const weeklyLessonsTarget = 3 // Example target
    const weeklyFlashcardsTarget = 25 // Example target
    const weeklyQuizzesTarget = 2 // Example target

    const weeklyLessonsInterval = setInterval(() => {
      setWeeklyLessonsCompleted((prev) => {
        if (prev < weeklyLessonsTarget) return prev + 1
        clearInterval(weeklyLessonsInterval)
        return prev
      })
    }, 150) // Adjust speed as needed

    const weeklyFlashcardsInterval = setInterval(() => {
      setWeeklyFlashcardsReviewed((prev) => {
        if (prev < weeklyFlashcardsTarget) return prev + 1
        clearInterval(weeklyFlashcardsInterval)
        return prev
      })
    }, 40) // Adjust speed as needed

    const weeklyQuizzesInterval = setInterval(() => {
      setWeeklyQuizzesPassed((prev) => {
        if (prev < weeklyQuizzesTarget) return prev + 1
        clearInterval(weeklyQuizzesInterval)
        return prev
      })
    }, 300) // Adjust speed as needed


    return () => {
      // Cleanup all intervals
      clearInterval(progressInterval)
      clearInterval(lessonsInterval)
      clearInterval(flashcardsInterval)
      clearInterval(quizzesInterval)
      clearInterval(weeklyLessonsInterval)
      clearInterval(weeklyFlashcardsInterval)
      clearInterval(weeklyQuizzesInterval)
    }
  }, [])

  // Framer Motion variants for staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger delay between child items (the columns)
        delayChildren: 0.2 // Delay before children start animating
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Variants for cards *within* the columns (optional, could just inherit from parent)
  const cardItemVariants = {
     hidden: { opacity: 0, y: 10 },
     show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };


  return (
    <div className="container max-w-5xl mx-auto px-4 py-8"> {/* Increased max-width slightly */}
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Hello, {userName}!</h1> {/* Reduced bottom margin */}
        <p className="text-lg text-muted-foreground">Here's an overview of your learning journey in physics</p>
      </motion.div>

      {/* Stats Section: Two Columns */}
      <motion.div
        variants={containerVariants} // Apply container variants to the main grid
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8" // Main grid with two columns on medium screens+
      >
        {/* Left Column: Total Stats */}
        <motion.div variants={itemVariants} className="grid gap-6"> {/* This column is an item, contains its own grid */}
           <motion.div variants={cardItemVariants}> {/* Overall progress card */}
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

          {/* Stack remaining total stat cards */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white h-full">
              <CardHeader className="pb-2">
                <CardTitle>Lessons Completed (Total)</CardTitle> {/* Added (Total) for clarity */}
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-green-600 mb-2">{lessonsCompleted}</div>
                <p className="text-muted-foreground">out of 36 total lessons</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white h-full">
              <CardHeader className="pb-2">
                <CardTitle>Flashcards Reviewed (Total)</CardTitle> {/* Added (Total) for clarity */}
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-purple-600 mb-2">{flashcardsReviewed}</div>
                <p className="text-muted-foreground">cards reviewed in total</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white h-full">
              <CardHeader className="pb-2">
                <CardTitle>Quizzes Passed (Total)</CardTitle> {/* Added (Total) for clarity */}
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-orange-600 mb-2">{quizzesPassed}</div>
                <p className="text-muted-foreground">out of 12 total quizzes</p>
              </CardContent>
            </Card>
          </motion.div>

           <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-white h-full">
              <CardHeader className="pb-2">
                <CardTitle>Study Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-red-600 mb-2">7</div> {/* Static for now */}
                <p className="text-muted-foreground">days in a row</p>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div> {/* End Left Column */}

        {/* Right Column: Weekly Stats */}
        <motion.div variants={itemVariants} className="grid gap-6"> {/* This column is an item, contains its own grid */}
          {/* Add Weekly Stats Cards */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white h-full"> {/* Using similar color but distinct title */}
              <CardHeader className="pb-2">
                <CardTitle>Lessons Completed (Weekly)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-green-600 mb-2">{weeklyLessonsCompleted}</div>
                 <p className="text-muted-foreground">this week</p> {/* Example text */}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white h-full"> {/* Using similar color */}
              <CardHeader className="pb-2">
                <CardTitle>Flashcards Reviewed (Weekly)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-purple-600 mb-2">{weeklyFlashcardsReviewed}</div>
                 <p className="text-muted-foreground">this week</p> {/* Example text */}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white h-full"> {/* Using similar color */}
              <CardHeader className="pb-2">
                <CardTitle>Quizzes Passed (Weekly)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-orange-600 mb-2">{weeklyQuizzesPassed}</div>
                 <p className="text-muted-foreground">this week</p> {/* Example text */}
              </CardContent>
            </Card>
          </motion.div>

           {/* You can add more weekly stats cards here if needed */}

        </motion.div> {/* End Right Column */}

      </motion.div> {/* End Stats Section Grid */}

      {/* Space for Activity Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}} // Animate in once page is loaded
        transition={{ duration: 0.5, delay: 0.6 }} // Add a slight delay after stats
        className="mt-12 p-6 border border-dashed rounded-lg text-center text-muted-foreground" // Added margin top
      >
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Activity Calendar</h2>
        <p>Placeholder for your learning activity calendar (like a GitHub contribution graph).</p>
        <p>Content will be added here later.</p>
      </motion.div>
    </div>
  )
}