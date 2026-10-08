<template>
  <div class="bg-white shadow rounded-lg mb-6">
    <div class="p-5">
      <h5 class="text-lg font-bold text-gray-900 mb-1">REGISTER FORM</h5>
      <p class="text-sm text-gray-500 mb-4">Please fill in all the fields.</p>

      <form @submit.prevent="submitForm" @keyup.enter="submitForm">
        <AppInput
          v-model.trim="form.name"
          label="Name"
          placeholder="Enter user name"
          :error="errors.name"
        />

        <AppInput
          v-model="form.dateOfBirth"
          type="date"
          label="Date of Birth"
          :error="errors.dateOfBirth"
        />

        <AppInput
          v-model.trim="form.email"
          type="email"
          label="Email"
          placeholder="Enter email"
          :error="errors.email"
        />

        <AppInput
          v-model.trim="form.phone"
          type="tel"
          label="Phone number"
          placeholder="Enter Phone number"
          :error="errors.phone"
        />

        <div class="flex justify-end mt-4">
          <AppButton type="submit">{{ isEditMode ? 'Update data' : 'Save' }}</AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { Participant } from '../types';
import AppInput from './AppInput.vue';
import AppButton from './AppButton.vue';

const props = defineProps({
  existingEmails: {
    type: Array as () => string[],
    required: true
  },
  initialData: {
    type: Object as () => Partial<Participant> | null,
    default: null
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['save']);

const form = reactive({
  name: props.initialData?.name || '',
  dateOfBirth: props.initialData?.dateOfBirth || '',
  email: props.initialData?.email || '',
  phone: props.initialData?.phone || ''
});

const errors = reactive({
  name: '',
  dateOfBirth: '',
  email: '',
  phone: ''
});

const validateForm = () => {
  let isValid = true;
  errors.name = '';
  errors.dateOfBirth = '';
  errors.email = '';
  errors.phone = '';

  if (!form.name) {
    errors.name = 'This value is required.';
    isValid = false;
  }

  if (!form.dateOfBirth) {
    errors.dateOfBirth = 'This value is required.';
    isValid = false;
  } else {
    const dob = new Date(form.dateOfBirth);
    const now = new Date();
    if (dob > now) {
      errors.dateOfBirth = 'Date of birth cannot be in the future.';
      isValid = false;
    }
  }

  if (!form.email) {
    errors.email = 'This value is required.';
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errors.email = 'Invalid email format.';
      isValid = false;
    } else {
      const emailLower = form.email.toLowerCase();
      const isDuplicate = props.existingEmails.some((existing) => existing.toLowerCase() === emailLower);
      if (isDuplicate) {
        // If edit mode and it's their own email, it's allowed.
        const originalEmail = props.initialData?.email?.toLowerCase();
        if (!props.isEditMode || emailLower !== originalEmail) {
          errors.email = 'User with this email already exists.';
          isValid = false;
        }
      }
    }
  }

  if (!form.phone) {
    errors.phone = 'This value is required.';
    isValid = false;
  } else {
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      errors.phone = 'Phone must be in format +380XXXXXXXXX.';
      isValid = false;
    }
  }

  return isValid;
};

const submitForm = () => {
  if (validateForm()) {
    emit('save', {
      id: props.initialData?.id || Date.now().toString(),
      ...form
    });
    if (!props.isEditMode) {
      resetForm();
    }
  }
};

const resetForm = () => {
  form.name = '';
  form.dateOfBirth = '';
  form.email = '';
  form.phone = '';
  errors.name = '';
  errors.dateOfBirth = '';
  errors.email = '';
  errors.phone = '';
};
</script>
