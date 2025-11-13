<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-light via-blue-100 to-primary-light flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md">
      <h1 class="text-4xl font-bold text-text-dark mb-4">404</h1>
      <p class="text-lg text-text-muted mb-6">Page not found</p>
      <p class="text-sm text-text-light mb-8">
        The page you're looking for doesn't exist. Feel free to continue prompting to create new pages for this application.
      </p>
      <router-link
        to="/"
        class="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
