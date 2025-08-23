"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

export type Priority = "low" | "medium" | "high" | "critical"

export interface Task {
  id: string
  title: string
  description: string
  checklist: ChecklistItem[]
  deadline?: string
  responsibleMembers: string[]
  priority: Priority
  columnId: string
  createdAt: string
  updatedAt: string
}

export interface Column {
  id: string
  title: string
  taskIds: string[]
}

interface TaskContextType {
  tasks: Task[]
  columns: Column[]
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  deleteTask: (taskId: string) => void
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => void
  reorderTask: (columnId: string, fromIndex: number, toIndex: number) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const defaultColumns: Column[] = [
  { id: "todo", title: "To Do", taskIds: [] },
  { id: "in-progress", title: "In Progress", taskIds: [] },
  { id: "review", title: "Review", taskIds: [] },
  { id: "done", title: "Done", taskIds: [] }
]

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [columns, setColumns] = useState<Column[]>(defaultColumns)

  useEffect(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem("focusAppTasks")
      const savedColumns = localStorage.getItem("focusAppColumns")
      
      if (savedTasks) {
        try {
          setTasks(JSON.parse(savedTasks))
        } catch (error) {
          console.error("Error parsing saved tasks:", error)
        }
      }
      
      if (savedColumns) {
        try {
          setColumns(JSON.parse(savedColumns))
        } catch (error) {
          console.error("Error parsing saved columns:", error)
        }
      }
    }
  }, [])

  useEffect(() => {
    // Save to localStorage whenever tasks change
    if (typeof window !== 'undefined') {
      localStorage.setItem("focusAppTasks", JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {
    // Save to localStorage whenever columns change
    if (typeof window !== 'undefined') {
      localStorage.setItem("focusAppColumns", JSON.stringify(columns))
    }
  }, [columns])

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      priority: taskData.priority || "medium", // Default to medium priority
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setTasks(prev => [...prev, newTask])
    
    // Add task to the specified column
    setColumns(prev => prev.map(col => 
      col.id === taskData.columnId 
        ? { ...col, taskIds: [...col.taskIds, newTask.id] }
        : col
    ))
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ))
  }

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
    
    // Remove task from all columns
    setColumns(prev => prev.map(col => ({
      ...col,
      taskIds: col.taskIds.filter(id => id !== taskId)
    })))
  }

  const moveTask = (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => {
    // Update task's columnId
    updateTask(taskId, { columnId: toColumnId })
    
    setColumns(prev => {
      const newColumns = [...prev]
      
      // Remove from source column
      const fromColumn = newColumns.find(col => col.id === fromColumnId)
      if (fromColumn) {
        fromColumn.taskIds = fromColumn.taskIds.filter(id => id !== taskId)
      }
      
      // Add to destination column
      const toColumn = newColumns.find(col => col.id === toColumnId)
      if (toColumn) {
        toColumn.taskIds.splice(newIndex, 0, taskId)
      }
      
      return newColumns
    })
  }

  const reorderTask = (columnId: string, fromIndex: number, toIndex: number) => {
    setColumns(prev => prev.map(col => {
      if (col.id === columnId) {
        const newTaskIds = [...col.taskIds]
        const [movedTask] = newTaskIds.splice(fromIndex, 1)
        newTaskIds.splice(toIndex, 0, movedTask)
        return { ...col, taskIds: newTaskIds }
      }
      return col
    }))
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      columns,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      reorderTask
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}