"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { QuantumTunnelingAnimation } from "@/components/svg-animations/quantum-tunneling"; // Import the new tunneling animation

import topics from '../../../lib/topic-data.json'; // Import local topic data

// Define type for topic data (can be moved to a shared types file later)
type TopicData = {
  slug: string;
  name: string;
  description: string;
} | null;

export default function QuantumPhysicsPage() {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null); // Removed canvas ref
  const [isLoaded, setIsLoaded] = useState(false);
  const [topicData, setTopicData] = useState<TopicData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const topicSlug = 'quantum-physics'; // Define the slug for this page

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
    return () => {}; // Simple cleanup
  }, []); // Keep empty dependency array for animation setup on mount

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
        <p>Loading topic details...</p>
      </div>
    );
  }

  // --- Error State ---
  if (error || !topicData) { // Handle both fetch error and topic not found
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center text-red-600"> {/* Use red for error */}
        <p>Error loading topic: {error || "Topic not found."}</p>
        <Link
          href="/topics" // Link back to the main topics page
          className="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800" // Keep original color for link
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
        href="/topics" // Adjusted link back to topics overview
        className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 mb-6"
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
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-6 flex flex-col items-center"> {/* Center content */}
              <h2 className="text-xl font-semibold mb-4">Simulation: Quantum Tunneling</h2>
              {/* Use the new tunneling animation */}
              <div className="w-full my-4"> {/* Use full width */}
                <QuantumTunnelingAnimation />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Particle wave function tunneling through a potential barrier.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Concept: Planck-Einstein Relation</h2>
              <div className="flex justify-center items-center py-8 bg-white rounded-lg shadow-inner">
                <div className="text-center">
                  <div className="text-4xl font-light mb-4">E = hf</div>
                  <p className="text-muted-foreground">
                    The energy (E) of a photon equals Planck's constant (h) times the frequency (f) of the
                    electromagnetic wave
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
