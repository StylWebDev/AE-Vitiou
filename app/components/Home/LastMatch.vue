<template>
  <div class="flex flex-col items-center w-full bg-linear-to-bl from-secondary/40 gap-4 via-transparent to-secondary/40  rounded-2xl ring ring-primary p-8">
    <img src="/logo.webp" class="size-25">
    <h1 class="text-4xl font-extrabold text-primary">ΑΕ ΒΙΤΣΙΟΥ</h1>

    <h2 class="text-xl uppercase italic font-extrabold text-muted">Τελευταίος Αγώνας</h2>

    <UBadge leading-icon="mdi:whistle" variant="subtle" size="lg"  class="rounded-2xl" >
      Ολοκληρώθηκε <span class="text-default">· 3 Μαΐ 2026</span>
    </UBadge>

    <div class="flex justify-between items-center gap-5 sm:gap-10 text-xl font-bold p-4">
      <div class="flex items-center gap-2">
        <UAvatar src="https://epskastorias.gr/wp-content/uploads/2024/11/pas-lefk.jpg" class="size-12"/>
        <h3>ΠΑΣ Λεύκης</h3>
      </div>
      <p class="text-success tracking-widest">0-2</p>
      <div class="flex items-center gap-2">
        <h3 class="text-end">ΑΕ ΒΙΤΣΊΟΥ</h3>
        <UAvatar src="/logo.webp" class="size-12"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
