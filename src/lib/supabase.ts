import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set with valid values from your Supabase project.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          preferred_language: string | null
          free_tests_used: number
          subscription_status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          preferred_language?: string | null
          free_tests_used?: number
          subscription_status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          preferred_language?: string | null
          free_tests_used?: number
          subscription_status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      exam_results: {
        Row: {
          id: string
          user_id: string
          exam_type: 'listening' | 'reading' | 'writing' | 'speaking' | 'full'
          section_scores: Record<string, number>
          overall_score: number
          time_taken: number
          completed_at: string
          answers: Record<string, any>
        }
        Insert: {
          id?: string
          user_id: string
          exam_type: 'listening' | 'reading' | 'writing' | 'speaking' | 'full'
          section_scores: Record<string, number>
          overall_score: number
          time_taken: number
          completed_at?: string
          answers: Record<string, any>
        }
        Update: {
          id?: string
          user_id?: string
          exam_type?: 'listening' | 'reading' | 'writing' | 'speaking' | 'full'
          section_scores?: Record<string, number>
          overall_score?: number
          time_taken?: number
          completed_at?: string
          answers?: Record<string, any>
        }
      }
      prices: {
        Row: {
          id: string
          exam_type: string
          price_cents: number
          currency: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          exam_type: string
          price_cents: number
          currency?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          exam_type?: string
          price_cents?: number
          currency?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}