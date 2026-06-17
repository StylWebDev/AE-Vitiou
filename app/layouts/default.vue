<template>
  <div class="dark:bg-primary-950 light:bg-primary-200">
    <UContainer :ui="{base: 'px-0!'}">
      <UDashboardNavbar title="ΑΕ Βιτσίου" toggle-side="right" :toggle="{ color: 'primary', variant: 'ghost',  class: 'rounded-full', onClick: () => {open=!open} }" class="sticky top-0 dark:bg-primary-800/30 light:bg-primary-50/30 backdrop-blur-2xl" :ui="{root: 'border-primary'}">
        <template #leading>
          <UAvatar src="/logo.webp" size="3xl" />
        </template>

        <UButton v-for="route in routes" :key="route.label" v-bind="route" variant="link" active-color="primary" active-variant="subtle" :ui="{linkLabel: 'bg-opacity-30'}" />


        <template #right>
          <UButton to="/sudo" variant="ghost" color="secondary" icon="material-symbols:person-shield-rounded"/>
          <UColorModeButton variant="link" />
        </template>

        <LayoutsDrawer v-model="open" :routes/>
      </UDashboardNavbar>

      <UMain>
        <slot/>
      </UMain>

      <USeparator color="primary" :avatar="{src: '/logo.webp', loading: 'lazy'}" />

      <UFooter class=" dark:bg-primary-800/30 light:bg-primary-50/30 backdrop-blur-2xl">
        <template #left>
          <UButton variant="link" to="https://styls.pages.dev" target="_blank" class="text-sm">
            StylWebDev © {{ new Date().getFullYear() }}
          </UButton>
        </template>

        <UNavigationMenu :items="footerItems" color="primary" variant="link" :ui="{linkLabel: 'text-primary', linkLabelExternalIcon: 'text-primary'}" />

        <template #right>
          <UButton
            icon="ci:facebook"
            variant="ghost"
            to="https://www.facebook.com/photo/?fbid=638189021642804&set=a.508029164658791"
            aria-label="Facebook"
          />
          <UButton
            icon="ci:instagram"
            variant="ghost"
            to="https://www.instagram.com/ae_bitsiou/"
            target="_blank"
            aria-label="Instagram"
          />
          <UButton
            icon="ci:mail"
            variant="ghost"
            to="mailto:abvitsiou@gmail.gr"
            target="_blank"
            aria-label="Mail"
          />
        </template>
      </UFooter>
    </UContainer>
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
