/*
  # Create prices table for exam pricing

  1. New Tables
    - `prices`
      - `id` (uuid, primary key)
      - `exam_type` (varchar, unique)
      - `price_cents` (integer)
      - `currency` (varchar)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `prices` table
    - Add policy for public read access
    - Add policy for admin write access (future implementation)

  3. Initial Data
    - Insert initial pricing for full mock exam ($5.70)
*/

-- Create prices table
CREATE TABLE IF NOT EXISTS prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type varchar(32) NOT NULL UNIQUE,
  price_cents integer NOT NULL,
  currency varchar(8) NOT NULL DEFAULT 'USD',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read active prices"
  ON prices
  FOR SELECT
  USING (is_active = true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_prices_updated_at'
  ) THEN
    CREATE TRIGGER update_prices_updated_at
      BEFORE UPDATE ON prices
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert initial pricing data
INSERT INTO prices (exam_type, price_cents, currency) 
VALUES ('full', 570, 'USD')
ON CONFLICT (exam_type) DO NOTHING;