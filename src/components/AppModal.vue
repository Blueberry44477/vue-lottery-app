<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-black/50 flex justify-center items-center z-50 outline-none" 
        tabindex="0" 
        ref="backdrop" 
        @click="close" 
        @keyup.esc="close"
      >
        <div class="w-full max-w-lg mx-4" @click.stop>
          <div class="bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]">
            <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h5 class="text-lg font-bold text-gray-900 m-0">
                <slot name="header">Modal title</slot>
              </h5>
              <button 
                type="button" 
                class="text-gray-400 hover:text-gray-500 focus:outline-none" 
                aria-label="Close" 
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="p-6 overflow-y-auto">
              <slot></slot>
            </div>
            <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50 rounded-b-lg">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);
const backdrop = ref<HTMLElement | null>(null);

const close = () => {
  emit('update:modelValue', false);
};

watch(() => props.modelValue, async (newVal) => {
  if (newVal) {
    await nextTick();
    if (backdrop.value) {
      backdrop.value.focus();
    }
  }
});
</script>
