<template>
  <UModal v-model:open="open" title="Eπεξεργασία Σχήματος">
    <slot/>
    <template #body>
      <UForm ref="form" :schema="schema" :state="state" class="p-4  rounded-2xl space-y-4" @submit.prevent="setFormation" >
        <UFormField size="lg" name="formation" label="Θέση" required :ui="{label: 'text-primary-100'}" >
          <USelect v-model="state.formation" class="w-full" :items="formations" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>
        <UFormField size="lg" name="players" label="Θέση" required :ui="{label: 'text-primary-100'}" >
          <USelect v-model="state.players" class="w-full" multiple :items="selectPlayers" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>
      </UForm>
      <div ref="el" class="overflow-hidden rounded-lg border border-primary-100 m-4 bg-primary-950 *:border-b last:border-b--0">
        <div v-for="item in state.players" :key="item" class="w-full bg-primary-950  font-medium  p-2 flex justify-between text-lg capitalize text-white border-primary-800/40 ">
          <div class="flex gap-2 items-center">
            <UBadge
              size="md"
              :color="PosColor[players.find(player => item === player.id)!.pos]"
              :label="players.find(player => item === player.id)?.pos"
              class="min-w-10 rounded-full justify-center"
            />
            {{ players.find(player => item === player.id)?.name}}
          </div>

          <UIcon name="flowbite:bars-outline" class="size-6"/>
        </div>
      </div>
    </template>
    <template #footer>
      <UButton color="success" size="xl" label="Αποθήκευση" icon="ic:sharp-save-as" :loading="loading" :disabled="loading"  @click="form?.submit()"/>
    </template>
  </UModal>
</template>

<script lang="ts">
import type {SelectItem} from "@nuxt/ui";

interface Props {
  footballSchema: FormationResponse
  players: Player[];
}
interface Emits {
  refresh: [];
}
</script>

<script setup lang="ts">
const {footballSchema, players} = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = useTemplateRef<HTMLFormElement>('form');
const schema = zod.object({
  formation: zod.enum(['S433', 'S343', 'S442', 'S352', 'S451', 'S3421', 'S4231']),
  players: zod.array(zod.number()),
})

const formations: SelectItem[] = ['S433', 'S343', 'S442', 'S352', 'S451', 'S3421', 'S4231']

const el = useTemplateRef('el')
const state = reactive<ZodOutput<typeof schema>>({
  formation: 'S433',
  players: [],
})

const selectPlayers = computed<SelectItem[]>(() => {
  return players.map((p: Player) => ({
    label: p.name,
    value: p.id,
    avatar: {
      color: PosColor[p.pos],
      text: p.pos,
      size: 'md'
    }
  }))

})

const toast = useToast();
const open = ref(false);
const loading = ref(false);

function setFormation() {
  loading.value = true;

  $fetch('/api/set/formation', {
    method: HTTP_METHODS.POST,
    body: {...state, players: JSON.stringify(state.players)},
  }).then(() => {
    toast.add({
      title: 'Επιτυχία',
      description: 'Η Ανανέωση του σχήματος ήταν επιτυχής',
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

watch(() => footballSchema.players, () => {
  state.formation = footballSchema.formation ?? 'S433'
  state.players = JSON.parse(footballSchema.players ?? '[]');
}, {immediate:true, deep: true})

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  useSortable(el, state.players)
})
</script>
