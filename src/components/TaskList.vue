<template>
  <div
    class="bg-white rounded-3xl p-8 shadow-xl h-full w-full flex flex-col overflow-hidden border border-gray-200"
  >
    <div class="flex flex-col mb-6 flex-shrink-0">
      <h2 class="text-3xl font-bold text-gray-800 tracking-tight">Today's Tasks</h2>
      <p class="text-base text-gray-500 font-medium mt-1">
        {{ selectedDateLabel }}
      </p>
    </div>

    <div class="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar relative">
      <div class="absolute left-[5.5rem] top-0 bottom-0 w-0.5 bg-gray-200"></div>

      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="flex items-start gap-4 relative"
      >
        <div class="flex flex-col items-end flex-shrink-0 w-24 pt-2">
          <div class="text-sm font-bold text-gray-800">{{ formatTime(task.startTime) }}</div>
          <div class="w-3 h-3 bg-blue-600 rounded-full border-2 border-white absolute right-[-0.3rem] top-3.5 shadow-md"></div>
        </div>

        <TaskCard
          :id="task.id"
          :title="task.title"
          :description="task.description"
          time=""
          icon="meeting"
          @view="$emit('viewTask', task.id)"
          class="flex-1 min-w-0"
        />
      </div>

      <div
        v-if="filteredTasks.length === 0"
        class="flex flex-col items-center justify-center h-full text-center text-gray-400 py-12"
      >
        <svg
          class="w-14 h-14 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p class="font-medium text-lg">No tasks planned for this day.</p>
        <button
          @click="$emit('openCreateForm')"
          class="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Click here to add one!
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskCard from './TaskCard.vue'
import { useTaskStore } from '@/composables/useTaskStore'

// TaskList now receives the selected date as a prop
interface Props {
  selectedDate: Date
}
const props = defineProps<Props>()

const emit = defineEmits(['openCreateForm', 'viewTask'])
const { tasks } = useTaskStore()

const selectedDateLabel = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  return props.selectedDate.toLocaleDateString('en-US', options)
})

const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    const taskDate = new Date(task.date)
    return (
      taskDate.getFullYear() === props.selectedDate.getFullYear() &&
      taskDate.getMonth() === props.selectedDate.getMonth() &&
      taskDate.getDate() === props.selectedDate.getDate()
    )
  })
})

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
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>