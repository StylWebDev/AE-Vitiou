<template>
  <UDrawer v-model:open="open" direction="left" :ui="{overlay: 'bg-primary-50/10', content: 'bg-linear-to-t from-primary-700 to-primary-950 ', body: 'mt-4', handle: 'bg-primary-300!'}">
    <slot/>
    <template #header>
      <div class="flex items-center gap-x-5 pl-4">
        <UAvatar src="/logo.webp" size="3xl" class="scale-150" />
        <div>
          <h1 class="font-bold text-xl text-primary-400">ΑΕ Βιτσίου</h1>
          <p class="text-sm text-primary-300">Κεντρικό Μενού</p>
        </div>
      </div>

    </template>
    <template #body>
      <div class="flex flex-col w-full  gap-2">
        <UButton v-for="route in routes" :key="route.label" v-bind="route" variant="ghost" size="xl" active-color="primary" active-variant="subtle" @click="open=false" />
      </div>
    </template>
  </UDrawer>
</template>

<script lang="ts">
interface Props {
  routes: {
    label: string;
    icon: string;
    to: string;
  }[]
}
</script>

<script setup lang="ts">
defineProps<Props>()
const open = defineModel<boolean>({required: true})
</script>
