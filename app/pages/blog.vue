
<template>
  <UPageSection>
    <div class="flex items-start justify-between">
      <UPageFeature icon="streamline-sharp:paragraph-article-solid" title="ΤΑ ΝΕΑ ΜΑΣ" description="ΤΟ BLOG ΤΗΣ ΟΜΑΔΑΣ"/>
      <PostAdd v-if="loggedIn" @refresh="getPosts()">
        <UButton variant="subtle" icon="material-symbols:add-2" class="w-fit" @refresh="getPosts()"/>
      </PostAdd>
    </div>

    <div v-if="loading" class="grid gap-6 md:grid-cols-2">
      <USkeleton v-for="i in 4" :key="i" class="h-80 bg-primary rounded-3xl"/>
    </div>
    <div v-else-if="posts.length > 0" class="grid gap-6 md:grid-cols-2">
      <UCard v-for="(p, i) in posts" :key="i" variant="soft"  class="transition divide-y-0 hover:shadow-lg ring ring-primary-700 bg-primary-900 rounded-2xl" :ui="{header: 'p-0 sm:px-0 relative  h-50 '}">
        <template #header>
          <NuxtImg :src="convertBufferToObjectURL(p.img)" class="size-full rounded-t-2xl object-cover"/>
          <div class="w-fit absolute right-2 top-2 flex gap-2">
            <PostEdit v-if="loggedIn" :post="p" @refresh="getPosts()">
              <UButton variant="solid" icon="material-symbols:edit-rounded"/>
            </PostEdit>
            <PostDelete v-if="loggedIn" :post-id="p.id" @refresh="getPosts()">
              <UButton variant="solid" icon="material-symbols:delete-rounded"/>
            </PostDelete>
          </div>

        </template>
        <p class="text-xs uppercase tracking-wider text-primary-300">{{ new Date(p.date).toLocaleString('el-GR') }}</p>
        <h2 class="mt-1 text-lg font-bold text-white">{{ p.title }}</h2>
        <p class="mt-2 text-sm text-primary-100">{{ p.description }}</p>
        <UButton :to="p.link" target="_blank" label="Διαβάστε περισσότερα" variant="link" color="warning" class="mt-2 px-0" trailing-icon="lucide:arrow-right" />
      </UCard>
    </div>
    <UEmpty v-else :avatar="{icon: 'si-glyph:database-error', color: 'primary'}" variant="naked" title="Δεν βρέθηκαν ανεβασμένα Posts" :ui="{root: 'bg-primary-900/30 ring ring-primary-700', title: 'text-primary-300'}" />

  </UPageSection>
</template>

<script setup lang="ts">
import type {Post} from "~/types";

useSeoMeta({ title: 'ΑΕ Βιτσιου — Blog', description: 'Νέα και ανακοινώσεις της ομάδας.' })
const {loggedIn} = useUserSession()

const posts = ref<Post[]>([])
const loading = ref(false)

function convertBufferToObjectURL(dbImgField: PostImg): string {
  if (!exists(dbImgField)) return '/placeholder.png'

  const rawBytes = dbImgField.data
  const byteArray = new Uint8Array(rawBytes)
  const blob = new Blob([byteArray], { type: 'image/png' })

  return URL.createObjectURL(blob)
}

function getPosts() {
  loading.value = true
  $fetch<ApiResponse<Post[]>>('/api/get/posts')
    .then((res) => {
      posts.value = res.response;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      loading.value = false
    })
}

getPosts()
</script>
