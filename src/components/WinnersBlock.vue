<template>
  <div class="bg-white shadow rounded-lg mb-6">
    <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-grow border border-gray-200 rounded-md p-2 flex flex-wrap items-center min-h-[50px]">
        <template v-if="winners.length > 0">
          <WinnerBadge
            v-for="winner in winners"
            :key="winner.id"
            :name="winner.name"
            @remove="$emit('remove-winner', winner.id)"
          />
        </template>
        <span v-else class="text-gray-400 text-sm italic ml-2">Winners</span>
      </div>
      <AppButton
        :disabled="isButtonDisabled"
        @click="$emit('new-winner')"
        class="whitespace-nowrap"
      >
        New winner
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Participant } from '../types';
import WinnerBadge from './WinnerBadge.vue';
import AppButton from './AppButton.vue';

const props = defineProps({
  winners: {
    type: Array as () => Participant[],
    required: true
  },
  participantsCount: {
    type: Number,
    required: true
  }
});

defineEmits(['new-winner', 'remove-winner']);

const isButtonDisabled = computed(() => {
  return props.winners.length >= 3 || props.participantsCount === 0 || props.winners.length === props.participantsCount;
});
</script>
