<script setup lang="ts">
/**
 * Full-screen rolling-ball overlay shown on every route change.
 * A football rolls across a maroon curtain while the next page loads.
 */
const active = ref(false)
const router = useRouter()

router.beforeEach(() => {
  active.value = true
})
router.afterEach(() => {
  // keep the curtain up long enough to see the ball roll through
  setTimeout(() => {
    active.value = false
  }, 650)
})
</script>

<template>
  <Transition name="curtain">
    <div v-if="active" class="ball-overlay">
      <div class="ball">
        <UIcon name="maki:soccer-11" class="ball-icon" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.ball-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #641727 0%, #3d0e16 100%);
  overflow: hidden;
  pointer-events: none;
}

.ball {
  color: #ffffff;
  animation: roll 0.9s linear;
}

.ball-icon {
  width: 72px;
  height: 72px;
}

@keyframes roll {
  0% {
    transform: translateX(-60vw) rotate(0deg);
  }
  100% {
    transform: translateX(60vw) rotate(720deg);
  }
}

.curtain-enter-active,
.curtain-leave-active {
  transition: opacity 0.25s ease;
}
.curtain-enter-from,
.curtain-leave-to {
  opacity: 0;
}
</style>
