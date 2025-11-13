<template>
  <div class="flex h-screen w-screen bg-gray-50">
    <div class="hidden md:flex flex-col w-64 bg-white shadow-xl p-6 border-r border-gray-100 flex-shrink-0">
      
      <div class="mb-8">
        <h1
          class="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-700"
        >
          TaskPlanner
        </h1>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Upcoming Days</h2>
        <DateSelector @update:model-value="selectedDate = $event" />
      </div>

    </div>

    <div class="flex-1 flex flex-col p-4 md:p-8 relative overflow-hidden">
      <TaskList
        :selected-date="selectedDate"
        @open-create-form="openCreateForm"
        @view-task="viewTask"
        class="flex-1 overflow-hidden"
      />
      
      <button
        @click="openCreateForm"
        class="fixed bottom-6 right-6 md:absolute md:bottom-10 md:right-10 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 z-40"
        title="Add Task"
      >
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </button>
    </div>

    <TaskForm
      :is-open="isFormOpen"
      :editing-task-id="editingTaskId"
      :editing-data="editingTaskData"
      @close="closeForm"
      @submit="submitTask"
    />

    <TaskDetailModal
      :is-open="!!viewingTaskId"
      :task="viewingTask"
      @close="viewingTaskId = null"
      @edit-task="handleEditFromDetail"
      @delete-task="handleDeleteFromDetail"
    />

    <Toast v-model="showToast" :message="toastMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskList from '@/components/TaskList.vue'
import TaskForm from '@/components/TaskForm.vue'
import Toast from '@/components/Toast.vue'
import TaskDetailModal from '@/components/TaskDetailModal.vue'
import DateSelector from '@/components/DateSelector.vue'
import { useTaskStore, type Task } from '@/composables/useTaskStore'

const { getTask, addTask, updateTask, deleteTask: deleteTaskFromStore } = useTaskStore()

const isFormOpen = ref(false)
const editingTaskId = ref<string | null>(null)
const viewingTaskId = ref<string | null>(null)
const showToast = ref(false)
const toastMessage = ref('')
const selectedDate = ref(new Date()) // State for date selection from sidebar

const editingTaskData = computed(() => {
  if (!editingTaskId.value) return undefined
  const task = getTask(editingTaskId.value)
  if (!task) return undefined
  return {
    title: task.title,
    category: task.category,
    date: task.date,
    startTime: task.startTime,
    endTime: task.endTime,
    description: task.description,
  }
})

const viewingTask = computed(() => {
  if (!viewingTaskId.value) return null
  return getTask(viewingTaskId.value) || null
})

// Handlers for TaskForm
const openCreateForm = () => {
  editingTaskId.value = null
  isFormOpen.value = true
  viewingTaskId.value = null // Close detail panel if open
}

const closeForm = () => {
  isFormOpen.value = false
  editingTaskId.value = null
}

// 💥 FIX 1: Make submitTask async and use await
const submitTask = async (formData: {
  title: string
  description: string
  category: string
  date: string
  startTime: string
  endTime: string
}) => {
  try {
    if (editingTaskId.value) {
      await updateTask(editingTaskId.value, formData)
      toastMessage.value = 'Task updated successfully!'
    } else {
      await addTask(formData)
      toastMessage.value = 'Task created successfully!'
    }
  } catch (e) {
    console.error("Task submission failed:", e)
    toastMessage.value = 'Error saving task!' // Show error message on failure
  }

  showToast.value = true
  closeForm()
}

// Handlers for TaskDetailModal
const viewTask = (id: string) => {
  viewingTaskId.value = id
  isFormOpen.value = false // Close form panel if open
}

const editTask = (id: string) => {
  viewingTaskId.value = null // Close detail panel
  editingTaskId.value = id
  isFormOpen.value = true // Open form panel
}

const handleEditFromDetail = (id: string) => {
  editTask(id) // Redirects from detail panel to edit form panel
}

const handleDeleteFromDetail = (id: string) => {
  deleteTask(id) // Performs the delete action
}

// 💥 FIX 2: Make deleteTask async and use await
const deleteTask = async (id: string) => {
  const task = getTask(id)
  if (task) {
    if (window.confirm(`Are you sure you want to delete the task: "${task.title}"?`)) {
      try {
        await deleteTaskFromStore(id)
        toastMessage.value = 'Task deleted successfully!'
      } catch (e) {
        console.error("Task deletion failed:", e)
        toastMessage.value = 'Error deleting task!' // Show error message on failure
      }
      showToast.value = true
      viewingTaskId.value = null // Close detail panel
    }
  }
}
</script>

<style scoped>
/* No scoped styles needed for the main layout here, Tailwind handles it */
</style>