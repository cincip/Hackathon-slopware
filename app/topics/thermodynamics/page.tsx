"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { HeatTransferAnimation } from "@/components/svg-animations/heat-transfer"; // Import the new heat transfer animation

import topics from '../../../lib/topic-data.json'; // Import local topic data

// Define type for topic data (can be moved to a shared types file later)
type TopicData = {
  slug: string;
  name: string;
  description: string;
} | null;

export default function ThermodynamicsPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topicData, setTopicData] = useState<TopicData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const topicSlug = 'thermodynamics'; // Define the slug for this page

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
    setIsLoaded(true); // Keep for animation logic if needed

    // --- Existing Animation Logic ---
    let animationFrameId: number | undefined; // Declare outside if block
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
       if (!ctx) { // Add null check for context
        console.error("Failed to get 2D context for thermodynamics animation");
        return; // Exit if context is null
      }
      let time = 0;
      // animationFrameId is declared outside

      const drawHeatFlow = () => {
        // ctx is guaranteed non-null here
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        time += 0.02

        // Draw hot object (left)
        const hotGradient = ctx.createLinearGradient(50, 100, 150, 200)
        hotGradient.addColorStop(0, "#ef4444")
        hotGradient.addColorStop(1, "#f97316")

        ctx.fillStyle = hotGradient
        ctx.fillRect(50, 100, 100, 100)

        // Draw cold object (right)
        const coldGradient = ctx.createLinearGradient(200, 100, 300, 200)
        coldGradient.addColorStop(0, "#3b82f6")
        coldGradient.addColorStop(1, "#2563eb")

        ctx.fillStyle = coldGradient
        ctx.fillRect(200, 100, 100, 100)

        // Draw heat particles flowing from hot to cold
        for (let i = 0; i < 15; i++) {
          const offset = i * 0.7
          // Ensure x calculation stays within reasonable bounds if needed, though % 1 might handle it
          const x = 150 + 50 * Math.sin(time + offset) * 0.5 + ((50 * (time + offset)) % 50) // Adjusted modulo
          const y = 150 + 30 * Math.sin((time + offset) * 2)

          const particleSize = 4 + 2 * Math.sin(time + offset)

          // Gradient from red to blue based on position
          const progress = (x - 150) / 50
          const r = Math.max(0, Math.min(255, Math.floor(239 * (1 - progress) + 59 * progress))) // Interpolate R (239 -> 59)
          const g = Math.max(0, Math.min(255, Math.floor(68 * (1 - progress) + 130 * progress))) // Interpolate G (68 -> 130)
          const b = Math.max(0, Math.min(255, Math.floor(68 * (1 - progress) + 246 * progress))) // Interpolate B (68 -> 246)


          ctx.beginPath()
          ctx.arc(x, y, particleSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})` // Use interpolated RGB
          ctx.fill()
        }

        // Draw temperature indicators
        ctx.font = "14px Arial"
        ctx.fillStyle = "#000"
        ctx.textAlign = "center"

        // Hot temperature decreases slightly over time
        const hotTemp = 90 - ((time * 2) % 20)
        ctx.fillText(`${Math.floor(hotTemp)}°C`, 100, 90)

        // Cold temperature increases slightly over time
        const coldTemp = 10 + ((time * 2) % 20)
        ctx.fillText(`${Math.floor(coldTemp)}°C`, 250, 90)

        animationFrameId = window.requestAnimationFrame(drawHeatFlow)
      }

      drawHeatFlow()

      // Inner return for the if(canvas) block, handles cleanup if animation started
      return () => {
        if (typeof animationFrameId === "number") {
           window.cancelAnimationFrame(animationFrameId);
        }
      };
    }
    // --- End of Animation Logic ---

    // Main useEffect cleanup function (handles case where canvas might be null initially)
    // This correctly references the animationFrameId declared outside the if block
    return () => {
      if (typeof animationFrameId === "number") {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
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
          className="mt-4 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-800" // Keep original color for link
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
        className="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-800 mb-6"
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
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-6 flex flex-col items-center"> {/* Center content */}
              <h2 className="text-xl font-semibold mb-4">Simulation: Heat Transfer</h2>
              {/* Use the new heat transfer animation */}
              <div className="w-full my-4"> {/* Use full width */}
                <HeatTransferAnimation />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Visualization of heat flowing from a hot object to a cold object.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Concept: Heat Transfer Equation</h2>
              <div className="flex justify-center items-center py-8 bg-white rounded-lg shadow-inner">
                <div className="text-center">
                  <div className="text-4xl font-light mb-4">Q = mc∆T</div>
                  <p className="text-muted-foreground">
                    The heat transferred (Q) equals the mass (m) times the specific heat capacity (c) times the change
                    in temperature (∆T)
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
