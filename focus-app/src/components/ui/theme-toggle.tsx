"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

interface ThemeToggleProps {
  isCollapsed?: boolean
}

export function ThemeToggle({ isCollapsed }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const getIcon = () => {
    if (resolvedTheme === "dark") {
      return <Moon className="h-4 w-4" />
    }
    return <Sun className="h-4 w-4" />
  }

  if (isCollapsed) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9"
            title="Toggle theme"
          >
            {getIcon()}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content 
            className="w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-1 z-50" 
            align="start"
            side="right"
            sideOffset={8}
          >
            <DropdownMenu.Item 
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer outline-none"
              onClick={() => setTheme("light")}
            >
              <Sun className="h-4 w-4" />
              Light
            </DropdownMenu.Item>
            <DropdownMenu.Item 
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer outline-none"
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-4 w-4" />
              Dark
            </DropdownMenu.Item>
            <DropdownMenu.Item 
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer outline-none"
              onClick={() => setTheme("system")}
            >
              <Monitor className="h-4 w-4" />
              System
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent">
          {getIcon()}
          <span>
            {theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"}
          </span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className="w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-1 z-50" 
          align="start"
          sideOffset={8}
        >
          <DropdownMenu.Item 
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer outline-none"
            onClick={() => setTheme("light")}
          >
            <Sun className="h-4 w-4" />
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer outline-none"
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-4 w-4" />
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer outline-none"
            onClick={() => setTheme("system")}
          >
            <Monitor className="h-4 w-4" />
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}