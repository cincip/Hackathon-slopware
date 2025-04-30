"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress" // Keep Progress import if used elsewhere, otherwise remove
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'

// Install the dayOfYear plugin
dayjs.extend(dayOfYear)

// Import charting components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

// Import Activity Calendar component
import ActivityCalendar from 'react-activity-calendar'

const generateActivityData = (days: number) => {
  const data = []
  const today = dayjs()

  for (let i = 0; i < days; i++) {
    const currentDay = today.subtract(i, 'day')
    const date = currentDay.format('YYYY-MM-DD')
    const count = Math.floor(Math.random() * 5);
    data.unshift({ date, count, level: Math.min(count, 4) })
  }
  return data
}

// Add this type definition at the top of the file
type Activity = {
  date: string;
  count: number;
  level: number;
};


export default function ProfilePage() {
  const [userName, setUserName] = useState("Alex")

  // Total Stats (Progress state removed)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)
  const [flashcardsReviewed, setFlashcardsReviewed] = useState(0)
  const [quizzesPassed, setQuizzesPassed] = useState(0)

  // Weekly Stats (used for the bar chart)
  const [weeklyLessonsCompleted, setWeeklyLessonsCompleted] = useState(0)
  const [weeklyFlashcardsReviewed, setWeeklyFlashcardsReviewed] = useState(0)
  const [weeklyQuizzesPassed, setWeeklyQuizzesPassed] = useState(0)

  const [isLoaded, setIsLoaded] = useState(false)

  // Add this new state for activity data
  const [activityData, setActivityData] = useState<Activity[] | null>(null);

  useEffect(() => {
    setIsLoaded(true)

    // --- Animate Total Counters ---
    // const totalProgressTarget = 42 // Removed
    const totalLessonsTarget = 15
    const totalFlashcardsTarget = 87
    const totalQuizzesTarget = 6

    // Create a controller to stop intervals
    const intervalControllers: NodeJS.Timeout[] = [];

    const animateCounter = (setter: React.Dispatch<React.SetStateAction<number>>, target: number, speed: number) => {
      const interval = setInterval(() => {
        setter((prev) => {
          if (prev < target) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, speed);
      intervalControllers.push(interval); // Store interval ID
    };

    // animateCounter(setProgress, totalProgressTarget, 30); // Removed progress animation
    animateCounter(setLessonsCompleted, totalLessonsTarget, 100);
    animateCounter(setFlashcardsReviewed, totalFlashcardsTarget, 20);
    animateCounter(setQuizzesPassed, totalQuizzesTarget, 200);

    // --- Animate Weekly Counters ---
    const weeklyLessonsTarget = 3;
    const weeklyFlashcardsTarget = 15;
    const weeklyQuizzesTarget = 2;

    animateCounter(setWeeklyLessonsCompleted, weeklyLessonsTarget, 150);
    animateCounter(setWeeklyFlashcardsReviewed, weeklyFlashcardsTarget, 40);
    animateCounter(setWeeklyQuizzesPassed, weeklyQuizzesTarget, 300);

    // Generate activity data
    const generatedData = generateActivityData(365);
    setActivityData(generatedData);

    return () => {
      // Cleanup all intervals
      intervalControllers.forEach(clearInterval);
    }
  }, []) // Empty dependency array means this runs once on mount

  // Data for the weekly stats bar chart, updates when state changes
  const weeklyChartData = useMemo(() => [
    { name: 'Lessons', value: weeklyLessonsCompleted, target: 3 },
    { name: 'Flashcards', value: weeklyFlashcardsReviewed, target: 15 },
    { name: 'Quizzes', value: weeklyQuizzesPassed, target: 2 }
  ], [weeklyLessonsCompleted, weeklyFlashcardsReviewed, weeklyQuizzesPassed]);


  // Framer Motion variants for staggering sections and items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Variants for cards *within* the columns
  const cardItemVariants = {
     hidden: { opacity: 0, y: 10 },
     show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };


  return (
  <div className="container max-w-7xl mx-auto px-4 py-8">
    {/* Header Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold mb-2">Hello, {userName}!</h1>
      <p className="text-lg text-muted-foreground">Here's an overview of your learning journey in physics</p>
    </motion.div>

    {/* Stats Section: Now Two Columns on Large Screens */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "show" : "hidden"}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" // Changed to 2 columns on large screens
    >
      {/* Stats Cards - First column */}
      <motion.div variants={itemVariants} className="lg:col-span-1">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {/* Lessons Card */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Lessons</h3>
                <div className="text-3xl font-bold text-green-600">{lessonsCompleted}</div>
                <p className="text-xs text-muted-foreground">of 36 total</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Flashcards Card */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Flashcards</h3>
                <div className="text-3xl font-bold text-purple-600">{flashcardsReviewed}</div>
                <p className="text-xs text-muted-foreground">reviewed</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quizzes Card */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Quizzes</h3>
                <div className="text-3xl font-bold text-orange-600">{quizzesPassed}</div>
                <p className="text-xs text-muted-foreground">of 12 passed</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Streak Card */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Streak</h3>
                <div className="text-3xl font-bold text-red-600">7</div> {/* Hardcoded streak */}
                <p className="text-xs text-muted-foreground">days</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Bar Chart - Now second column */}
      <motion.div variants={itemVariants} className="lg:col-span-1">
         <motion.div variants={cardItemVariants} className="h-full">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-white h-full">
            <CardHeader className="pb-2">
              <CardTitle>Weekly Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-full flex flex-col">
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyChartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      width={20}
                      domain={[0, 15]} // Keep fixed maximum value
                      allowDataOverflow={true}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
         </motion.div>
      </motion.div>

      {/* <<< Overall Progress Card Block Removed From Here >>> */}

    </motion.div>

    {/* Activity Calendar Section */}
    <motion.div
       variants={itemVariants}
       initial="hidden"
       animate={isLoaded && activityData ? "show" : "hidden"}
       className="mt-8"
    >
      <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white">
         <CardHeader>
          <CardTitle>Your Learning Activity</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="overflow-x-auto pb-2 min-h-[150px]">
             {activityData ? (
               <ActivityCalendar
                 data={activityData}
                 colorScheme="light"
                 theme={{
                   light: [
                     '#f8fafc',   // Almost white for empty cells
                     '#dbeafe',   // Light blue
                     '#93c5fd',   // Medium blue
                     '#3b82f6',   // Brand blue
                     '#2563eb'    // Dark blue
                   ],
                   dark: [
                     '#1e293b',   // Dark background
                     '#3b82f6',   // Blue for low activity
                     '#2563eb',   // Darker blue
                     '#1d4ed8',   // Even darker blue
                     '#1e3a8a'    // Deep blue for high activity
                   ]
                 }}
                 labels={{
                   legend: {
                     less: 'Less',
                     more: 'More'
                   }
                 }}
                 style={{
                 }}
                 hideColorLegend={false}
                 hideMonthLabels={false}
                 hideTotalCount={false}
                 blockSize={12}
                 blockMargin={4}
                 fontSize={12}
               />
             ) : (
               <div className="flex justify-center items-center h-full text-muted-foreground">
                 Loading activity...
               </div>
             )}
           </div>
           {activityData && (
             <p className="text-center text-muted-foreground text-sm mt-4">
               Daily activity over the last year.
             </p>
           )}
         </CardContent>
      </Card>
    </motion.div>
  </div>
  )
}