// useTaskStore.ts
import { computed, type Ref } from 'vue' 
import { 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore'
import { useCollection } from 'vuefire' 
import { db, tasksCollectionRef, type Task } from '../firebase' 
 
const tasksQuery = query(tasksCollectionRef, orderBy('createdAt', 'desc'))
 
const tasks: Ref<Task[]> = useCollection(tasksQuery) 


export const useTaskStore = () => {
   
  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<void> => { 
    const newTaskData = {
      ...task,
      createdAt: new Date(), 
    } as Omit<Task, 'id'>  
    await addDoc(tasksCollectionRef, newTaskData)
  }

  const deleteTask = async (id: string): Promise<void> => { 
    await deleteDoc(doc(db, 'tasks', id))
  }

  const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<void> => { 
    await updateDoc(doc(db, 'tasks', id), updates)
  }

  const getTask = (id: string) => {
    return computed(() => tasks.value.find((t) => t.id === id))
  }

  return {
    tasks: computed(() => tasks.value), 
    addTask,
    deleteTask,
    updateTask,
    getTask,
  }
}