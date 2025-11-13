<template>
  <!-- Using h-screen to enforce full viewport height, and a pleasant gradient background -->
  <div class="h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50">
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Keeping clean: Tailwind handles styling */
</style>