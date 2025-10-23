-- Create the tasks table if it doesn't exist
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  due_date DATE,
  assigned_to TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users (adjust as needed)
CREATE POLICY "Users can manage tasks" ON tasks
  FOR ALL USING (true);

-- Add some sample data (optional)
INSERT INTO tasks (title, description, completed, priority, due_date) VALUES
  ('Setup Supabase integration', 'Configure Supabase client and environment variables', true, 'high', '2025-10-20'),
  ('Create task management UI', 'Build the task table and form components', false, 'high', '2025-10-25'),
  ('Add user authentication', 'Implement login and signup functionality', false, 'medium', '2025-10-30'),
  ('Deploy to production', 'Set up deployment pipeline and hosting', false, 'low', '2025-11-05'),
  ('Write documentation', 'Create user guide and API documentation', false, 'low', '2025-11-10');