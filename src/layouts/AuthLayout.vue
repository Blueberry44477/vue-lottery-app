<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from '@/components/Logo.vue'
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8 font-sans"
  >
    <div class="mb-6 flex flex-col items-center">
      <Logo />
    </div>

    <div class="w-full max-w-md">
      <div class="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-gray-100">
        <slot />
      </div>

      <div class="mt-6 text-center text-xs text-gray-500">
        <RouterLink to="/" class="text-blue-600 hover:text-blue-800 font-medium">
          &larr; Back to Home page
        </RouterLink>
      </div>
    </div>
  </div>
</template>
