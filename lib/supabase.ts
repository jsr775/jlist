import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define the Task type based on your Supabase tasks table
export interface Task {
  id: string
  title: string
  description?: string
  status?: 'todo' | 'in-progress' | 'done' | 'cancelled'
  list_id?: number
  start_date?: string
  end_date?: string
  duration: number | null
  due_date?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
}

export interface TaskList {
  id: number
  name: string
  description?: string
  parent_id?: number
}