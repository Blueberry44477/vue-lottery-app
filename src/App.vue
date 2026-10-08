<template>
  <div class="max-w-5xl mx-auto px-4 py-10 min-h-screen font-sans text-gray-900">
    <WinnersBlock
      :winners="winners"
      :participants-count="participants.length"
      @new-winner="selectNewWinner"
      @remove-winner="removeWinner"
    />

    <RegistrationForm
      :existing-emails="existingEmails"
      @save="addParticipant"
    />

    <div class="bg-white shadow rounded-lg mb-6">
      <div class="p-5">
        <SearchBar @filter-by-name="handleFilter" />
        <ParticipantsTable
          :participants="filteredAndSortedParticipants"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          @sort="handleSort"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>
    </div>

    <!-- Edit Modal -->
    <AppModal v-model="isEditModalOpen">
      <template #header>Edit Participant</template>
      <RegistrationForm
        v-if="participantToEdit"
        :existing-emails="existingEmails"
        :initial-data="participantToEdit"
        :is-edit-mode="true"
        @save="updateParticipant"
      />
    </AppModal>

    <!-- Delete Modal -->
    <AppModal v-model="isDeleteModalOpen">
      <template #header>Підтвердження видалення</template>
      <div v-if="participantToDelete">
        Ви дійсно бажаєте видалити учасника "{{ participantToDelete.name }}", "{{ participantToDelete.email }}"?
      </div>
      <template #footer>
        <AppButton variant="danger" class="mr-2" @click="confirmDelete">Так</AppButton>
        <AppButton variant="secondary" @click="isDeleteModalOpen = false">Ні</AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { Participant } from './types';
import WinnersBlock from './components/WinnersBlock.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import SearchBar from './components/SearchBar.vue';
import ParticipantsTable from './components/ParticipantsTable.vue';
import AppModal from './components/AppModal.vue';
import AppButton from './components/AppButton.vue';

const participants = ref<Participant[]>([]);
const winners = ref<Participant[]>([]);

// LocalStorage
onMounted(() => {
  const saved = localStorage.getItem('lottery_users');
  if (saved) {
    try {
      participants.value = JSON.parse(saved);
    } catch {
      console.error('Failed to parse users from localStorage');
    }
  }
});

watch(participants, (newVal) => {
  localStorage.setItem('lottery_users', JSON.stringify(newVal));
}, { deep: true });

// Existing emails for validation
const existingEmails = computed(() => {
  return participants.value.map(p => p.email);
});

// Sorting & Filtering
const searchQuery = ref('');
const sortKey = ref<'name' | 'dateOfBirth' | ''>('');
const sortOrder = ref<'asc' | 'desc'>('asc');

const handleFilter = (query: string) => {
  searchQuery.value = query;
};

const handleSort = (key: 'name' | 'dateOfBirth') => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const filteredAndSortedParticipants = computed(() => {
  let result = [...participants.value];
  
  // Filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(q));
  }
  
  // Sort
  if (sortKey.value) {
    result.sort((a, b) => {
      if (!sortKey.value) return 0;
      let valA = a[sortKey.value as keyof Participant] as string;
      let valB = b[sortKey.value as keyof Participant] as string;
      
      if (sortKey.value === 'name') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      
      if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  return result;
});

// Participant Actions
const addParticipant = (participant: Participant) => {
  participants.value.push(participant);
};

const isEditModalOpen = ref(false);
const participantToEdit = ref<Participant | null>(null);

const openEditModal = (participant: Participant) => {
  participantToEdit.value = { ...participant };
  isEditModalOpen.value = true;
};

const updateParticipant = (updated: Participant) => {
  const index = participants.value.findIndex(p => p.id === updated.id);
  if (index !== -1) {
    participants.value[index] = updated;
  }
  
  const winnerIndex = winners.value.findIndex(w => w.id === updated.id);
  if (winnerIndex !== -1) {
    winners.value[winnerIndex] = updated;
  }
  
  isEditModalOpen.value = false;
  participantToEdit.value = null;
};

const isDeleteModalOpen = ref(false);
const participantToDelete = ref<Participant | null>(null);

const openDeleteModal = (participant: Participant) => {
  participantToDelete.value = participant;
  isDeleteModalOpen.value = true;
};

const confirmDelete = () => {
  if (participantToDelete.value) {
    const id = participantToDelete.value.id;
    participants.value = participants.value.filter(p => p.id !== id);
    winners.value = winners.value.filter(w => w.id !== id);
  }
  isDeleteModalOpen.value = false;
  participantToDelete.value = null;
};

// Winner Actions
const selectNewWinner = () => {
  if (winners.value.length >= 3 || participants.value.length === 0) return;
  
  const availableParticipants = participants.value.filter(
    p => !winners.value.some(w => w.id === p.id)
  );
  
  if (availableParticipants.length === 0) return;
  
  const randomIndex = Math.floor(Math.random() * availableParticipants.length);
  const selected = availableParticipants[randomIndex];
  if (selected) {
    winners.value.push(selected);
  }
};

const removeWinner = (id: string) => {
  winners.value = winners.value.filter(w => w.id !== id);
};
</script>
