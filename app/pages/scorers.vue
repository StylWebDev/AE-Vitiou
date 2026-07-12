<script setup lang="ts">
useSeoMeta({ title: 'ΑΕ Βιτσιου — Σκόρερ', description: 'Οι πρώτοι σκόρερ της διοργάνωσης.' })

const podium = [
  { rank: 2, name: 'Θωμάς Σταμούλης', club: 'ΑΕ Βιτσιου', goals: 36, medal: 'silver' },
  { rank: 1, name: 'Σπύρος Καραβασιλης', club: 'ΑΕ Βιτσιου', goals: 38, medal: 'gold' },
  { rank: 3, name: 'Μιχάλης Μίχος', club: 'ΑΕ Βιτσιου', goals: 29, medal: 'bronze' }
]

const rest = [
  { rank: 4, name: 'Βαγγέλης Γακιας', goals: 24, dot: 'bg-primary-400' },
  { rank: 5, name: 'Βασίλης Εστιαδης', goals: 24, dot: 'bg-primary-400' },
  { rank: 6, name: 'Νικόλας Τσαδηλας', goals: 23, dot: 'bg-primary-300' },
  { rank: 7, name: 'Απόστολος Ρεβησιος', goals: 21, dot: 'bg-primary-300' },
  { rank: 8, name: 'Στάθης Αλεξανδρίδης', goals: 15, dot: 'bg-secondary-400' },
  { rank: 9, name: 'Γιώργος Τσαμτσάκης', goals: 14, dot: 'bg-secondary-400' },
  { rank: 10, name: 'Διονύσης Λιόλιος', goals: 14, dot: 'bg-secondary-400' }
]
</script>

<template>
  <div class="bg-primary-950 min-h-screen">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h1 class="mb-10 font-black italic text-center text-white text-5xl">ΠΡΩΤΟΙ 10 ΣΚΟΡΕΡ</h1>

      <!-- Podium top 3 -->
      <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div
          v-for="p in podium"
          :key="p.rank"
          :data-rank="p.rank"
          class="group relative rounded-2xl data-[rank=1]:sm:-translate-y-3  data-[rank=1]:sm:scale-105 data-[rank=1]:ring-info data-[rank=1]:shadow-info/60 data-[rank=2]:ring-success data-[rank=2]:shadow-success/40 data-[rank=3]:ring-secondary data-[rank=3]:shadow-secondary/60  shadow-[0_0_40px_-8px] border bg-primary-900/40 px-6 pb-6 pt-10 text-center ring-1"
        >
          <UIcon
            name="lucide:medal"
            class="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 group-data-[rank=1]:text-info-300 group-data-[rank=2]:text-success-200 group-data-[rank=3]:text-secondary-200"
          />
          <img src="/logo.webp" :alt="p.club" class="mx-auto mb-3 h-14 w-14 object-contain" />
          <p class="text-sm font-bold uppercase tracking-wide text-white">{{ p.name }}</p>
          <p class="mt-1 text-[11px] uppercase tracking-widest text-white/40">{{ p.club }}</p>
          <p
            class="group-data-[rank=1]:text-info-300 group-data-[rank=2]:text-success-200 group-data-[rank=3]:text-secondary-200   mt-3 text-3xl font-black"
          >
            {{ p.goals }}
          </p>
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-primary-800/40 bg-primary-900/30">
        <div
          v-for="(s, i) in rest"
          :key="s.rank"
          class="flex items-center gap-4 px-6 py-5"
          :class="i !== rest.length - 1 ? 'border-b border-primary-800/40' : ''"
        >
          <span class="w-6 text-sm font-bold text-white/40">{{ s.rank }}</span>
          <span class="h-2.5 w-2.5 shrink-0 rounded-full" :class="s.dot" />
          <span class="flex-1 truncate font-semibold uppercase tracking-wide text-white">{{ s.name }}</span>
          <span class="shrink-0 text-lg font-black text-secondary-300">{{ s.goals }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
