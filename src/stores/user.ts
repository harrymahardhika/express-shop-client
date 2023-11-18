import api from '@/support/api'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const defaultUser: User = {} as User
  const user = ref(useStorage('user', defaultUser))
  const token = ref(useStorage('token', null))
  const isAuthenticated = computed(() => !!token.value)
  const isLoggedOut = computed(() => !token.value)

  const authenticate = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth', { email, password })
      token.value = response.token
      user.value = response.user
    } catch (err) {
      console.error(err)
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoggedOut,
    authenticate,
    logout
  }
})
