<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)
const email = ref('tate_goldner@hotmail.com')
const password = ref('password')
const router = useRouter()
const login = async () => {
  await userStore.authenticate(email.value, password.value).then(() => {
    if (isAuthenticated.value) {
      router.push({ name: 'home' })
    }
  })
}

onMounted(() => {
  if (isAuthenticated.value) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div>
    <form @submit.prevent="login" class="max-w-sm mx-auto">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="email"> Email </label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-2" for="password"> Password </label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>
