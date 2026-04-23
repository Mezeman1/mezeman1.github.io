<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="h-screen overflow-hidden bg-terminal-bg text-terminal-green font-mono flex flex-col">
    <AppHeader />
    <main class="flex-1 overflow-y-auto container mx-auto px-4 py-8 max-w-4xl">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
