<template>
  <div class="text-center py-16 px-4">
    <div
      class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 text-blue-600 mb-6 font-mono text-4xl font-bold"
    >
      404
    </div>
    <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-3">
      Сторінку не знайдено
    </h1>
    <p class="text-base text-gray-500 max-w-md mx-auto mb-8">
      Запитувана сторінка не існує або була переміщена. Перевірте правильність введеного URL.
    </p>
    <RouterLink to="/" class="btn btn-primary shadow-md">
      &larr; Повернутися на головну
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
