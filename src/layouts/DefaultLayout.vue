<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-gray-900 font-sans">
    <AppHeader />

    <main class="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
      <div
        class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <span class="font-semibold text-gray-700">Vue Lottery App</span> &copy;
          {{ new Date().getFullYear() }} &bull; Лабораторна робота №5
        </div>
        <div class="flex items-center gap-4 text-xs">
          <span>Vue 3 + Vue Router</span>
          <span>&bull;</span>
          <span>Repository Pattern</span>
          <span>&bull;</span>
          <span>JWT Auth</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>
