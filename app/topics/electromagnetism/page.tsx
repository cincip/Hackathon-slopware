"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { EMWaveAnimation } from "@/components/svg-animations/em-wave";

import topics from '../../../lib/topic-data.json';


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
  const topicSlug = 'electromagnetism';

  useEffect(() => {
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

    // Canvas animation logic (removed detailed comments)
    let animationFrameId: number | undefined;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get 2D context for electromagnetism animation");
        return;
      }
      let time = 0;

      const drawEMWave = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.05

        const centerY = 150
        const amplitude = 50
        const wavelength = 50
        const waveSpeed = 0.1

        // Propagation direction
        ctx.beginPath()
        ctx.moveTo(20, centerY)
        ctx.lineTo(330, centerY)
        ctx.strokeStyle = "#94a3b8"
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(330, centerY)
        ctx.lineTo(320, centerY - 5)
        ctx.lineTo(320, centerY + 5)
        ctx.fillStyle = "#94a3b8"
        ctx.fill()
        ctx.font = "12px Arial"
        ctx.fillStyle = "#64748b"
        ctx.textAlign = "center"
        ctx.fillText("Direction of Propagation", 175, 180)

        // Electric field
        ctx.beginPath()
        ctx.moveTo(20, centerY)
        for (let x = 20; x <= 330; x += 2) {
          const y = centerY - amplitude * Math.sin((x - 20) / wavelength - time * waveSpeed)
          ctx.lineTo(x, y)
        }
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.font = "12px Arial"
        ctx.fillStyle = "#ef4444"
        ctx.textAlign = "left"
        ctx.fillText("Electric Field (E)", 20, 50)

        // Magnetic field
        for (let x = 20; x <= 330; x += 10) {
          const eFieldValue = Math.sin((x - 20) / wavelength - time * waveSpeed)
          const mFieldValue = Math.sin((x - 20) / wavelength - time * waveSpeed + Math.PI / 2)
          const y = centerY - amplitude * eFieldValue
          const circleSize = Math.abs(4 * mFieldValue)

          ctx.beginPath()
          ctx.arc(x, y, circleSize, 0, Math.PI * 2)

          if (mFieldValue > 0) { // Out of screen
            ctx.fillStyle = "#3b82f6"
            ctx.fill()
          } else { // Into screen
            ctx.strokeStyle = "#3b82f6"
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.beginPath() // Draw X
            ctx.moveTo(x - circleSize * 0.7, y - circleSize * 0.7)
            ctx.lineTo(x + circleSize * 0.7, y + circleSize * 0.7)
            ctx.moveTo(x + circleSize * 0.7, y - circleSize * 0.7)
            ctx.lineTo(x - circleSize * 0.7, y + circleSize * 0.7)
            ctx.strokeStyle = "#3b82f6"
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        ctx.font = "12px Arial"
        ctx.fillStyle = "#3b82f6"
        ctx.textAlign = "right"
        ctx.fillText("Magnetic Field (B)", 330, 50)

        animationFrameId = window.requestAnimationFrame(drawEMWave)
      }

      drawEMWave()

      // Cleanup for animation frame
      return () => {
        if (typeof animationFrameId === "number") {
           window.cancelAnimationFrame(animationFrameId);
        }
      };
    }

    // General cleanup
    return () => {
      if (typeof animationFrameId === "number") {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);


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


  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
        <p>Loading topic details...</p>
      </div>
    );
  }


  if (error || !topicData) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center text-red-600">
        <p>Error loading topic: {error || "Topic not found."}</p>
        <Link
          href="/topics"
          className="mt-4 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Topics
        </Link>
      </div>
    );
  }


  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/topics"
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
        <h1 className="text-3xl font-bold mb-4">{topicData.name}</h1>
        <p className="text-lg text-muted-foreground">
          {topicData.description}
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-red-50 to-white">
            <CardContent className="p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Simulation: Electromagnetic Wave</h2>
              <div className="w-full my-4">
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
