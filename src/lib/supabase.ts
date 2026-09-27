import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co');

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-key'
);

if (!isSupabaseConfigured) {
  console.info(
    '%c Taj Mahal Carpet Platform %c Running in Local Showroom Mode (Supabase environment variables not set). Connect your Supabase URL & Anon Key in .env to activate live backend.',
    'background: #5A1827; color: #DFB971; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'color: #1C1919; font-weight: normal;'
  );
}
