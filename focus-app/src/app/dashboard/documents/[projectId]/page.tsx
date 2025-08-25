"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDocuments } from "@/contexts/DocumentsContext"
import { MarkdownEditor } from "@/components/documents/MarkdownEditor"
import { 
  ArrowLeft,
  Plus,
  Search,
  FileText,
  MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { 
    projects, 
    getProjectDocuments, 
    selectProject, 
    selectDocument, 
    selectedDocument,
    addDocument,
    updateDocument
  } = useDocuments()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreatingDocument, setIsCreatingDocument] = useState(false)
  const [newDocumentName, setNewDocumentName] = useState("")
  
  const projectId = params.projectId as string
  const project = useMemo(() => projects.find(p => p.id === projectId), [projects, projectId])
  const documents = useMemo(() => getProjectDocuments(projectId), [getProjectDocuments, projectId])

  useEffect(() => {
    if (project) {
      selectProject(project)
    } else {
      router.push("/dashboard/documents")
    }
  }, [project, selectProject, router])

  // Separate useEffect for auto-selecting first document
  useEffect(() => {
    if (project && !selectedDocument && documents.length > 0) {
      selectDocument(documents[0])
    }
  }, [project?.id, selectedDocument?.id, documents.length, selectDocument])

  const filteredDocuments = documents
    .filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime())

  const handleCreateDocument = () => {
    if (newDocumentName.trim()) {
      const newDoc = {
        name: newDocumentName.trim(),
        content: `# ${newDocumentName.trim()}\n\nStart writing your notes here...`,
        projectId: projectId
      }
      addDocument(newDoc)
      setNewDocumentName("")
      setIsCreatingDocument(false)
      // Auto-select the new document
      setTimeout(() => {
        const createdDoc = documents.find(d => d.name === newDoc.name)
        if (createdDoc) selectDocument(createdDoc)
      }, 100)
    }
  }

  const handleUpdateDocument = (content: string) => {
    if (selectedDocument) {
      updateDocument(selectedDocument.id, { content })
    }
  }

  const getProjectColor = (color: string) => {
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

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Project not found</p>
          <Link href="/dashboard/documents">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documents
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/20 flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/dashboard/documents">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className={cn("w-3 h-3 rounded-full", getProjectColor(project.color))} />
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold truncate">{project.name}</h1>
              <p className="text-xs text-muted-foreground truncate">{project.description}</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Create Document */}
          {isCreatingDocument ? (
            <div className="space-y-2">
              <Input
                placeholder="Document name..."
                value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateDocument()}
                className="text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleCreateDocument} disabled={!newDocumentName.trim()}>
                  Create
                </Button>
                <Button size="sm" variant="ghost" onClick={() => {
                  setIsCreatingDocument(false)
                  setNewDocumentName("")
                }}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              size="sm" 
              className="w-full" 
              onClick={() => setIsCreatingDocument(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          )}
        </div>

        {/* Documents List */}
        <div className="flex-1 overflow-y-auto">
          {filteredDocuments.length === 0 ? (
            <div className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? "No notes found" : "No notes yet"}
              </p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {filteredDocuments.map((document) => (
                <div 
                  key={document.id}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent",
                    selectedDocument?.id === document.id && "bg-accent"
                  )}
                  onClick={() => selectDocument(document)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-sm truncate flex-1" title={document.name}>
                      {document.name}
                    </h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(document.dateModified).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {document.content.replace(/[#*`>-]/g, '').slice(0, 60)}...
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {selectedDocument ? (
          <MarkdownEditor
            content={selectedDocument.content}
            onChange={handleUpdateDocument}
            onSave={handleUpdateDocument}
            title={selectedDocument.name}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Select a note to start editing</h3>
              <p className="text-muted-foreground mb-6">
                Choose a note from the sidebar or create a new one
              </p>
              <Button onClick={() => setIsCreatingDocument(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Note
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}