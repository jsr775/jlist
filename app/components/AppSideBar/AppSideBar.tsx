import ListsGroup from '@/app/components/AppSideBar/ListsGroup'
import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { Collapsible } from '@radix-ui/react-collapsible'

const AppSideBar = () => (
  <Sidebar>
    <SidebarContent>
      <Collapsible defaultOpen className='group/collapsible'>
        <ListsGroup />
      </Collapsible>
    </SidebarContent>
  </Sidebar>
)

export default AppSideBar
