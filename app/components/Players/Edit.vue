<template>
  <UModal v-model:open="open" title="Eπεξεργασία παίχτη">
    <slot/>
    <template #body>
      <UForm ref="form" :schema="schema" :state="state" class="p-4  rounded-2xl space-y-4" @submit.prevent="editPlayer" >
        <UFormField size="lg" name="name" label="Όνομα παίχτη" required :ui="{label: 'text-primary-100'}" >
          <UInput v-model="state.name" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>
        <UFormField size="lg" name="number" label="Αριθμός Φανέλας" required :ui="{label: 'text-primary-100'}" >
          <UInputNumber v-model="state.number" :min="1" :max="99" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <UFormField size="lg" name="pos" label="Θέση" required :ui="{label: 'text-primary-100'}" >
          <USelect v-model="state.pos" class="w-full" :items="positions" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <UFormField size="lg" name="isCaptain" label="Αρχηγός Ομάδας" required :ui="{label: 'text-primary-100'}">
          <USwitch v-model="state.isCaptain" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>
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
  player: Player
}
interface Emits {
  refresh: [];
}
</script>

<script setup lang="ts">
const {player} = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = useTemplateRef<HTMLFormElement>('form');
const open = ref(false);
const loading = ref(false);

const positions = ref<SelectItem[]>([
  {
    label: 'Τερματοφύλακας',
    value: 'GK'
  },
  {
    label: 'Αμυντικός',
    value: 'DEF'
  },
  {
    label: 'Κέντρο',
    value: 'MID'
  },
  {
    label: 'Εξτρέμ',
    value: 'ΕΧΤ'
  },
  {
    label: 'Επιθετικός',
    value: 'FWD'
  }
])

const schema = zod.object({
  name: zod.string().nonempty(),
  number: zod.number().min(1).max(99),
  pos: zod.enum(['GK' , 'DEF' , 'MID' , 'EXT' , 'FWD']),
  isCaptain: zod.boolean()
})

const state: ZodOutput<typeof schema> = reactive({
  name: player.name,
  number: player.number,
  pos: player.pos,
  isCaptain: Boolean(player.isCaptain),
})

const toast = useToast();

function editPlayer() {
  loading.value = true;

  $fetch('/api/update/player', {
    method: HTTP_METHODS.POST,
    query: {id: player.id},
    body: state,
  }).then(() => {
    toast.add({
      title: 'Επιτυχία',
      description: 'Η Επεξεργασία του παίχτη ήταν επιτυχής',
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
