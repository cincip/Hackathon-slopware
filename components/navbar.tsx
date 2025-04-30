"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client" // Import client Supabase
import type { User } from "@supabase/supabase-js"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [supabase])


  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsOpen(false) // Close mobile menu on logout
    router.push('/') // Redirect to home after logout
    router.refresh() // Refresh server components
  }

  const baseNavItems = [
    { name: "Home", href: "/" },
    { name: "Lessons", href: "/lessons" },
    { name: "Flashcards", href: "/flashcards" },
    { name: "Quizzes", href: "/quizzes" },
  ]

  const navItems = user
    ? [...baseNavItems, { name: "Profile", href: "/profile" }]
    : baseNavItems

  return (
    <nav className="bg-white border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">AqylDy</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            {user ? (
              <Button variant="ghost" onClick={handleLogout} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Logout
              </Button>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu" className="text-gray-700 dark:text-gray-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {/* Mobile Auth Buttons */}
          {user ? (
             <Button
               variant="ghost"
               onClick={handleLogout}
               className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
             >
               Logout
             </Button>
          ) : (
            <Link
              href="/auth"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  )
}
