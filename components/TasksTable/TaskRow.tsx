import {
  formatDate,
  getPriorityBadgeClass,
} from '@/components/TasksTable/utils'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { TableCell, TableRow } from '@/components/ui/table'
import { Task } from '@/lib/supabase'
import { FaTrash } from 'react-icons/fa'

interface TaskRowProps {
  task: Task
  onClick: (taskId: number) => void
  onDelete: (taskId: number) => void
}

const TaskRow = ({ task, onClick, onDelete }: TaskRowProps) => {
  return (
    <TableRow key={task.id} onClick={() => onClick(task.id)}>
      <TableCell className='font-medium'>{task.title}</TableCell>
      <TableCell className='max-w-xs truncate'>
        {task.description || '-'}
      </TableCell>
      <TableCell>
        {task.status
          ? task.status.charAt(0).toUpperCase() + task.status.slice(1)
          : 'Unknown'}
      </TableCell>
      <TableCell>
        <span className={getPriorityBadgeClass(task.priority)}>
          {task.priority
            ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
            : 'None'}
        </span>
      </TableCell>
      <TableCell>
        {task.start_date ? formatDate(task.start_date) : '-'} -{' '}
        {task.end_date ? formatDate(task.end_date) : '-'}
      </TableCell>
      <TableCell>{task.due_date ? formatDate(task.due_date) : '-'}</TableCell>
      <TableCell>
        {task.estimated_duration !== null
          ? `${task.estimated_duration} mins`
          : '-'}
      </TableCell>
      <TableCell>
        {task.actual_duration !== null ? `${task.actual_duration} mins` : '-'}
      </TableCell>
      <TableCell>
        <ButtonGroup>
          <Button
            variant='destructive'
            size='sm'
            onClick={() => onDelete(task.id)}
          >
            <FaTrash className='w-4 h-4' />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  )
}

export default TaskRow
