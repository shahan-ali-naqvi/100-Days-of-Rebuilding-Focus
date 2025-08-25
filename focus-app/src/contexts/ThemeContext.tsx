"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    
    const updateTheme = () => {
      let resolved: "light" | "dark" = "light"
      
      if (theme === "dark") {
        resolved = "dark"
      } else if (theme === "light") {
        resolved = "light"
      } else {
        resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }
      
      setResolvedTheme(resolved)
      root.classList.toggle("dark", resolved === "dark")
      localStorage.setItem("theme", theme)
    }

    updateTheme()

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQuery.addEventListener("change", updateTheme)
      return () => mediaQuery.removeEventListener("change", updateTheme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}