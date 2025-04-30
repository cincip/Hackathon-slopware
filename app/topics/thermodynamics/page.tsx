"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { HeatTransferAnimation } from "@/components/svg-animations/heat-transfer";

import topics from '../../../lib/topic-data.json';


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
  const topicSlug = 'thermodynamics';

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
        console.error("Failed to get 2D context for thermodynamics animation");
        return;
      }
      let time = 0;

      const drawHeatFlow = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        time += 0.02

        // Hot object
        const hotGradient = ctx.createLinearGradient(50, 100, 150, 200)
        hotGradient.addColorStop(0, "#ef4444")
        hotGradient.addColorStop(1, "#f97316")
        ctx.fillStyle = hotGradient
        ctx.fillRect(50, 100, 100, 100)

        // Cold object
        const coldGradient = ctx.createLinearGradient(200, 100, 300, 200)
        coldGradient.addColorStop(0, "#3b82f6")
        coldGradient.addColorStop(1, "#2563eb")
        ctx.fillStyle = coldGradient
        ctx.fillRect(200, 100, 100, 100)

        // Heat particles
        for (let i = 0; i < 15; i++) {
          const offset = i * 0.7
          const x = 150 + 50 * Math.sin(time + offset) * 0.5 + ((50 * (time + offset)) % 50)
          const y = 150 + 30 * Math.sin((time + offset) * 2)
          const particleSize = 4 + 2 * Math.sin(time + offset)

          // Particle color gradient
          const progress = (x - 150) / 50
          const r = Math.max(0, Math.min(255, Math.floor(239 * (1 - progress) + 59 * progress)))
          const g = Math.max(0, Math.min(255, Math.floor(68 * (1 - progress) + 130 * progress)))
          const b = Math.max(0, Math.min(255, Math.floor(68 * (1 - progress) + 246 * progress)))

          ctx.beginPath()
          ctx.arc(x, y, particleSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
          ctx.fill()
        }

        // Temperature indicators
        ctx.font = "14px Arial"
        ctx.fillStyle = "#000"
        ctx.textAlign = "center"
        const hotTemp = 90 - ((time * 2) % 20)
        ctx.fillText(`${Math.floor(hotTemp)}°C`, 100, 90)
        const coldTemp = 10 + ((time * 2) % 20)
        ctx.fillText(`${Math.floor(coldTemp)}°C`, 250, 90)

        animationFrameId = window.requestAnimationFrame(drawHeatFlow)
      }

      drawHeatFlow()

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
          className="mt-4 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-800"
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
        <h1 className="text-3xl font-bold mb-4">{topicData.name}</h1>
        <p className="text-lg text-muted-foreground">
          {topicData.description}
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Simulation: Heat Transfer</h2>
              <div className="w-full my-4">
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
