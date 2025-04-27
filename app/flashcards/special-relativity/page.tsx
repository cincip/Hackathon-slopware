"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SpecialRelativityFlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const flashcards = [
    {
      question: "What are the two postulates of special relativity?",
      answer:
        "1) The laws of physics are the same in all inertial reference frames. 2) The speed of light in vacuum is the same for all observers, regardless of their relative motion or the motion of the light source.",
    },
    {
      question: "What is time dilation?",
      answer:
        "Time dilation is the phenomenon where time passes slower for an observer in motion relative to another observer. The formula is t' = t/γ, where γ = 1/√(1-v²/c²).",
    },
    {
      question: "What is length contraction?",
      answer:
        "Length contraction is the phenomenon where objects appear shorter in the direction of motion. The formula is L' = L/γ, where γ = 1/√(1-v²/c²).",
    },
    {
      question: "What is the mass-energy equivalence formula?",
      answer:
        "E = mc², where E is energy, m is mass, and c is the speed of light in vacuum. This equation shows that mass and energy are equivalent and can be converted into each other.",
    },
    {
      question: "What is the relativistic momentum formula?",
      answer:
        "p = γmv, where p is momentum, m is rest mass, v is velocity, and γ = 1/√(1-v²/c²). Unlike classical mechanics, relativistic momentum accounts for the increase in effective mass as velocity increases.",
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
        className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 mb-6"
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
        <h1 className="text-3xl font-bold mb-4">Special Relativity Flashcards</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge of special relativity concepts with these flashcards. Click on a card to reveal the
          answer.
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
                <Card className="w-full h-full border-0 shadow-md bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-6">
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
            className="px-4 py-2 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNextCard}
            className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  )
}
