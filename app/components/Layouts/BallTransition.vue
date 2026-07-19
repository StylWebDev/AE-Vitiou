<script setup lang="ts">
const active = ref(false)
const router = useRouter()

const {start, stop} = useTimeout(700, {callback: () => {
  active.value = false
}, controls: true})

router.beforeEach(() => {
  stop();
  active.value = true
})

router.afterEach(() => {
  start()
})
</script>

<template>
  <Transition mode="out-in" enter-active-class="transition-opacity ease duration-250" enter-from-class="opacity-0" leave-to-class="opacity-0" leave-active-class="transition-opacity ease duration-25">
    <div v-if="active" class="fixed top-1/4 inset-0 flex flec-col items-start justify-center ball-overlay">
      <div class="animate-ball">
        <UIcon name="noto:soccer-ball" class="size-8" />
      </div>
    </div>
  </Transition>
</template>
