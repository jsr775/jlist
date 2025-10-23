'use client'

import TasksTable from '@/components/TasksTable'
import Timer from '@/components/Timer'

const HomePage = () => {
  return (
    <div>
      <Timer />
      <TasksTable />
    </div>
  )
}

export default HomePage