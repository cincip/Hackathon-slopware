"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { RefractionAnimation } from "@/components/svg-animations/refraction";

import topics from '../../../lib/topic-data.json';


type TopicData = {
  slug: string;
  name: string;
  description: string;
} | null;

export default function OpticsPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topicData, setTopicData] = useState<TopicData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const topicSlug = 'optics';

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
      const canvasElement = canvas as HTMLCanvasElement;
      const ctx = canvasElement.getContext("2d");

      if (!ctx) {
        console.error("Failed to get 2D context from canvas");
        return;
      }

      let time = 0;

      const drawLensRayTracing = () => {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
        time += 0.01

        const lensX = 175
        const lensHeight = 120
        const lensWidth = 20
        const focalLength = 80

        // Optical axis
        ctx.beginPath()
        ctx.moveTo(20, 150)
        ctx.lineTo(330, 150)
        ctx.strokeStyle = "#94a3b8"
        ctx.lineWidth = 1
        ctx.stroke()

        // Lens
        ctx.beginPath()
        ctx.ellipse(lensX, 150, lensWidth / 2, lensHeight / 2, 0, 0, Math.PI * 2)
        ctx.strokeStyle = "#10b981"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.fillStyle = "rgba(16, 185, 129, 0.1)"
        ctx.fill()

        // Focal points
        ctx.beginPath()
        ctx.moveTo(lensX - focalLength, 145)
        ctx.lineTo(lensX - focalLength, 155)
        ctx.moveTo(lensX + focalLength, 145)
        ctx.lineTo(lensX + focalLength, 155)
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.font = "14px Arial"
        ctx.fillStyle = "#ef4444"
        ctx.textAlign = "center"
        ctx.fillText("F", lensX - focalLength, 140)
        ctx.fillText("F", lensX + focalLength, 140)

        // Object
        const objectHeight = 60
        const objectX = 60
        ctx.beginPath()
        ctx.moveTo(objectX, 150)
        ctx.lineTo(objectX, 150 - objectHeight)
        ctx.lineTo(objectX - 5, 150 - objectHeight + 10)
        ctx.moveTo(objectX, 150 - objectHeight)
        ctx.lineTo(objectX + 5, 150 - objectHeight + 10)
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.stroke()

        // Image calculation
        const objectDistance = lensX - objectX
        const imageDistance = (objectDistance * focalLength) / (objectDistance - focalLength)
        const imageX = lensX + imageDistance
        const imageHeight = -objectHeight * (imageDistance / objectDistance)

        // Draw image (if real)
        if (objectDistance > focalLength) {
          ctx.beginPath()
          ctx.moveTo(imageX, 150)
          ctx.lineTo(imageX, 150 + imageHeight)
          ctx.lineTo(imageX - 5, 150 + imageHeight - 10)
          ctx.moveTo(imageX, 150 + imageHeight)
          ctx.lineTo(imageX + 5, 150 + imageHeight - 10)
          ctx.strokeStyle = "#3b82f6"
          ctx.lineWidth = 2
          ctx.setLineDash([2, 2])
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Ray 1 (Parallel -> Focal)
        const ray1Progress = Math.min(1, (time % 3) / 1.5)
        if (ray1Progress > 0) { // Before lens
          const ray1X = objectX + (lensX - objectX) * Math.min(1, ray1Progress * 2)
          ctx.beginPath()
          ctx.moveTo(objectX, 150 - objectHeight)
          ctx.lineTo(ray1X, 150 - objectHeight)
          ctx.strokeStyle = "#f59e0b"
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
        if (ray1Progress > 0.5) { // After lens
          const ray1EndX = lensX + (imageX - lensX) * Math.min(1, (ray1Progress - 0.5) * 2)
          const ray1EndY = 150 + (150 + imageHeight - 150) * Math.min(1, (ray1Progress - 0.5) * 2)
          ctx.beginPath()
          ctx.moveTo(lensX, 150 - objectHeight)
          ctx.lineTo(ray1EndX, ray1EndY)
          ctx.strokeStyle = "#f59e0b"
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Ray 2 (Center)
        const ray2Progress = Math.min(1, ((time + 1) % 3) / 1.5)
        if (ray2Progress > 0) {
          const ray2X = objectX + (imageX - objectX) * ray2Progress
          const ray2Y = 150 - objectHeight + (150 + imageHeight - (150 - objectHeight)) * ray2Progress
          ctx.beginPath()
          ctx.moveTo(objectX, 150 - objectHeight)
          ctx.lineTo(ray2X, ray2Y)
          ctx.strokeStyle = "#ec4899"
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Ray 3 (Focal -> Parallel)
        const ray3Progress = Math.min(1, ((time + 2) % 3) / 1.5)
        const angle = Math.atan2(150 - (150 - objectHeight), lensX - focalLength - objectX)
        if (ray3Progress > 0) { // Before lens
          const ray3X = objectX + (lensX - objectX) * Math.min(1, ray3Progress * 2)
          const ray3Y = 150 - objectHeight + (150 - objectHeight - (150 - objectHeight - Math.tan(angle) * (lensX - objectX))) * Math.min(1, ray3Progress * 2)
          ctx.beginPath()
          ctx.moveTo(objectX, 150 - objectHeight)
          ctx.lineTo(ray3X, ray3Y)
          ctx.strokeStyle = "#8b5cf6"
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
        if (ray3Progress > 0.5) { // After lens
          const ray3EndX = lensX + (imageX - lensX) * Math.min(1, (ray3Progress - 0.5) * 2)
          ctx.beginPath()
          ctx.moveTo(lensX, 150 - objectHeight - Math.tan(angle) * (lensX - objectX))
          ctx.lineTo(ray3EndX, 150 + imageHeight)
          ctx.strokeStyle = "#8b5cf6"
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        animationFrameId = window.requestAnimationFrame(drawLensRayTracing)
      }

      drawLensRayTracing()

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
          className="mt-4 inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
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
        className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 mb-6"
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
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Simulation: Lens Refraction</h2>
              <div className="w-full my-4">
                <RefractionAnimation />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Parallel light rays converging after passing through a lens.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Concept: Lens Equation</h2>
              <div className="flex justify-center items-center py-8 bg-white rounded-lg shadow-inner">
                <div className="text-center">
                  <div className="text-4xl font-light mb-4">
                    <span className="inline-block">
                      <sup>1</sup>⁄<sub>f</sub> = <sup>1</sup>⁄
                      <sub>
                        d<sub>o</sub>
                      </sub>{" "}
                      + <sup>1</sup>⁄
                      <sub>
                        d<sub>i</sub>
                      </sub>
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    The reciprocal of the focal length (f) equals the sum of the reciprocals of the object distance (d
                    <sub>o</sub>) and image distance (d<sub>i</sub>)
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
