import moment from 'moment'

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

const formatDate = (dateString: string) => moment(dateString).format('MMM DD, YYYY')

export { formatDate, getPriorityBadgeClass }
