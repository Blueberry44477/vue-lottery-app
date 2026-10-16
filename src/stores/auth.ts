// src/stores/auth.ts

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ServiceProvider } from '@/services/service-provider'
import { onAuthExpired, onTokenRefreshed } from '@/api/http-client'
import type { LoginCredentials } from '@/types/auth'
import type { User } from '@/types/user'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Initialize from localStorage
  const init = () => {
    try {
      const storedToken = localStorage.getItem('access_token')
      const storedRefreshToken = localStorage.getItem('refresh_token')
      const storedUser = localStorage.getItem('auth_user')

      if (storedToken) accessToken.value = storedToken
      if (storedRefreshToken) refreshToken.value = storedRefreshToken
      if (storedUser) user.value = JSON.parse(storedUser)
    } catch {
      localStorage.removeItem('auth_user')
    }
  }

  // Hook up http-client events
  onAuthExpired(() => {
    logout(false)
  })

  onTokenRefreshed((newToken, newRefreshToken) => {
    accessToken.value = newToken
    refreshToken.value = newRefreshToken
  })

  init()

  const isAuthenticated = computed(() => Boolean(accessToken.value))

  const userName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`.trim() || user.value.username
  })

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    try {
      const response = await ServiceProvider.auth.login(credentials)
      accessToken.value = response.accessToken
      refreshToken.value = response.refreshToken

      const userData: User = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image,
        age: 0,
        phone: '',
      }

      user.value = userData

      localStorage.setItem('access_token', response.accessToken)
      localStorage.setItem('refresh_token', response.refreshToken)
      localStorage.setItem('auth_user', JSON.stringify(userData))

      return true
    } catch (err) {
      error.value = (err as Error).message || 'Failed to sign in. Please verify your credentials.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = (shouldRedirect = true): void => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    error.value = null

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('auth_user')

    if (shouldRedirect) {
      router.push({ name: 'login' })
    }
  }

  const fetchCurrentUser = async (): Promise<void> => {
    if (!accessToken.value) return
    try {
      const current = await ServiceProvider.auth.getCurrentUser()
      user.value = current
      localStorage.setItem('auth_user', JSON.stringify(current))
    } catch (err) {
      console.warn('Failed to fetch current user profile:', err)
    }
  }

  return {
    user,
    accessToken,
    refreshToken,
    isLoading,
    error,
    isAuthenticated,
    userName,
    login,
    logout,
    fetchCurrentUser,
    init,
  }
})
