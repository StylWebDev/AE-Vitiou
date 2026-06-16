<template>
  <div class="size-full flex justify-center items-center">
    <UForm ref="form" :schema="schema" :state="state" class="p-4 ring ring-muted rounded-2xl space-y-4" @submit.prevent="login" >
      <UEmpty icon="material-symbols:deployed-code-account" size="xl" variant="naked" title="Σύνδεση Χρήστη" description="Η σύνδεση είναι δυνατή μόνο για τους διαχειριστές της ΑΕ-Βιτσίου και του developer της σελίδας" />
      <UFormField name="email" label="email" required >
        <UInput v-model="state.email" class="w-full"/>
      </UFormField>
      <UFormField name="password" label="Κωδικός Πρόσβασης" required>
        <UInput v-model="state.password" type="password" class="w-full"/>
      </UFormField>
      <UButton label="Σύνδεση" class="w-full justify-center" @click="form?.submit()"  />
    </UForm>
  </div>
</template>

<script setup lang="ts">
const {fetch} = useUserSession();

const form = useTemplateRef<HTMLFormElement>('form');

const schema = zod.object({
  email: zod.email('Λανθασμένο email'),
  password: zod.string()
    .min(8, { message: "Ο κωδικός πρόσβασης πρέπει να αποτελείται από τουλάχιστον 8 χαρακτήρες" })
    .max(32, { message: "Ο κωδικός πρόσβασης δεν μπορεί να υπερβαίνει τους 32 χαρακτήρες" })
    .regex(/[A-Z]/, { message: "Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον ένα κεφαλαίο γράμμα" })
    .regex(/[a-z]/, { message: "Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον ένα πεζό γράμμα" })
    .regex(/[0-9]/, { message: "Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον έναν αριθμό" })
    .regex(/[^A-Za-z0-9]/, { message: "Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον έναν ειδικό χαρακτήρα" })
})

const state: ZodOutput<typeof schema> = reactive({
  email: '',
  password: '',
})
const toast = useToast();

function login() {
     $fetch('/api/login', {
      method: HTTP_METHODS.POST,
      body: state,
    }).then((_) => {
       fetch()
       navigateTo('/sudo')
     }).catch(() => {
       console.debug(`Error while trying to log In`)
       toast.add({
         title: 'Σφάλμα',
         description: 'Η σύνδεση απέτυχε',
         icon: 'material-symbols:person-cancel',
         duration: 5000,
         color: 'error',
         type: 'foreground'
       })
     })
}
</script>
