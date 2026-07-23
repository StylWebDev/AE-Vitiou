<template>
  <UModal v-model:open="open" title="Προσθήκη παίχτη">
    <slot/>
    <template #body>
      <UForm ref="form" :schema="schema" :state="state" class="p-4  rounded-2xl space-y-4" @submit.prevent="createPlayer" >
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
      <UButton color="success" size="xl" label="Δημιουργία" :loading="loading" :disabled="loading"  @click="form?.submit()"/>
    </template>
  </UModal>
</template>

<script lang="ts">
import type { SelectItem } from '@nuxt/ui'
interface Props {
  player: any
}
</script>

<script setup lang="ts">
const {palyer} = defineProps<Props>()

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
  pos: zod.enum(['GK' , 'DEF' , 'MID' , 'FWD']),
  isCaptain: zod.boolean()
})

const state: ZodOutput<typeof schema> = reactive({
  name: '',
  number: 1,
  pos: 'GK',
  isCaptain: false,
})

const toast = useToast();

function createPlayer() {
  loading.value = true;

  $fetch('/api/player', {
    method: HTTP_METHODS.POST,
    body: state,
  }).then((data) => {
    console.log(data);
    toast.add({
      title: 'Επιτυχία',
      description: 'Η Επεξεργασία του παίχτη ήταν επιτυχής',
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
  })
}

</script>
