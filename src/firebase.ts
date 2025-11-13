// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// 1. Paste your actual Firebase config here
const firebaseConfig = {
 apiKey: "AIzaSyDm_w47LlO3JVg14ZZCkxt4QcPizeUlQ-E",
  authDomain: "task-planner-aa896.firebaseapp.com",
  projectId: "task-planner-aa896",
  storageBucket: "task-planner-aa896.firebasestorage.app",
  messagingSenderId: "1028460011626",
  appId: "1:1028460011626:web:9e5543c630020b18f4aa13",
  measurementId: "G-JQ0GWF1LL1"
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

// Export Firestore instance
export const db = getFirestore(firebaseApp)