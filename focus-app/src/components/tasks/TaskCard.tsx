"use client"

import { useRef, useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, CheckSquare } from "lucide-react"
import { Task, Priority } from "@/contexts/TaskContext"

const priorityColors = {
  low: "bg-green-400",
  medium: "bg-blue-400", 
  high: "bg-orange-400",
  critical: "bg-red-500"
}

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const [isDragStarted, setIsDragStarted] = useState(false)
  const dragStartTime = useRef<number>(0)
  const mouseDownPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const completedChecklist = task.checklist.filter(item => item.completed).length
  const totalChecklist = task.checklist.length

  const isOverdue = task.deadline && new Date(task.deadline) < new Date()

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartTime.current = Date.now()
    mouseDownPos.current = { x: e.clientX, y: e.clientY }
    setIsDragStarted(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const timeSinceDown = Date.now() - dragStartTime.current
    const distance = Math.sqrt(
      Math.pow(e.clientX - mouseDownPos.current.x, 2) + 
      Math.pow(e.clientY - mouseDownPos.current.y, 2)
    )
    
    // If moved more than 5px or held for more than 150ms, consider it a drag
    if (distance > 5 || timeSinceDown > 150) {
      setIsDragStarted(true)
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    const timeSinceDown = Date.now() - dragStartTime.current
    const distance = Math.sqrt(
      Math.pow(e.clientX - mouseDownPos.current.x, 2) + 
      Math.pow(e.clientY - mouseDownPos.current.y, 2)
    )
    
    // If it was a quick click with minimal movement, open the card
    if (!isDragStarted && timeSinceDown < 200 && distance < 5) {
      e.preventDefault()
      e.stopPropagation()
      onEdit(task)
    }
    
    setIsDragStarted(false)
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`group cursor-pointer transition-all duration-200 hover:shadow-md ${
        isDragging ? "opacity-50 rotate-3 shadow-lg cursor-grabbing" : ""
      } ${isOverdue ? "border-red-200 bg-red-50/50" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-xs line-clamp-2 flex-1 pr-2 text-blue-600 hover:text-blue-800">
            {task.title}
          </h3>
          
          {/* Right side: Priority Bar + Members */}
          <div className="flex items-center gap-1.5">
            {/* Priority Color Bar */}
            <div className={`w-4 h-1 rounded-full ${priorityColors[task.priority]}`} />

            {/* Responsible Members - Top Right Most */}
            {task.responsibleMembers.length > 0 && (
              <div className="flex -space-x-0.5">
                {task.responsibleMembers.slice(0, 2).map((member, index) => (
                  <Avatar key={index} className="h-4 w-4 border border-white">
                    <AvatarFallback className="text-xs">
                      {member.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {task.responsibleMembers.length > 2 && (
                  <div className="h-4 w-4 rounded-full bg-muted border border-white flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      +{task.responsibleMembers.length - 2}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Bottom row - Checklist and Date side by side */}
      {(totalChecklist > 0 || task.deadline) && (
        <CardContent className="pt-0 px-3 pb-3">
          <div className="flex items-center justify-between text-xs">
            {/* Checklist Progress */}
            {totalChecklist > 0 ? (
              <div className="flex items-center gap-1.5">
                <CheckSquare className="h-2.5 w-2.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {completedChecklist}/{totalChecklist}
                </span>
                <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ) : <div />}

            {/* Deadline */}
            {task.deadline && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-2.5 w-2.5 text-muted-foreground" />
                <span className={`${isOverdue ? "text-red-600 font-medium" : "text-muted-foreground"}`}>
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
                {isOverdue && (
                  <Badge variant="destructive" className="text-xs px-1 py-0 h-4">
                    Overdue
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}