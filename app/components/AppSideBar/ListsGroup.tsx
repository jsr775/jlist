import { Button } from '@/components/ui/button'
import { CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'
import { FaChevronDown, FaPlus } from 'react-icons/fa'

const ListsGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Task Lists
            <FaChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <Button variant='ghost' className='w-full justify-start'>
              Add New List <FaPlus />
            </Button>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </SidebarGroup>
  )
}

export default ListsGroup
