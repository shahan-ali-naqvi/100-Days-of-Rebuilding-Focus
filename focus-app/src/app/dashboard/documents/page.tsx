"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useDocuments } from "@/contexts/DocumentsContext"
import { 
  Plus, 
  Search, 
  FileText, 
  Calendar, 
  FolderOpen,
  MoreHorizontal,
  Archive,
  Trash2,
  Edit
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function DocumentsPage() {
  const { projects, selectProject } = useDocuments()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground">
            Organize your project notes and documentation
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Compact Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.filter(p => p.status === "active").map((project) => (
          <Card key={project.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={cn("w-3 h-3 rounded-full flex-shrink-0", getProjectColor(project.color))} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{project.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{project.documentCount} docs</span>
                      <span>{new Date(project.dateModified).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Link 
                  href={`/dashboard/documents/${project.id}`}
                  onClick={() => selectProject(project)}
                >
                  <Button variant="ghost" size="sm">
                    <FolderOpen className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold">{projects.filter(p => p.status === "active").length}</p>
            <p className="text-xs text-muted-foreground">Active Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold">{projects.reduce((sum, p) => sum + p.documentCount, 0)}</p>
            <p className="text-xs text-muted-foreground">Total Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold">
              {projects.filter(p => {
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return new Date(p.dateModified) > weekAgo
              }).length}
            </p>
            <p className="text-xs text-muted-foreground">Recent Updates</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <CreateProjectModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  )

  function getProjectColor(color: string) {
    switch (color) {
      case "blue": return "bg-blue-500"
      case "green": return "bg-green-500"
      case "purple": return "bg-purple-500"
      case "orange": return "bg-orange-500"
      case "red": return "bg-red-500"
      case "yellow": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }
}

function CreateProjectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addProject } = useDocuments()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "blue",
    status: "active" as const
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      addProject(formData)
      onClose()
      setFormData({ name: "", description: "", color: "blue", status: "active" })
    }
  }

  if (!isOpen) return null

  const colors = [
    { name: "blue", class: "bg-blue-500" },
    { name: "green", class: "bg-green-500" },
    { name: "purple", class: "bg-purple-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "red", class: "bg-red-500" },
    { name: "yellow", class: "bg-yellow-500" }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Project Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter project name"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter project description"
                className="w-full p-3 border border-input bg-background rounded-md resize-none h-20"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Project Color</label>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color: color.name }))}
                    className={cn(
                      "w-8 h-8 rounded-full border-2",
                      color.class,
                      formData.color === color.name ? "border-foreground" : "border-transparent"
                    )}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Create Project
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}