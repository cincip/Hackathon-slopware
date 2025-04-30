"use client"

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import topics from '../../../lib/topic-data.json'; // Import local topic data
import { CollisionAnimation } from "@/components/svg-animations/collision"; // Import the new collision animation

// Define type for topic data
type TopicData = {
  name: string;
  description: string;
} | null;


export default function ClassicalMechanicsPage() {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null); // Removed canvas ref
  const [isLoaded, setIsLoaded] = useState(false);
  const [topicData, setTopicData] = useState<TopicData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const supabase = createClient(); // Removed Supabase client initialization
  const topicSlug = 'classical-mechanics'; // Define the slug

  useEffect(() => {
    // Load data from imported JSON
    setLoading(true);
    setError(null);
    const foundTopic = topics.find(topic => topic.slug === topicSlug);

    if (foundTopic) {
      setTopicData(foundTopic);
    } else {
      setError(`Topic with slug '${topicSlug}' not found in local data.`);
      setTopicData(null);
    }
    setLoading(false);
    setIsLoaded(true);

    // Removed canvas animation logic
    // Cleanup function is no longer needed for canvas
    return () => {};
  }, [topicSlug]); // Add dependencies (supabase client is stable)

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

  // --- Loading State ---
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
        {/* You can replace this with Skeleton components from your UI library */}
        <p>Loading topic details...</p>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center text-red-600">
        <p>Error loading topic: {error}</p>
        <Link
          href="/topics" // Link back to the main topics page or relevant overview
          className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Topics
        </Link>
      </div>
    );
  }

  // --- Not Found State (handled within error logic now, but could be separate) ---
   if (!topicData) {
     // This state might be reached if fetchTopicData sets error but not topicData,
     // or if the topic genuinely doesn't exist (handled by PGRST116 check).
     return (
       <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
         <p>Topic not found.</p>
         <Link
           href="/topics" // Link back
           className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
         >
           <ArrowLeft className="mr-1 h-4 w-4" />
           Back to Topics
         </Link>
       </div>
     );
   }

  // --- Success State ---
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/topics" // Adjust if your topics overview page is elsewhere
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Topics
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        {/* Use dynamic data */}
        <h1 className="text-3xl font-bold mb-4">{topicData.name}</h1>
        <p className="text-lg text-muted-foreground">
          {topicData.description}
        </p>
      </motion.div>

      {/* Keep the rest of the content (animation, key concepts) */}
      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        {/* Simulation Card */}
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6 flex flex-col items-center"> {/* Center content */}
              <h2 className="text-xl font-semibold mb-4">Simulation: Elastic Collision</h2>
              {/* Use the new collision animation */}
              <div className="w-full my-4"> {/* Use full width */}
                <CollisionAnimation />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Elastic collision between two balls demonstrating conservation of momentum.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Concept Card */}
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Concept: Newton's Second Law</h2>
              <div className="flex justify-center items-center py-8 bg-white rounded-lg shadow-inner">
                <div className="text-center">
                  <div className="text-4xl font-light mb-4">F = ma</div>
                  <p className="text-muted-foreground">
                    The force acting on an object is equal to the mass of the object multiplied by its acceleration
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
