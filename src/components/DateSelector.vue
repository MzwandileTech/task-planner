<template>
  <div class="flex flex-col gap-1 overflow-y-auto pb-2 custom-scrollbar pr-2">
    <button
      v-for="(dateItem, index) in displayDates"
      :key="index"
      @click="selectDate(index)"
      :class="[
        'w-full h-16 rounded-xl font-semibold transition-colors flex items-center justify-between p-3 text-left shadow-sm',
        index === selectedDayIndex
          ? 'bg-blue-600 text-white shadow-lg transform scale-[1.02]'
          : 'bg-white text-gray-800 border border-gray-100 hover:bg-gray-50'
      ]"
    >
      <div>
        <span class="text-xs block">{{ dateItem.monthName }}</span>
        <span class="text-xl font-bold block">{{ dateItem.date }}</span>
      </div>
      <div :class="[
        'text-sm',
        index === selectedDayIndex ? 'text-blue-200' : 'text-gray-500'
      ]">
        {{ dateItem.dayName }}
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface DateItem {
  dayName: string
  monthName: string
  date: number
  fullDate: Date
}

const emit = defineEmits<{
  'update:modelValue': [date: Date]
}>()

const selectedDayIndex = ref(0)
const displayDates = ref<DateItem[]>([])

const generateNextDates = (count: number = 21) => { // Generate 3 weeks of dates
  const today = new Date()
  const dates: DateItem[] = []
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


  for (let i = 0; i < count; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i) // Start from today and go forward

    // Determine the index of today's date in the generated list
    if (i === 0) {
      selectedDayIndex.value = i
    }

    dates.push({
      dayName: dayNames[date.getDay()],
      monthName: monthNames[date.getMonth()],
      date: date.getDate(),
      fullDate: date,
    })
  }

  displayDates.value = dates
}

const selectDate = (index: number) => {
  selectedDayIndex.value = index
  emit('update:modelValue', displayDates.value[index].fullDate)
}

onMounted(() => {
  generateNextDates()
  // Emit today's date
  emit('update:modelValue', displayDates.value[selectedDayIndex.value].fullDate)
})
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