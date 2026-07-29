<template>
  <UModal v-model:open="open" title="Προσθήκη Αρθρού">
    <slot/>
    <template #body>
      <UForm ref="form" :schema="schema" :state="state" class="p-4  rounded-2xl space-y-4" @submit.prevent="createPost" >
        <UFormField size="lg" name="name" label="Εικόνα" required :ui="{label: 'text-primary-100'}" >
          <UFileUpload
            v-model="file"
            icon="i-lucide-image"
            highlight
            label="Drop your image here"
            accept="image/*"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            class="w-full min-h-48"
            :ui="{base: 'bg-primary/20', label:'text-primary-50', description:'text-white/50', icon: 'text-primary'}"
          />
        </UFormField>
        <UFormField size="lg" name="title" label="Τίτλος" required :ui="{label: 'text-primary-100'}" >
          <UInput v-model="state.title" :min="1" :max="99" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <UFormField size="lg" name="description" label="Περιγραφή" required :ui="{label: 'text-primary-100'}" >
          <UInput v-model="state.description" class="w-full"  :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>

        <UFormField size="lg" name="link" label="Συνδεσμος" required :ui="{label: 'text-primary-100'}">
          <UInput v-model="state.link" class="w-full" :ui="{base: 'bg-primary-950 text-white'}"/>
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton color="success" size="xl" label="Δημιουργία" :loading="loading" :disabled="loading"  @click="form?.submit()"/>
    </template>
  </UModal>
</template>

<script lang="ts">
interface Emits {
  refresh: [];
}
</script>

<script setup lang="ts">
const emit = defineEmits<Emits>()
const form = useTemplateRef<HTMLFormElement>('form');
const open = ref(false);
const loading = ref(false);
const file = ref<File | null>(null);

const schema = zod.object({
  title: zod.string().nonempty(),
  description: zod.string().nonempty(),
  link: zod.httpUrl().nonempty(),
})

const state: ZodOutput<typeof schema> = reactive({
  title: '',
  description: '',
  link: '',

})

const toast = useToast();

function reset() {
  state.title = '';
  state.description = '';
  state.link = '';
  file.value = null;
}

async function createPost() {
  loading.value = true;


    const arrayBuffer = await file.value?.arrayBuffer()

    $fetch('/api/create/post', {
      method: HTTP_METHODS.POST,
      body: {
        ...state,
        img: exists(arrayBuffer) ? Array.from(new Uint8Array(arrayBuffer)) : undefined,
      },
    }).then((data) => {
      console.log(data);
      toast.add({
        title: 'Επιτυχία',
        description: 'Η Δημιουργία του Blog ήταν επιτυχής',
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
      emit('refresh');
    })
}

watch(open, (v) => {
  if (!v) {
    reset();
  }
})
</script>
