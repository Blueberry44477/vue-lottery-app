<template>
  <div class="mb-4">
    <input
      type="text"
      class="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
      placeholder="Search by name..."
      v-model="searchQuery"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['filter-by-name']);
const searchQuery = ref('');

let timeout: number | null = null;

watch(searchQuery, (newVal) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = window.setTimeout(() => {
    emit('filter-by-name', newVal);
  }, 300);
});
</script>
