<template>
  <UDashboardNavbar title="Inbox" :toggle="{ color: 'primary', variant: 'subtle',  class: 'rounded-full' }">
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>

    <template #trailing>
      <UBadge label="4" variant="subtle" />
    </template>

    <template #right>
      <UTabs :items="items" default-value="all" size="sm" class="w-40" :content="false" />
      <UColorModeButton />
    </template>
  </UDashboardNavbar>

  <UMain>
    <slot/>
  </UMain>

  <USeparator icon="i-simple-icons-nuxtdotjs" />

  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}
      </p>
    </template>

    <UNavigationMenu :items="footerItems" variant="link" />

    <template #right>
      <UButton
        icon="i-simple-icons-discord"
        color="neutral"
        variant="ghost"
        to="https://go.nuxt.com/discord"
        target="_blank"
        aria-label="Discord"
      />
      <UButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        to="https://go.nuxt.com/x"
        target="_blank"
        aria-label="X"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/nuxt/nuxt"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>

<script lang="ts">
import type { NavigationMenuItem, TabsItem } from '@nuxt/ui'
</script>

<script setup lang="ts">
const items: TabsItem[] = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Unread',
    value: 'unread'
  }
]

const footerItems: NavigationMenuItem[] = [{
  label: 'Figma Kit',
  to: 'https://go.nuxt.com/figma-ui',
  target: '_blank'
}, {
  label: 'Playground',
  to: 'https://stackblitz.com/edit/nuxt-ui',
  target: '_blank'
}, {
  label: 'Releases',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}]
</script>
