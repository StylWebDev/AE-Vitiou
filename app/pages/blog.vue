<script setup lang="ts">
useSeoMeta({ title: 'ΑΕ Βιτσιου — Blog', description: 'Νέα και ανακοινώσεις της ομάδας.' })

const posts = [
  { title: 'Νέα μεταγραφή ενισχύει την ομάδα', date: '10/07/2026', excerpt: 'Καλωσορίζουμε το νέο μας παίκτη...' },
  { title: 'Ανασκόπηση της σεζόν', date: '01/07/2026', excerpt: 'Μια χρονιά γεμάτη συγκινήσεις...' },
  { title: 'Πρόγραμμα προετοιμασίας', date: '20/06/2026', excerpt: 'Ξεκινούν οι προπονήσεις...' }
]
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12">
    <UPageFeature icon="streamline-sharp:paragraph-article-solid" title="ΤΑ ΝΕΑ ΜΑΣ" description="ΤΟ BLOG ΤΗΣ ΟΜΑΔΑΣ"/>

    <div class="grid gap-6 md:grid-cols-2">
      <UCard v-for="(p, i) in posts" :key="i" variant="soft"  class="transition divide-y-0 hover:shadow-lg ring ring-primary-700 bg-primary-900 rounded-2xl" :ui="{header: 'p-0 sm:px-0'}">
        <template #header>
          <NuxtImg src="" class="w-full max-h-50 rounded-t-2xl"/>
        </template>
        <p class="text-xs uppercase tracking-wider text-primary-300">{{ p.date }}</p>
        <h2 class="mt-1 text-lg font-bold text-white">{{ p.title }}</h2>
        <p class="mt-2 text-sm text-primary-100">{{ p.excerpt }}</p>
        <UButton label="Διαβάστε περισσότερα" variant="link" color="warning" class="mt-2 px-0" trailing-icon="lucide:arrow-right" />
      </UCard>
    </div>
  </div>
</template>
