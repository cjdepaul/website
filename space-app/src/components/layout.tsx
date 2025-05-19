import { SidebarProvider} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full pr-4">
        <Header />
        <div className="flex flex-1 pt-16">
          <AppSidebar />
          <main className="flex-1 pl-5">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}