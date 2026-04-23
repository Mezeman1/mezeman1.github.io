<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Line = { prompt: boolean; text: string }

const intro: Line[] = [
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

const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { prompt: false, text: 'available commands:' },
    { prompt: false, text: '  whoami          — identity' },
    { prompt: false, text: '  cat bio.txt      — about me' },
    { prompt: false, text: '  ls skills/       — tech stack' },
    { prompt: false, text: '  ls games/        — game list' },
    { prompt: false, text: '  cd games         — go to games page' },
    { prompt: false, text: '  clear            — clear terminal' },
  ],
  whoami: () => [{ prompt: false, text: 'Mees Buschman — indie game developer' }],
  'cat bio.txt': () => [
    { prompt: false, text: 'I build idle & casual games that are easy to pick up and hard to put down.' },
    { prompt: false, text: 'Based in the Netherlands. Always shipping something new.' },
  ],
  'ls skills/': () => [{ prompt: false, text: 'vue.js  typescript  game-design  firebase  tailwindcss  vite' }],
  'ls games/': () => [
    { prompt: false, text: 'idle-ant-farm/  idle-packs/  idle-complaints/' },
  ],
  'ls games/ --brief': () => [
    { prompt: false, text: 'idle-ant-farm/  idle-packs/  idle-complaints/' },
  ],
  'cd games': () => [],
  'cd games/': () => [],
}

const history = ref<Line[]>([])
const introVisible = ref<number[]>([])
const introComplete = ref(false)
const input = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const terminalEl = ref<HTMLElement | null>(null)
const cmdHistory = ref<string[]>([])
const cmdHistoryIdx = ref(-1)

onMounted(() => {
  intro.forEach((_, i) => {
    setTimeout(() => {
      introVisible.value.push(i)
      if (i === intro.length - 1) {
        setTimeout(() => {
          introComplete.value = true
          const isMobile = window.matchMedia('(pointer: coarse)').matches
          if (!isMobile) nextTick(() => inputEl.value?.focus())
        }, 300)
      }
    }, i * 120)
  })
})

function scrollBottom() {
  nextTick(() => {
    if (terminalEl.value) terminalEl.value.scrollTop = terminalEl.value.scrollHeight
  })
}

function runCommand(raw: string) {
  const cmd = raw.trim()
  if (!cmd) return

  cmdHistory.value.unshift(cmd)
  cmdHistoryIdx.value = -1

  if (cmd === 'clear') {
    history.value = []
    input.value = ''
    return
  }

  history.value.push({ prompt: true, text: cmd })

  const handler = COMMANDS[cmd]
  if (handler) {
    const out = handler()
    history.value.push(...out)
    input.value = ''
    scrollBottom()
    if (cmd === 'cd games' || cmd === 'cd games/') {
      setTimeout(() => router.push('/games'), 300)
    }
  } else {
    history.value.push({ prompt: false, text: `command not found: ${cmd}` })
    input.value = ''
    scrollBottom()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    runCommand(input.value)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (cmdHistoryIdx.value < cmdHistory.value.length - 1) {
      cmdHistoryIdx.value++
      input.value = cmdHistory.value[cmdHistoryIdx.value]
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (cmdHistoryIdx.value > 0) {
      cmdHistoryIdx.value--
      input.value = cmdHistory.value[cmdHistoryIdx.value]
    } else {
      cmdHistoryIdx.value = -1
      input.value = ''
    }
  } else if (e.key === 'Tab') {
    e.preventDefault()
    const partial = input.value.trim()
    const match = Object.keys(COMMANDS).find(k => k.startsWith(partial) && k !== partial)
    if (match) input.value = match
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- sticky system banner -->
    <div class="border border-terminal-border p-4 text-terminal-muted text-xs">
      <span class="text-terminal-green">SYSTEM</span> // portfolio v2.0 // type <span class="text-terminal-dimgreen">help</span> for commands
    </div>

    <!-- scrollable terminal -->
    <div
      ref="terminalEl"
      class="space-y-1 max-h-64 overflow-y-auto"
      @click="inputEl?.focus()"
    >
      <!-- intro animation -->
      <div v-for="(line, i) in intro" :key="'intro-' + i" v-show="introVisible.includes(i)" class="flex gap-2 leading-relaxed">
        <span v-if="line.prompt" class="text-terminal-dimgreen select-none shrink-0">$</span>
        <span v-else class="text-terminal-muted select-none shrink-0 w-4"> </span>
        <span :class="line.prompt ? 'text-terminal-white' : 'text-terminal-muted'">{{ line.text }}</span>
      </div>

      <!-- command history -->
      <template v-if="introComplete">
        <div v-for="(line, i) in history" :key="'h-' + i" class="flex gap-2 leading-relaxed">
          <span v-if="line.prompt" class="text-terminal-dimgreen select-none shrink-0">$</span>
          <span v-else class="text-terminal-muted select-none shrink-0 w-4"> </span>
          <span :class="line.prompt ? 'text-terminal-white' : 'text-terminal-muted'">{{ line.text }}</span>
        </div>

        <!-- active input line -->
        <div class="flex gap-2 mt-2 items-center">
          <span class="text-terminal-dimgreen select-none shrink-0">$</span>
          <input
            ref="inputEl"
            v-model="input"
            type="text"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            class="bg-transparent border-none outline-none text-terminal-white font-mono flex-1 caret-terminal-green"
            @keydown="onKeydown"
          />
        </div>
      </template>

      <!-- blinking cursor while intro plays -->
      <div v-else-if="introVisible.length >= intro.length" class="flex gap-2 mt-2">
        <span class="text-terminal-dimgreen select-none">$</span>
        <span class="cursor"></span>
      </div>
    </div>

    <!-- buttons always visible below terminal -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
