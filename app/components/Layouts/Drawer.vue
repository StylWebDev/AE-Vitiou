<template>
  <UDrawer v-model:open="open" direction="left" :ui="{overlay: 'bg-primary-50/10', content: ' dark:bg-primary-950 light:bg-primary-100 ', body: 'mt-4', handle: 'bg-primary!'}">
    <slot/>
    <template #header>
      <div class="flex items-center gap-x-5 pl-4">
        <UAvatar src="/logo.webp" size="3xl" class="scale-150" />
        <div>
          <h1 class="font-bold text-xl">ΑΕ Βιτσίου</h1>
          <p class="text-sm ">Κεντρικό Μενού</p>
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
