<template>
  <UPageSection class="bg-primary-950 min-h-screen">
      <h1 class="mb-10 font-black italic text-center text-white text-5xl">ΠΡΩΤΟΙ 10 ΣΚΟΡΕΡ</h1>

      <template v-if="scorers.length > 0">
        <div  class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            v-for="(scorer, i) in scorers.slice(0, 3)"
            :key="`scorer-${scorer.player.id}`"
            :data-rank="i+1"
            class="group relative rounded-2xl data-[rank=1]:sm:-translate-y-3  data-[rank=1]:sm:scale-105 data-[rank=1]:ring-info data-[rank=1]:shadow-info/60 data-[rank=2]:ring-success data-[rank=2]:shadow-success/40 data-[rank=3]:ring-secondary data-[rank=3]:shadow-secondary/60  shadow-[0_0_40px_-8px] border bg-primary-900/40 px-6 pb-6 pt-10 text-center ring-1"
          >
            <UIcon
              name="lucide:medal"
              class="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 group-data-[rank=1]:text-info-300 group-data-[rank=2]:text-success-200 group-data-[rank=3]:text-secondary-200"
            />
            <img src="/logo.webp" alt="ae_vitsiou_img" class="mx-auto mb-3 h-14 w-14 object-contain" >
            <p class="text-sm font-bold uppercase tracking-wide text-white">{{ scorer.player.name }}</p>
            <p class="mt-1 text-[11px] uppercase tracking-widest text-warning">{{positions[scorer.player.pos]}}</p>
            <p
              class="group-data-[rank=1]:text-info-300 group-data-[rank=2]:text-success-200 group-data-[rank=3]:text-secondary-200   mt-3 text-3xl font-black"
            >
              {{ scorer.ga  }}
            </p>
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl border border-primary-800/40 bg-primary-900/30">
          <div
            v-for="(scorer, i) in scorers.slice(3)"
            :key="`scorer-${scorer.player.id}`"
            class="flex items-center gap-4 px-6 py-5"
            :class="i !== scorers.slice(3).length - 1 ? 'border-b border-primary-800/40' : ''"
          >
            <span class="w-6 text-sm font-bold text-white/40">{{ i+3 }}</span>
            <span
              :data-dot="dotKey(i + 3)"
              class="h-2.5 w-2.5 shrink-0 rounded-full data-[dot=a]:bg-primary-400 data-[dot=b]:bg-primary-300 data-[dot=c]:bg-secondary-400"
            />
            <div class="min-w-0 flex-1">
              <p class="truncate font-bold text-white ">{{ scorer.player.name }}</p>
              <p class="truncate text-xs text-warning">{{positions[scorer.player.pos]}}</p>
            </div>
            <span class="shrink-0 text-lg font-black text-secondary-300">{{ scorer.ga }}</span>
          </div>
        </div>
      </template>
      <UEmpty v-else :avatar="{icon: 'si-glyph:database-error', color: 'primary'}" variant="naked" title="Δεν βρέθηκαν δεδομένα στη βάση" :ui="{root: 'bg-primary-900/30 ring ring-primary-700 h-[60vh]', title: 'text-primary-300'}" />
  </UPageSection>
</template>

<script lang="ts">
interface Scorer {
  player: Player;
  ga: number;
}
</script>

<script setup lang="ts">
useSeoMeta({ title: 'ΑΕ Βιτσιου — Σκόρερ', description: 'Οι πρώτοι σκόρερ της διοργάνωσης.' })

const scorers = ref<Scorer[]>([])

function dotKey(rank: number) {
  if (rank <= 5) return 'a'      // bg-primary-400
  if (rank <= 7) return 'b'      // bg-primary-300
  return 'c'                     // bg-secondary-400
}

function getScorers() {
  $fetch<ApiResponse<Scorer[]>>('api/get/scorers')
    .then((resp) => {
      scorers.value = resp.response
    })
}

getScorers()
</script>
