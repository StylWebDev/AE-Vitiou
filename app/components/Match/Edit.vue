<template>
  <UModal v-model:open="open" title="Eπεξεργασία αγώνα">
    <slot/>
    <template #body>
      <UForm ref="form" :schema="schema" :state="state" class="p-4  rounded-2xl space-y-4" @submit.prevent="editMatch" >
        <UFormField size="lg" name="competition" label="Διοργάνωση" required :ui="{label: 'text-primary-100'}" >
          <USelect v-model="state.competition" class="w-full" :items="competitions" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <UFormField size="lg" name="status" label="Κατάσταση" required :ui="{label: 'text-primary-100'}" >
          <USelect v-model="state.status" class="w-full" :items="statuses" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField size="lg" name="home" label="Γηπεδούχος" required :ui="{label: 'text-primary-100'}" >
            <USelect v-model="state.home" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
          </UFormField>
          <UFormField size="lg" name="away" label="Φιλοξενούμενος" required :ui="{label: 'text-primary-100'}" >
            <USelect v-model="state.away" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
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
      <UButton color="success" size="xl" label="Αποθήκευση" :loading="loading" :disabled="loading"  @click="form?.submit()"/>
    </template>
  </UModal>
</template>

<script lang="ts">
import type { SelectItem } from '@nuxt/ui'
interface Props {
  match: Match
}
interface Emits {
  refresh: [];
}
</script>

<script setup lang="ts">
const {match} = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = useTemplateRef<HTMLFormElement>('form');
const open = ref(false);
const loading = ref(false);

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

// Roster used to populate the goal-scorer selects.
// Assumes a GET /api/player endpoint, same as used elsewhere in the app.
const playerItems = ref<SelectItem[]>([])

onMounted(async () => {
  try {
    const players = await $fetch<Player[]>('/api/player')
    playerItems.value = players.map((p) => ({
      label: `${p.number} - ${p.name}`,
      value: p.id,
    }))
  } catch (err) {
    console.error(err)
  }
})

function toDateTimeLocal(date: Date | number | null | undefined) {
  if (!date) return ''
  const d = new Date(date)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

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
  status: match.status,
  competition: match.competition,
  home: match.home,
  away: match.away,
  hs: match.hs,
  as: match.as,
  points: match.points,
  date: toDateTimeLocal(match.date),
  isTrophy: Boolean(match.isTrophy),
})

interface GoalScorer {
  playerId: number | null
}

const goalScorers = reactive<GoalScorer[]>(
  matchGoals.map((g) => ({ playerId: g.playerId }))
)

watch(() => (state.hs ?? 0) + (state.as ?? 0), (total) => {
  if (total > goalScorers.length) {
    for (let i = goalScorers.length; i < total; i++) {
      goalScorers.push({ playerId: null })
    }
  } else if (total < goalScorers.length) {
    goalScorers.splice(total)
  }
}, { immediate: true })

const toast = useToast();

function editMatch() {
  loading.value = true;

  $fetch('/api/update/match', {
    method: HTTP_METHODS.POST,
    query: {id: match.id},
    body: {
      ...state,
      date: state.date ? new Date(state.date) : null,
    },
  }).then(() => {
    const scorers = goalScorers.filter((s) => s.playerId !== null)

    // Replaces all scorer rows for this match with the current selection.
    return $fetch('/api/update/goal', {
      method: HTTP_METHODS.POST,
      query: {matchId: match.id},
      body: scorers.map((s) => ({
        matchId: match.id,
        playerId: s.playerId,
        ga: 1,
      })),
    })
  }).then(() => {
    toast.add({
      title: 'Επιτυχία',
      description: 'Η Επεξεργασία του αγώνα ήταν επιτυχής',
      icon: 'uim:check-circle',
      duration: 5000,
      color: 'success',
      type: 'foreground'
    })
    emit('refresh')
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
  })
}

</script>
