"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Target, LogOut, Menu } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { data: session } = useSession()

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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="w-56 bg-card border rounded-md shadow-md p-1" align="end">
                <DropdownMenu.Label className="px-2 py-1.5 text-sm font-medium">
                  {session?.user?.name || 'User'}
                </DropdownMenu.Label>
                <DropdownMenu.Separator className="h-px bg-border mx-1" />
                <DropdownMenu.Item
                  className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded"
                  onClick={() => signOut()}
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