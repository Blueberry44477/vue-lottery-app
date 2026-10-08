<template>
  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
    {{ name }}
    <button 
      type="button" 
      class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-500 hover:bg-blue-200 hover:text-blue-700 focus:outline-none" 
      aria-label="Close" 
      @click="$emit('remove')"
    >
      <span class="sr-only">Remove</span>
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  }
});

defineEmits(['remove']);
</script>
