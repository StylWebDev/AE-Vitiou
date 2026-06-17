<template>
  <div>
    <UDashboardNavbar title="ΑΕ Βιτσίου" toggle-side="right" :toggle="{ color: 'primary', variant: 'ghost',  class: 'rounded-full', onClick: () => {open=!open} }">
      <template #leading>
        <UAvatar src="/logo.webp" size="3xl" />
      </template>

      <UNavigationMenu :items="routes" variant="pill" color="primary" />


      <template #right>
        <UButton to="/sudo" variant="ghost" icon="material-symbols:person-shield-rounded"/>
        <UColorModeButton />
      </template>

      <UDrawer v-model:open="open" direction="right" />
    </UDashboardNavbar>

    <UMain>
      <slot/>
    </UMain>

    <USeparator color="primary" :avatar="{src: '/logo.webp', loading: 'lazy'}" />

    <UFooter>
      <template #left>
        <UButton variant="link" color="neutral" to="styls.pages.dev" class="text-muted text-sm">
          StylWebDev © {{ new Date().getFullYear() }}
        </UButton>
      </template>

      <UNavigationMenu :items="footerItems" variant="link" />

      <template #right>
        <UButton
          icon="ci:facebook"
          color="neutral"
          variant="ghost"
          to="https://www.facebook.com/photo/?fbid=638189021642804&set=a.508029164658791"
          aria-label="Facebook"
        />
        <UButton
          icon="ci:instagram"
          color="neutral"
          variant="ghost"
          to="https://www.instagram.com/ae_bitsiou/"
          target="_blank"
          aria-label="Instagram"
        />
        <UButton
          icon="ci:mail"
          color="neutral"
          variant="ghost"
          to="mailto:abvitsiou@gmail.gr"
          target="_blank"
          aria-label="Mail"
        />
      </template>
    </UFooter>
  </div>
</template>

<script lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
</script>

<script setup lang="ts">
const open = ref(false)

const routes: NavigationMenuItem = [
  {
    label: 'Αρχική',
    icon: 'solar:home-2-bold',
    to: '/'
  },
  {
    label: 'Αγώνες',
    icon: 'streamline-ultimate:soccer-field-bold',
    to: '/matches'
  },
  {
    label: 'Η Ομάδα',
    icon: 'fluent:people-team-28-filled',
    to: '/team'
  },
  {
    label: 'Σκόρερ',
    icon: 'maki:soccer-11',
    to: '/scorers'
  },
  {
    label: 'Blog',
    icon: 'gravity-ui:square-article',
    to: '/blog'
  },
]

const footerItems: NavigationMenuItem[] = [{
  label: 'ΕΠΣ Καστοριάς',
  to: 'https://epskastorias.gr/',
  target: '_blank'
}]
</script>
