<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <Logo />

      <div class="flex items-center gap-4">
        <AppNavigation />

        <div
          v-if="authStore.isAuthenticated && authStore.user"
          class="hidden md:flex items-center pl-4 border-l border-gray-200 text-sm"
        >
          <img
            v-if="authStore.user.image"
            :src="authStore.user.image"
            alt="User avatar"
            class="w-8 h-8 rounded-full border border-gray-200 object-cover mr-2 bg-gray-100"
          />
          <div
            v-else
            class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center mr-2 text-xs"
          >
            {{ (authStore.user.firstName?.[0] || 'U') + (authStore.user.lastName?.[0] || '') }}
          </div>
          <span class="font-medium text-gray-700 max-w-[120px] truncate">
            {{ authStore.userName }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import AppNavigation from './AppNavigation.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
