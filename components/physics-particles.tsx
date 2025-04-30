"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function PhysicsParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
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
        // Resize canvas to fit container, but maintain aspect ratio for drawing logic if needed
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw connections between nearby particles
        ctx.strokeStyle = "rgba(148, 163, 184, 0.2)" // slate-400 with alpha
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Adjust connection distance based on canvas size? Maybe 10% of width?
            const connectDistance = Math.min(100, canvas.width * 0.1);

            if (distance < connectDistance) {
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

          // Draw particle trail (optional)
          // if (particle.type === 1) { // photon trail example
          //   ctx.beginPath();
          //   ctx.moveTo(particle.x, particle.y);
          //   ctx.lineTo(particle.x - particle.speedX * 5, particle.y - particle.speedY * 5);
          //   ctx.strokeStyle = particle.color;
          //   ctx.lineWidth = 0.5;
          //   ctx.stroke();
          // }

          // Update position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Bounce off edges
          if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) particle.speedX *= -1
          if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) particle.speedY *= -1

          // Keep particles within bounds if they somehow escape
           particle.x = Math.max(particle.radius, Math.min(particle.x, canvas.width - particle.radius));
           particle.y = Math.max(particle.radius, Math.min(particle.y, canvas.height - particle.radius));
        })

        requestAnimationFrame(drawParticles)
      }

      // Handle resize
      let animationFrameId: number | null = null;
      const resizeObserver = new ResizeObserver(() => {
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(drawParticles);
      });
      resizeObserver.observe(canvas);


      // Initial draw
      animationFrameId = requestAnimationFrame(drawParticles)

      // Cleanup
      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">Physics in Motion</h2>
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0 h-[200px]"> {/* Set fixed height for container */}
          <canvas ref={canvasRef} className="w-full h-full" /> {/* Canvas fills container */}
        </CardContent>
      </Card>
    </motion.div>
  )
}