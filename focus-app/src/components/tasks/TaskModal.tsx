"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  X, 
  Calendar, 
  Users, 
  CheckSquare, 
  Plus, 
  Trash2,
  Save,
  Flag
} from "lucide-react"
import { Task, ChecklistItem, useTask, Priority } from "@/contexts/TaskContext"
import * as Dialog from "@radix-ui/react-dialog"

const priorityOptions = [
  { value: "low" as Priority, label: "Low", color: "bg-green-400" },
  { value: "medium" as Priority, label: "Medium", color: "bg-blue-400" },
  { value: "high" as Priority, label: "High", color: "bg-orange-400" },
  { value: "critical" as Priority, label: "Critical", color: "bg-red-500" }
]

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  task?: Task | null
  defaultColumnId?: string
}

export function TaskModal({ isOpen, onClose, task, defaultColumnId = "todo" }: TaskModalProps) {
  const { addTask, updateTask, columns } = useTask()
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [responsibleMembers, setResponsibleMembers] = useState<string[]>([])
  const [priority, setPriority] = useState<Priority>("medium")
  const [columnId, setColumnId] = useState(defaultColumnId)
  const [newChecklistItem, setNewChecklistItem] = useState("")
  const [newMember, setNewMember] = useState("")

  // Reset form when modal opens/closes or task changes
  useEffect(() => {
    if (isOpen) {
      if (task) {
        setTitle(task.title)
        setDescription(task.description)
        setDeadline(task.deadline || "")
        setChecklist(task.checklist)
        setResponsibleMembers(task.responsibleMembers)
        setPriority(task.priority)
        setColumnId(task.columnId)
      } else {
        setTitle("")
        setDescription("")
        setDeadline("")
        setChecklist([])
        setResponsibleMembers([])
        setPriority("medium")
        setColumnId(defaultColumnId)
      }
      setNewChecklistItem("")
      setNewMember("")
    }
  }, [isOpen, task, defaultColumnId])

  const handleSave = () => {
    if (!title.trim()) return

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      deadline: deadline || undefined,
      checklist,
      responsibleMembers,
      priority,
      columnId
    }

    if (task) {
      updateTask(task.id, taskData)
    } else {
      addTask(taskData)
    }

    onClose()
  }

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const newItem: ChecklistItem = {
        id: `checklist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: newChecklistItem.trim(),
        completed: false
      }
      setChecklist([...checklist, newItem])
      setNewChecklistItem("")
    }
  }

  const toggleChecklistItem = (itemId: string) => {
    setChecklist(checklist.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ))
  }

  const removeChecklistItem = (itemId: string) => {
    setChecklist(checklist.filter(item => item.id !== itemId))
  }

  const addMember = () => {
    if (newMember.trim() && !responsibleMembers.includes(newMember.trim())) {
      setResponsibleMembers([...responsibleMembers, newMember.trim()])
      setNewMember("")
    }
  }

  const removeMember = (member: string) => {
    setResponsibleMembers(responsibleMembers.filter(m => m !== member))
  }

  const completedTasks = checklist.filter(item => item.completed).length
  const progressPercentage = checklist.length > 0 ? (completedTasks / checklist.length) * 100 : 0

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 p-4">
          <Card className="w-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Dialog.Title asChild>
                  <CardTitle className="text-xl">
                    {task ? "Edit Task" : "Create New Task"}
                  </CardTitle>
                </Dialog.Title>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Task Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title..."
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description..."
                    className="w-full p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <select
                      value={columnId}
                      onChange={(e) => setColumnId(e.target.value)}
                      className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {columns.map(column => (
                        <option key={column.id} value={column.id}>
                          {column.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                      <Flag className="h-3 w-3" />
                      Priority
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                        className="flex-1 p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {priorityOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className={`w-4 h-9 rounded ${priorityOptions.find(p => p.value === priority)?.color} flex-shrink-0`} />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Deadline</label>
                    <Input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Checklist Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <CheckSquare className="h-4 w-4" />
                    Checklist ({completedTasks}/{checklist.length})
                  </h3>
                  {checklist.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    placeholder="Add checklist item..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addChecklistItem()}
                  />
                  <Button onClick={addChecklistItem} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {checklist.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {checklist.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 group">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleChecklistItem(item.id)}
                          className="rounded"
                        />
                        <span className={`flex-1 text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.text}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeChecklistItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Responsible Members Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Responsible Members
                </h3>

                <div className="flex gap-2">
                  <Input
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    placeholder="Add team member..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addMember()}
                  />
                  <Button onClick={addMember} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {responsibleMembers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {responsibleMembers.map((member) => (
                      <Badge key={member} variant="secondary" className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className="text-xs">
                            {member.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {member}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMember(member)}
                          className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={!title.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  {task ? "Update Task" : "Create Task"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}