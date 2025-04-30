"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// Progress might not be needed if we removed the overall progress bar
// import { Progress } from "@/components/ui/progress"
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

// Type definitions (matching those in page.tsx)
type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  // Add other profile fields as needed
} | null;

type Activity = {
  date: string;
  count: number;
  level: number;
};

type Stats = {
  lessonsCompleted: number;
  flashcardsReviewed: number;
  quizzesPassed: number;
  streak: number;
  weeklyLessonsCompleted: number;
  weeklyFlashcardsReviewed: number;
  weeklyQuizzesPassed: number;
};

interface ProfileDisplayProps {
  profile: Profile;
  activityData: Activity[];
  stats: Stats;
}

export default function ProfileDisplay({ profile, activityData, stats }: ProfileDisplayProps) {
  // State for animated counters
  const [animatedLessonsCompleted, setAnimatedLessonsCompleted] = useState(0)
  const [animatedFlashcardsReviewed, setAnimatedFlashcardsReviewed] = useState(0)
  const [animatedQuizzesPassed, setAnimatedQuizzesPassed] = useState(0)
  const [animatedStreak, setAnimatedStreak] = useState(0) // Added streak state

  // Weekly Stats (used for the bar chart) - directly use props for target, animate state for display
  const [animatedWeeklyLessons, setAnimatedWeeklyLessons] = useState(0);
  const [animatedWeeklyFlashcards, setAnimatedWeeklyFlashcards] = useState(0);
  const [animatedWeeklyQuizzes, setAnimatedWeeklyQuizzes] = useState(0);


  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // --- Animate Counters ---
    const intervalControllers: NodeJS.Timeout[] = [];

    const animateCounter = (setter: React.Dispatch<React.SetStateAction<number>>, target: number, speed: number) => {
      // Reset counter to 0 before starting animation
      setter(0);
      let currentCount = 0;
      const interval = setInterval(() => {
        setter((prev) => {
          // Calculate increment dynamically based on target and duration (approx)
          const increment = Math.max(1, Math.ceil(target / (1000 / speed))); // Ensure at least 1 increment
          currentCount = Math.min(prev + increment, target); // Use Math.min to avoid overshooting

          if (currentCount >= target) {
            clearInterval(interval);
            return target; // Ensure final value is exactly the target
          }
          return currentCount;
        });
      }, speed);
      intervalControllers.push(interval); // Store interval ID
    };

    // Use stats from props as targets
    animateCounter(setAnimatedLessonsCompleted, stats.lessonsCompleted, 100);
    animateCounter(setAnimatedFlashcardsReviewed, stats.flashcardsReviewed, 20);
    animateCounter(setAnimatedQuizzesPassed, stats.quizzesPassed, 200);
    animateCounter(setAnimatedStreak, stats.streak, 150); // Animate streak

    // Animate weekly stats
    animateCounter(setAnimatedWeeklyLessons, stats.weeklyLessonsCompleted, 150);
    animateCounter(setAnimatedWeeklyFlashcards, stats.weeklyFlashcardsReviewed, 40);
    animateCounter(setAnimatedWeeklyQuizzes, stats.weeklyQuizzesPassed, 300);


    return () => {
      // Cleanup all intervals
      intervalControllers.forEach(clearInterval);
    }
    // Depend on stats props to re-run animation if data changes
  }, [stats])

  // Data for the weekly stats bar chart, updates when animated state changes
  const weeklyChartData = useMemo(() => [
    { name: 'Lessons', value: animatedWeeklyLessons, target: stats.weeklyLessonsCompleted },
    { name: 'Flashcards', value: animatedWeeklyFlashcards, target: stats.weeklyFlashcardsReviewed },
    { name: 'Quizzes', value: animatedWeeklyQuizzes, target: stats.weeklyQuizzesPassed }
  ], [animatedWeeklyLessons, animatedWeeklyFlashcards, animatedWeeklyQuizzes, stats]);


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

  // Determine the display name
  const displayName = profile?.username || profile?.full_name || "Learner"; // Fallback name

  return (
  <div className="container max-w-7xl mx-auto px-4 py-8">
    {/* Header Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {/* Display fetched or default username */}
      <h1 className="text-3xl font-bold mb-2">Hello, {displayName}!</h1>
      <p className="text-lg text-muted-foreground">Here's an overview of your learning journey in physics</p>
      {/* Optionally display other profile info if available */}
      {/* {profile?.avatar_url && <img src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full mt-2" />} */}
      {!profile && (
         <p className="text-sm text-yellow-600 mt-2">Profile data not found. You can create one in settings.</p>
      )}
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
                <div className="text-3xl font-bold text-green-600">{animatedLessonsCompleted}</div>
                {/* <p className="text-xs text-muted-foreground">of 36 total</p> */}
              </CardContent>
            </Card>
          </motion.div>

          {/* Flashcards Card */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Flashcards</h3>
                <div className="text-3xl font-bold text-purple-600">{animatedFlashcardsReviewed}</div>
                <p className="text-xs text-muted-foreground">reviewed</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quizzes Card */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Quizzes</h3>
                <div className="text-3xl font-bold text-orange-600">{animatedQuizzesPassed}</div>
                {/* <p className="text-xs text-muted-foreground">of 12 passed</p> */}
              </CardContent>
            </Card>
          </motion.div>

          {/* Streak Card */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-white">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Streak</h3>
                <div className="text-3xl font-bold text-red-600">{animatedStreak}</div> {/* Use animated streak */}
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
                      // Adjust domain dynamically or set a reasonable max based on expected weekly targets
                      domain={[0, 'dataMax + 5']} // Example: max value + buffer
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

    </motion.div>

    {/* Activity Calendar Section */}
    <motion.div
       variants={itemVariants}
       initial="hidden"
       // Animate when loaded AND activityData is available
       animate={isLoaded && activityData ? "show" : "hidden"}
       className="mt-8"
    >
      <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white">
         <CardHeader>
          <CardTitle>Your Learning Activity</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="overflow-x-auto pb-2 min-h-[150px]">
             {activityData && activityData.length > 0 ? (
               <ActivityCalendar
                 data={activityData}
                 colorScheme="light" // Or use a theme provider value
                 theme={{
                   light: ['#f8fafc', '#dbeafe', '#93c5fd', '#3b82f6', '#2563eb'],
                   dark: ['#1e293b', '#3b82f6', '#2563eb', '#1d4ed8', '#1e3a8a']
                 }}
                 labels={{ legend: { less: 'Less', more: 'More' } }}
                 style={{}}
                 hideColorLegend={false}
                 hideMonthLabels={false}
                 hideTotalCount={false}
                 blockSize={12}
                 blockMargin={4}
                 fontSize={12}
               />
             ) : (
               <div className="flex justify-center items-center h-full text-muted-foreground">
                 {isLoaded ? "No activity data available." : "Loading activity..."}
               </div>
             )}
           </div>
           {activityData && activityData.length > 0 && (
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