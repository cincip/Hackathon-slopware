"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, FlaskConical, BrainCircuit } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const [userName, setUserName] = useState("Alex")
  const [isLoaded, setIsLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Physics particles animation
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      const particles: {
        x: number
        y: number
        radius: number
        color: string
        speedX: number
        speedY: number
        type: number
      }[] = []
      const particleCount = 50

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: getRandomColor(),
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          type: Math.floor(Math.random() * 3), // 0: electron, 1: photon, 2: atom
        })
      }

      function getRandomColor() {
        const colors = ["#3b82f6", "#ef4444", "#10b981", "#8b5cf6", "#f97316", "#f59e0b"]
        return colors[Math.floor(Math.random() * colors.length)]
      }


      function drawParticles() {
        if (!ctx || !canvas) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw connections between nearby particles
        ctx.strokeStyle = "rgba(148, 163, 184, 0.2)"
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }

        // Draw particles
        particles.forEach((particle) => {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()

          // Draw particle trail
          if (particle.type === 1) {
            // photon
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particle.x - particle.speedX * 10, particle.y - particle.speedY * 10)
            ctx.strokeStyle = particle.color
            ctx.stroke()
          }

          // Update position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
        })

        requestAnimationFrame(drawParticles)
      }

      drawParticles()
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
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold mb-6">Welcome back, {userName}!</h1>

        <div className="grid gap-6">
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Classical Mechanics</CardTitle>
              <CardDescription>Resume your journey through motion and forces</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex items-center">
                <motion.div
                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <span className="text-blue-600 text-xs font-medium">65%</span>
                </motion.div>
                <motion.div
                  className="text-sm text-blue-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Making great progress!
                </motion.div>
              </div>
              <Link
                href="/topics/classical-mechanics"
                className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center group"
              >
                Resume Learning
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Thermodynamics</CardTitle>
              <CardDescription>Explore heat, energy, and entropy</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-orange-600"
                  initial={{ width: 0 }}
                  animate={{ width: "32%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex items-center">
                <motion.div
                  className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <span className="text-orange-600 text-xs font-medium">32%</span>
                </motion.div>
                <motion.div
                  className="text-sm text-orange-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Keep going!
                </motion.div>
              </div>
              <Link
                href="/topics/thermodynamics"
                className="ml-auto text-sm font-medium text-orange-600 hover:text-orange-800 flex items-center group"
              >
                Resume Learning
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Quantum Physics</CardTitle>
              <CardDescription>Discover the mysteries of the subatomic world</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: "18%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex items-center">
                <motion.div
                  className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2"
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <span className="text-purple-600 text-xs font-medium">18%</span>
                </motion.div>
                <motion.div
                  className="text-sm text-purple-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  Just getting started!
                </motion.div>
              </div>
              <Link
                href="/topics/quantum-physics"
                className="ml-auto text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center group"
              >
                Resume Learning
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Learning Pathways</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Link href="/lessons">
              <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <BookOpen className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-medium text-center mb-2">Interactive Lessons</h3>
                  <p className="text-center text-muted-foreground">Learn through guided interactive content</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={item} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Link href="/flashcards">
              <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-green-50 to-white hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <FlaskConical className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium text-center mb-2">Practice Flashcards</h3>
                  <p className="text-center text-muted-foreground">Reinforce concepts with spaced repetition</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={item} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Link href="/quizzes">
              <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <BrainCircuit className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-medium text-center mb-2">Knowledge Quizzes</h3>
                  <p className="text-center text-muted-foreground">Test your understanding with quizzes</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Physics Particles Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Physics in Motion</h2>
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <canvas ref={canvasRef} width={1000} height={200} className="w-full h-[200px]" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
