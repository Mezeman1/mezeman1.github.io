<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

type Line = { prompt: boolean; text: string }

const props = defineProps<{
  commands: Record<string, () => Line[] | void>
  autofocus?: boolean
}>()

const history = ref<Line[]>([])
const input = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const containerEl = ref<HTMLElement | null>(null)
const cmdHistory = ref<string[]>([])
const cmdHistoryIdx = ref(-1)

onMounted(() => {
  const isMobile = window.matchMedia('(pointer: coarse)').matches
  if (props.autofocus && !isMobile) inputEl.value?.focus()
})

function scrollBottom() {
  nextTick(() => {
    if (containerEl.value) containerEl.value.scrollTop = containerEl.value.scrollHeight
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

  const handler = props.commands[cmd]
  if (handler) {
    const out = handler() ?? []
    history.value.push(...out)
  } else {
    history.value.push({ prompt: false, text: `command not found: ${cmd}` })
  }

  input.value = ''
  scrollBottom()
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
    const match = Object.keys(props.commands).find(k => k.startsWith(partial) && k !== partial)
    if (match) input.value = match
  }
}
</script>

<template>
  <div
    ref="containerEl"
    class="mt-4 space-y-1"
    @click="inputEl?.focus()"
  >
    <div v-for="(line, i) in history" :key="i" class="flex gap-2 leading-relaxed text-sm">
      <span v-if="line.prompt" class="text-terminal-dimgreen select-none shrink-0">$</span>
      <span v-else class="text-terminal-muted select-none shrink-0 w-4"> </span>
      <span :class="line.prompt ? 'text-terminal-white' : 'text-terminal-muted'">{{ line.text }}</span>
    </div>

    <div class="flex gap-2 items-center text-sm">
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
  </div>
</template>
