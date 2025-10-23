'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface AddTaskFormProps {
  onTaskAdded: () => void
}

export const AddTaskForm = ({ onTaskAdded }: AddTaskFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('tasks')
        .insert([
          {
            title: title.trim(),
            description: description.trim() || null,
            priority,
            due_date: dueDate || null
          }
        ])

      if (error) throw error

      // Reset form
      setTitle('')
      setDescription('')
      setPriority('medium')
      setDueDate('')
      
      // Notify parent to refresh tasks
      onTaskAdded()
    } catch (err: any) {
      console.error('Error adding task:', err.message)
      alert('Failed to add task: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-8 p-6 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title *
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || !title.trim()}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </Button>
      </form>
    </div>
  )
}