import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileDisplay from "../../components/profile-display" // We will create this next
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'

// Install the dayOfYear plugin
dayjs.extend(dayOfYear)

// Define the type for profile data fetched from Supabase
type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  // Add other profile fields as needed from your 'profiles' table
} | null;

// Define the type for activity data
type Activity = {
  date: string;
  count: number;
  level: number;
};

// Helper function to generate mock activity data (replace with real data fetching later)
const generateActivityData = (days: number): Activity[] => {
  const data = []
  const today = dayjs()

  for (let i = 0; i < days; i++) {
    const currentDay = today.subtract(i, 'day')
    const date = currentDay.format('YYYY-MM-DD')
    const count = Math.floor(Math.random() * 5); // Replace with actual activity count
    data.unshift({ date, count, level: Math.min(count, 4) })
  }
  return data
}


export default async function ProfilePage() {
  const cookieStore = cookies() // Get the cookie store
  const supabase = createClient(cookieStore) // Pass cookieStore to createClient

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    console.error('Auth error or no user, redirecting:', authError)
    redirect('/auth') // Redirect to your login page
  }

  // Fetch profile data from the 'profiles' table
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*') // Select specific columns like 'username, full_name, avatar_url' for better performance
    .eq('id', user.id)
    .single()

  if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means no rows found, which is okay
    console.error('Error fetching profile:', profileError)
    // Handle error appropriately, maybe show an error message
    // For now, we'll proceed but log the error
  }

  // Fetch or generate activity data (replace with actual data fetching logic)
  // For now, we generate mock data
  const activityData = generateActivityData(365);

  // TODO: Fetch real stats (lessonsCompleted, flashcardsReviewed, quizzesPassed, etc.)
  // based on the user.id from your database tables.
  // For now, we'll pass placeholder values or let the client component handle defaults.
  const stats = {
    lessonsCompleted: 15, // Placeholder
    flashcardsReviewed: 87, // Placeholder
    quizzesPassed: 6, // Placeholder
    streak: 7, // Placeholder
    weeklyLessonsCompleted: 3, // Placeholder
    weeklyFlashcardsReviewed: 15, // Placeholder
    weeklyQuizzesPassed: 2, // Placeholder
  };


  return (
    <ProfileDisplay
      profile={profileData as Profile} // Pass fetched profile data
      activityData={activityData}
      stats={stats} // Pass fetched/placeholder stats
    />
  )
}