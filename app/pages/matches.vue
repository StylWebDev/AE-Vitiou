<script setup lang="ts">
useSeoMeta({ title: 'ΑΕ Βιτσιου — Αγώνες', description: 'Πρόγραμμα και αποτελέσματα αγώνων.' })

const matches = [
  { date: '20/07', home: 'ΑΕ Βιτσιου', away: 'Αντίπαλος Α', score: '', status: 'upcoming' },
  { date: '13/07', home: 'Αντίπαλος Β', away: 'ΑΕ Βιτσιου', score: '1 - 2', status: 'win' },
  { date: '06/07', home: 'ΑΕ Βιτσιου', away: 'Αντίπαλος Γ', score: '0 - 0', status: 'draw' },
  { date: '29/06', home: 'Αντίπαλος Δ', away: 'ΑΕ Βιτσιου', score: '3 - 1', status: 'loss' }
]

const statusColor = (s: string) =>
  s === 'win' ? 'success' : s === 'loss' ? 'error' : s === 'draw' ? 'warning' : 'secondary'
const statusLabel = (s: string) =>
  s === 'win' ? 'Νίκη' : s === 'loss' ? 'Ήττα' : s === 'draw' ? 'Ισοπαλία' : 'Επερχόμενος'
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12">
    <h1 class="mb-8 text-3xl font-bold text-primary-500">Αγώνες</h1>
    <div class="space-y-3">
      <UCard v-for="(m, i) in matches" :key="i">
        <div class="flex items-center gap-4">
          <span class="w-14 text-sm font-semibold text-muted">{{ m.date }}</span>
          <div class="flex flex-1 items-center justify-center gap-4">
            <span class="flex-1 text-right font-semibold">{{ m.home }}</span>
            <span class="rounded-md bg-elevated px-3 py-1 font-mono text-sm">{{ m.score || 'vs' }}</span>
            <span class="flex-1 font-semibold">{{ m.away }}</span>
          </div>
          <UBadge :color="statusColor(m.status)" variant="subtle">{{ statusLabel(m.status) }}</UBadge>
        </div>
      </UCard>
    </div>
  </div>
</template>
