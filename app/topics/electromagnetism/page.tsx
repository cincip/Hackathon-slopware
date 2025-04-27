"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ElectromagnetismPage() {
  const canvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Electromagnetic wave animation
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      let time = 0
      let animationFrameId

      const drawEMWave = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
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
        className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">Electromagnetism</h1>
        <p className="text-lg text-muted-foreground">
          Electromagnetism is a branch of physics involving the study of the electromagnetic force, a type of physical
          interaction that occurs between electrically charged particles. It is one of the four fundamental interactions
          in nature, along with the strong interaction, the weak interaction, and gravitation.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-red-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Simulation: Electromagnetic Wave Propagation</h2>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <canvas ref={canvasRef} width={350} height={300} className="mx-auto"></canvas>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                An electromagnetic wave with perpendicular electric (red) and magnetic (blue) field components
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
