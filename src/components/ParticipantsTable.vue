<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th scope="col" class="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" @click="$emit('sort', 'name')">
              <div class="flex items-center">
                Name
                <span v-if="sortKey === 'name'" class="ml-1">
                  <i v-if="sortOrder === 'asc'">&#9650;</i>
                  <i v-else>&#9660;</i>
                </span>
                <span v-else class="ml-1 text-gray-300">&#8693;</span>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" @click="$emit('sort', 'dateOfBirth')">
              <div class="flex items-center">
                Date of Birth
                <span v-if="sortKey === 'dateOfBirth'" class="ml-1">
                  <i v-if="sortOrder === 'asc'">&#9650;</i>
                  <i v-else>&#9660;</i>
                </span>
                <span v-else class="ml-1 text-gray-300">&#8693;</span>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" class="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">Phone number</th>
            <th scope="col" class="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="participants.length === 0">
            <td colspan="6" class="px-6 py-4 text-center text-gray-500">No participants found.</td>
          </tr>
          <tr v-for="(participant, index) in participants" :key="participant.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ participant.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(participant.dateOfBirth) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ participant.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ participant.phone }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-blue-600 hover:text-blue-900 mr-4" @click="$emit('edit', participant)">Edit</button>
              <button class="text-red-600 hover:text-red-900" @click="$emit('delete', participant)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Participant } from '../types';

defineProps({
  participants: {
    type: Array as () => Participant[],
    required: true
  },
  sortKey: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'asc'
  }
});

defineEmits(['sort', 'edit', 'delete']);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`; // dd/mm/yyyy
};
</script>
