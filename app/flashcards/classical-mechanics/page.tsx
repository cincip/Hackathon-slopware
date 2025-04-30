"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client" // Import Supabase client

interface Flashcard {
  id: string
  question: string
  answer: string
  topic_id: string
}

export default function ClassicalMechanicsFlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true)
      setError(null)
      const supabase = createClient()

      try {
        // 1. Fetch the topic ID for 'classical-mechanics'
        const { data: topicData, error: topicError } = await supabase
          .from("topics")
          .select("id")
          .eq("slug", "classical-mechanics")
          .single()

        if (topicError) throw new Error(`Error fetching topic: ${topicError.message}`)
        if (!topicData) throw new Error("Topic 'classical-mechanics' not found.")

        const topicId = topicData.id

        // 2. Fetch flashcards for the topic ID
        const { data: flashcardsData, error: flashcardsError } = await supabase
          .from("flashcards")
          .select("*")
          .eq("topic_id", topicId)

        if (flashcardsError) throw new Error(`Error fetching flashcards: ${flashcardsError.message}`)

        setFlashcards(flashcardsData || [])
      } catch (err: any) {
        console.error("Error loading flashcards:", err)
        setError(err.message || "Failed to load flashcards.")
      } finally {
        setLoading(false)
      }
    }

    fetchFlashcards()
  }, [])

  const handleCardClick = () => {
    if (flashcards.length === 0) return // Don't flip if no cards
    setIsFlipped(!isFlipped)
  }

  const handleNextCard = () => {
    if (flashcards.length === 0) return
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length)
    }, 300) // Wait for flip animation
  }

  const handlePrevCard = () => {
    if (flashcards.length === 0) return
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    }, 300) // Wait for flip animation
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
          Test your knowledge of classical mechanics concepts with these flashcards. Click on a card to reveal the
          answer.
        </p>
      </motion.div>

      <div className="flex flex-col items-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-lg text-muted-foreground">Loading flashcards...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50 p-6 rounded-lg border border-red-200">
            <AlertTriangle className="h-12 w-12 mb-4" />
            <p className="text-lg font-semibold mb-2">Error Loading Flashcards</p>
            <p className="text-center">{error}</p>
          </div>
        ) : flashcards.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-lg">No flashcards found for Classical Mechanics yet.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full max-w-lg mb-8">
              <div
                className={`relative w-full aspect-[3/2] perspective-1000 ${flashcards.length > 0 ? 'cursor-pointer' : ''}`}
                onClick={handleCardClick}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={`${currentCard}-${isFlipped ? "back" : "front"}`} // Ensure key changes for animation
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
                            {isFlipped ? flashcards[currentCard]?.answer : flashcards[currentCard]?.question}
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
                disabled={flashcards.length === 0}
                className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextCard}
                disabled={flashcards.length === 0}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
