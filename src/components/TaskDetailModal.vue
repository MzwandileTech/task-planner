<template>
  <Transition name="slide-right">
    <div
      v-if="isOpen && task"
      class="fixed top-0 right-0 h-screen w-full md:w-1/2 lg:w-1/3 max-w-lg bg-white shadow-2xl z-50 flex flex-col"
      @click.stop
    >
      <div class="flex flex-col h-full overflow-y-auto p-8">
        <div class="flex items-center justify-between mb-6 flex-shrink-0">
          <h2 class="text-2xl font-bold text-text-dark">Task Details</h2>
          <button
            @click="$emit('close')"
            class="text-text-muted hover:text-text-dark transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-6 flex-1">
          <div>
            <label class="block text-xs font-medium text-text-muted mb-1">Title</label>
            <p class="text-xl font-bold text-text-dark">{{ task.title }}</p>
          </div>

          <div>
            <label class="block text-xs font-medium text-text-muted mb-1">Category</label>
            <span :class="[
              'inline-block px-3 py-1 rounded-full text-sm font-medium',
              task.category === 'Development' ? 'bg-blue-100 text-blue-800' :
              task.category === 'Research' ? 'bg-green-100 text-green-800' :
              task.category === 'Design' ? 'bg-indigo-100 text-indigo-800' :
              task.category === 'Backend' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            ]">
              {{ task.category }}
            </span>
          </div>

          <div>
            <label class="block text-xs font-medium text-text-muted mb-1">Date</label>
            <p class="text-text-dark">{{ formatDate(task.date) }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-text-muted mb-1">Start Time</label>
              <p class="text-text-dark font-medium">{{ formatTime(task.startTime) }}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-text-muted mb-1">End Time</label>
              <p class="text-text-dark font-medium">{{ formatTime(task.endTime) }}</p>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-text-muted mb-1">Description</label>
            <p class="text-text-dark whitespace-pre-wrap">{{ task.description }}</p>
          </div>
        </div>

        <div class="pt-6 flex gap-3 flex-shrink-0">
          <button
            @click="$emit('editTask', task.id)"
            class="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Edit
          </button>
          <button
            @click="$emit('deleteTask', task.id); $emit('close')"
            class="flex-1 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { type Task } from '@/composables/useTaskStore'

interface Props {
  task: Task | null
  isOpen: boolean
}

const props = defineProps<Props>()
defineEmits<{
  close: []
  editTask: [id: string]
  deleteTask: [id: string]
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

const formatTime = (time: string) => {
  if (!time) return ''
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${period}`
}
</script>

<style scoped>
/* New styles for right slide-in panel transition */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>