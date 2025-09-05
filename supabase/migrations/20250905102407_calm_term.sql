/*
  # Create profiles table and exam results table

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users, primary key)
      - `email` (text, not null)
      - `full_name` (text, nullable)
      - `preferred_language` (text, default 'en', check constraint)
      - `free_tests_used` (integer, default 0)
      - `subscription_status` (text, default 'free', check constraint)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `exam_results`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `user_id` (uuid, references profiles(id), not null)
      - `exam_type` (text, check constraint for valid types)
      - `section_scores` (jsonb, not null)
      - `overall_score` (decimal, not null)
      - `time_taken` (integer, not null)
      - `completed_at` (timestamptz, default now())
      - `answers` (jsonb, not null)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to read/update their own data
    - Add policies for users to read/insert their own exam results

  3. Functions
    - Create trigger to automatically update `updated_at` timestamp
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'uz')),
  free_tests_used INTEGER DEFAULT 0,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exam results table
CREATE TABLE IF NOT EXISTS exam_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  exam_type TEXT NOT NULL CHECK (exam_type IN ('listening', 'reading', 'writing', 'speaking', 'full')),
  section_scores JSONB NOT NULL,
  overall_score DECIMAL(3,1) NOT NULL,
  time_taken INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  answers JSONB NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles table
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for exam_results table
CREATE POLICY "Users can read own exam results" ON exam_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own exam results" ON exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();