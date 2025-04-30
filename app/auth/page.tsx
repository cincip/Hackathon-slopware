'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client' // Use the client component utility
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // User is logged in, redirect to home or profile page
        router.push('/') // Or '/profile'
      }
    })

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/') // Or '/profile'
      }
    })


    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase, router])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark" // Or "light" or based on your theme provider
          providers={['github']} // Optional: Add providers like Google, GitHub, etc.
          redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`} // Ensure this matches Supabase settings
        />
      </div>
    </div>
  )
}