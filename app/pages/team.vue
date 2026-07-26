<template>
  <UPageSection >
      <!-- Header -->
      <UPageHeader title="ΑΕ ΒΙΤΣΙΟΥ" description="Το ρόστερ, η ιστορία και τα στατιστικά της ομάδας μας. Από το 1978 μέχρι σήμερα, με μεράκι και πάθος στο χωριό μας." class="border-b-primary-300" :ui="{title: 'text-primary-300', description: 'text-white'}"/>
    <!-- Stats -->
    <section>
      <div class="mb-6 flex items-center gap-2 text-primary-300">
        <UIcon name="lucide:bar-chart-3" class="h-5 w-5" />
        <span class="text-xs font-bold uppercase tracking-widest">Στατιστικά</span>
      </div>
      <h2 class="mb-8 text-2xl font-black italic text-white">Ο ΣΥΛΛΟΓΟΣ ΣΕ ΝΟΥΜΕΡΑ</h2>

      <!-- Top KPI cards -->
      <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-6 text-center">
          <UIcon name="lucide:trophy" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
          <p class="text-4xl font-black text-white">{{ stats?.titles ?? '-' }}</p>
          <p class="mt-1 text-xs uppercase tracking-widest text-white/50">Τίτλοι</p>
        </div>
        <div class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-6 text-center">
          <UIcon name="tabler:soccer-field" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
          <p class="text-4xl font-black text-white"> {{stats?.totalMatches ?? '-'}} </p>
          <p class="mt-1 text-xs uppercase tracking-widest text-white/50">Παιχνίδια</p>
        </div>
        <div class="rounded-2xl border border-primary-800/40 bg-primary-900/40 p-6 text-center">
          <UIcon name="hugeicons:chart-average" class="mx-auto mb-3 h-6 w-6 text-secondary-300" />
          <p class="text-4xl font-black text-white">{{ stats?.avgGoals.toFixed(1) ?? '-'}}</p>
          <p class="mt-1 text-xs uppercase tracking-widest text-white/50">Μ.Ο. Γκολ / Αγώνα</p>
        </div>
      </div>
    </section>

    <!-- Football pitch (your existing component) -->
    <section>
      <div class="mb-6 flex items-center gap-2 text-primary-300">
        <UIcon name="streamline-ultimate:soccer-field-bold" class="h-5 w-5" />
        <span class="text-xs font-bold uppercase tracking-widest">Βασική ενδεκάδα</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="mb-6 text-2xl font-black italic text-white">ΤΟ ΣΧΗΜΑ ΜΑΣ</h2>
        <FormationSet v-if="loggedIn" :players="players" :football-schema="formation" @refresh="getFormation()">
          <UButton size="sm" variant="ghost" icon="material-symbols:edit-rounded"/>
        </FormationSet>
      </div>
      <div class="overflow-hidden rounded-2xl border border-primary-800/40 bg-primary-900/30 p-2 sm:p-4">
        <LayoutsSoccerField
          :orientation="lgAndDown ? 'portrait' : 'landscape'"
          :receivers="fieldPlayers"
          :receiver-system="formation.formation"
          class="w-full h-125"
        />
      </div>
    </section>

    <!-- Roster list -->
    <section>
      <div class="mb-6 flex items-center gap-2 text-primary-300">
        <UIcon name="lucide:list" class="h-5 w-5" />
        <span class="text-xs font-bold uppercase tracking-widest">Ρόστερ</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="mb-6 text-2xl font-black italic text-white">ΠΑΙΚΤΕΣ</h2>
        <PlayersAdd v-if="loggedIn" @refresh="getPlayers()">
          <UButton variant="subtle" icon="material-symbols:add-2"/>
        </PlayersAdd>
      </div>

      <div v-if="players.length > 0" class="overflow-hidden rounded-2xl border border-primary-800/40 bg-primary-900/30">
        <div
          v-for="(s, i) in players"
          :key="s.number"
          class="flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-5"
          :class="i !== players.length - 1 ? 'border-b border-primary-800/40' : ''"
        >
          <div class="flex items-center gap-4 max-md:justify-center max-lg:w-full">
            <span class="w-6 text-sm font-bold text-white/40">{{ s.number }}</span>
            <UBadge
              size="lg"
              :color="PosColor[s.pos]"
              :label="s.pos"
              class="rounded-full min-w-12 justify-center"
            />
            <span class="truncate font-semibold uppercase tracking-wide text-white">
              {{ s.name }}
              <span v-if="s.isCaptain" class="text-xs text-orange-500">(c)</span>
            </span>
          </div>

          <div class="flex items-center gap-4 max-lg:justify-between max-lg:w-9/10">
              <span class="shrink-0 text-sm font-black text-secondary-300 uppercase tracking-wide">
                {{ positions[s.pos] }}
              </span>
            <div class="flex">
              <UBadge size="md" variant="subtle" color="success" label="-" class="rounded-full" />
              <PlayersEdit v-if="loggedIn" :player="s" @refresh="getPlayers()">
                <UButton size="sm" variant="ghost" icon="material-symbols:edit-rounded"/>
              </PlayersEdit>
              <PlayersDelete v-if="loggedIn" :player-id="s.id" @refresh="getPlayers()">
                <UButton size="sm" variant="ghost" icon="material-symbols:delete-rounded"/>
              </PlayersDelete>
            </div>

          </div>
        </div>
      </div>
      <UEmpty v-else :avatar="{icon: 'si-glyph:database-error', color: 'primary'}" variant="naked" title="Δεν βρέθηκαν παίχτες με βάση την αναζήτηση σας" :ui="{root: 'bg-primary-900/30 ring ring-primary-700', title: 'text-primary-300'}" />
    </section>


    <section>
      <div class="mb-6 flex items-center gap-2 text-primary-300">
        <UIcon name="lucide:history" class="h-5 w-5" />
        <span class="text-xs font-bold uppercase tracking-widest">Η ιστορία μας</span>
      </div>
      <h2 class="mb-10 text-2xl font-black italic text-white">ΑΠΟ ΤΟ 1978 ΜΕΧΡΙ ΣΗΜΕΡΑ</h2>

      <div class="relative">
        <!-- vertical line -->
        <div
          class="absolute left-4 top-0 bottom-0 w-px bg-linear-to-b from-secondary-500/60 via-primary-700/60 to-transparent md:left-1/2"
        />

        <div class="space-y-12">
          <div
            v-for="(t, i) in timeline"
            :key="t.year"
            :data-odd="i % 2 === 0"
            class="relative group data-[odd=false]:md:[&>*:first-child]:col-start-2 md:grid md:grid-cols-2 md:gap-10 "
          >
            <!-- dot -->
            <span
              class="absolute left-4 top-4 -translate-x-1/2 h-3 w-3 rounded-full bg-secondary-400 ring-4 ring-primary-950 group-data-[odd=false]:md:-left-5 group-data-[odd=true]:md:left-1/2"
            />

            <!-- content -->
            <div
              class="ml-10 md:ml-0 rounded-2xl border border-primary-800/50 bg-primary-900/40 p-6"
              :class="i % 2 === 0 ? 'md:mr-6 md:text-right' : 'md:ml-6'"
            >
              <p class="text-xs font-bold uppercase tracking-widest text-secondary-300">{{ t.year }}</p>
              <h3 class="mt-2 text-xl font-black italic text-white">{{ t.title }}</h3>
              <p class="mt-3 text-sm leading-relaxed break-all text-white/70">{{ t.text }}</p>
            </div>

            <!-- image -->
            <div
              class="ml-10 mt-4 md:ml-0 md:mt-0 overflow-hidden rounded-2xl border border-primary-800/50 bg-primary-900/40"
              :class="i % 2 === 0 ? 'md:ml-6' : 'md:mr-6 md:col-start-1 md:row-start-1'"
            >
              <img
                :src="t.image"
                :alt="`ΑΕ Βιτσιου — ${t.year}`"
                class="aspect-4/3 w-full object-cover opacity-90"
                onerror="this.style.display='none'; this.parentElement.classList.add('flex','items-center','justify-center','aspect-[4/3]'); this.parentElement.innerHTML='<span class=\'text-white/30 text-xs uppercase tracking-widest\'>Φωτογραφία ομάδας</span>'"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </UPageSection>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ΑΕ Βιτσιου — Η Ομάδα',
  description: 'Το ρόστερ, η ιστορία και τα στατιστικά της ΑΕ Βιτσιου.'
})

