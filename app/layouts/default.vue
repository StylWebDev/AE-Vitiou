<template>
  <div class="dark:bg-primary-950 light:bg-primary-200">
    <UContainer :ui="{base: 'px-0! space-y-6'}">
      <UDashboardNavbar title="ΑΕ Βιτσίου" toggle-side="right" :toggle="{ color: 'primary', variant: 'ghost',  class: 'rounded-full', onClick: () => {open=!open} }" class="sticky top-0 dark:bg-primary-800/30 light:bg-primary-50/30 backdrop-blur-2xl" :ui="{root: 'border-primary'}">
        <template #leading>
          <UAvatar src="/logo.webp" size="3xl" />
        </template>

        <UButton v-for="route in routes" :key="route.label" v-bind="route" variant="link" active-color="primary" active-variant="subtle" />

        <template #right>
          <UButton to="/sudo" variant="ghost" color="secondary" icon="material-symbols:person-shield-rounded"/>
          <UColorModeButton variant="link" />
        </template>

        <LayoutsDrawer v-model="open" :routes/>
      </UDashboardNavbar>

      <UMain >
        <slot/>
      </UMain>

      <div>
        <USeparator color="primary" :avatar="{src: '/logo.webp', loading: 'lazy'}" class="translate-y-2" :ui="{root: 'relative z-50'}" />

        <UFooter class=" dark:bg-primary-800/30 light:bg-primary-50/30 backdrop-blur-2xl" :ui="{root: 'relative z-40'}">
          <template #left>
            <UButton variant="link" to="https://styls.pages.dev" target="_blank" class="text-sm">
              StylWebDev © {{ new Date().getFullYear() }}
            </UButton>
          </template>

          <UNavigationMenu :items="footerItems" color="primary" variant="link" :ui="{linkLabel: 'text-primary', linkLabelExternalIcon: 'text-primary'}" />

          <template #right>
            <UButton v-for="(item,index) in social" :key="`social-${item['aria-label']}-${index}`" v-bind="item" />
          </template>
        </UFooter>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
</script>

<script setup lang="ts">
const open = ref(false)

const routes = [
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

const social = [
  {
    icon: "ci:facebook",
    variant: "ghost",
    to: "https://www.facebook.com/photo/?fbid=638189021642804&set=a.508029164658791",
    target: "_blank",
    'aria-label': "Facebook"
  },
  {
    icon: "ci:instagram",
    variant: "ghost",
    to: "https://www.instagram.com/ae_bitsiou/",
    target: "_blank",
    'aria-label': "Instagram"
  },
  {
    icon: "ci:mail",
    variant: "ghost",
    to: "mailto:abvitsiou@gmail.gr",
    target: "_blank",
    'aria-label': "Mail"
  },
]
</script>
