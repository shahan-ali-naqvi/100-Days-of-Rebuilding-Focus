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
  X
} from "lucide-react"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
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
    href: "/settings",
    icon: Settings,
    implemented: false,
  },
]

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

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
        "fixed left-0 top-0 z-50 h-screen w-64 bg-card border-r transition-transform duration-200 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
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
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
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
                      "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
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
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm font-medium mb-1">100 Days Challenge</p>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-muted rounded-full flex-1">
                  <div className="h-2 bg-primary rounded-full w-[1%]" />
                </div>
                <span className="text-xs text-muted-foreground">1%</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}