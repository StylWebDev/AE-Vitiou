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
    <h1 class="mb-8 text-3xl font-bold text-primary-500">Blog</h1>
    <div class="grid gap-6 md:grid-cols-2">
      <UCard v-for="(p, i) in posts" :key="i" class="transition hover:shadow-lg">
        <p class="text-xs uppercase tracking-wider text-muted">{{ p.date }}</p>
        <h2 class="mt-1 text-lg font-bold">{{ p.title }}</h2>
        <p class="mt-2 text-sm text-muted">{{ p.excerpt }}</p>
        <UButton label="Διαβάστε περισσότερα" variant="link" color="primary" class="mt-2 px-0" trailing-icon="lucide:arrow-right" />
      </UCard>
    </div>
  </div>
</template>
