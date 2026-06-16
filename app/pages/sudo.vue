<template>
  <div>
    This is sudo area
    <h1>Hello {{user.name}}</h1>
    <UButton label="logOut" @click="logout()"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth'
  ]
})

const {user, clear} = useUserSession()

async function logout () {
  await clear()
  await navigateTo('/login')
}
</script>
