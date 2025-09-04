import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and public API key
const supabaseUrl = 'https://YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
