"use client"

import { useState } from "react"
import { Header } from "@/components/partials/header"
import { Sidebar } from "@/components/partials/sidebar"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="lg:pl-64">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}