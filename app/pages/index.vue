<template>
    <UPageSection>
      <section
        class="relative overflow-hidden rounded-3xl border border-primary-800/60 bg-linear-to-b from-primary-600 to-primary-900 p-8 text-white shadow-2xl sm:p-14"
      >
        <div class="flex flex-col items-center text-center">
          <UBadge color="warning" variant="subtle" class="mb-6 rounded-2xl uppercase tracking-widest">
            Ολοκληρώθηκε · {{ exists(stats?.lastMatches[0]) ? new Date(stats.lastMatches[0].date).toLocaleString('el-GR') : '-' }}
          </UBadge>
          <NuxtImg src="/logo.webp" alt="ΑΕ Βιτσιου" class="my-4 h-24 w-24 object-contain" />
          <h1 class="text-4xl font-black italic uppercase tracking-tight sm:text-6xl">ΑΕ ΒΙΤΣΙΟΥ</h1>
          <p class="mt-2 text-sm uppercase tracking-widest text-white/60">ΕΠΣ Καστοριάς - Κύπελο Καστοριάς</p>

          <div class="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Τελευταίος αγώνας</p>
            <div class="flex items-center justify-between gap-3">
              <span class="flex-1 truncate text-right font-semibold">{{ stats?.lastMatches[0]?.home ?? 'Χωρίς Όνομα'}}</span>
              <UBadge variant="subtle" size="xl" color="success">
                {{ stats?.lastMatches[0]?.hs ?? '-' }} – {{ stats?.lastMatches[0]?.as ?? '-' }}
              </UBadge>
              <span class="flex-1 truncate text-left font-semibold">{{ stats?.lastMatches[0]?.away ?? 'Χωρίς Όνομα' }}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <UPageFeature icon="lucide:bar-chart-3" title="Σε αριθμούς" description="Η ΧΡΟΝΙΑ ΣΕ ΝΟΥΜΕΡΑ"/>
        <UPageGrid class="lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4">
          <div
            class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-5 text-center"
          >
            <UIcon name="lucide:swords" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
            <p class="text-3xl font-black text-white">{{ stats?.totalMatches ?? '-' }}</p>
            <p class="mt-1 text-xs uppercase tracking-wider text-white/50">Αγώνες</p>
          </div>
          <div
            class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-5 text-center"
          >
            <UIcon name="famicons:football" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
            <p class="text-3xl font-black text-white">{{ stats?.wins ?? '-' }}</p>
            <p class="mt-1 text-xs uppercase tracking-wider text-white/50">Νίκες</p>
          </div>
          <div
            class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-5 text-center"
          >
            <UIcon name="maki:soccer-11" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
            <p class="text-3xl font-black text-white">{{stats?.totalGoals ?? '-'}}</p>
            <p class="mt-1 text-xs uppercase tracking-wider text-white/50">Γκολ</p>
          </div>
          <div
            class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-5 text-center"
          >
            <UIcon name="hugeicons:chart-average" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
            <p class="text-3xl font-black text-white">{{ stats?.avgGoals ?? '-' }}</p>
            <p class="mt-1 text-xs uppercase tracking-wider text-white/50">Μ.Ο. Γκολ / Αγώνα</p>
          </div>
          <div
            class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-5 text-center"
          >
            <UIcon name="lucide:flame" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
            <p class="text-3xl font-black text-white">{{ stats?.points ?? '-' }}</p>
            <p class="mt-1 text-xs uppercase tracking-wider text-white/50">Βαθμοί</p>
          </div>
          <div
            class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-5 text-center"
          >
            <UIcon name="lucide:trophy" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
            <p class="text-3xl font-black text-white">{{ stats?.titles ?? '-' }}</p>
            <p class="mt-1 text-xs uppercase tracking-wider text-white/50">Τίτλοι</p>
          </div>
        </UPageGrid>
      </section>

      <section>
        <UPageFeature icon="lucide:bar-chart-3" title="Μπάλα είναι και γυρίζει" description="ΟΙ ΤΕΛΕΥΤΑΙΟΙ 5 ΑΓΏΝΕΣ"/>
        <div v-if="exists(stats) && stats.lastMatches.length > 0" class="overflow-hidden rounded-2xl border divide-y divide-primary-800/40 border-primary-800/40 bg-primary-900/40">
          <div
            v-for="match in stats.lastMatches"
            :key="`thriller-match-${match.id}`"
            class="flex items-center justify-between gap-4 p-5 "
          >
            <div :data-team="match.home === 'ae_vitsiou'" class="group flex min-w-0 items-center gap-4">
              <span class="shrink-0 text-xs font-bold uppercase tracking-widest group-data-[team=false]:text-secondary-300 group-data-[team=true]:text-sucvess">{{ match.home }}</span>
              <span class="truncate text-white/80">vs</span>
              <span class="truncate text-white/80 group-data-[team=true]:text-secondary-300 group-data-[team=false]:text-success">{{match.away}}</span>
            </div>
            <span class="shrink-0 font-mono text-lg font-black text-white">{{match.hs}}-{{match.as}}</span>
          </div>
        </div>
        <UEmpty v-else :avatar="{icon: 'si-glyph:database-error', color: 'primary'}" variant="naked" title="Δεν βρέθηκαν παιχνίδια" :ui="{root: 'bg-primary-900/30 ring ring-primary-700', title: 'text-primary-300'}" />
      </section>

      <section>
        <UPageFeature icon="lucide:bar-chart-3" title="Σπάσε τα δύχτια" description="ΟΙ TOP ΣΚΟΡΕΡ ΤΗΣ ΟΜΑΔΑΣ"/>
        <div v-if="exists(stats) && stats.topScorers.length > 0" class="overflow-hidden rounded-2xl border divide-y divide-primary-800/40 border-primary-800/40 bg-primary-900/40">
          <div
            v-for="(scorer, i) in stats.topScorers"
            :key="`top-scorer-${scorer.id}`"
            class="flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-5"
            :class="i !== stats.topScorers.length - 1 ? 'border-b border-primary-800/40' : ''"
          >
            <div class="flex items-center gap-4 max-md:justify-center max-lg:w-full">
              <span class="w-6 text-sm font-bold text-white/40">{{ scorer.number }}</span>
              <UBadge
                size="lg"
                :color="PosColor[scorer.pos]"
                :label="scorer.pos"
                class="rounded-full min-w-12 justify-center"
              />
              <span class="truncate font-semibold uppercase tracking-wide text-white">
              {{ scorer.name }}
              <span v-if="scorer.isCaptain" class="text-xs text-orange-500">(c)</span>
            </span>
            </div>

            <div class="flex items-center gap-4 max-lg:justify-between max-lg:w-9/10">
              <span class="shrink-0 text-sm font-black text-secondary-300 uppercase tracking-wide">
                {{ positions[scorer.pos] }}
              </span>
              <UBadge size="md" variant="subtle" color="success" label="-" class="rounded-full" />
            </div>
          </div>
        </div>
        <UEmpty v-else :avatar="{icon: 'si-glyph:database-error', color: 'primary'}" variant="naked" title="Δεν βρέθηκαν παίχτες" :ui="{root: 'bg-primary-900/30 ring ring-primary-700', title: 'text-primary-300'}" />
      </section>

      <section class="pb-4">
        <UPageFeature icon="lucide:bar-chart-3" title="Φυγαμε για μουντιαλ" description="ΟΙ ΑΓΩΝΕΣ ΜΕ ΤΑ ΠΕΡΙΣΣΟΤΕΡΑ ΓΚΟΛ ΤΗΣ ΟΜΑΔΑΣ"/>
        <UPageGrid v-if="exists(stats) && stats.topScoredMatches.length > 0" class="lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <div
            v-for="match in stats.topScoredMatches"
            :key="`thriller-match-${match.id}`"
            class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-5"
          >
            <p class="mb-4 text-xs font-bold uppercase tracking-widest text-secondary-300">{{ match.hs }}</p>
            <div class="flex items-center justify-between">
              <span class="truncate font-semibold text-white">{{ match.home }}</span>
              <span class="font-mono font-black text-white">{{ match.hs }}</span>
            </div>
            <div class="mt-2 flex items-center justify-between">
              <span class="truncate font-semibold text-white/70">{{ match.away }}</span>
              <span class="font-mono font-black text-white/70">{{ match.as }}</span>
            </div>
          </div>
        </UPageGrid>
        <UEmpty v-else :avatar="{icon: 'si-glyph:database-error', color: 'primary'}" variant="naked" title="Δεν βρέθηκαν παιχνίδια" :ui="{root: 'bg-primary-900/30 ring ring-primary-700', title: 'text-primary-300'}" />
      </section>
    </UPageSection>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ΑΕ Βιτσιου — Αρχική',
  description: 'Καλωσήρθατε στην επίσημη ιστοσελίδα της ΑΕ Βιτσιου.'
})

const stats = ref<Stats>();

function getStats() {
  $fetch<ApiResponse<Stats>>('/api/get/stats')
    .then((resp) => {
      stats.value = resp.response
    })
}

getStats();
</script>
