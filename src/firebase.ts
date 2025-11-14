// src/firebase.ts
import { initializeApp } from 'firebase/app' 
import { 
    getFirestore, 
    collection, 
    type DocumentData, 
    type QueryDocumentSnapshot, 
    type SnapshotOptions,
    type FirestoreDataConverter
} from 'firebase/firestore'
 
const firebaseConfig = {
    apiKey: "AIzaSyDm_w47LlO3JVg14ZZCkxt4QcPizeUlQ-E",
    authDomain: "task-planner-aa896.firebaseapp.com",
    projectId: "task-planner-aa896",
    storageBucket: "task-planner-aa896.firebasestorage.app",
    messagingSenderId: "1028460011626",
    appId: "1:1028460011626:web:9e5543c630020b18f4aa13",
    measurementId: "G-JQ0GWF1LL1"
}
 
export const firebaseApp = initializeApp(firebaseConfig)
 
export const db = getFirestore(firebaseApp)

 
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
 
export const taskConverter: FirestoreDataConverter<Task> = { 
  toFirestore: (task: Task): DocumentData => { 
    const { id, ...data } = task;  
    return data;
  }, 
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Task => {
    const data = snapshot.data(options)!
    return {
      id: snapshot.id, 
      title: data.title,
      description: data.description,
      category: data.category,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime, 
      createdAt: data.createdAt.toDate(), 
    }
  },
} 
export const tasksCollectionRef = collection(db, 'tasks').withConverter(taskConverter)