"use client"

import { useState, useEffect, useMemo } from "react" // Added useMemo
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Import charting components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Import Activity Calendar component
import ActivityCalendar from 'react-activity-calendar';
import dayjs from 'dayjs'; // Peer dependency for react-activity-calendar


// Function to generate consistent activity data for the calendar
const generateActivityData = (days: number) => {
  const data = [];
  const today = dayjs();
  
  // Use a simple deterministic pattern instead of random numbers
  for (let i = 0; i < days; i++) {
    const date = today.subtract(i, 'day').format('YYYY-MM-DD');
    // Generate activity count based on day of week (more on weekdays, less on weekends)
    const dayOfWeek = today.subtract(i, 'day').day();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const count = isWeekend ? 2 : 5;
    data.unshift({ date, count });
  }
  return data;
};

export default function ProfilePage() {
  const [userName, setUserName] = useState("Alex")

  // Total Stats
  const [progress, setProgress] = useState(0)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)
  const [flashcardsReviewed, setFlashcardsReviewed] = useState(0)
  const [quizzesPassed, setQuizzesPassed] = useState(0)

  // Weekly Stats (used for the bar chart)
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


    animateCounter(setProgress, totalProgressTarget, 30);
    animateCounter(setLessonsCompleted, totalLessonsTarget, 100);
    animateCounter(setFlashcardsReviewed, totalFlashcardsTarget, 20);
    animateCounter(setQuizzesPassed, totalQuizzesTarget, 200);

    // --- Animate Weekly Counters ---
    // Update weekly targets to more reasonable numbers
    const weeklyLessonsTarget = 3;    // 3 lessons per week
    const weeklyFlashcardsTarget = 15; // 15 flashcards per week
    const weeklyQuizzesTarget = 2;     // 2 quizzes per week

    animateCounter(setWeeklyLessonsCompleted, weeklyLessonsTarget, 150);
    animateCounter(setWeeklyFlashcardsReviewed, weeklyFlashcardsTarget, 40);
    animateCounter(setWeeklyQuizzesPassed, weeklyQuizzesTarget, 300);


    return () => {
      // Cleanup all intervals
      intervalControllers.forEach(clearInterval);
    }
  }, []) // Empty dependency array means this runs once on mount

  // Data for the weekly stats bar chart, updates when state changes
  // Update the weekly chart data
  const weeklyChartData = useMemo(() => [
    { name: 'Lessons', value: weeklyLessonsCompleted, target: 3, color: '#3b82f6' },
    { name: 'Flashcards', value: weeklyFlashcardsReviewed, target: 15, color: '#3b82f6' },
    { name: 'Quizzes', value: weeklyQuizzesPassed, target: 2, color: '#3b82f6' }
  ], [weeklyLessonsCompleted, weeklyFlashcardsReviewed, weeklyQuizzesPassed]);

  // Dummy data for the activity calendar (generate 365 days)
  const activityData = useMemo(() => generateActivityData(365), []);


  // Framer Motion variants for staggering sections and items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger delay between child items (the columns and calendar)
        delayChildren: 0.2 // Delay before children start animating
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
  <div className="container max-w-7xl mx-auto px-4 py-8"> {/* Increased max-width */}
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

    {/* Stats Section: Two Columns */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "show" : "hidden"}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12" // Changed to 3 columns on large screens
    >
      {/* Stats Cards - Now in a grid */}
      <motion.div variants={itemVariants} className="lg:col-span-1">
        <div className="grid grid-cols-2 gap-4"> {/* 2x2 grid for stat cards */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-4"> {/* Reduced padding */}
                <h3 className="text-sm font-medium mb-2">Lessons</h3>
                <div className="text-3xl font-bold text-green-600">{lessonsCompleted}</div>
                <p className="text-xs text-muted-foreground">of 36 total</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Flashcards</h3>
                <div className="text-3xl font-bold text-purple-600">{flashcardsReviewed}</div>
                <p className="text-xs text-muted-foreground">reviewed</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Quizzes</h3>
                <div className="text-3xl font-bold text-orange-600">{quizzesPassed}</div>
                <p className="text-xs text-muted-foreground">of 12 passed</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Streak</h3>
                <div className="text-3xl font-bold text-red-600">7</div>
                <p className="text-xs text-muted-foreground">days</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Bar Chart - Now spanning 2 columns */}
      <motion.div variants={itemVariants} className="lg:col-span-2">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-white h-full">
          <CardHeader className="pb-2">
            <CardTitle>Weekly Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>

    {/* Activity Calendar Section */}
    {/* This section is also an item in the main container stagger */}
    <motion.div
       variants={itemVariants}
       initial="hidden"
       animate={isLoaded ? "show" : "hidden"}
       className="mt-8" // Adjusted margin top, spacing is handled by main grid mb
    >
      <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white">
         <CardHeader>
          <CardTitle>Your Learning Activity</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="overflow-x-auto pb-2"> {/* Add overflow for smaller screens */}
             <ActivityCalendar
               data={activityData}
               theme={{
                 light: [
                   '#f1f5f9',   // Slate-100 (empty)
                   '#bfdbfe',   // Blue-200
                   '#60a5fa',   // Blue-400
                   '#3b82f6',   // Blue-500
                   '#2563eb'    // Blue-600
                 ],
                 dark: [
                   '#1e293b',   // Slate-800
                   '#1d4ed8',   // Blue-700
                   '#2563eb',   // Blue-600
                   '#3b82f6',   // Blue-500
                   '#60a5fa'    // Blue-400
                 ]
               }}
               hideColorLegend
               hideMonthLabels={false}
               hideTotalCount={false}
               blockSize={12}
               blockMargin={4}
               fontSize={12}
             />
           </div>
           <p className="text-center text-muted-foreground text-sm mt-4">Daily activity over the last year.</p>
         </CardContent>
      </Card>
    </motion.div>
  </div>
  )
}