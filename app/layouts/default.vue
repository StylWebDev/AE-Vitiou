<template>
  <UContainer class="min-h-screen flex flex-col ">
    <!-- Header -->
    <UDashboardNavbar title="ΑΕ Βιτσίου" toggle-side="right" :toggle="{ color: 'primary', variant: 'ghost',  class: 'rounded-full', onClick: () => {open=!open} }" class="sticky top-0 z-50 bg-linear-to-tr  from-primary-600/90 to-primary-900/90 backdrop-blur" :ui="{root: 'border-primary/40'}">
      <template #leading>
        <UAvatar src="/logo.webp" size="3xl" />
      </template>

      <UButton v-for="route in pages" :key="route.label" v-bind="route" variant="link" active-color="primary" active-variant="subtle" />

      <template #right>
        <UButton to="/sudo" variant="ghost" color="secondary" icon="material-symbols:person-shield-rounded"/>
      </template>

      <LayoutsDrawer v-model="open" :routes="pages"/>
    </UDashboardNavbar>

    <!-- Page content -->
    <UMain class="flex-1">
      <slot />
    </UMain>


    <USeparator color="primary" :avatar="{src: '/logo.webp', loading: 'lazy'}" class="translate-y-2" :ui="{root: 'relative z-50'}" />
    <UFooter class=" bg-primary-800/30 backdrop-blur-2xl" :ui="{root: 'relative z-40'}">
      <template #left>
        <UButton variant="link" to="https://styls.pages.dev" target="_blank" class="text-sm">
          StylWebDev © {{ new Date().getFullYear() }}
        </UButton>
      </template>

      <UNavigationMenu :items="externalLinks" color="primary" variant="link" :ui="{linkLabel: 'text-primary', linkLabelExternalIcon: 'text-primary'}" />

      <template #right>
        <UButton v-for="(item,index) in socialLinks" :key="`social-${index}`" v-bind="item" />
      </template>
    </UFooter>
  </UContainer>
</template>

<script setup lang="ts">
import type { NavigationMenuItem, ButtonProps } from '@nuxt/ui'

const pages = [
  { label: 'Αρχική', icon: 'solar:home-2-bold', to: '/' },
  { label: 'Αγώνες', icon: 'streamline-ultimate:soccer-field-bold', to: '/matches' },
  { label: 'Η Ομάδα', icon: 'fluent:people-team-28-filled', to: '/team' },
  { label: 'Σκόρερ', icon: 'maki:soccer-11', to: '/scorers' },
  { label: 'Blog', icon: 'gravity-ui:square-article', to: '/blog' }
]

const externalLinks: NavigationMenuItem[] = [
  { label: 'ΕΠΣ Καστοριάς', to: 'https://epskastorias.gr/', target: '_blank' }
]

const socialLinks: ButtonProps[] = [
  {
    icon: 'ci:facebook',
    variant: 'ghost',
    color: 'neutral',
    to: 'https://www.facebook.com/photo/?fbid=638189021642804&set=a.508029164658791',
    target: '_blank',
  },
  {
    icon: 'ci:instagram',
    variant: 'ghost',
    color: 'neutral',
    to: 'https://www.instagram.com/ae_bitsiou/',
    target: '_blank',
  },
  {
    icon: 'ci:mail',
    variant: 'ghost',
    color: 'neutral',
    to: 'mailto:abvitsiou@gmail.gr',
    target: '_blank',
  }
]

const open = ref(false)
</script>
