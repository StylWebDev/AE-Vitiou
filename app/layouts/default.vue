<template>
  <UContainer class="min-h-screen flex flex-col ">
    <!-- Header -->
    <UDashboardNavbar title="ΑΕ Βιτσίου" toggle-side="right" :toggle="{ color: 'primary', variant: 'ghost',  class: 'rounded-full', onClick: () => {open=!open} }" class="sticky top-0 z-50 bg-linear-to-tr  from-primary-600/90 to-primary-900/90 backdrop-blur" :ui="{root: 'border-primary/40', title: 'text-primary-300'}">
      <template #leading>
        <UAvatar src="/logo.webp" size="3xl" />
      </template>

      <UButton v-for="route in pages" :key="route.label" v-bind="route" variant="link" color="warning"  active-variant="subtle"  />

      <template #right>
        <UButton variant="ghost" color="secondary" :label="loggedIn ? 'Αποσύνδεση' : 'Σύνδεση'" :icon="loggedIn ? `ri:shut-down-line` : `material-symbols:person-shield-rounded`" :ui="{label: 'hidden lg:block'}" class="cursor-pointer" @click="handleLog"/>
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
        <UButton variant="link" color="secondary" to="https://styls.pages.dev" target="_blank" class="text-sm">
          StylWebDev © {{ new Date().getFullYear() }}
        </UButton>
      </template>

      <UNavigationMenu :items="externalLinks" color="info" variant="link" :ui="{linkLabel: 'text-info', linkLabelExternalIcon: 'text-info'}" />

      <template #right>
        <UButton v-for="(item,index) in socialLinks" :key="`social-${index}`" v-bind="item" />
      </template>
    </UFooter>
  </UContainer>
</template>

<script setup lang="ts">
import type { NavigationMenuItem, ButtonProps } from '@nuxt/ui'

const {loggedIn, clear: signOut} = useUserSession();
const pages = [
  { label: 'Αρχική', icon: 'game-icons:soccer-ball', to: '/' },
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
    color: 'secondary',
    to: 'https://www.facebook.com/photo/?fbid=638189021642804&set=a.508029164658791',
    target: '_blank',
  },
  {
    icon: 'ci:instagram',
    variant: 'ghost',
    color: 'secondary',
    to: 'https://www.instagram.com/ae_bitsiou/',
    target: '_blank',
  },
  {
    icon: 'ci:mail',
    variant: 'ghost',
    color: 'secondary',
    to: 'mailto:abvitsiou@gmail.gr',
    target: '_blank',
  }
]

async function handleLog() {
  if (loggedIn) {
    await signOut();
  }
  await navigateTo('/login')
}

const open = ref(false)
</script>
