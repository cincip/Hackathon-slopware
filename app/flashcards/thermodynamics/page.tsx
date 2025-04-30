"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ThermodynamicsFlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const flashcards = [
    {
      question: "What is the First Law of Thermodynamics?",
      answer:
        "Energy cannot be created or destroyed, only transferred or converted from one form to another. Also known as the Law of Conservation of Energy.",
    },
    {
      question: "What is entropy?",
      answer:
        "Entropy is a measure of disorder or randomness in a system. According to the Second Law of Thermodynamics, the total entropy of an isolated system always increases over time.",
    },
    {
      question: "What is the formula for heat transfer?",
      answer:
        "Q = mc∆T, where Q is heat energy, m is mass, c is specific heat capacity, and ∆T is change in temperature.",
    },
    {
      question: "What is the difference between heat and temperature?",
      answer:
        "Heat is the total energy of molecular motion in a substance, while temperature is a measure of the average energy of molecular motion. Heat energy depends on the speed of particles, their number, and their type.",
    },
    {
      question: "What is the Carnot efficiency formula?",
      answer:
        "η = 1 - (TC/TH), where η is efficiency, TC is the cold reservoir temperature, and TH is the hot reservoir temperature (in Kelvin).",
    },
  ]

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNextCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length)
    }, 300)
  }

  const handlePrevCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    }, 300)
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/flashcards"
        className="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-800 mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Flashcards
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Thermodynamics Flashcards</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge of thermodynamics concepts with these flashcards. Click on a card to reveal the answer.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        className="flex flex-col items-center"
      >
        <div className="w-full max-w-lg mb-8">
          <div className="relative w-full aspect-[3/2] cursor-pointer perspective-1000" onClick={handleCardClick}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isFlipped ? "back" : "front"}
                initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full h-full"
              >
                <Card className="w-full h-full border-0 shadow-md bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-6">
                  <CardContent className="p-0 w-full">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Card {currentCard + 1} of {flashcards.length}
                      </p>
                      <div className="text-xl font-medium mb-2">{isFlipped ? "Answer:" : "Question:"}</div>
                      <p className="text-lg">
                        {isFlipped ? flashcards[currentCard].answer : flashcards[currentCard].question}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrevCard}
            className="px-4 py-2 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNextCard}
            className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-colors"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  )
}
