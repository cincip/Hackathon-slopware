"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OpticsFlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const flashcards = [
    {
      question: "What is Snell's Law?",
      answer:
        "n₁sin(θ₁) = n₂sin(θ₂), where n₁ and n₂ are the refractive indices of the two media, and θ₁ and θ₂ are the angles of incidence and refraction.",
    },
    {
      question: "What is the thin lens equation?",
      answer:
        "1/f = 1/do + 1/di, where f is the focal length, do is the object distance, and di is the image distance.",
    },
    {
      question: "What is the difference between reflection and refraction?",
      answer:
        "Reflection is when light bounces off a surface, with the angle of incidence equal to the angle of reflection. Refraction is when light changes direction as it passes from one medium to another due to a change in speed.",
    },
    {
      question: "What causes dispersion of light in a prism?",
      answer:
        "Dispersion occurs because different wavelengths (colors) of light travel at different speeds through a medium, causing them to refract at different angles. This is why white light separates into a spectrum of colors when passing through a prism.",
    },
    {
      question: "What is total internal reflection?",
      answer:
        "Total internal reflection occurs when light traveling in a denser medium hits the boundary with a less dense medium at an angle greater than the critical angle, causing all light to be reflected back into the denser medium. This principle is used in fiber optics.",
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
        className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">Optics Flashcards</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge of optics concepts with these flashcards. Click on a card to reveal the answer.
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
                <Card className="w-full h-full border-0 shadow-md bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
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
            className="px-4 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNextCard}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  )
}
