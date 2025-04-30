"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ClassicalMechanicsFlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // TODO: Replace with actual Classical Mechanics flashcards
  // Or fetch dynamically from a data source if preferred
  const flashcards = [
    {
      question: "What is Newton's First Law?",
      answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force (Law of Inertia).",
    },
    {
      question: "What is Newton's Second Law?",
      answer: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass (F=ma).",
    },
    {
      question: "What is Newton's Third Law?",
      answer: "For every action, there is an equal and opposite reaction.",
    },
    {
      question: "What is Work in physics?",
      answer: "Work is done when a force causes a displacement of an object in the direction of the force (W = Fd cosθ).",
    },
    {
      question: "What is Kinetic Energy?",
      answer: "The energy an object possesses due to its motion (KE = 1/2 mv²).",
    },
    {
      question: "What is Potential Energy?",
      answer: "Stored energy an object has because of its position or state (e.g., gravitational potential energy PE = mgh).",
    },
  ];

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
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">Classical Mechanics Flashcards</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge of classical mechanics concepts with these flashcards. Click on a card to reveal the answer.
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
                <Card className="w-full h-full border-0 shadow-md bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
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
            className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNextCard}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  )
}
