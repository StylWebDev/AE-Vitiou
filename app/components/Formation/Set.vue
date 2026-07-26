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
    </template>
    <template #footer>
      <UButton color="success" size="xl" label="Αποθήκευση" icon="material-symbols:delete-rounded" :loading="loading" :disabled="loading"  @click="form?.submit()"/>
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

const state = reactive<ZodOutput<typeof schema>>({
  formation: footballSchema.formation ?? 'S433',
  players: JSON.parse(footballSchema.players ?? '[]'),
})

const selectPlayers = computed<SelectItem[]>(() => players.map((p: Player) => ({
  label: p.name,
  value: p.id,
  avatar: {
    color: PosColor[p.pos],
    text: p.pos,
    size: 'md'
  }
})))

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

</script>
