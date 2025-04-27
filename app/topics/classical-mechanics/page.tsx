"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ClassicalMechanicsPage() {
  const canvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Simple animation of a ball rolling down an inclined plane
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      let ballX = 50
      let ballY = 150
      let animationFrameId

      const drawInclinedPlane = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw inclined plane
        ctx.beginPath()
        ctx.moveTo(30, 200)
        ctx.lineTo(300, 250)
        ctx.lineWidth = 2
        ctx.strokeStyle = "#0f172a"
        ctx.stroke()

        // Draw ball
        ctx.beginPath()
        ctx.arc(ballX, ballY, 15, 0, Math.PI * 2)
        ctx.fillStyle = "#3b82f6"
        ctx.fill()

        // Draw force vector
        ctx.beginPath()
        ctx.moveTo(ballX, ballY)
        ctx.lineTo(ballX + 20, ballY + 15)
        ctx.lineWidth = 2
        ctx.strokeStyle = "#ef4444"
        ctx.stroke()

        // Draw arrowhead
        ctx.beginPath()
        ctx.moveTo(ballX + 20, ballY + 15)
        ctx.lineTo(ballX + 15, ballY + 5)
        ctx.lineTo(ballX + 25, ballY + 10)
        ctx.lineTo(ballX + 20, ballY + 15)
        ctx.fillStyle = "#ef4444"
        ctx.fill()

        // Update ball position
        if (ballX < 270) {
          ballX += 0.5
          ballY += 0.25
        } else {
          // Reset animation
          ballX = 50
          ballY = 150
        }

        animationFrameId = window.requestAnimationFrame(drawInclinedPlane)
      }

      drawInclinedPlane()

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
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">Classical Mechanics</h1>
        <p className="text-lg text-muted-foreground">
          Classical mechanics describes the motion of macroscopic objects, from projectiles to parts of machinery, and
          astronomical objects, such as spacecraft, planets, stars, and galaxies.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Simulation: Ball on an Inclined Plane</h2>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <canvas ref={canvasRef} width={350} height={300} className="mx-auto"></canvas>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                A ball rolling down an inclined plane with force vector shown in red
              </p>
            </CardContent>
          </Card>
        </motion.div>

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
  )
}
