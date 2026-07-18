<script setup lang="ts">
useSeoMeta({ title: 'ΑΕ Βιτσιου — Η Ομάδα', description: 'Το ρόστερ της ΑΕ Βιτσιου.' })

const players = Array.from({ length: 12 }).map((_, i) => ({
  number: i + 1,
  name: `Παίκτης ${i + 1}`,
  position: ['Τερματοφύλακας', 'Αμυντικός', 'Μέσος', 'Επιθετικός'][i % 4]
}))

const receivers = [
  {number: 1, name: 'Yashin'},
  {number: 2, name: 'Maldini'},
  {number: 3, name: 'Cafu'},
  {number: 4, name: 'Beckenbauer'},
  {number: 5, name: 'Xavi'},
  {number: 6, name: 'Matthaus'},
  {number: 7, name: 'Christiano'},
  {number: 8, name: 'Pelé'},
  {number: 9, name: 'Ronaldo', isCaptain: true},
  {number: 10, name: 'Maradona'},
  {number: 11, name: 'Messi'},
]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12">
    <h1 class="mb-8 text-3xl font-bold text-primary-500">Η Ομάδα</h1>
    <LayoutsSoccerField orientation="landscape"  :receivers="receivers" class="w-full h-125" />
    <div class="overflow-hidden rounded-2xl border border-primary-800/40 bg-primary-900/30">
      <div
        v-for="(s, i) in players"
        :key="s.number"
        class="flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-5"
        :class="i !== players.length - 1 ? 'border-b border-primary-800/40' : ''"
      >
        <div class="flex gap-4 max-md:justify-center max-lg:w-full">
          <span class="w-6 text-sm font-bold text-white/40">{{ s.number }}</span>
          <UBadge size="lg" label="gk" class="rounded-full" />
          <span class="truncate font-semibold uppercase tracking-wide text-white">{{ s.name }}</span>
        </div>

        <div class="flex gap-4 max-lg:justify-between max-lg:w-9/10">
          <span class="shrink-0 text-lg font-black text-secondary-300">{{ s.position }}</span>
          <UBadge size="md" variant="subtle" color="success" label="GA: (15)" class="rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>
