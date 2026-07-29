<template>
  <UModal v-model:open="open" title="Διαγραφή ανάρτησης">
    <slot/>
    <template #body>
      <p class="text-lg text-white">Θες σίγουρα να διαγράψεις την ανάρτηση; Η ενέργεια αυτή θα είναι μη αναστρέψιμη</p>
    </template>
    <template #footer>
      <UButton color="error" size="xl" label="Διαγραφή" icon="material-symbols:delete-rounded" :loading="loading" :disabled="loading"  @click="deletePost"/>
    </template>
  </UModal>
</template>

<script lang="ts">
interface Props {
  postId: number
}
interface Emits {
  refresh: [];
}
</script>

<script setup lang="ts">
const {postId} = defineProps<Props>()
const emit = defineEmits<Emits>()

const toast = useToast();
const open = ref(false);
const loading = ref(false);

function deletePost() {
  loading.value = true;

  $fetch('/api/delete/post', {
    method: HTTP_METHODS.POST,
    query: {id: postId},
  }).then(() => {
    toast.add({
      title: 'Επιτυχία',
      description: 'Η Διαγραφή της ανάρτησης ήταν επιτυχής',
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
