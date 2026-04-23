<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-terminal-bg text-terminal-green font-mono flex flex-col">
    <AppHeader />
    <main class="flex-1 container mx-auto px-4 py-8 max-w-4xl">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
