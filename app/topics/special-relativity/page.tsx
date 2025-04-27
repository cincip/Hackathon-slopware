"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SpecialRelativityPage() {
  const canvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Time dilation animation
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      let time = 0
      let animationFrameId

      const drawTimeDilation = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        time += 0.02

        // Draw stationary observer and clock
        const stationaryX = 80
        const stationaryY = 100

        // Draw stationary observer
        ctx.beginPath()
        ctx.arc(stationaryX, stationaryY, 10, 0, Math.PI * 2)
        ctx.fillStyle = "#3b82f6"
        ctx.fill()

        // Draw stationary clock
        ctx.beginPath()
        ctx.arc(stationaryX, stationaryY - 30, 15, 0, Math.PI * 2)
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw clock hands
        const stationaryAngle = time % (Math.PI * 2)
        ctx.beginPath()
        ctx.moveTo(stationaryX, stationaryY - 30)
        ctx.lineTo(stationaryX + 12 * Math.cos(stationaryAngle), stationaryY - 30 + 12 * Math.sin(stationaryAngle))
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.stroke()

        // Label
        ctx.font = "12px Arial"
        ctx.fillStyle = "#3b82f6"
        ctx.textAlign = "center"
        ctx.fillText("Stationary Observer", stationaryX, stationaryY + 25)
        ctx.fillText("t = " + time.toFixed(1) + "s", stationaryX, stationaryY - 50)

        // Draw moving observer and clock
        const movingX = 80 + 150 * Math.sin(time * 0.3) ** 2
        const movingY = 200

        // Calculate relativistic factor (simplified for visualization)
        const velocity = 0.7 // as fraction of c
        const gamma = 1 / Math.sqrt(1 - velocity ** 2)

        // Draw moving observer
        ctx.beginPath()
        ctx.arc(movingX, movingY, 10, 0, Math.PI * 2)
        ctx.fillStyle = "#ef4444"
        ctx.fill()

        // Draw moving clock
        ctx.beginPath()
        ctx.arc(movingX, movingY - 30, 15, 0, Math.PI * 2)
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw clock hands (time runs slower)
        const movingAngle = (time / gamma) % (Math.PI * 2)
        ctx.beginPath()
        ctx.moveTo(movingX, movingY - 30)
        ctx.lineTo(movingX + 12 * Math.cos(movingAngle), movingY - 30 + 12 * Math.sin(movingAngle))
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 2
        ctx.stroke()

        // Label
        ctx.font = "12px Arial"
        ctx.fillStyle = "#ef4444"
        ctx.textAlign = "center"
        ctx.fillText("Moving Observer (v = 0.7c)", movingX, movingY + 25)
        ctx.fillText("t' = " + (time / gamma).toFixed(1) + "s", movingX, movingY - 50)

        // Draw velocity vector
        if (time % 3 < 1.5) {
          const arrowLength = 30 * Math.sin(time * 0.3 * 2)
          ctx.beginPath()
          ctx.moveTo(movingX - 20, movingY)
          ctx.lineTo(movingX - 20 + arrowLength, movingY)
          ctx.strokeStyle = "#ef4444"
          ctx.lineWidth = 1
          ctx.stroke()

          // Draw arrowhead
          ctx.beginPath()
          ctx.moveTo(movingX - 20 + arrowLength, movingY)
          ctx.lineTo(movingX - 20 + arrowLength - 5, movingY - 3)
          ctx.lineTo(movingX - 20 + arrowLength - 5, movingY + 3)
          ctx.fillStyle = "#ef4444"
          ctx.fill()
        }

        // Draw time dilation formula
        ctx.font = "14px Arial"
        ctx.fillStyle = "#000"
        ctx.textAlign = "center"
        ctx.fillText("Time Dilation: t' = t / γ", 175, 250)
        ctx.fillText("where γ = 1/√(1-v²/c²) = " + gamma.toFixed(2), 175, 270)

        animationFrameId = window.requestAnimationFrame(drawTimeDilation)
      }

      drawTimeDilation()

      return () => {
        window.cancelAnimationFrame(animationFrameId)
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
        className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">Special Relativity</h1>
        <p className="text-lg text-muted-foreground">
          Special relativity is a theory of the structure of spacetime proposed by Albert Einstein in 1905. It is based
          on two postulates: the laws of physics are the same for all observers in uniform motion relative to one
          another, and the speed of light in a vacuum is the same for all observers, regardless of their relative motion
          or the motion of the light source.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-amber-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Simulation: Time Dilation</h2>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <canvas ref={canvasRef} width={350} height={300} className="mx-auto"></canvas>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Time passes more slowly for a moving observer compared to a stationary observer
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-amber-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Concept: Mass-Energy Equivalence</h2>
              <div className="flex justify-center items-center py-8 bg-white rounded-lg shadow-inner">
                <div className="text-center">
                  <div className="text-4xl font-light mb-4">E = mc²</div>
                  <p className="text-muted-foreground">
                    Energy (E) equals mass (m) times the speed of light (c) squared, showing that mass and energy are
                    equivalent
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
