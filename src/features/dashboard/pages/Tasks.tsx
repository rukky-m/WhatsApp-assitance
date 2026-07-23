import React, { useState } from 'react'
import { useTasksStore, type Task } from '@/store/useTasksStore'
import { v4 as uuidv4 } from 'uuid'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { CheckCircle2 } from 'lucide-react'

export function Tasks() {
  const { tasks, addTask, deleteTask } = useTasksStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const handleAdd = () => {
    if (!newTitle.trim()) return
    const task: Task = {
      id: uuidv4(),
      title: newTitle,
      description: newDescription,
      column: 'todo',
    }
    addTask(task)
    setNewTitle('')
    setNewDescription('')
    setIsModalOpen(false)
  }

  const columns: Task['column'][] = ['todo', 'inprogress', 'done']
  const columnTitles: Record<Task['column'], string> = {
    todo: 'To‑Do',
    inprogress: 'In Progress',
    done: 'Done',
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <Card key={col} className="h-full">
            <CardHeader>
              <CardTitle>{columnTitles[col]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 overflow-y-auto max-h-96">
              {Object.values(tasks)
                .filter((t) => t.column === col)
                .map((t) => (
                  <div
                    key={t.id}
                    className="p-2 rounded bg-muted flex justify-between items-center"
                  >
                    <span>{t.title}</span>
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Task">
        <div className="space-y-4">
          <Input
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Input
            placeholder="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
