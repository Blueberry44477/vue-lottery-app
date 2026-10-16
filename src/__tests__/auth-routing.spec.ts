// src/__tests__/auth-routing.spec.ts

import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import router from '../router'
import { useAuthStore } from '../stores/auth'

describe('Auth & Navigation Guards', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    localStorage.clear()
    await router.push('/')
    await router.isReady()
  })

  it('redirects unauthenticated user to /login with redirect query when accessing protected /users', async () => {
    await router.push('/users')
    expect(router.currentRoute.value.path).toBe('/login')
    expect(router.currentRoute.value.query.redirect).toBe('/users')
  })

  it('redirects authenticated user away from /login to /users', async () => {
    const authStore = useAuthStore()
    localStorage.setItem('access_token', 'fake-jwt-token')
    authStore.init()

    expect(authStore.isAuthenticated).toBe(true)

    await router.push('/login')
    expect(router.currentRoute.value.path).toBe('/users')
  })

  it('updates document.title on route change via router.afterEach', async () => {
    await router.push('/about')
    expect(document.title).toBe('Про автора | Vue Lottery App')

    await router.push('/')
    expect(document.title).toBe('Головна | Vue Lottery App')
  })
})
