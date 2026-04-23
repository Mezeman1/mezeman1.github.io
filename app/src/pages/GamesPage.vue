<script setup lang="ts">
interface Game {
  title: string
  slug: string
  description: string
  tags: string[]
  url: string
}

const games: Game[] = [
  {
    title: 'Idle Ant Farm',
    slug: 'idle-ant-farm',
    description: 'Build your ant empire and watch it grow. Manage resources, expand colonies, dominate.',
    tags: ['idle', 'clicker', 'strategy'],
    url: 'https://mezeman1.github.io/idle-ant-farm',
  },
  {
    title: 'Idle Packs',
    slug: 'idle-packs',
    description: 'Collect and manage your packs in this card-based idle game.',
    tags: ['idle', 'cards', 'collection'],
    url: 'https://mezeman1.github.io/idle-packs',
  },
  {
    title: 'Idle Complaints',
    slug: 'idle-complaints',
    description: 'Turn complaints into progress in this unique idle experience.',
    tags: ['idle', 'quirky'],
    url: 'https://mezeman1.github.io/idle-complaints',
  },
]
</script>

<template>
  <div>
    <div class="mb-6 flex items-center gap-2 text-sm">
      <span class="text-terminal-dimgreen">$</span>
      <span class="text-terminal-white">ls games/ -la</span>
    </div>
    <div class="text-terminal-muted text-xs mb-6">
      total {{ games.length }} — all idle games, browser-based, free to play
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="game in games"
        :key="game.slug"
        class="border border-terminal-border bg-terminal-surface p-5 hover:border-terminal-green transition-colors group"
      >
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div class="flex-1 min-w-0">
            <div class="text-xs text-terminal-muted mb-1">// {{ game.slug }}/</div>
            <h2 class="text-terminal-green text-lg font-bold group-hover:text-white transition-colors">{{ game.title }}</h2>
            <p class="text-terminal-muted text-sm mt-2 leading-relaxed">{{ game.description }}</p>
            <div class="flex gap-2 mt-3 flex-wrap">
              <span
                v-for="tag in game.tags"
                :key="tag"
                class="text-xs border border-terminal-border text-terminal-muted px-2 py-0.5"
              >#{{ tag }}</span>
            </div>
          </div>
          <a
            :href="game.url"
            target="_blank"
            rel="noopener"
            class="shrink-0 border border-terminal-dimgreen text-terminal-dimgreen px-4 py-2 text-sm hover:bg-terminal-dimgreen hover:text-black transition-colors no-underline"
          >./play</a>
        </div>
      </div>
    </div>

    <div class="mt-6 flex gap-2 text-sm">
      <span class="text-terminal-dimgreen">$</span>
      <span class="cursor text-terminal-muted"></span>
    </div>
  </div>
</template>
