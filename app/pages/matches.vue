<template>
  <UPageSection :ui="{container: 'gap-2 sm:gap-2 lg:gap-2'}">
      <h1 class="mb-8 text-3xl font-black italic text-white sm:text-4xl">ΑΓΩΝΕΣ</h1>

      <USelect
        v-model="phase"
        :items="competitions"
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

      <div class="space-y-2">
        <div class="mb-4 flex justify-end gap-2">
          <UBadge
            size="lg"
            icon="lucide:calendar-days"
          >Ανά ημέρα</UBadge>
          <MatchAdd v-if="loggedIn" @refresh="getMatches()">
            <UButton variant="subtle" icon="material-symbols:add-2"/>
          </MatchAdd>
        </div>

        <!-- Day tabs -->
        <div v-if="days.length > 0" class="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="day in days"
            :key="day"
            type="button"
            class="flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition"
            :class="activeDay === day
                  ? 'border-secondary-400 bg-secondary-500/20 text-white'
                  : 'border-primary-800/50 bg-primary-900/30 text-white/60 hover:text-white'"
            @click="activeDay = day"
          >
            {{ new Date(day).getDate()}}/{{new Date(day).getMonth()+1}}/{{ new Date(day).getFullYear()}}
          </button>
        </div>
        <p v-else class="border-primary-800/50 bg-primary-900/30 w-full text-center text-primary-100 ring ring-primary-700 py-3 rounded-xl">Δεν βρέθηκαν Προγραμματισμένες Ημ/νιες</p>

      </div>


      <!-- Match cards -->
      <div v-if="filteredData.length" class="space-y-4">
        <UCard
          v-for="m in filteredData"
          :key="`match-${m.id}`"
          :ui="{ root: 'bg-primary-900/40 ring-primary-800/50', body: 'p-6' }"
        >
          <div class="mb-5 flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-widest text-primary-300">{{ competitions.find(comp => comp.value === m.competition)?.label }}</span>
           <div class="flex gap-2">
             <UBadge color="secondary" variant="subtle" size="sm">{{ tabs.find(tab => tab.key === m.status)?.label  }}</UBadge>
             <MatchEdit v-if="loggedIn" :match="m" @refresh="getMatches()" >
               <UButton size="sm" variant="ghost" icon="material-symbols:edit-rounded"/>
             </MatchEdit>
             <MatchDelete v-if="loggedIn" :match-id="m.id" @refresh="getMatches()" >
               <UButton size="sm" variant="ghost" icon="material-symbols:delete-rounded"/>
             </MatchDelete>
           </div>
          </div>
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-1 flex-col items-center gap-3 text-center">
              <img :src="teams.find(t => t.value === m.home)?.icon" :alt="m.home" class="h-12 w-12 object-cover" />
              <span class="text-xs font-semibold uppercase tracking-wide text-white">{{ teams.find(t => t.value === m.home)?.label  }}</span>
            </div>
            <div class="flex shrink-0 items-center gap-2 text-3xl font-black text-white">
              <span>{{ m.status === 'pending' ? '-' : m.hs }}</span>
              <span class="text-white/40">:</span>
              <span>{{ m.status === 'pending' ? '-' : m.as }}</span>
            </div>
            <div class="flex flex-1 flex-col items-center gap-3 text-center">
              <img :src="teams.find(t => t.value === m.away)?.icon" :alt="m.away" class="h-12 w-12 object-cover rounded-full" />
              <span class="text-xs font-semibold uppercase tracking-wide text-white">{{ teams.find(t => t.value === m.away)?.label  }}</span>
            </div>
          </div>
          <UBadge variant="subtle" size="sm" color="warning" class="block mx-auto w-fit">{{ new Date(m.date).toLocaleString('el-GR') }}</UBadge>
        </UCard>
      </div>

      <UEmpty v-else :avatar="{icon: 'si-glyph:database-error', color: 'primary'}" variant="naked"  title="Δεν βρέθηκαν παιχνίδια με βάση την αναζήτηση σας" :ui="{ title: 'text-primary-300'}" />
  </UPageSection>
</template>

<script setup lang="ts">
import teams from '~/assets/teams.json';

useSeoMeta({ title: 'ΑΕ Βιτσιου — Αγώνες', description: 'Πρόγραμμα και αποτελέσματα αγώνων.' })

const {loggedIn} = useUserSession()
const phase = ref('all')
const tab = ref<string>('all')
const activeDay = ref<number>()

const competitions = [
  { label: 'Ολα', value: 'all' },
  { label: 'Πρωτάθλημα', value: 'championship' },
  { label: 'Κύπελο', value: 'cup' }
]

const tabs = computed(() => [
  { key: 'live', label: 'LIVE', count: matches.value.filter(m => m.status === 'live').length },
  { key: 'pending', label: 'Επόμενα', count: matches.value.filter(m => m.status === 'pending').length  },
  { key: 'final', label: 'Ολοκληρωμένα', count: matches.value.filter(m => m.status === 'final').length  },
  { key: 'all', label: 'Όλα', count: matches.value.length  }
])

const matches = ref<Match[]>([])
const filteredData = computed(() => {
  return matches.value.filter(match => {
    const phaseMatch =
      phase.value === 'all' || match.status === phase.value

    const statusMatch =
      tab.value === 'all' ||
      (tab.value === 'live' && match.status === 'live') ||
      (tab.value === 'pending' && match.status === 'pending') ||
      (tab.value === 'final' && match.status === 'final')

    const dayMatch =
      activeDay.value == null ||
      match.date === activeDay.value

    return phaseMatch && statusMatch && dayMatch
  })
})


const days = computed(() => {
  return matches.value.map(m => m.date)
})

function getMatches() {
  $fetch<ApiResponse<Match[]>>('/api/get/matches')
    .then((resp) => {
        matches.value = resp.response
    })
}

getMatches();

</script>
