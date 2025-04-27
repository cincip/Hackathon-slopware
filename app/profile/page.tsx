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


// Function to generate dummy activity data for the calendar
const generateDummyActivityData = (days: number) => {
  const data = [];
  const today = dayjs();

  for (let i = 0; i < days; i++) {
    const date = today.subtract(i, 'day').format('YYYY-MM-DD');
    // Generate random activity count (e.g., 0 to 10)
    const count = Math.floor(Math.random() * 11);
    data.unshift({ date, count }); // Add to the beginning to keep dates in order
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
    const weeklyLessonsTarget = 3 // Example target
    const weeklyFlashcardsTarget = 25 // Example target
    const weeklyQuizzesTarget = 2 // Example target

    animateCounter(setWeeklyLessonsCompleted, weeklyLessonsTarget, 150);
    animateCounter(setWeeklyFlashcardsReviewed, weeklyFlashcardsTarget, 40);
    animateCounter(setWeeklyQuizzesPassed, weeklyQuizzesTarget, 300);


    return () => {
      // Cleanup all intervals
      intervalControllers.forEach(clearInterval);
    }
  }, []) // Empty dependency array means this runs once on mount

  // Data for the weekly stats bar chart, updates when state changes
  const weeklyChartData = useMemo(() => [
    { name: 'Lessons', value: weeklyLessonsCompleted },
    { name: 'Flashcards', value: weeklyFlashcardsReviewed },
    { name: 'Quizzes', value: weeklyQuizzesPassed },
  ], [weeklyLessonsCompleted, weeklyFlashcardsReviewed, weeklyQuizzesPassed]);

  // Dummy data for the activity calendar (generate 365 days)
  const activityData = useMemo(() => generateDummyActivityData(365), []);


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
        variants={containerVariants} // Apply container variants to the main layout area
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" // Main grid with two columns on medium screens+, added mb for space below
      >
        {/* Left Column: Total Stats */}
        <motion.div variants={itemVariants} className="grid gap-6 auto-rows-fr"> {/* This column is an item, contains its own grid, auto-rows-fr makes cards fill height */}
           {/* Overall progress card - spans the single column */}
           <motion.div variants={cardItemVariants}>
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

          {/* Remaining total stat cards - stacked */}
          <motion.div variants={cardItemVariants}>
            <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white h-full">
              <CardHeader className="pb-2">
                <CardTitle>Lessons Completed (Total)</CardTitle>
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
                <CardTitle>Flashcards Reviewed (Total)</CardTitle>
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
                <CardTitle>Quizzes Passed (Total)</CardTitle>
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

        {/* Right Column: Weekly Stats Bar Chart */}
        <motion.div variants={itemVariants}> {/* This column is an item */}
           <motion.div variants={cardItemVariants} className="h-full"> {/* Card for the chart, h-full to match height */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-white h-full"> {/* Different gradient for weekly? */}
              <CardHeader className="pb-2">
                <CardTitle>Weekly Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex flex-col"> {/* flex-col to make chart fill space */}
                 <div className="flex-grow"> {/* Allows chart to take available space */}
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" /> {/* Grid lines */}
                      <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 10, right: 10 }} className="text-sm text-muted-foreground" />
                      <YAxis axisLine={false} tickLine={false} width={20} className="text-sm text-muted-foreground" /> {/* Y-axis */}
                      <Tooltip
                         cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }} // Highlight bar on hover
                         contentStyle={{
                           backgroundColor: 'hsl(var(--card))',
                           border: '1px solid hsl(var(--border))',
                           borderRadius: '0.5rem',
                           fontSize: '0.875rem'
                         }}
                         labelStyle={{ color: 'hsl(var(--foreground))' }}
                         itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--primary))" // Use primary color from theme
                        radius={[4, 4, 0, 0]} // Rounded corners on top
                        maxBarSize={50} // Max width of bars
                      />
                    </BarChart>
                  </ResponsiveContainer>
                 </div>
                <p className="text-center text-muted-foreground text-sm mt-2">Activities completed this week.</p> {/* Added descriptive text */}
              </CardContent>
            </Card>
           </motion.div>
        </motion.div> {/* End Right Column */}

      </motion.div> {/* End Stats Section Grid */}

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
                 theme={{ // Basic theme override to fit Shadcn colors if possible, or just use a default
                    light: ['#f0f0f0', '#c4edde', '#7ac7a9', '#5bba8d', '#2e845a'], // Example greens
                    dark: ['#3a3a3a', '#5b8d5e', '#83b486', '#a8daac', '#d0ffc7'], // Example greens for dark mode
                 }}
                 hideColorLegend // You can show this if you want
                 hideMonthLabels={false} // Show month labels
                 hideTotalCount={false} // Show total count
                 // You can customize block size, spacing, etc.
                 blockSize={12}
                 blockMargin={4}
                 fontSize={12}
                 // showWeekdayLabels={true} // Uncomment if you want weekday labels
               />
             </div>
             <p className="text-center text-muted-foreground text-sm mt-4">Daily activity over the last year.</p>
           </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}