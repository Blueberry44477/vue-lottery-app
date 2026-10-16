<template>
  <nav class="flex items-center gap-1 sm:gap-2">
    <RouterLink
      to="/"
      class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
      exact-active-class="bg-blue-50 text-blue-600 font-semibold"
    >
      Home
    </RouterLink>

    <RouterLink
      to="/about"
      class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
      active-class="bg-blue-50 text-blue-600 font-semibold"
    >
      About author
    </RouterLink>

    <RouterLink
      to="/users"
      class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
      active-class="bg-blue-50 text-blue-600 font-semibold"
    >
      Users
    </RouterLink>

    <!-- If not authenticated: show Login link -->
    <RouterLink
      v-if="!authStore.isAuthenticated"
      to="/login"
      class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
      active-class="bg-blue-50 text-blue-600 font-semibold"
    >
      Login
    </RouterLink>

    <!-- If authenticated: show Logout button -->
    <button
      v-else
      type="button"
      class="inline-flex items-center text-xs font-medium px-2.5 py-1.5 rounded-md text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 ml-2 transition-colors cursor-pointer"
      @click="handleLogout"
    >
      <svg class="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      Logout
    </button>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}
</script>
