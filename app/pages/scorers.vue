<script setup lang="ts">
useSeoMeta({ title: 'ΑΕ Βιτσιου — Σκόρερ', description: 'Οι πρώτοι σκόρερ της ομάδας.' })

const scorers = [
  { name: 'Παίκτης 9', goals: 12 },
  { name: 'Παίκτης 7', goals: 8 },
  { name: 'Παίκτης 10', goals: 6 },
  { name: 'Παίκτης 11', goals: 4 },
  { name: 'Παίκτης 8', goals: 3 }
]
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12">
    <h1 class="mb-8 text-3xl font-bold text-primary-500">Σκόρερ</h1>
    <div class="space-y-3">
      <UCard v-for="(s, i) in scorers" :key="s.name">
        <div class="flex items-center gap-4">
          <span class="w-8 text-lg font-bold text-secondary-600">{{ i + 1 }}</span>
          <UIcon name="maki:soccer-11" class="h-6 w-6 text-primary-500" />
          <span class="flex-1 font-semibold">{{ s.name }}</span>
          <UBadge color="primary" variant="subtle" size="lg">{{ s.goals }} γκολ</UBadge>
        </div>
      </UCard>
    </div>
  </div>
</template>
