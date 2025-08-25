"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { 
  Eye, 
  Edit3, 
  Save,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Quote
} from "lucide-react"

interface MarkdownEditorProps {
  content: string
  onChange: (content: string) => void
  onSave: (content: string) => void
  onCancel?: () => void
  readOnly?: boolean
  title?: string
}

const renderMarkdown = (text: string): string => {
  if (!text || text.trim() === '') {
    return `<div class="text-muted-foreground italic">No content yet. Switch to Edit mode to start writing.</div>`
  }
  
  // Split into lines and process each line
  const lines = text.split('\n')
  const processedLines = lines.map(line => {
    // Headers
    if (line.startsWith('# ')) {
      return `<h1 class="text-2xl font-bold mb-4 mt-6 first:mt-0">${line.substring(2).trim()}</h1>`
    }
    if (line.startsWith('## ')) {
      return `<h2 class="text-xl font-semibold mb-3 mt-5">${line.substring(3).trim()}</h2>`
    }
    if (line.startsWith('### ')) {
      return `<h3 class="text-lg font-medium mb-2 mt-4">${line.substring(4).trim()}</h3>`
    }
    
    // Blockquotes
    if (line.startsWith('> ')) {
      return `<blockquote class="border-l-4 border-muted-foreground pl-4 italic text-muted-foreground my-4">${line.substring(2).trim()}</blockquote>`
    }
    
    // Lists
    if (line.startsWith('- ')) {
      return `<li class="ml-4 mb-1">• ${line.substring(2).trim()}</li>`
    }
    if (/^\d+\. /.test(line)) {
      const match = line.match(/^\d+\. (.*)/)
      return `<li class="ml-4 mb-1 list-decimal">${match ? match[1].trim() : line}</li>`
    }
    
    // Empty lines
    if (line.trim() === '') {
      return '<div class="mb-2"></div>'
    }
    
    // Regular paragraphs with inline formatting
    let processedLine = line.trim()
    
    // Bold text
    processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    
    // Italic text  
    processedLine = processedLine.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Inline code
    processedLine = processedLine.replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    
    // Links
    processedLine = processedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
    
    return `<p class="mb-3 leading-relaxed">${processedLine}</p>`
  })
  
  return processedLines.join('')
}

export function MarkdownEditor({ 
  content, 
  onChange, 
  onSave, 
  onCancel, 
  readOnly = false,
  title 
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<"edit" | "preview">("preview")
  const [localContent, setLocalContent] = useState(content)
  const [hasChanges, setHasChanges] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const [renderedContent, setRenderedContent] = useState(() => {
    // Initialize with rendered content to prevent empty preview flash
    return renderMarkdown(content)
  })

  // Update rendered content when localContent changes
  useEffect(() => {
    setRenderedContent(renderMarkdown(localContent))
  }, [localContent])

  // Update preview DOM when mode changes to preview or rendered content changes
  useEffect(() => {
    if (mode === 'preview' && previewRef.current) {
      previewRef.current.innerHTML = renderedContent
    }
  }, [mode, renderedContent])

  useEffect(() => {
    setLocalContent(content)
    setHasChanges(false)
    // Update rendered content immediately when content prop changes
    setRenderedContent(renderMarkdown(content))
  }, [content])

  useEffect(() => {
    setHasChanges(localContent !== content)
  }, [localContent, content])

  const handleSave = () => {
    onChange(localContent)
    onSave(localContent)
    setHasChanges(false)
  }

  const handleCancel = () => {
    setLocalContent(content)
    setHasChanges(false)
    onCancel?.()
  }

  const insertMarkdown = (prefix: string, suffix: string = "", placeholder: string = "") => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = localContent.substring(start, end)
    const replacementText = selectedText || placeholder
    
    const newContent = 
      localContent.substring(0, start) + 
      prefix + replacementText + suffix + 
      localContent.substring(end)
    
    setLocalContent(newContent)
    
    // Focus back to textarea and set cursor position
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + prefix.length + replacementText.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="border-b p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!readOnly && (
            <>
              <div className="flex border rounded-md">
                <Button
                  type="button"
                  variant={mode === "edit" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("edit")}
                  className="rounded-r-none"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant={mode === "preview" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("preview")}
                  className="rounded-l-none"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>
              
              {mode === "edit" && (
                <div className="flex items-center gap-1 border-l pl-3">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => insertMarkdown("**", "**", "bold text")}
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => insertMarkdown("*", "*", "italic text")}
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => insertMarkdown("\n- ", "", "list item")}
                    title="Bullet List"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => insertMarkdown("\n1. ", "", "list item")}
                    title="Numbered List"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => insertMarkdown("[", "](url)", "link text")}
                    title="Link"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => insertMarkdown("`", "`", "code")}
                    title="Code"
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => insertMarkdown("\n> ", "", "quote")}
                    title="Quote"
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {title && (
            <span className="text-sm text-muted-foreground">
              {title}
            </span>
          )}
          {!readOnly && hasChanges && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Unsaved changes</span>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="flex-1 overflow-hidden">
        {mode === "edit" ? (
          <textarea
            key="editor"
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
            className="w-full h-full resize-none border-none outline-none p-4 bg-background font-mono text-sm leading-relaxed"
            placeholder="Start writing your markdown content..."
            disabled={readOnly}
          />
        ) : (
          <div key="preview" className="h-full overflow-y-auto p-4">
            <div 
              ref={previewRef}
              className="prose prose-sm max-w-none dark:prose-invert min-h-full"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>
            {localContent.split('\n').length} lines • {localContent.length} characters
          </span>
          <span>
            Markdown supported
          </span>
        </div>
      </div>
    </div>
  )
}