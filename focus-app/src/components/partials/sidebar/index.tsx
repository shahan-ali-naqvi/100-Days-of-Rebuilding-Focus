"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  CheckSquare, 
  TrendingUp,
  Settings,
  X,
  Kanban,
  Menu,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText
} from "lucide-react"
import { useDay } from "@/contexts/DayContext"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  onMenuToggle?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    implemented: true,
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: Kanban,
    implemented: true,
  },
  {
    name: "Finance",
    href: "/dashboard/finance",
    icon: DollarSign,
    implemented: true,
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
    implemented: true,
  },
  {
    name: "Goals",
    href: "/goals",
    icon: Target,
    implemented: false,
  },
  {
    name: "Habits",
    href: "/habits",
    icon: CheckSquare,
    implemented: false,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
    implemented: false,
  },
  {
    name: "Progress",
    href: "/progress",
    icon: TrendingUp,
    implemented: false,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    implemented: true,
  },
]

export function Sidebar({ isOpen = true, onClose, onMenuToggle, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { currentDay, getProgress } = useDay()

  const handleLogout = () => {
    // In a real app, you'd clear tokens/session here
    router.push("/auth/login")
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black/20 backdrop-blur-sm" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-card border-r transition-all duration-200 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        isCollapsed ? "lg:w-16" : "w-64"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b">
            {/* Mobile header with close button */}
            <div className="flex h-16 items-center justify-between px-6 lg:hidden">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <span className="text-lg font-semibold">Focus</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Desktop unified header section */}
            <div className="hidden lg:flex items-center justify-between px-6 py-4">
              {/* Left side: Focus branding with day counter */}
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                {!isCollapsed && (
                  <div>
                    <span className="text-lg font-semibold">Focus</span>
                    <p className="text-xs text-muted-foreground">Day {currentDay} of 100</p>
                  </div>
                )}
              </div>

              {/* Collapse toggle button */}
              {onToggleCollapse && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleCollapse}
                  className="h-8 w-8"
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              )}

              {/* Right side: User section */}
              {!isCollapsed && (
                <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="ghost" className="h-auto p-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="text-left hidden xl:block">
                        <p className="text-sm font-medium">User</p>
                        <p className="text-xs text-muted-foreground">demo@focus.com</p>
                      </div>
                    </div>
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content 
                    className="w-56 bg-white border border-gray-200 rounded-md shadow-lg p-1 z-50" 
                    align="end"
                    sideOffset={8}
                  >
                    <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none">
                      <User className="h-4 w-4" />
                      Profile
                    </DropdownMenu.Item>
                    
                    <DropdownMenu.Item 
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none"
                      onClick={() => router.push("/dashboard/settings")}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </DropdownMenu.Item>
                    
                    <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                    
                    <DropdownMenu.Item 
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer outline-none"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              
              if (!item.implemented) {
                return (
                  <div
                    key={item.name}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-not-allowed opacity-50",
                      "text-muted-foreground",
                      isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && item.name}
                  </div>
                )
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && item.name}
                </Link>
              )
            })}
            
            {/* Theme Toggle */}
            <div className="px-1">
              <ThemeToggle isCollapsed={isCollapsed} />
            </div>
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm font-medium mb-1">100 Days Challenge</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-muted rounded-full flex-1">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-300" 
                      style={{ width: `${getProgress()}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{getProgress()}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}