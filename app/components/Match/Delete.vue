<template>
  <UModal v-model:open="open" title="Διαγραφή αγώνα">
    <slot/>
    <template #body>
      <p class="text-lg text-white">Θες σίγουρα να διαγράψεις τον αγώνα; Η ενέργεια αυτή θα είναι μη αναστρέψιμη</p>
    </template>
    <template #footer>
      <UButton color="error" size="xl" label="Διαγραφή" icon="material-symbols:delete-rounded" :loading="loading" :disabled="loading"  @click="deleteMatch"/>
    </template>
  </UModal>
</template>

<script lang="ts">
interface Props {
  matchId: number
}
interface Emits {
  refresh: [];
}
</script>

<script setup lang="ts">
const {matchId} = defineProps<Props>()
const emit = defineEmits<Emits>()

const toast = useToast();
const open = ref(false);
const loading = ref(false);

function deleteMatch() {
  loading.value = true;

  $fetch('/api/delete/match', {
    method: HTTP_METHODS.POST,
    query: {id: matchId},
  }).then(() => {
    toast.add({
      title: 'Επιτυχία',
      description: 'Η Διαγραφή του αγώνα ήταν επιτυχής',
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
