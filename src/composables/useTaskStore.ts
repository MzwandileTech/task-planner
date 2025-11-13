// useTaskStore.ts
import { ref, computed } from 'vue'

export interface Task {
  id: string
  title: string
  description: string
  category: string
  date: string
  startTime: string
  endTime: string
  createdAt: Date
}

// Assuming this array is now automatically synced by your backend library (e.g., VueFire)
const tasks = ref<Task[]>([])

export const useTaskStore = () => {
  // 💡 SIMULATION: This function mimics a network request delay
  const asyncDelay = () => new Promise<void>(resolve => setTimeout(resolve, 10))

  // 💥 FIX: Make CRUD operations async and add 'await' for the simulated delay
  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    await asyncDelay()
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    tasks.value.unshift(newTask)
    return newTask
  }

  const deleteTask = async (id: string): Promise<void> => {
    await asyncDelay()
    const index = tasks.value.findIndex((task) => task.id === id)
    if (index > -1) {
      tasks.value.splice(index, 1)
    }
  }

  const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<void> => {
    await asyncDelay()
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      Object.assign(task, updates)
    }
  }

  // getTask remains synchronous as it reads from the locally synced reactive array
  const getTask = (id: string) => {
    return tasks.value.find((t) => t.id === id)
  }

  const getAllTasks = computed(() => tasks.value)

  return {
    tasks: getAllTasks,
    addTask,
    deleteTask,
    updateTask,
    getTask,
  }
}