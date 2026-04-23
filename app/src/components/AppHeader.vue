<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="border-b border-terminal-border bg-terminal-surface">
    <div class="container mx-auto px-4 max-w-4xl py-4">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <RouterLink to="/" class="text-terminal-green hover:no-underline">
          <span class="text-terminal-muted">root@mezeman1:~#</span>
          <span class="ml-2 text-lg font-bold">mees.buschman</span>
        </RouterLink>
        <nav class="flex gap-6 text-sm">
          <RouterLink to="/" class="text-terminal-muted hover:text-terminal-green transition-colors">
            <span class="text-terminal-dimgreen">~/</span>home
          </RouterLink>
          <RouterLink to="/games" class="text-terminal-muted hover:text-terminal-green transition-colors">
            <span class="text-terminal-dimgreen">~/</span>games
          </RouterLink>
          <RouterLink to="/privacy" class="text-terminal-muted hover:text-terminal-green transition-colors">
            <span class="text-terminal-dimgreen">~/</span>privacy
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.router-link-active {
  color: #00ff41;
}
</style>
