<template>
  <UModal v-model:open="open" title="Προσθήκη αγώνα">
    <slot/>
    <template #body>
      <UForm ref="form" :schema="schema" :state="state" class="p-4  rounded-2xl space-y-4" @submit.prevent="createMatch" >
        <UFormField size="lg" name="competition" label="Διοργάνωση" required :ui="{label: 'text-primary-100'}" >
          <USelect v-model="state.competition" class="w-full" :items="competitions" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <UFormField size="lg" name="status" label="Κατάσταση" required :ui="{label: 'text-primary-100'}" >
          <USelect v-model="state.status" class="w-full" :items="statuses" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField size="lg" name="home" label="Γηπεδούχος" required :ui="{label: 'text-primary-100'}" >
            <USelect v-model="state.home" class="w-full" :items="teamsItems" :ui="{base: 'bg-primary-950 text-white'}"/>
          </UFormField>
          <UFormField size="lg" name="away" label="Φιλοξενούμενος" required :ui="{label: 'text-primary-100'}" >
            <USelect v-model="state.away" class="w-full" :items="teamsItems" :ui="{base: 'bg-primary-950 text-white'}"/>
          </UFormField>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField size="lg" name="hs" label="Γκολ Γηπεδούχου" required :ui="{label: 'text-primary-100'}" >
            <UInputNumber v-model="state.hs" :min="0" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
          </UFormField>

          <UFormField size="lg" name="as" label="Γκολ Φιλοξενούμενου" required :ui="{label: 'text-primary-100'}" >
            <UInputNumber v-model="state.as" :min="0" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
          </UFormField>
        </div>

        <UFormField size="lg" name="points" label="Βαθμοί" required :ui="{label: 'text-primary-100'}" >
          <USelect v-model="state.points" :items="[0,1,3]" :min="0" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <UFormField size="lg" name="date" label="Ημερομηνία" :ui="{label: 'text-primary-100'}" >
          <UInput v-model="state.date" type="datetime-local" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <UFormField size="xl" name="isTrophy" label="Διεκδίκηση τίτλου?" required :ui="{label: 'text-primary-100'}">
          <template #hint>
            <USwitch v-model="state.isTrophy" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
          </template>
        </UFormField>

        <div v-if="goalScorers.length" class="space-y-4 pt-2 border-t border-primary-800">
          <p class="text-primary-100 text-sm font-medium">Σκόρερ</p>
          <UFormField
            v-for="(scorer, idx) in goalScorers"
            :key="idx"
            size="lg"
            :label="`Σκόρερ γκολ ${idx + 1}`"
            :ui="{label: 'text-primary-100'}"
          >
            <USelect
              v-model="scorer.playerId"
              class="w-full"
              :items="playerItems"
              placeholder="Επίλεξε παίχτη"
              :ui="{base: 'bg-primary-950 text-white'}"
            />
          </UFormField>
        </div>
      </UForm>
    </template>
    <template #footer>
      <UButton color="success" size="xl" label="Δημιουργία" :loading="loading" :disabled="loading"  @click="form?.submit()"/>
    </template>
  </UModal>
</template>

<script lang="ts">
import type { SelectItem } from '@nuxt/ui'
import teams from '~/assets/teams.json'
interface GoalScorer {
  playerId: number | null
}
interface Emits {
  refresh: [];
}
</script>

<script setup lang="ts">
const emit = defineEmits<Emits>();
const form = useTemplateRef<HTMLFormElement>('form');
const open = ref(false);
const loading = ref(false);

const playerItems = ref<SelectItem[]>([])
const competitions = ref<SelectItem[]>([
  {
    label: 'Πρωτάθλημα',
    value: 'championship'
  },
  {
    label: 'Κύπελλο',
    value: 'cup'
  }
])
const statuses = ref<SelectItem[]>([
  {
    label: 'Ολοκληρώθηκε',
    value: 'final'
  },
  {
    label: 'Εκκρεμεί',
    value: 'pending'
  },
  {
    label: 'Live',
    value: 'live'
  }
])

