"use client" // This component receives props from a Server Component but can use client features if needed

import Link from "next/link"
import { 
  ArrowRight, 
  BookOpen, 
  FlaskConical, 
  BrainCircuit, 
  Atom, 
  Zap, 
  Radar, 
  Lightbulb, 
  Waves, 
  Rocket 
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Define the type for a topic (can be shared or redefined)
interface Topic {
  id: string
  name: string
  description: string
  slug: string
}

interface HomePageContentProps {
  userName: string;
  topics: Topic[];
  fetchError: string | null;
}

export function HomePageContent({ userName, topics, fetchError }: HomePageContentProps) {
  // Note: Removed framer-motion for simplicity, can be added back here if needed

  // Add this helper function to get icon and color for each topic
  const getTopicStyle = (index: number) => {
    const styles = [
      { Icon: Atom, color: 'blue', gradient: 'from-blue-50' },
      { Icon: Zap, color: 'yellow', gradient: 'from-yellow-50' },
      { Icon: Radar, color: 'green', gradient: 'from-green-50' },
      { Icon: Lightbulb, color: 'orange', gradient: 'from-orange-50' },
      { Icon: Waves, color: 'purple', gradient: 'from-purple-50' },
      { Icon: Rocket, color: 'red', gradient: 'from-red-50' },
    ];
    return styles[index % styles.length];
  };

  return (
    <>
      {/* Welcome Message (Could also be passed as prop or kept in Server Component) */}
       <div className="mb-12">
         <h1 className="text-3xl font-bold mb-6">Welcome back, {userName}!</h1>
       </div>

      {/* Dynamic Topics Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Explore Physics Topics</h2>
        {/* Error handling remains similar, passed via props */}
        {fetchError && (
          <div className="flex items-center justify-center py-10 text-red-600 bg-red-50 p-4 rounded-md border border-red-200">
            {/* Using AlertTriangle requires importing it */}
            {/* <AlertTriangle className="h-6 w-6 mr-2" /> */}
            <span>{fetchError}</span>
          </div>
        )}
        {!fetchError && topics.length === 0 && (
           <div className="flex items-center justify-center py-10 text-muted-foreground">
             <span>No topics found.</span>
           </div>
        )}
        {/* Use ternary operator for conditional rendering */}
        {!fetchError && topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const { Icon, color, gradient } = getTopicStyle(index);
              return (
                <Link key={topic.id} href={`/topics/${topic.slug}`}>
                  <Card className={`h-full border-0 shadow-sm bg-gradient-to-br ${gradient} to-white hover:shadow-md transition-shadow`}>
                    <CardContent className="flex flex-col items-center justify-center pt-6">
                      <Icon className={`h-12 w-12 text-${color}-500 mb-4`} />
                      <h3 className="text-xl font-medium text-center mb-2">{topic.name}</h3>
                      <p className="text-center text-muted-foreground text-sm">{topic.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : null /* Render nothing when no topics */}
      </div>

      {/* Learning Pathways Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Learning Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Link href="/lessons">
              <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <BookOpen className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-medium text-center mb-2">Interactive Lessons</h3>
                  <p className="text-center text-muted-foreground">Learn through guided interactive content</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div>
            <Link href="/flashcards">
              <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-green-50 to-white hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <FlaskConical className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium text-center mb-2">Practice Flashcards</h3>
                  <p className="text-center text-muted-foreground">Reinforce concepts with spaced repetition</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div>
            <Link href="/quizzes">
              <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <BrainCircuit className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-medium text-center mb-2">Knowledge Quizzes</h3>
                  <p className="text-center text-muted-foreground">Test your understanding with quizzes</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}