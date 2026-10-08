<template>
  <button
    :class="[
      'px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      variantClass
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-500 hover:bg-gray-600 text-white';
    case 'danger':
      return 'bg-red-500 hover:bg-red-600 text-white';
    case 'primary':
    default:
      return 'bg-blue-500 hover:bg-blue-600 text-white';
  }
});
</script>
