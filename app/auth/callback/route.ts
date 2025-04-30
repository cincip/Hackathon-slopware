import { cookies } from 'next/headers' // Import cookies
import { createClient } from '@/lib/supabase/server' // Use the server client utility
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const cookieStore = cookies() // Get the cookie store
    const supabase = createClient(cookieStore) // Pass cookieStore to createClient
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code for session:', error.message)
      // Redirect to an error page or show an error message
      return NextResponse.redirect(`${origin}/auth?error=Could not authenticate user`)
    }
  } else {
    console.warn('No code found in callback request')
    // Redirect back to auth page if no code is present
    return NextResponse.redirect(`${origin}/auth?error=Authentication failed`)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/`) // Redirect to home page or profile
}