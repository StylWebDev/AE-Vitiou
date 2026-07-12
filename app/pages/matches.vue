<script setup lang="ts">
useSeoMeta({ title: 'ΑΕ Βιτσιου — Αγώνες', description: 'Πρόγραμμα και αποτελέσματα αγώνων.' })

const search = ref('')
const phase = ref('all')
const tab = ref<'live' | 'upcoming' | 'done' | 'all'>('done')
const activeDay = ref('15/05')

const phases = [
  { label: 'Ολα', value: 'all' },
  { label: 'Πρωτάθλημα', value: 'cup' },
  { label: 'Κύπελο', value: 'cup' }
]

const tabs = [
  { key: 'live', label: 'LIVE', count: 0 },
  { key: 'upcoming', label: 'Επόμενα', count: 0 },
  { key: 'done', label: 'Ολοκληρωμένα', count: 43 },
  { key: 'all', label: 'Όλα', count: 43 }
] as const

const days = [
  { label: 'Κυρ 24 Μαΐ', count: 1 },
  { label: 'Σάβ 23 Μαΐ', count: 1 },
  { label: 'Παρ 22 Μαΐ', count: 1 },
  { label: 'Πέμ 21 Μαΐ', count: 1 },
  { label: 'Τετ 20 Μαΐ', count: 1 },
  { label: 'Τρί 19 Μαΐ', count: 1 },
  { label: 'Δευ 18 Μαΐ', count: 1 },
  { label: 'Κυρ 17 Μαΐ', count: 1 },
  { label: 'Σάβ 16 Μαΐ', count: 1 },
  { label: 'Παρ 15 Μαΐ', count: 1, key: '15/05' }
]

const view = ref<'day' | 'list'>('day')

const matches = [
  { phase: 'Πρωτάθλημα', status: 'ΤΕΛΙΚΟ', home: 'ΑΕ Βιτσιου', away: 'Drink Team', hs: 4, as: 12, when: 'Παρ 15 Μαΐ · 22:00' },
 ]
</script>

<template>
  <div class="bg-primary-950 min-h-screen">
    <div class="mx-auto max-w-4xl px-4 py-12">
      <h1 class="mb-8 text-3xl font-black italic text-white sm:text-4xl">ΑΓΩΝΕΣ</h1>

      <USelect
        v-model="phase"
        :items="phases"
        size="lg"
        class="mb-4 w-full"
        :ui="{ base: 'bg-primary-900/40 ring-primary-800/50 text-white' }"
      />

      <div class="mb-6 grid grid-cols-4 overflow-hidden rounded-xl border border-primary-800/50 bg-primary-900/30">
        <button
          v-for="t in tabs"
          :key="t.key"
          type="button"
          class="flex items-center justify-center gap-2 py-3 text-sm font-semibold transition"
          :class="tab === t.key ? 'bg-primary-600 text-white' : 'text-white/60 hover:text-white'"
          @click="tab = t.key"
        >
          {{ t.label }}
          <span
            class="rounded-md px-1.5 text-xs"
            :class="tab === t.key ? 'bg-white/20 text-white' : 'bg-primary-800/60 text-white/50'"
          >{{ t.count }}</span>
        </button>
      </div>

      <!-- View toggle -->
      <div class="mb-4 flex justify-end gap-2">
        <UButton
          size="sm"
          :color="view === 'day' ? 'primary' : 'neutral'"
          :variant="view === 'day' ? 'solid' : 'ghost'"
          icon="lucide:calendar-days"
          @click="view = 'day'"
        >Ανά ημέρα</UButton>
        <UButton
          size="sm"
          :color="view === 'list' ? 'primary' : 'neutral'"
          :variant="view === 'list' ? 'solid' : 'ghost'"
          icon="lucide:list"
          @click="view = 'list'"
        >Λίστα</UButton>
      </div>

      <!-- Day tabs -->
      <div class="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button
          v-for="d in days"
          :key="d.label"
          type="button"
          class="flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition"
          :class="activeDay === (d.key || d.label)
            ? 'border-secondary-400 bg-secondary-500/20 text-white'
            : 'border-primary-800/50 bg-primary-900/30 text-white/60 hover:text-white'"
          @click="activeDay = d.key || d.label"
        >
          {{ d.label }}
          <span class="text-xs text-white/40">{{ d.count }}</span>
        </button>
      </div>

      <!-- Match cards -->
      <div class="space-y-4">
        <UCard
          v-for="(m, i) in matches"
          :key="i"
          :ui="{ root: 'bg-primary-900/40 ring-primary-800/50', body: 'p-6' }"
        >
          <div class="mb-5 flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-widest text-primary-300">{{ m.phase }}</span>
            <UBadge color="secondary" variant="subtle" size="sm">{{ m.status }}</UBadge>
          </div>
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-1 flex-col items-center gap-3 text-center">
              <img src="/logo.webp" :alt="m.home" class="h-12 w-12 object-contain" />
              <span class="text-xs font-semibold uppercase tracking-wide text-white">{{ m.home }}</span>
            </div>
            <div class="flex shrink-0 items-center gap-2 text-3xl font-black text-white">
              <span>{{ m.hs }}</span>
              <span class="text-white/40">:</span>
              <span>{{ m.as }}</span>
            </div>
            <div class="flex flex-1 flex-col items-center gap-3 text-center">
              <img src="/logo.webp" :alt="m.away" class="h-12 w-12 object-contain" />
              <span class="text-xs font-semibold uppercase tracking-wide text-white">{{ m.away }}</span>
            </div>
          </div>
          <p class="mt-5 text-center text-xs text-white/40">{{ m.when }}</p>
        </UCard>
      </div>
    </div>
  </div>
</template>
