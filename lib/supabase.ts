import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define the Task type based on your Supabase tasks table
export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  created_at: string
  updated_at?: string
  due_date?: string
  priority?: 'low' | 'medium' | 'high'
  assigned_to?: string
}