<script setup lang="ts">
useSeoMeta({ title: 'ΑΕ Βιτσιου — Η Ομάδα', description: 'Το ρόστερ της ΑΕ Βιτσιου.' })

const players = Array.from({ length: 12 }).map((_, i) => ({
  number: i + 1,
  name: `Παίκτης ${i + 1}`,
  position: ['Τερματοφύλακας', 'Αμυντικός', 'Μέσος', 'Επιθετικός'][i % 4]
}))
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12">
    <h1 class="mb-8 text-3xl font-bold text-primary-500">Η Ομάδα</h1>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="p in players" :key="p.number" class="transition hover:shadow-lg">
        <div class="flex items-center gap-4">
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-xl font-bold text-white">
            {{ p.number }}
          </div>
          <div>
            <p class="font-bold">{{ p.name }}</p>
            <p class="text-sm text-muted">{{ p.position }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
