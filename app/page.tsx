import { cookies } from 'next/headers' // Import cookies
import { createClient } from '@/lib/supabase/server' // Correct: Import the server client creator
import { PhysicsParticles } from '@/components/physics-particles' // Restore particle component
import { HomePageContent } from '@/components/home-page-content'

// Define the type for a topic
interface Topic {
  id: string
  name: string
  description: string
  slug: string
}

export default async function HomePage() {
  const cookieStore = cookies() // Get the cookie store
  // Pass the cookie store to the client creator
  const supabase = createClient(cookieStore)

  let topics: Topic[] = []
  let fetchError: string | null = null
  let userName = "there"

  try {
    // Fetch user data
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.user_metadata?.full_name) {
        userName = user.user_metadata.full_name.split(' ')[0];
    } else if (user?.email) {
        userName = user.email.split('@')[0];
    }

    // Fetch topics from Supabase
    const { data: topicsData, error: topicsError } = await supabase
      .from("topics")
      .select("id, name, description, slug")

    if (topicsError) {
      throw topicsError
    }
    topics = topicsData || []
  } catch (err: any) {
    console.error("Error fetching data:", err)
    fetchError = "Failed to load page data. Please try again later."
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      {/* Render the client component with data */}
      <HomePageContent
        userName={userName}
        topics={topics}
        fetchError={fetchError}
      />

      {/* Render the physics particles animation component */}
      <PhysicsParticles />
    </div>
  )
}
