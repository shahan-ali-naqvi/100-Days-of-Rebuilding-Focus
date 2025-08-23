"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface DayContextType {
  currentDay: number
  updateDay: (day: number) => void
  incrementDay: () => void
  decrementDay: () => void
  getProgress: () => number
}

const DayContext = createContext<DayContextType | undefined>(undefined)

export function DayProvider({ children }: { children: ReactNode }) {
  const [currentDay, setCurrentDay] = useState(2) // Default to day 2

  useEffect(() => {
    // Load day from localStorage on mount
    const savedDay = localStorage.getItem("focusAppCurrentDay")
    if (savedDay) {
      setCurrentDay(parseInt(savedDay))
    }

    // Listen for day updates from other components
    const handleDayUpdate = (event: CustomEvent) => {
      setCurrentDay(event.detail.day)
    }

    window.addEventListener("dayUpdated", handleDayUpdate as EventListener)
    
    return () => {
      window.removeEventListener("dayUpdated", handleDayUpdate as EventListener)
    }
  }, [])

  const updateDay = (day: number) => {
    if (day >= 1 && day <= 100) {
      setCurrentDay(day)
      localStorage.setItem("focusAppCurrentDay", day.toString())
      window.dispatchEvent(new CustomEvent("dayUpdated", { detail: { day } }))
    }
  }

  const incrementDay = () => {
    if (currentDay < 100) {
      updateDay(currentDay + 1)
    }
  }

  const decrementDay = () => {
    if (currentDay > 1) {
      updateDay(currentDay - 1)
    }
  }

  const getProgress = () => {
    return Math.round((currentDay / 100) * 100)
  }

  return (
    <DayContext.Provider value={{
      currentDay,
      updateDay,
      incrementDay,
      decrementDay,
      getProgress
    }}>
      {children}
    </DayContext.Provider>
  )
}

export function useDay() {
  const context = useContext(DayContext)
  if (context === undefined) {
    throw new Error("useDay must be used within a DayProvider")
  }
  return context
}