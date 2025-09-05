import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  preferred_language: string | null
  free_tests_used: number
  subscription_status: string | null
  created_at: string | null
  updated_at: string | null
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        throw error
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    }
  }

  const createProfile = async (userId: string, email: string, fullName?: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: email,
          full_name: fullName || null,
          preferred_language: 'en',
          free_tests_used: 0,
          subscription_status: 'free'
        })
        .select()
        .single()

      if (error) throw error
      setProfile(data)
      return { data, error: null }
    } catch (error) {
      console.error('Error creating profile:', error)
      return { data: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        return { data, error }
      }

      // If user was created successfully, create their profile
      if (data.user && !data.user.email_confirmed_at) {
        // For users who need email confirmation, we'll create the profile
        // when they confirm their email and sign in
        return { data, error: null }
      }

      // If user is immediately confirmed, create profile now
      if (data.user) {
        await createProfile(data.user.id, email, fullName)
      }

      return { data, error: null }
    } catch (err) {
      console.error('Signup error:', err)
      return { data: null, error: err as any }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('No user logged in') }

    // If no profile exists, create one first
    if (!profile) {
      const createResult = await createProfile(user.id, user.email!, user.user_metadata?.full_name)
      if (createResult.error) {
        return createResult
      }
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (!error && data) {
      setProfile(data)
    }

    return { data, error }
  }

  const canTakeTest = () => {
    if (!profile) return true // Allow test if profile is loading
    return profile.subscription_status === 'premium' || profile.free_tests_used < 1
  }

  const incrementFreeTestUsage = async () => {
    if (!profile || profile.subscription_status === 'premium') return

    const newUsage = profile.free_tests_used + 1
    await updateProfile({ free_tests_used: newUsage })
  }

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    canTakeTest,
    incrementFreeTestUsage
  }
}