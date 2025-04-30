"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function QuantumPhysicsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Double-slit interference pattern animation
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        console.error("Failed to get 2D context")
        return // Exit if context is not available
      }
      let time = 0
      let animationFrameId: number | undefined

      const drawInterference = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        time += 0.03

        // Draw source
        ctx.beginPath()
        ctx.arc(50, 150, 8, 0, Math.PI * 2)
        ctx.fillStyle = "#8b5cf6"
        ctx.fill()

        // Draw barrier with two slits
        ctx.fillStyle = "#1e293b"
        ctx.fillRect(120, 80, 10, 50)
        ctx.fillRect(120, 150, 10, 70)
        ctx.fillRect(120, 240, 10, 50)

        // Draw waves emanating from slits
        const drawWave = (centerY: number, phase: number) => {
          for (let angle = -Math.PI / 2; angle <= Math.PI / 2; angle += 0.1) {
            const length = 200
            const startX = 130
            const startY = centerY

            for (let i = 0; i < length; i += 2) {
              const x = startX + i * Math.cos(angle)
              const y = startY + i * Math.sin(angle)

              // Distance from source
              const distance = i

              // Wave amplitude decreases with distance
              const amplitude = 3 * (1 - distance / length)

              // Wave frequency
              const frequency = 0.2

              // Calculate wave displacement
              const displacement = amplitude * Math.sin(frequency * distance - time + phase)

              // Draw wave particle
              const alpha = 0.6 * (1 - distance / length)
              ctx.beginPath()
              ctx.arc(x, y + displacement, 1.5, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
              ctx.fill()
            }
          }
        }

        // Draw waves from both slits with different phases
        drawWave(130, 0)
        drawWave(220, Math.PI)

        // Draw interference pattern on the right side
        const patternWidth = 80
        const patternHeight = 200
        const patternX = 250
        const patternY = 100

        for (let y = 0; y < patternHeight; y++) {
          // Calculate intensity based on position (simplified double-slit formula)
          const y1 = y + patternY - 130
          const y2 = y + patternY - 220
          const d1 = Math.sqrt(Math.pow(patternX - 130, 2) + Math.pow(y1, 2))
          const d2 = Math.sqrt(Math.pow(patternX - 130, 2) + Math.pow(y2, 2))

          // Phase difference
          const phaseDiff = (2 * Math.PI * (d2 - d1)) / 20

          // Intensity calculation (simplified)
          const intensity = Math.pow(Math.cos(phaseDiff / 2 + time / 5), 2)

          // Draw intensity line
          ctx.beginPath()
          ctx.moveTo(patternX, patternY + y)
          ctx.lineTo(patternX + intensity * patternWidth, patternY + y)
          ctx.strokeStyle = `rgba(139, 92, 246, ${intensity * 0.8})`
          ctx.lineWidth = 2
          ctx.stroke()
        }

        animationFrameId = window.requestAnimationFrame(drawInterference)
      }

      drawInterference()

      return () => {
        if (typeof animationFrameId === "number") {
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
        className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">Quantum Physics</h1>
        <p className="text-lg text-muted-foreground">
          Quantum physics is a fundamental theory in physics that describes nature at the smallest scales of energy
          levels of atoms and subatomic particles. It explains phenomena that classical physics cannot, such as
          wave-particle duality and quantum entanglement.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Simulation: Double-Slit Interference Pattern</h2>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <canvas ref={canvasRef} width={350} height={300} className="mx-auto"></canvas>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                A particle behaving like a wave, creating an interference pattern after passing through two slits
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