const {loggedIn} = useUserSession()

const breakpoints = useBreakpoints(breakpointsTailwind);
const lgAndDown = breakpoints.smallerOrEqual('md')
const stats = ref<Stats>()
const formation = ref<FormationResponse>({
  formation: 'S433',
  players: '[]'
})
const players = ref<Player[]>([])

const fieldPlayers = computed(() => {
  return JSON.parse(formation.value?.players ?? '[]')
})

const timeline = [
  {
    year: 'XXXX',
    title: 'XXXX',
    text: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    image: '/team-1978.jpg'
  },
  {
    year: 'XXXX',
    title: 'XXXX',
    text: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    image: '/team-1985.jpg'
  },
  {
    year: '1999',
    title: 'XXXX',
    text: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    image: '/team-1999.jpg'
  },
  {
    year: 'XXX',
    title: 'XXXX',
    text: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    image: '/team-2012.jpg'
  },
  {
    year: 'XXXX',
    title: 'XXXX',
    text: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.',
    image: '/team-2026.jpg'
  }
]


function getPlayers() {
  $fetch<ApiResponse<Player[]>>('/api/get/players')
    .then((res) => {
      players.value = res.response;
    })
    .catch((err) => {
      console.error(err);
    })
}

function getFormation() {
  $fetch<ApiResponse<FormationResponse>>('/api/get/formation')
    .then((resp) => {
      formation.value = resp.response
    })
}

function getStats() {
  $fetch<ApiResponse<Stats>>('/api/get/stats')
    .then((resp) => {
      stats.value = resp.response
    })
}

getPlayers()
getStats();
getFormation();
</script>
