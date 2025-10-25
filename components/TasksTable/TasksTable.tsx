import { AddTaskForm } from '@/components/AddTaskForm'
import MainTaskTimer from '@/components/MainTaskTimer'
import TaskRow from '@/components/TasksTable/TaskRow'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useUserData from '@/hooks/userData'
import { supabase, Task } from '@/lib/supabase'
import _ from 'lodash'
import { useEffect, useState } from 'react'

const TasksTable = () => {
  const { userData, setActiveTask } = useUserData()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)

    try {
      const { data, error } = await supabase.from('tasks').select('*').order('id', { ascending: false })

      if (error) {
        throw error
      }

      setTasks(data || [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }
  const deleteTask = async (taskId: number) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId)

      if (error) {
        throw error
      }

      // Refresh the tasks list
      fetchTasks()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete task')
    }
  }

  if (loading) {
    return (
      <div className='container mx-auto py-8'>
        <h1 className='text-3xl font-bold mb-6'>Task List</h1>
        <div className='flex justify-center items-center h-64'>
          <div className='text-lg'>Loading tasks...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto py-8'>
        <h1 className='text-3xl font-bold mb-6'>Task List</h1>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          <strong>Error:</strong> {error}
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto py-8'>
      <MainTaskTimer
        {...{
          activeTaskId: userData?.active_task,
          timerStarted: userData?.timer_started,
        }}
      />
      <h1 className='text-3xl font-bold mb-6'>Task List</h1>
      <p className='mb-6'>Manage your tasks and track their progress.</p>

      <div className='flex justify-between items-center mb-4'>
        <AddTaskForm onTaskAdded={fetchTasks} />
        <Card>
          <CardContent>
            <div className='text-sm text-gray-600'>
              Total Tasks: <span className='font-medium'>{tasks.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableCaption>
          {tasks.length > 0
            ? `A list of ${tasks.length} tasks from your database`
            : 'No tasks found. Create your first task!'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Estimated Duration</TableHead>
            <TableHead>Actual Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className='text-center py-8 text-gray-500'>
                No tasks found. Start by creating your first task!
              </TableCell>
            </TableRow>
          ) : (
            _.map(tasks, task => (
              <TaskRow
                key={task.id}
                {...{
                  task,
                  onClick: setActiveTask,
                  onDelete: deleteTask,
                }}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TasksTable
