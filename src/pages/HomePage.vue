<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const lines = [
  { prompt: true, text: 'whoami' },
  { prompt: false, text: 'Mees Buschman — indie game developer' },
  { prompt: true, text: 'cat bio.txt' },
  { prompt: false, text: 'I build idle & casual games that are easy to pick up and hard to put down.' },
  { prompt: false, text: 'Based in the Netherlands. Always shipping something new.' },
  { prompt: true, text: 'ls skills/' },
  { prompt: false, text: 'vue.js  typescript  game-design  firebase  tailwindcss  vite' },
  { prompt: true, text: 'ls games/ --brief' },
  { prompt: false, text: 'idle-ant-farm/  idle-packs/  idle-complaints/' },
]

const visible = ref<number[]>([])

onMounted(() => {
  lines.forEach((_, i) => {
    setTimeout(() => visible.value.push(i), i * 120)
  })
})
</script>

<template>
  <div class="space-y-1">
    <div class="mb-6 border border-terminal-border p-4 text-terminal-muted text-xs">
      <span class="text-terminal-green">SYSTEM</span> // portfolio v2.0 // type <RouterLink to="/games" class="text-terminal-dimgreen underline">cd games</RouterLink> to explore
    </div>

    <div v-for="(line, i) in lines" :key="i" v-show="visible.includes(i)" class="flex gap-2 leading-relaxed">
      <span v-if="line.prompt" class="text-terminal-dimgreen select-none shrink-0">$</span>
      <span v-else class="text-terminal-muted select-none shrink-0 w-4"> </span>
      <span :class="line.prompt ? 'text-terminal-white' : 'text-terminal-muted'">{{ line.text }}</span>
    </div>

    <div v-if="visible.length >= lines.length" class="flex gap-2 mt-2">
      <span class="text-terminal-dimgreen select-none">$</span>
      <span class="cursor"></span>
    </div>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <RouterLink
        to="/games"
        class="block border border-terminal-border bg-terminal-surface p-4 hover:border-terminal-green hover:bg-opacity-50 transition-colors group no-underline"
      >
        <div class="text-xs text-terminal-muted mb-1">directory</div>
        <div class="text-terminal-green group-hover:text-white transition-colors">~/games <span class="text-terminal-muted">→</span></div>
        <div class="text-xs text-terminal-muted mt-1">3 idle games available</div>
      </RouterLink>
      <a
        href="mailto:mezeman1@gmail.com"
        class="block border border-terminal-border bg-terminal-surface p-4 hover:border-terminal-green transition-colors group no-underline"
      >
        <div class="text-xs text-terminal-muted mb-1">contact</div>
        <div class="text-terminal-green group-hover:text-white transition-colors">mezeman1@gmail.com <span class="text-terminal-muted">→</span></div>
        <div class="text-xs text-terminal-muted mt-1">open email client</div>
      </a>
    </div>
  </div>
</template>
