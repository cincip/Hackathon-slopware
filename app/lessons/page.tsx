"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  ClassicalMechanicsAnimation,
  ThermodynamicsAnimation,
  QuantumPhysicsAnimation,
  OpticsAnimation,
  ElectromagnetismAnimation,
  SpecialRelativityAnimation,
} from "@/components/svg-animations"

export default function LessonsPage() {
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

  const topics: {
    id: string
    title: string
    description: string
    color: ColorKey
    icon: React.ReactNode
  }[] = [
    {
      id: "classical-mechanics",
      title: "Classical Mechanics",
      description: "The study of motion and forces in the macroscopic world",
      color: "blue",
      icon: <ClassicalMechanicsAnimation />,
    },
    {
      id: "thermodynamics",
      title: "Thermodynamics",
      description: "The physics of heat, energy transfer, and entropy",
      color: "orange",
      icon: <ThermodynamicsAnimation />,
    },
    {
      id: "quantum-physics",
      title: "Quantum Physics",
      description: "The behavior of matter and energy at the smallest scales",
      color: "purple",
      icon: <QuantumPhysicsAnimation />,
    },
    {
      id: "optics",
      title: "Optics",
      description: "The study of light and its interactions with matter",
      color: "green",
      icon: <OpticsAnimation />,
    },
    {
      id: "electromagnetism",
      title: "Electromagnetism",
      description: "The physics of electricity, magnetism, and electromagnetic waves",
      color: "red",
      icon: <ElectromagnetismAnimation />,
    },
    {
      id: "special-relativity",
      title: "Special Relativity",
      description: "Einstein's theory of space, time, and motion at high speeds",
      color: "yellow",
      icon: <SpecialRelativityAnimation />,
    },
  ]

  type ColorKey = "blue" | "orange" | "purple" | "green" | "red" | "yellow"
  const getGradient = (color: ColorKey) => {
    const gradients: Record<ColorKey, string> = {
      blue: "from-blue-100 to-blue-50/30",
      orange: "from-orange-100 to-orange-50/30",
      purple: "from-purple-100 to-purple-50/30",
      green: "from-green-100 to-green-50/30",
      red: "from-red-100 to-red-50/30",
      yellow: "from-amber-100 to-amber-50/30",
    }
    return gradients[color] || "from-gray-100 to-gray-50/30"
  }

  const getTextColor = (color: ColorKey) => {
    const colors: Record<ColorKey, string> = {
      blue: "text-blue-600",
      orange: "text-orange-600",
      purple: "text-purple-600",
      green: "text-green-600",
      red: "text-red-600",
      yellow: "text-amber-600",
    }
    return colors[color] || "text-gray-600"
  }

  const getBorderColor = (color: ColorKey) => {
    const colors: Record<ColorKey, string> = {
      blue: "group-hover:border-blue-300",
      orange: "group-hover:border-orange-300",
      purple: "group-hover:border-purple-300",
      green: "group-hover:border-green-300",
      red: "group-hover:border-red-300",
      yellow: "group-hover:border-amber-300",
    }
    return colors[color] || "group-hover:border-gray-300"
  }

  return (
    <TooltipProvider>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Unlock Your Physics Potential
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the fundamental principles that govern our universe through interactive lessons
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial={false} // Add this
          animate="show"  // Remove the conditional
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {topics.map((topic) => (
            <motion.div 
              key={topic.id} 
              variants={item} 
              whileHover={{ y: -4 }} // Changed from scale to translateY
              transition={{ duration: 0.3 }}
              className="transform-gpu will-change-transform" // Add this class
            >
              <Link href={`/topics/${topic.id}`} className="block h-full group">
                <Card
                  className={`h-full border border-transparent ${getBorderColor(topic.color)}
                    shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden
                    transform-style-preserve-3d`} // Add this class
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(topic.color)}
                    opacity-60 will-change-opacity`} // Add will-change-opacity
                  ></div>
                  <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-white/20 rounded-full blur-3xl"></div>
                  <CardContent className="p-8 relative">
                    <div className="flex items-start gap-5">
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden`}
                      >
                        {topic.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-2xl font-medium mb-3 ${getTextColor(topic.color)}`}>{topic.title}</h3>
                        <p className="text-muted-foreground">{topic.description}</p>
                        <div className="mt-6 flex justify-end">
                          <span
                            className={`text-sm font-medium ${getTextColor(topic.color)} flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          >
                            Explore Topic
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
