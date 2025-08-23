"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskCard } from "./TaskCard"
import { Task, Column, useTask } from "@/contexts/TaskContext"
import { cn } from "@/lib/utils"

interface TaskColumnProps {
  column: Column
  tasks: Task[]
  onAddTask: () => void
  onEditTask: (task: Task) => void
}

const columnColors = {
  "todo": "border-slate-200 bg-slate-50/50",
  "in-progress": "border-blue-200 bg-blue-50/50", 
  "review": "border-yellow-200 bg-yellow-50/50",
  "done": "border-green-200 bg-green-50/50"
}

const columnHeaderColors = {
  "todo": "text-slate-700",
  "in-progress": "text-blue-700",
  "review": "text-yellow-700", 
  "done": "text-green-700"
}

export function TaskColumn({ column, tasks, onAddTask, onEditTask }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.id}`,
  })

  // Sort tasks based on their position in the column's taskIds array
  const sortedTasks = [...tasks].sort((a, b) => {
    const aIndex = column.taskIds.indexOf(a.id)
    const bIndex = column.taskIds.indexOf(b.id)
    return aIndex - bIndex
  })

  return (
    <Card 
      ref={setNodeRef}
      className={cn(
        "h-full flex flex-col transition-colors",
        columnColors[column.id as keyof typeof columnColors] || "border-gray-200 bg-gray-50/50",
        isOver && "ring-2 ring-primary/50"
      )}
    >
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle 
            className={cn(
              "text-sm font-medium",
              columnHeaderColors[column.id as keyof typeof columnHeaderColors] || "text-gray-700"
            )}
          >
            {column.title}
            <span className="ml-2 text-xs font-normal opacity-70">
              ({sortedTasks.length})
            </span>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onAddTask}
            className="h-6 w-6 p-0 hover:bg-white/80"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto pt-0">
        <div className="space-y-2 min-h-[300px]">
          <SortableContext 
            items={sortedTasks.map(task => task.id)} 
            strategy={verticalListSortingStrategy}
          >
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
              />
            ))}
          </SortableContext>
          
          {sortedTasks.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <span className={cn(
                "text-sm font-medium opacity-40",
                columnHeaderColors[column.id as keyof typeof columnHeaderColors] || "text-gray-700"
              )}>
                Empty
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}