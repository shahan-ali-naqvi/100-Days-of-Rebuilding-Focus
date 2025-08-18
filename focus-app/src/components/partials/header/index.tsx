"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Target, Menu, Settings, LogOut, User } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you'd clear tokens/session here
    router.push("/auth/login")
  }

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Focus</h1>
              <p className="text-xs text-muted-foreground">Day 1 of 100</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" disabled className="cursor-not-allowed opacity-50">
            <Settings className="h-5 w-5" />
          </Button>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                className="w-56 bg-white border border-gray-200 rounded-md shadow-lg p-1 z-50" 
                align="end"
                sideOffset={8}
              >
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">User</p>
                  <p className="text-xs text-gray-500">demo@focus.com</p>
                </div>
                
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenu.Item>
                
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 rounded cursor-not-allowed opacity-50">
                  <Settings className="h-4 w-4" />
                  Settings
                </div>
                
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
        </div>
      </div>
    </header>
  )
}