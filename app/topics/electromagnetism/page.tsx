"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { EMWaveAnimation } from "@/components/svg-animations/em-wave"; // Import the new EM wave animation

import topics from '../../../lib/topic-data.json'; // Import local topic data

// Define type for topic data (can be moved to a shared types file later)
type TopicData = {
  slug: string;
  name: string;
  description: string;
} | null;

export default function ElectromagnetismPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topicData, setTopicData] = useState<TopicData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const topicSlug = 'electromagnetism'; // Define the slug for this page

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
    let animationFrameId: number | undefined; // Declare ID outside with type
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) { // Add null check for context
        console.error("Failed to get 2D context for electromagnetism animation");
        return; // Exit if context is null
      }
      let time = 0;
      // animationFrameId is declared in the outer scope

      const drawEMWave = () => {
        // ctx is guaranteed non-null here
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.05

        const centerY = 150
        const amplitude = 50
        const wavelength = 50
        const waveSpeed = 0.1

        // Draw propagation direction arrow
        ctx.beginPath()
        ctx.moveTo(20, centerY)
        ctx.lineTo(330, centerY)
        ctx.strokeStyle = "#94a3b8"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw arrowhead
        ctx.beginPath()
        ctx.moveTo(330, centerY)
        ctx.lineTo(320, centerY - 5)
        ctx.lineTo(320, centerY + 5)
        ctx.fillStyle = "#94a3b8"
        ctx.fill()

        // Draw "Direction of Propagation" text
        ctx.font = "12px Arial"
        ctx.fillStyle = "#64748b"
        ctx.textAlign = "center"
        ctx.fillText("Direction of Propagation", 175, 180)

        // Draw electric field component (vertical oscillation)
        ctx.beginPath()
        ctx.moveTo(20, centerY)

        for (let x = 20; x <= 330; x += 2) {
          const y = centerY - amplitude * Math.sin((x - 20) / wavelength - time * waveSpeed)
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw "Electric Field" text
        ctx.font = "12px Arial"
        ctx.fillStyle = "#ef4444"
        ctx.textAlign = "left"
        ctx.fillText("Electric Field (E)", 20, 50)

        // Draw magnetic field component (horizontal oscillation)
        // We represent this as a series of lines perpendicular to the screen
        for (let x = 20; x <= 330; x += 10) {
          const eFieldValue = Math.sin((x - 20) / wavelength - time * waveSpeed)
          const mFieldValue = Math.sin((x - 20) / wavelength - time * waveSpeed + Math.PI / 2)
          const y = centerY - amplitude * eFieldValue

          // Draw magnetic field indicator (circle with varying size)
          const circleSize = Math.abs(4 * mFieldValue)

          ctx.beginPath()
          ctx.arc(x, y, circleSize, 0, Math.PI * 2)

          if (mFieldValue > 0) {
            // Coming out of the screen (dot)
            ctx.fillStyle = "#3b82f6"
            ctx.fill()
          } else {
            // Going into the screen (cross)
            ctx.strokeStyle = "#3b82f6"
            ctx.lineWidth = 1
            ctx.stroke()

            // Draw X
            ctx.beginPath()
            ctx.moveTo(x - circleSize * 0.7, y - circleSize * 0.7)
            ctx.lineTo(x + circleSize * 0.7, y + circleSize * 0.7)
            ctx.moveTo(x + circleSize * 0.7, y - circleSize * 0.7)
            ctx.lineTo(x - circleSize * 0.7, y + circleSize * 0.7)
            ctx.strokeStyle = "#3b82f6"
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // Draw "Magnetic Field" text
        ctx.font = "12px Arial"
        ctx.fillStyle = "#3b82f6"
        ctx.textAlign = "right"
        ctx.fillText("Magnetic Field (B)", 330, 50)

        animationFrameId = window.requestAnimationFrame(drawEMWave)
      }

      drawEMWave()

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
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center text-red-600">
        <p>Error loading topic: {error || "Topic not found."}</p>
        <Link
          href="/topics" // Link back to the main topics page
          className="mt-4 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
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
        className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 mb-6"
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
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-red-50 to-white">
            <CardContent className="p-6 flex flex-col items-center"> {/* Center content */}
              <h2 className="text-xl font-semibold mb-4">Simulation: Electromagnetic Wave</h2>
              {/* Use the new EM wave animation */}
              <div className="w-full my-4"> {/* Use full width */}
                <EMWaveAnimation />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Visualization of an electromagnetic wave with oscillating E and B fields.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-red-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Concept: Maxwell's Equations</h2>
              <div className="flex justify-center items-center py-8 bg-white rounded-lg shadow-inner">
                <div className="text-center">
                  <div className="text-4xl font-light mb-4">c = 1/√(ε₀μ₀)</div>
                  <p className="text-muted-foreground">
                    The speed of light (c) equals the reciprocal of the square root of the product of the electric
                    permittivity (ε₀) and magnetic permeability (μ₀) of free space
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
