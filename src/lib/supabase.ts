import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          preferred_language: 'en' | 'uz'
          free_tests_used: number
          subscription_status: 'free' | 'premium'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          preferred_language?: 'en' | 'uz'
          free_tests_used?: number
          subscription_status?: 'free' | 'premium'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          preferred_language?: 'en' | 'uz'
          free_tests_used?: number
          subscription_status?: 'free' | 'premium'
          created_at?: string
          updated_at?: string
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
    }
  }
}