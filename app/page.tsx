'use client'

import TasksTable from '@/components/TasksTable'
import Timer from '@/components/Timer'
import moment from 'moment'
import { useMemo } from 'react'

const HomePage = () => {
  return (
    <div>
      <Timer />
      <TasksTable />
    </div>
  )
}

export default HomePage