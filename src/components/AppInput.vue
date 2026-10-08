<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1" :for="id">{{ label }}</label>
    <input
      :id="id"
      :class="[
        'block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 sm:text-sm',
        error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      ]"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @keyup.enter="$emit('enter')"
    />
    <div v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`
  }
});

const emit = defineEmits(['update:modelValue', 'enter']);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>
