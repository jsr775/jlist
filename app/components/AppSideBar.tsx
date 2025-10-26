import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { FaChevronDown, FaPlus } from 'react-icons/fa'

const AppSideBar = () => (
  <Sidebar>
    <SidebarContent>
      <Collapsible defaultOpen className='group/collapsible'>
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
      </Collapsible>
    </SidebarContent>
  </Sidebar>
)

export default AppSideBar
