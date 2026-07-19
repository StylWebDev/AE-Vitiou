<script setup lang="ts">
useSeoMeta({ title: 'ΑΕ Βιτσιου — Αγώνες', description: 'Πρόγραμμα και αποτελέσματα αγώνων.' })

const phase = ref('all')
//'live' | 'pending' | 'final' | 'all'
const tab = ref<string>('all')
const activeDay = ref<number>()

const phases = [
  { label: 'Ολα', value: 'all' },
  { label: 'Πρωτάθλημα', value: 'championship' },
  { label: 'Κύπελο', value: 'cup' }
]

const matches = reactive([
  {
    phase: 'cup',
    status: 'final',
    home: 'ΑΕ Βιτσιου',
    away: 'Thunder FC',
    hs: 7,
    as: 5,
    when: new Date('2025-01-22')
  },
  {
    phase: 'championship',
    status: 'live',
    home: 'ΑΕ Βιτσιου',
    away: 'Red Wolves',
    hs: 9,
    as: 10,
    when: new Date('2025-02-08')
  },
  {
    phase: 'cup',
    status: 'pending',
    home: 'ΑΕ Βιτσιου',
    away: 'Blue Eagles',
    hs: 0,
    as: 0,
    when: new Date('2025-03-17')
  },
  {
    phase: 'championship',
    status: 'final',
    home: 'ΑΕ Βιτσιου',
    away: 'Night Owls',
    hs: 14,
    as: 11,
    when: new Date('2025-04-30')
  },
  {
    phase: 'cup',
    status: 'live',
    home: 'ΑΕ Βιτσιου',
    away: 'Drink Team',
    hs: 6,
    as: 8,
    when: new Date('2025-05-12')
  },
  {
    phase: 'championship',
    status: 'pending',
    home: 'ΑΕ Βιτσιου',
    away: 'Falcon United',
    hs: 0,
    as: 0,
    when: new Date('2025-06-25')
  },
  {
    phase: 'cup',
    status: 'final',
    home: 'ΑΕ Βιτσιου',
    away: 'Iron Stars',
    hs: 13,
    as: 9,
    when: new Date('2025-08-19')
  },
  {
    phase: 'championship',
    status: 'live',
    home: 'ΑΕ Βιτσιου',
    away: 'Black Panthers',
    hs: 3,
    as: 4,
    when: new Date('2025-09-07')
  },
  {
    phase: 'cup',
    status: 'pending',
    home: 'ΑΕ Βιτσιου',
    away: 'Green Legends',
    hs: 0,
    as: 0,
    when: new Date('2025-10-18')
  },
  {
    phase: 'championship',
    status: 'final',
    home: 'ΑΕ Βιτσιου',
    away: 'Storm Breakers',
    hs: 15,
    as: 12,
    when: new Date('2025-12-11')
  }
])



const tabs = computed(() => [
  { key: 'live', label: 'LIVE', count: matches.filter(m => m.status === 'live').length },
  { key: 'pending', label: 'Επόμενα', count: matches.filter(m => m.status === 'pending').length  },
  { key: 'final', label: 'Ολοκληρωμένα', count: matches.filter(m => m.status === 'final').length  },
  { key: 'all', label: 'Όλα', count: matches.length  }
])

const filteredData = computed(() => {
  return matches.filter(match => {
    const phaseMatch =
      phase.value === 'all' || match.phase === phase.value

    const statusMatch =
      tab.value === 'all' ||
      (tab.value === 'live' && match.status === 'live') ||
      (tab.value === 'pending' && match.status === 'pending') ||
      (tab.value === 'final' && match.status === 'final')

    const dayMatch =
      activeDay.value == null ||
      match.when.getTime() === activeDay.value

    return phaseMatch && statusMatch && dayMatch
  })
})

const days = computed(() => {
  return matches.map(m => m.when)
})
</script>

<template>
  <UPageSection>
      <h1 class="mb-8 text-3xl font-black italic text-white sm:text-4xl">ΑΓΩΝΕΣ</h1>

      <USelect
        v-model="phase"
        :items="phases"
        size="lg"
        class="mb-4 w-full"
        :ui="{ base: 'bg-primary-900/40 ring-primary-800/50 text-white hover:bg-primary-700', content: 'bg-primary-800 ring-primary-500', item: 'text-primary-300', trailingIcon: 'text-primary-300' }"
      />

      <div class="mb-6 grid  md:grid-cols-4 overflow-hidden rounded-xl border border-primary-800/50 bg-primary-900/30">
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
        <UBadge
          size="lg"
          icon="lucide:calendar-days"
        >Ανά ημέρα</UBadge>
      </div>

      <!-- Day tabs -->
      <div class="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button
          v-for="day in days"
          :key="day.getTime()"
          type="button"
          class="flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition"
          :class="activeDay === day.getTime()
            ? 'border-secondary-400 bg-secondary-500/20 text-white'
            : 'border-primary-800/50 bg-primary-900/30 text-white/60 hover:text-white'"
          @click="activeDay = day.getTime()"
        >
          {{ day.getDate()}}/{{day.getMonth()+1}}/{{ day.getFullYear()}}
        </button>
      </div>

      <!-- Match cards -->
      <div v-if="filteredData.length" class="space-y-4">
        <UCard
          v-for="(m, i) in filteredData"
          :key="i"
          :ui="{ root: 'bg-primary-900/40 ring-primary-800/50', body: 'p-6' }"
        >
          <div class="mb-5 flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-widest text-primary-300">{{ phases.find(phase => phase.value === m.phase)?.label }}</span>
            <UBadge color="secondary" variant="subtle" size="sm">{{ tabs.find(tab => tab.key === m.status)?.label  }}</UBadge>
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
          <UBadge variant="subtle" size="sm" color="warning" class="block mx-auto w-fit">{{ m.when.toLocaleString('el-GR') }}</UBadge>
        </UCard>
      </div>

      <UEmpty v-else :avatar="{icon: 'si-glyph:database-error', color: 'primary'}" variant="naked" title="Δεν βρέθηκαν παιχνίδια με βάση την αναζήτηση σας" :ui="{title: 'text-primary-300'}" />
  </UPageSection>
</template>
