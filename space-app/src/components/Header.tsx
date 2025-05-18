import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export function Header () {
  const { open: isOpen } = useSidebar();
  
  return (
    <header className={`h-16 flex items-center justify-between px-4 bg-sidebar text-white fixed top-0 right-0 z-50 duration-250 ${isOpen ? 'left-64' : 'left-0'}`}>
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>
    </header>
  );
}