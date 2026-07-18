<script setup lang="ts">
useSeoMeta({
  title: 'ΑΕ Βιτσιου — Αρχική',
  description: 'Καλωσήρθατε στην επίσημη ιστοσελίδα της ΑΕ Βιτσιου.'
})

const champion = {
  club: 'ΑΕ Βιτσιου',
  tournament: 'ΕΠΣ Καστοριάς - Κύπελο Καστοριάς',
  final: { home: 'ΑΕ Βιτσιου', away: 'Αντίπαλος ΦΣ', hs: 3, as: 1 },
  period: '15–23 Μαΐου 2026'
}

const stats = [
  { icon: 'lucide:users', value: '16', label: 'Ομάδες' },
  { icon: 'lucide:swords', value: '43', label: 'Αγώνες' },
  { icon: 'maki:soccer-11', value: '128', label: 'Γκολ' },
  { icon: 'lucide:flame', value: '3.0', label: 'Μ.Ο. Γκολ/Αγώνα' },
  { icon: 'lucide:trophy', value: '1', label: 'Τίτλος' },
  { icon: 'lucide:calendar', value: '9', label: 'Ημέρες Δράσης' }
]

const road = [
  { round: 'Προημιτελικός', opp: 'Νικολάου FC', score: '5–1' },
  { round: 'Ημιτελικός', opp: 'Drink Team', score: '3–2' },
  { round: 'Τελικός', opp: 'Αντίπαλος ΦΣ', score: '3–1' }
]

const scorers = [
  { rank: 1, name: 'Σπύρος Καραβασιλης', club: 'ΑΕ Βιτσιου', goals: 18 },
  { rank: 2, name: 'Θωμάς Σταμούλης', club: 'ΑΕ Βιτσιου', goals: 12 },
  { rank: 3, name: 'Μιχάλης Μίχος', club: 'ΑΕ Βιτσιου', goals: 9 },
  { rank: 4, name: 'Βαγγέλης Γακιας', club: 'ΑΕ Βιτσιου', goals: 7 },
  { rank: 5, name: 'Βασίλης Εστιαδης', club: 'ΑΕ Βιτσιου', goals: 6 }
]

const thrillers = [
  { total: '7 Γκολ', a: 'ΑΕ Βιτσιου', b: 'Drink Team', as: 4, bs: 3 },
  { total: '6 Γκολ', a: 'ΑΕ Βιτσιου', b: 'Νικολάου FC', as: 5, bs: 1 },
  { total: '5 Γκολ', a: 'Δόξα', b: 'Xavalencia', as: 3, bs: 2 }
]
</script>

<template>
    <UPageSection>
      <section
        class="relative overflow-hidden rounded-3xl border border-primary-800/60 bg-linear-to-b from-primary-600 to-primary-900 p-8 text-white shadow-2xl sm:p-14"
      >
        <div class="flex flex-col items-center text-center">
          <UBadge color="warning" variant="subtle" class="mb-6 rounded-2xl uppercase tracking-widest">
            Ολοκληρώθηκε · {{ champion.period }}
          </UBadge>
          <NuxtImg src="/logo.webp" alt="ΑΕ Βιτσιου" class="my-4 h-24 w-24 object-contain" />
          <h1 class="text-4xl font-black italic uppercase tracking-tight sm:text-6xl">{{ champion.club }}</h1>
          <p class="mt-2 text-sm uppercase tracking-widest text-white/60">{{ champion.tournament }}</p>

          <div class="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Τελευταίος αγώνας</p>
            <div class="flex items-center justify-between gap-3">
              <span class="flex-1 truncate text-right font-semibold">{{ champion.final.home }}</span>
              <UBadge variant="subtle" size="xl" color="success">
                {{ champion.final.hs }} – {{ champion.final.as }}
              </UBadge>
              <span class="flex-1 truncate text-left font-semibold">{{ champion.final.away }}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <UPageFeature icon="lucide:bar-chart-3" title="Σε αριθμούς" description="Η ΧΡΟΝΙΑ ΣΕ ΝΟΥΜΕΡΑ"/>
        <UPageGrid class="lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4">
          <div
            v-for="s in stats"
            :key="s.label"
            class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-5 text-center"
          >
            <UIcon :name="s.icon" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
            <p class="text-3xl font-black text-white">{{ s.value }}</p>
            <p class="mt-1 text-xs uppercase tracking-wider text-white/50">{{ s.label }}</p>
          </div>
        </UPageGrid>
      </section>

      <section>
        <UPageFeature icon="lucide:bar-chart-3" title="Μπάλα είναι και γυρίζει" description="ΟΙ ΤΕΛΕΥΤΑΙΟΙ 5 ΑΓΏΝΕΣ"/>
        <div class="overflow-hidden rounded-2xl border divide-y divide-primary-800/40 border-primary-800/40 bg-primary-900/40">
          <div
            v-for="r in road"
            :key="r.round"
            class="flex items-center justify-between gap-4 p-5 "
          >
            <div class="flex min-w-0 items-center gap-4">
              <span class="shrink-0 text-xs font-bold uppercase tracking-widest text-secondary-300">{{ r.round }}</span>
              <span class="truncate text-white/80">vs {{ r.opp }}</span>
            </div>
            <span class="shrink-0 font-mono text-lg font-black text-white">{{ r.score }}</span>
          </div>
        </div>
      </section>

      <section>
        <UPageFeature icon="lucide:bar-chart-3" title="Σπάσε τα δύχτια" description="ΟΙ ΣΚΟΡΕΡ ΤΗΣ ΟΜΑΔΑΣ"/>
        <div class="overflow-hidden rounded-2xl border divide-y divide-primary-800/40 border-primary-800/40 bg-primary-900/40">
          <div
            v-for="s in scorers"
            :key="s.rank"
            class="flex items-center gap-4 p-5"
          >
            <span class="w-6 text-lg font-black text-secondary-300">{{ s.rank }}</span>
            <div class="min-w-0 flex-1">
              <p class="truncate font-bold text-white">{{ s.name }}</p>
              <p class="truncate text-xs text-white/50">{{ s.club }}</p>
            </div>
            <div class="shrink-0 text-right">
              <p class="text-2xl font-black text-secondary-300">{{ s.goals }}</p>
              <p class="text-[10px] uppercase tracking-wider text-white/40">Γκολ</p>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-4">
        <UPageFeature icon="lucide:bar-chart-3" title="Φυγαμε για μουντιαλ" description="ΟΙ ΑΓΩΝΕΣ ΜΕ ΤΑ ΠΕΡΙΣΣΟΤΕΡΑ ΓΚΟΛ"/>
        <UPageGrid class="lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <div
            v-for="(t, i) in thrillers"
            :key="i"
            class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-5"
          >
            <p class="mb-4 text-xs font-bold uppercase tracking-widest text-secondary-300">{{ t.total }}</p>
            <div class="flex items-center justify-between">
              <span class="truncate font-semibold text-white">{{ t.a }}</span>
              <span class="font-mono font-black text-white">{{ t.as }}</span>
            </div>
            <div class="mt-2 flex items-center justify-between">
              <span class="truncate font-semibold text-white/70">{{ t.b }}</span>
              <span class="font-mono font-black text-white/70">{{ t.bs }}</span>
            </div>
          </div>
        </UPageGrid>
      </section>
    </UPageSection>
</template>
