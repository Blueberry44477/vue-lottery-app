<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <RouterLink to="/" class="flex items-center gap-2 text-decoration-none group">
    <div
      class="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform"
    >
      <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        />
      </svg>
    </div>
    <div class="flex flex-col">
      <span
        class="font-bold text-lg leading-tight text-gray-900 group-hover:text-blue-600 transition-colors"
        >LotteryApp</span
      >
      <span class="text-[10px] text-gray-400 font-medium tracking-wider uppercase"
        >Vue 3 &bull; Lab #5</span
      >
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