const teamsItems = computed<SelectItem[]>(() => {
  return teams.map((team) => ({
    ...team,
    icon: undefined,
    avatar: {
      src: team.icon
    }
  }))
})

const schema = zod.object({
  status: zod.enum(['final', 'pending', 'live']),
  competition: zod.enum(['championship', 'cup']),
  home: zod.string().nonempty(),
  away: zod.string().nonempty(),
  hs: zod.number().min(0),
  as: zod.number().min(0),
  points: zod.number().min(0),
  date: zod.string().optional(),
  isTrophy: zod.boolean(),
})

const state: ZodOutput<typeof schema> = reactive({
  status: 'pending',
  competition: 'championship',
  home: 'ae_vitsiou',
  away: 'keravnos',
  hs: 0,
  as: 0,
  points: 0,
  date: '',
  isTrophy: false,
})

const goalScorers = reactive<GoalScorer[]>([])

const toast = useToast();

function getPlayers() {
  $fetch<ApiResponse<Player[]>>('/api/get/players')
    .then((resp) => {
      playerItems.value = resp.response.map((player) => ({
        label: player.name,
        value: player.id,
      }))
    });
}

function reset() {
  state.status = 'pending';
  state.competition = 'championship';
  state.home = '';
  state.away = '';
  state.hs = 0;
  state.as = 0;
  state.points = 0;
  state.date = '';
  state.isTrophy = false;
  goalScorers.splice(0);
}

function createMatch() {
  loading.value = true;

  console.debug(state)

  $fetch<ApiResponse<Match>>('/api/create/match', {
    method: HTTP_METHODS.POST,
    body: {
      ...state,
    },
  }).then(async (resp) => {
    const match: Match = resp.response;
    const scorers = goalScorers.filter((s) => s.playerId !== null)

    if (!scorers.length) return

    const goalsData = Object.values(
      scorers.reduce((acc, scorer) => {
        const key = `scorer-${scorer.playerId}-${match.id}`;
        if (exists(acc[key])) {
          acc[key].ga +=1
        }else {
          acc[key] = {
            playerId: scorer.playerId!,
            matchId: match.id,
            ga: 1
          }
        }
        return acc
      }, {} as Record<string, Goal>),
    )

    console.log(goalsData)
     await $fetch('/api/create/goals', {
      method: HTTP_METHODS.POST,
      body: goalsData
    })
  }).then(() => {
    toast.add({
      title: 'Επιτυχία',
      description: 'Η Δημιουργία του αγώνα ήταν επιτυχής',
      icon: 'uim:check-circle',
      duration: 5000,
      color: 'success',
      type: 'foreground'
    })
  }).catch((err) => {
    toast.add({
      title: 'Κάτι πήγε στραβά',
      description: err.statusText,
      icon: 'material-symbols:person-cancel',
      duration: 5000,
      color: 'error',
      type: 'foreground'
    })
  }).finally(() => {
    loading.value = false;
    open.value = false;
    emit('refresh')
  })
}

getPlayers();

watch(state, (v) => {
  if (v.home === 'ae_vitsiou') {
    if (v.hs > goalScorers.length) {
      for (let i = goalScorers.length; i < v.hs; i++) {
        goalScorers.push({ playerId: null })
      }
    } else if (v.hs < goalScorers.length) {
      goalScorers.splice(v.hs)
    }
  } else if (v.away === 'ae_vitsiou') {
    if (v.as > goalScorers.length) {
      for (let i = goalScorers.length; i < v.as; i++) {
        goalScorers.push({ playerId: null })
      }
    } else if (v.as < goalScorers.length) {
      goalScorers.splice(v.as)
    }
  }
}, { deep: true })

watch(
  () => [state.home, state.away],
  ([home, away], [oldHome, oldAway]) => {
    if (oldHome !== home && home === away) {
      state.away = '';
    } else if (oldAway !== away && home === away) {
      state.home = '';
    }
  }
);

watch(open, (v) => {
  if (!v) {
    reset();
  }
})
</script>
