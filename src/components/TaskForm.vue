<template>
  <Transition name="slide-right">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 h-screen w-full md:w-1/2 lg:w-1/3 max-w-lg bg-white shadow-2xl z-50 flex flex-col"
      @click.stop
    >
      <div class="flex flex-col h-full overflow-y-auto p-8">
        <div class="flex items-center justify-between mb-6 flex-shrink-0">
          <h2 class="text-2xl font-bold text-text-dark">
            {{ editingTaskId ? 'Edit Task' : 'Create New Task' }}
          </h2>
          <button
            @click="closeModal"
            class="text-text-muted hover:text-text-dark transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <label class="block text-sm font-medium text-primary mb-2">Task Name</label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="Enter task name"
              class="w-full px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-primary mb-2">
              Select Category
            </label>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="category in categories"
                :key="category"
                type="button"
                @click="formData.category = category"
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                  formData.category === category
                    ? 'bg-blue-600 text-white shadow-md' // Enhanced selected style
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Changed unselected style
                ]"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-primary mb-2">Date</label>
            <div class="flex items-center gap-2 px-4 py-2 border border-border-light rounded-lg bg-white">
              <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
              </svg>
              <input
                v-model="formData.date"
                type="date"
                class="flex-1 bg-transparent focus:outline-none text-text-dark"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-text-muted mb-2">Start time</label>
              <input
                v-model="formData.startTime"
                type="time"
                class="w-full px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-text-muted mb-2">End time</label>
              <input
                v-model="formData.endTime"
                type="time"
                class="w-full px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-primary mb-2">Description</label>
            <textarea
              v-model="formData.description"
              placeholder="Enter task description"
              class="w-full px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows="3"
              required
            />
          </div>
        </form>

        <div class="flex gap-3 pt-5 flex-shrink-0 border-t border-gray-100 mt-auto">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-text-dark font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            @click="handleSubmit"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            {{ editingTaskId ? 'Update Task' : 'Create Task' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'

interface FormData {
  title: string
  category: string
  date: string
  startTime: string
  endTime: string
  description: string
}

interface Props {
  isOpen: boolean
  editingTaskId?: string | null
  editingData?: Partial<FormData>
}

const props = withDefaults(defineProps<Props>(), {
  editingTaskId: null,
  editingData: undefined,
})

const emit = defineEmits<{
  close: []
  submit: [data: FormData]
}>()

const categories = ['Work', 'Personal', 'Domestic', 'Learning']

const formData = reactive<FormData>({
  title: '',
  category: 'Development',
  date: new Date().toISOString().split('T')[0],
  startTime: '10:00',
  endTime: '11:00',
  description: '',
})

// Reset form when panel opens
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      if (props.editingData) {
        Object.assign(formData, props.editingData)
      } else {
        formData.title = ''
        formData.category = 'Development'
        formData.date = new Date().toISOString().split('T')[0]
        formData.startTime = '10:00'
        formData.endTime = '11:00'
        formData.description = ''
      }
    }
  },
)

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...formData })
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