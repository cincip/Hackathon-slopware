"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ThermodynamicsPage() {
  const canvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Heat flow animation between two objects
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      let time = 0
      let animationFrameId

      const drawHeatFlow = () => {
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
          const x = 150 + 50 * Math.sin(time + offset) * 0.5 + ((50 * (time + offset)) % 1)
          const y = 150 + 30 * Math.sin((time + offset) * 2)

          const particleSize = 4 + 2 * Math.sin(time + offset)

          // Gradient from red to blue based on position
          const progress = (x - 150) / 50
          const r = Math.max(0, Math.min(255, Math.floor(255 * (1 - progress))))
          const b = Math.max(0, Math.min(255, Math.floor(255 * progress)))

          ctx.beginPath()
          ctx.arc(x, y, particleSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgb(${r}, 100, ${b})`
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
        className="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">Thermodynamics</h1>
        <p className="text-lg text-muted-foreground">
          Thermodynamics is the branch of physics that deals with heat, work, and temperature, and their relation to
          energy, radiation, and physical properties of matter. It describes how thermal energy is converted to and from
          other forms of energy and how it affects matter.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Simulation: Heat Transfer Between Objects</h2>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <canvas ref={canvasRef} width={350} height={300} className="mx-auto"></canvas>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Heat flows from the hot object (left) to the cold object (right) until thermal equilibrium is reached
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
