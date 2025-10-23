import { supabase, Task } from "@/lib/supabase"
import { useEffect, useState } from "react"
import moment from "moment"
import { FaPause, FaPlay, FaTrash } from "react-icons/fa"
import { AddTaskForm } from "./AddTaskForm"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ButtonGroup } from "./ui/button-group"
import { Button } from "./ui/button"
import _ from "lodash"

const TasksTable = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false })

      if (error) {
        throw error
      }

      setTasks(data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => moment(dateString).format('MMM DD, YYYY')

  const toggleTaskTimer = async (taskId: string) => {
    try {
      const task = _.find(tasks, { id: taskId })
      if (!task) return

      const newIsTiming = !task.is_timing

      const { error } = await supabase
        .from('tasks')
        .update({ is_timing: newIsTiming })
        .eq('id', taskId)

      if (error) {
        throw error
      }

      // Refresh the tasks list
      fetchTasks()
    } catch (err: any) {
      setError(err.message || 'Failed to toggle task timer')
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)

      if (error) {
        throw error
      }

      // Refresh the tasks list
      fetchTasks()
    } catch (err: any) {
      setError(err.message || 'Failed to delete task')
    }
  }

  const getPriorityBadgeClass = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs'
      case 'low':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs'
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Task List</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading tasks...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Task List</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Task List</h1>
      <p className="mb-6">Manage your tasks and track their progress.</p>
      
      <AddTaskForm onTaskAdded={fetchTasks} />
      
      <Table>
        <TableCaption>
          {tasks.length > 0 
            ? `A list of ${tasks.length} tasks from your database`
            : 'No tasks found. Create your first task!'
          }
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No tasks found. Start by creating your first task!
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {task.description || '-'}
                </TableCell>
                <TableCell>
                  <span className={getPriorityBadgeClass(task.priority)}>
                    {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'None'}
                  </span>
                </TableCell>
                <TableCell>
                  {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'None'}
                </TableCell>
                <TableCell>
                  {task.start_date ? formatDate(task.start_date) : '-'} - {task.end_date ? formatDate(task.end_date) : '-'}
                </TableCell>
                <TableCell>
                  {task.due_date ? formatDate(task.due_date) : '-'}
                </TableCell>
                <TableCell>
                  {task.duration !== null ? `${task.duration} mins` : '-'}
                </TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                    >
                      <FaTrash className="w-4 h-4" />
                    </Button>
                    {/* Button to toggle timer */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleTaskTimer(task.id)}
                    >
                      {task.is_timing ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TasksTable