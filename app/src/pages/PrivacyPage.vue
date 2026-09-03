<script setup lang="ts">
import { useRouter } from 'vue-router'
import TerminalPrompt from '../components/TerminalPrompt.vue'

const router = useRouter()

type Line = { prompt: boolean; text: string }

const commands: Record<string, () => Line[]> = {
  help: () => [
    { prompt: false, text: 'available commands:' },
    { prompt: false, text: '  cd /       — go home' },
    { prompt: false, text: '  cd games   — go to games' },
    { prompt: false, text: '  clear      — clear terminal' },
  ],
  'cd /': () => { router.push('/'); return [] },
  'cd ~': () => { router.push('/'); return [] },
  'cd home': () => { router.push('/'); return [] },
  'cd games': () => { router.push('/games'); return [] },
  'cd games/': () => { router.push('/games'); return [] },
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center gap-2 text-sm">
      <span class="text-terminal-dimgreen">$</span>
      <span class="text-terminal-white">cat privacy-policy.txt</span>
    </div>

    <div class="border border-terminal-border bg-terminal-surface p-6 space-y-5 text-sm leading-relaxed">
      <div class="text-terminal-muted text-xs border-b border-terminal-border pb-3">
        last-updated: 2024-09-22 // author: mezeman1
      </div>

      <p class="text-terminal-muted">
        Thank you for playing. This policy explains how we collect, use, and protect your information.
      </p>

      <section>
        <h2 class="text-terminal-green mb-2">// information we collect</h2>
        <p class="text-terminal-muted">
          <span class="text-terminal-dimgreen">personal_info:</span>
          We collect your email address when you sign in via Firebase Authentication to save and load your game progress.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// how we use your information</h2>
        <p class="text-terminal-muted">
          Your information is used to authenticate your account, store game progress, and improve your experience.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// sharing your information</h2>
        <p class="text-terminal-muted">
          We do not share your personal information with third parties unless required by law or with your explicit consent.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// data security</h2>
        <p class="text-terminal-muted">
          We use Firebase's security measures to protect your data. While we aim for the best protection, no system is completely secure.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// children's privacy</h2>
        <p class="text-terminal-muted">
          Our games are not intended for children under 13. If you believe we have collected data from a child, please contact us for removal.
        </p>
      </section>

      <section>
        <h2 class="text-terminal-green mb-2">// contact</h2>
        <p class="text-terminal-muted">
          Questions? Reach out at
          <a href="mailto:mezeman1@gmail.com" class="text-terminal-green hover:underline">mezeman1@gmail.com</a>.
        </p>
      </section>

      <div class="text-xs text-terminal-muted border-t border-terminal-border pt-3">
        EOF
      </div>
    </div>

    <TerminalPrompt :commands="commands" />
  </div>
</template>
