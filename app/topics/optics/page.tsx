"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OpticsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Light ray tracing through a converging lens
    const canvas = canvasRef.current
    if (canvas) {
      // Explicitly type canvas element after null check
      const canvasElement = canvas as HTMLCanvasElement
      const ctx = canvasElement.getContext("2d")

      // Check if context was successfully obtained
      if (!ctx) {
        console.error("Failed to get 2D context from canvas")
        return // Exit if context is not available
      }

      let time = 0
      // Add type annotation for animationFrameId
      let animationFrameId: number | undefined

      const drawLensRayTracing = () => {
        // Use the correctly typed canvasElement
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
        time += 0.01

        // Define lens parameters
        const lensX = 175
        const lensHeight = 120
        const lensWidth = 20
        const lensY = 150 - lensHeight / 2
        const focalLength = 80

        // Draw optical axis (horizontal line)
        ctx.beginPath()
        ctx.moveTo(20, 150)
        ctx.lineTo(330, 150)
        ctx.strokeStyle = "#94a3b8"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw lens
        ctx.beginPath()
        ctx.ellipse(lensX, 150, lensWidth / 2, lensHeight / 2, 0, 0, Math.PI * 2)
        ctx.strokeStyle = "#10b981"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.fillStyle = "rgba(16, 185, 129, 0.1)"
        ctx.fill()

        // Draw focal points
        ctx.beginPath()
        ctx.moveTo(lensX - focalLength, 145)
        ctx.lineTo(lensX - focalLength, 155)
        ctx.moveTo(lensX + focalLength, 145)
        ctx.lineTo(lensX + focalLength, 155)
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw F labels
        ctx.font = "14px Arial"
        ctx.fillStyle = "#ef4444"
        ctx.textAlign = "center"
        ctx.fillText("F", lensX - focalLength, 140)
        ctx.fillText("F", lensX + focalLength, 140)

        // Draw object (arrow)
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

        // Calculate image position using lens equation
        // 1/f = 1/do + 1/di
        const objectDistance = lensX - objectX
        const imageDistance = (objectDistance * focalLength) / (objectDistance - focalLength)
        const imageX = lensX + imageDistance
        const imageHeight = -objectHeight * (imageDistance / objectDistance)

        // Draw image (arrow) if it's a real image
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

        // Draw rays
        // Ray 1: Parallel to optical axis, then through focal point
        const ray1Progress = Math.min(1, (time % 3) / 1.5)

        // First segment (before lens)
        if (ray1Progress > 0) {
          const ray1X = objectX + (lensX - objectX) * Math.min(1, ray1Progress * 2)
          ctx.beginPath()
          ctx.moveTo(objectX, 150 - objectHeight)
          ctx.lineTo(ray1X, 150 - objectHeight)
          ctx.strokeStyle = "#f59e0b"
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Second segment (after lens)
        if (ray1Progress > 0.5) {
          const ray1EndX = lensX + (imageX - lensX) * Math.min(1, (ray1Progress - 0.5) * 2)
          const ray1EndY = 150 + (150 + imageHeight - 150) * Math.min(1, (ray1Progress - 0.5) * 2)
          ctx.beginPath()
          ctx.moveTo(lensX, 150 - objectHeight)
          ctx.lineTo(ray1EndX, ray1EndY)
          ctx.strokeStyle = "#f59e0b"
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Ray 2: Through center of lens (no deviation)
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

        // Ray 3: Through focal point, then parallel to optical axis
        const ray3Progress = Math.min(1, ((time + 2) % 3) / 1.5)

        // Calculate angle for ray going through focal point
        const angle = Math.atan2(150 - (150 - objectHeight), lensX - focalLength - objectX)

        // First segment (before lens)
        if (ray3Progress > 0) {
          const ray3X = objectX + (lensX - objectX) * Math.min(1, ray3Progress * 2)
          const ray3Y =
            150 -
            objectHeight +
            (150 - objectHeight - (150 - objectHeight - Math.tan(angle) * (lensX - objectX))) *
              Math.min(1, ray3Progress * 2)
          ctx.beginPath()
          ctx.moveTo(objectX, 150 - objectHeight)
          ctx.lineTo(ray3X, ray3Y)
          ctx.strokeStyle = "#8b5cf6"
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Second segment (after lens)
        if (ray3Progress > 0.5) {
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

      return () => {
        // Check if animationFrameId has a value before cancelling
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId)
        }
      }
    }
  }, [])

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

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/lessons"
        className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Lessons
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Optics</h1>
        <p className="text-lg text-muted-foreground">
          Optics is the branch of physics that studies the behavior and properties of light, including its interactions
          with matter and the construction of instruments that use or detect it. It includes the study of sight, the
          sense of seeing.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Simulation: Ray Tracing Through a Converging Lens</h2>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <canvas ref={canvasRef} width={350} height={300} className="mx-auto"></canvas>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Light rays from an object passing through a converging lens, forming a real image
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
