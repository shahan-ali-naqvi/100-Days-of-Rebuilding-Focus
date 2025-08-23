"use client"

import { useState } from "react"
import { Sidebar } from "@/components/partials/sidebar"
import { DayProvider } from "@/contexts/DayContext"
import { TaskProvider } from "@/contexts/TaskContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DayProvider>
      <TaskProvider>
        <div className="flex h-screen bg-background">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            onMenuToggle={() => setSidebarOpen(true)}
          />
          
          <main className="flex-1 overflow-y-auto lg:ml-64">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-40">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 h-full">
              {children}
            </div>
          </main>
        </div>
      </TaskProvider>
    </DayProvider>
  )
}