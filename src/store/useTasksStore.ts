import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  description?: string
  column: 'todo' | 'inprogress' | 'done'
}

interface TasksState {
  tasks: Record<string, Task>
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, toColumn: Task['column']) => void
}

export const useTasksStore = create<TasksState>()(
  devtools((set) => ({
    tasks: {},
    addTask: (task) =>
      set((state) => ({ tasks: { ...state.tasks, [task.id]: task } })),
    updateTask: (id, updates) =>
      set((state) => ({
        tasks: { ...state.tasks, [id]: { ...state.tasks[id], ...updates } },
      })),
    deleteTask: (id) =>
      set((state) => {
        const { [id]: _, ...rest } = state.tasks
        return { tasks: rest }
      }),
    moveTask: (id, toColumn) =>
      set((state) => ({
        tasks: { ...state.tasks, [id]: { ...state.tasks[id], column: toColumn } },
      })),
  }))
)
