"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, ArrowRight } from "lucide-react"

export default function FlashcardsPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
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

  const topics = [
    {
      id: "classical-mechanics",
      title: "Classical Mechanics",
      description: "Review concepts of motion, forces, and energy",
      color: "blue" as ColorKey,
      count: 5,
    },
    {
      id: "thermodynamics",
      title: "Thermodynamics",
      description: "Master heat, energy transfer, and entropy",
      color: "orange" as ColorKey,
      count: 5,
    },
    {
      id: "quantum-physics",
      title: "Quantum Physics",
      description: "Explore the subatomic world and wave-particle duality",
      color: "purple" as ColorKey,
      count: 5,
    },
    {
      id: "optics",
      title: "Optics",
      description: "Study light behavior and optical phenomena",
      color: "green" as ColorKey,
      count: 5,
    },
    {
      id: "electromagnetism",
      title: "Electromagnetism",
      description: "Learn about electric and magnetic fields",
      color: "red" as ColorKey,
      count: 5,
    },
    {
      id: "special-relativity",
      title: "Special Relativity",
      description: "Understand space-time and relativistic effects",
      color: "yellow" as ColorKey,
      count: 5,
    },
  ]

  type ColorKey = "blue" | "orange" | "purple" | "green" | "red" | "yellow"

  const getGradient = (color: ColorKey) => {
    const gradients: Record<ColorKey, string> = {
      blue: "from-blue-50 to-white",
      orange: "from-orange-50 to-white",
      purple: "from-purple-50 to-white",
      green: "from-green-50 to-white",
      red: "from-red-50 to-white",
      yellow: "from-amber-50 to-white",
    }
    return gradients[color] || "from-gray-50 to-white"
  }

  const getIconColor = (color: ColorKey) => {
    const colors: Record<ColorKey, string> = {
      blue: "text-blue-500",
      orange: "text-orange-500",
      purple: "text-purple-500",
      green: "text-green-500",
      red: "text-red-500",
      yellow: "text-amber-500",
    }
    return colors[color] || "text-gray-500"
  }

  const getTextColor = (color: ColorKey) => {
    const colors: Record<ColorKey, string> = {
      blue: "text-blue-600 hover:text-blue-800",
      orange: "text-orange-600 hover:text-orange-800",
      purple: "text-purple-600 hover:text-purple-800",
      green: "text-green-600 hover:text-green-800",
      red: "text-red-600 hover:text-red-800",
      yellow: "text-amber-600 hover:text-amber-800",
    }
    return colors[color] || "text-gray-600 hover:text-gray-800"
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Practice Flashcards</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Reinforce your physics knowledge with our interactive flashcards. Select a topic to begin.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {topics.map((topic) => (
          <motion.div key={topic.id} variants={item} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Link href={`/flashcards/${topic.id}`}>
              <Card
                className={`h-full border-0 shadow-sm bg-gradient-to-br ${getGradient(topic.color)} hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-full bg-white shadow-sm ${getIconColor(topic.color)} mr-4`}>
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2">{topic.title}</h3>
                      <p className="text-muted-foreground mb-4">{topic.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{topic.count} cards</span>
                        <span className={`text-sm font-medium ${getTextColor(topic.color)} flex items-center`}>
                          Practice
                          <ArrowRight className="ml-1 h-4 w-4" />
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
  )
}
