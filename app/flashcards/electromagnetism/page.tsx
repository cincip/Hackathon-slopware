"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ElectromagnetismFlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const flashcards = [
    {
      question: "What is Coulomb's Law?",
      answer:
        "F = k(q₁q₂/r²), where F is the electrostatic force, k is Coulomb's constant, q₁ and q₂ are the charges, and r is the distance between them.",
    },
    {
      question: "What are Maxwell's Equations?",
      answer:
        "Four fundamental equations that describe how electric and magnetic fields are generated and altered by each other and by charges and currents: Gauss's law, Gauss's law for magnetism, Faraday's law, and Ampère's law with Maxwell's addition.",
    },
    {
      question: "What is electromagnetic induction?",
      answer:
        "The process of generating an electromotive force (EMF) across an electrical conductor in a changing magnetic field, as described by Faraday's law of induction.",
    },
    {
      question: "What is the relationship between electricity and magnetism?",
      answer:
        "Electricity and magnetism are two aspects of the same fundamental force—electromagnetism. Moving electric charges create magnetic fields, and changing magnetic fields induce electric currents.",
    },
    {
      question: "What is the speed of electromagnetic waves in vacuum?",
      answer:
        "Electromagnetic waves travel at the speed of light in vacuum, which is approximately 3 × 10⁸ meters per second (c = 1/√(ε₀μ₀)).",
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
        className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">Electromagnetism Flashcards</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge of electromagnetism concepts with these flashcards. Click on a card to reveal the answer.
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
                <Card className="w-full h-full border-0 shadow-md bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-6">
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
            className="px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNextCard}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  )
}
