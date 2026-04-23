<script setup lang="ts">
interface Game {
  title: string
  description: string
  url: string
}

const games: Game[] = [
  {
    title: 'Idle Ant Farm',
    description: 'Build your ant empire and watch it grow!',
    url: 'https://mezeman1.github.io/idle-ant-farm',
  },
  {
    title: 'Idle Packs',
    description: 'Collect and manage your packs in this fun idle game.',
    url: 'https://mezeman1.github.io/idle-packs',
  },
  {
    title: 'Idle Complaints',
    description: 'Turn complaints into progress in this unique idle experience.',
    url: 'https://mezeman1.github.io/idle-complaints',
  },
]
</script>

<template>
  <section class="mb-12">
    <h2 class="text-3xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Games</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="game in games"
        :key="game.title"
        class="bg-white shadow-lg rounded-lg p-6"
      >
        <h3 class="text-xl font-semibold mb-2">{{ game.title }}</h3>
        <p class="text-gray-700 mb-4">{{ game.description }}</p>
        <a
          :href="game.url"
          class="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >Play Now</a>
      </div>
    </div>
  </section>
</template>
