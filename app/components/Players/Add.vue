<template>
  <UModal v-model:open="open" title="Προσθήκη παίχτη">
    <slot/>
     <template #body>
       <UForm ref="form" :schema="schema" :state="state" class="p-4 ring ring-primary-700 bg-primary-900 rounded-2xl space-y-4" @submit.prevent="createPlayer" >
         <UFormField size="lg" name="name" label="Όνομα παίχτη" required :ui="{label: 'text-primary-100'}" >
           <UInput v-model="state.name" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
         </UFormField>
         <UFormField size="lg" name="number" label="Αριθμός Φανέλας" required :ui="{label: 'text-primary-100'}" >
           <UInputNumber v-model="state.number" :min="1" :max="99" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
         </UFormField>

         <UFormField size="lg" name="email" label="pos" required :ui="{label: 'text-primary-100'}" >
           <USelect v-model="state.pos" class="w-full" :items="positions" :ui="{base: 'bg-primary-950 text-white'}"/>
         </UFormField>

         <UFormField size="lg" name="email" label="isCaptain" required :ui="{label: 'text-primary-100'}">
           <USwitch v-model="state.isCaptain" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
         </UFormField>
       </UForm>
     </template>
    <template #footer>
      <UButton color="success" size="xl" label="Δημιουργία"  @click="form?.submit()"/>
    </template>
  </UModal>
</template>

<script lang="ts">
import type { SelectItem } from '@nuxt/ui'
</script>

<script setup lang="ts">
const form = useTemplateRef<HTMLFormElement>('form');
const open = ref(false);

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
  $fetch('/api/player', {
    method: HTTP_METHODS.POST,
    body: state,
  }).then((data) => {
    console.log(data);
    toast.add({
      title: 'Επιτυχία',
      description: 'Η Δημιουργία του παίχτη ήταν επιτυχής',
      icon: 'uim:check-circle',
      duration: 5000,
      color: 'success',
      type: 'foreground'
    })
  }).catch(() => {
    toast.add({
      title: 'Κάτι πήγε στραβά',
      description: 'Αδυναμία δημιουργίας παίχτη',
      icon: 'material-symbols:person-cancel',
      duration: 5000,
      color: 'error',
      type: 'foreground'
    })
  })
}
</script>
