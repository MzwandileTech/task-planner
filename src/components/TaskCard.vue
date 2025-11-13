<template>
  <div
    class="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 cursor-pointer"
    @click="$emit('view')"
  >
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0">
        <div
          class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-blue-600 flex items-center justify-center shadow-inner"
        >
          <svg
            v-if="icon === 'meeting'"
            class="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
              1.79-4 4 1.79 4 4 4zm0 2c-2.67 
              0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>

          <svg
            v-else-if="icon === 'call'"
            class="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M6.62 10.79c1.44 2.83 3.76 5.14 
              6.59 6.59l2.2-2.2c.27-.27.67-.36 
              1.02-.24 1.12.37 2.33.57 3.57.57.55 
              0 1 .45 1 1V20c0 .55-.45 1-1 
              1-9.39 0-17-7.61-17-17 0-.55.45-1 
              1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 
              2.45.57 3.57.11.35.03.74-.25 
              1.02l-2.2 2.2z"
            />
          </svg>

          <svg
            v-else-if="icon === 'mail'"
            class="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M20 4H4c-1.1 0-1.99.9-1.99 
              2L2 18c0 1.1.9 2 2 
              2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
              4l-8 5-8-5V6l8 5 8-5v2z"
            />
          </svg>
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-gray-800 truncate">
          {{ title }}
        </h3>
        <p class="text-sm text-gray-500 mt-1 line-clamp-2">
          {{ description }}
        </p>

        </div>

      </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  title: string
  description: string
  time: string // Kept for interface compatibility, but unused in template
  icon?: 'meeting' | 'call' | 'mail'
}
withDefaults(defineProps<Props>(), { icon: 'meeting' })
// Emits kept for consistency, but only 'view' is directly triggered by card click
defineEmits(['view', 'edit', 'delete']) 
</script>