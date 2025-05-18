import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SatelliteIcon, SunIcon, RocketIcon, CalendarDaysIcon, HouseIcon, HeartIcon } from "lucide-react"
import spaceLogo from "@/assets/spacelogo.svg"
 
const sidebarItems = [
  {
    name: "Home",
    url: "/",
    icon: <HouseIcon />,
  },
  {
    name: "Celestial Calendar",
    url: "/celestial-calendar",
    icon: <CalendarDaysIcon />,
  },
  {
    name: "Satellites",
    url: "/satellites",
    icon: <SatelliteIcon />,
  },
  {
    name: "Space Launches",
    url: "/space-launches",
    icon: <RocketIcon />,
  },
  {
    name: "Space Weather",
    url: "/space-weather",
    icon: <SunIcon />,
  },
  {
    name: "Ellen",
    url: "/ellen",
    icon: <HeartIcon />,
  },
]


export function AppSidebar() {
  return (
<Sidebar>
      <div className="flex items-center justify-left p-4 pb-0">
        <img
          src={spaceLogo}
          alt="Space App Logo"
          className="w-[50px] h-[50px]"
        />
      </div>
      <SidebarContent>
        <SidebarGroup className="pt-0">
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}