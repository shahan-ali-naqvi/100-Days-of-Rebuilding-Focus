"use client"

import { useState } from "react"
import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useTask } from "@/contexts/TaskContext"
import { TaskColumn } from "@/components/tasks/TaskColumn"
import { TaskModal } from "@/components/tasks/TaskModal"
import { Task } from "@/contexts/TaskContext"

export default function TasksPage() {
  const { columns, tasks, moveTask, reorderTask } = useTask()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [activeColumn, setActiveColumn] = useState<string>("todo")

  const handleDragStart = (event: DragStartEvent) => {
    // Optional: Add visual feedback when dragging starts
  }

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over different columns
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the active task
    const activeTask = tasks.find(t => t.id === activeId)
    if (!activeTask) return

    // If dragging over a column drop zone
    if (overId.startsWith("column-")) {
      const columnId = overId.replace("column-", "")
      if (activeTask.columnId !== columnId) {
        // Move to end of column
        moveTask(activeId, activeTask.columnId, columnId, 0)
      }
      return
    }

    // If dragging over another task
    const overTask = tasks.find(t => t.id === overId)
    if (!overTask) return

    // If tasks are in different columns
    if (activeTask.columnId !== overTask.columnId) {
      const overColumn = columns.find(col => col.id === overTask.columnId)
      const overIndex = overColumn?.taskIds.indexOf(overId) ?? 0
      moveTask(activeId, activeTask.columnId, overTask.columnId, overIndex)
    } else {
      // If tasks are in the same column, reorder
      const column = columns.find(col => col.id === activeTask.columnId)
      if (column) {
        const activeIndex = column.taskIds.indexOf(activeId)
        const overIndex = column.taskIds.indexOf(overId)
        if (activeIndex !== overIndex) {
          reorderTask(activeTask.columnId, activeIndex, overIndex)
        }
      }
    }
  }

  const openNewTaskModal = (columnId: string) => {
    setActiveColumn(columnId)
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const openEditTaskModal = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 h-full overflow-x-auto pb-4">
            {columns.map((column) => (
              <div key={column.id} className="flex-shrink-0 w-80">
                <TaskColumn
                  column={column}
                  tasks={tasks.filter(task => task.columnId === column.id)}
                  onAddTask={() => openNewTaskModal(column.id)}
                  onEditTask={openEditTaskModal}
                />
              </div>
            ))}
          </div>
        </DndContext>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={selectedTask}
        defaultColumnId={activeColumn}
      />
    </div>
  )
}