import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define the Task type based on your Supabase tasks table
export interface Task {
  id: number
  title: string
  description?: string
  status?: 'todo' | 'in-progress' | 'done' | 'cancelled'
  list_id?: number
  start_date?: string
  end_date?: string
  estimated_duration: number | null // in minutes
  actual_duration: number | null // in minutes
  due_date?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  is_timing?: boolean
  rank?: number
}

export interface TaskList {
  id: number
  name: string
  description?: string
  parent_id?: number
}

export interface TaskLog {
  id: string
  task_id: string
  start_time: string
  end_time: string
  notes?: string
}
