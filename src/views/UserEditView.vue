<template>
  <div class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs">
    <div class="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Редагування користувача #{{ id }}</h2>
        <p class="text-sm text-gray-500 mt-0.5">
          Вкладений маршрут: <code>/users/{{ id }}/edit</code>
        </p>
      </div>

      <RouterLink :to="`/users/${id}`" class="btn btn-outline btn-sm">
        &larr; Скасувати та повернутися
      </RouterLink>
    </div>

    <!-- Alert Success -->
    <div v-if="successMessage" class="alert alert-success mb-4 flex items-center justify-between">
      <span>{{ successMessage }}</span>
      <button
        type="button"
        class="text-emerald-700 hover:text-emerald-900 text-sm font-bold"
        @click="successMessage = ''"
      >
        &times;
      </button>
    </div>

    <!-- Alert Error -->
    <div v-if="usersStore.error" class="alert alert-danger mb-4">
      {{ usersStore.error }}
    </div>

    <form @submit="onSubmit" class="space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="form-group mb-0">
          <label class="form-label">Ім'я (First Name) *</label>
          <input
            v-model="firstName"
            type="text"
            placeholder="Ім'я"
            :class="['form-input', { 'has-error': errors.firstName }]"
          />
          <div v-if="errors.firstName" class="form-error">{{ errors.firstName }}</div>
        </div>

        <div class="form-group mb-0">
          <label class="form-label">Прізвище (Last Name) *</label>
          <input
            v-model="lastName"
            type="text"
            placeholder="Прізвище"
            :class="['form-input', { 'has-error': errors.lastName }]"
          />
          <div v-if="errors.lastName" class="form-error">{{ errors.lastName }}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="form-group mb-0">
          <label class="form-label">Email *</label>
          <input
            v-model="email"
            type="email"
            placeholder="user@example.com"
            :class="['form-input', { 'has-error': errors.email }]"
          />
          <div v-if="errors.email" class="form-error">{{ errors.email }}</div>
        </div>

        <div class="form-group mb-0">
          <label class="form-label">Username *</label>
          <input
            v-model="username"
            type="text"
            placeholder="username"
            :class="['form-input', { 'has-error': errors.username }]"
          />
          <div v-if="errors.username" class="form-error">{{ errors.username }}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div class="form-group mb-0">
          <label class="form-label">Вік (Age) *</label>
          <input
            v-model.number="age"
            type="number"
            min="1"
            max="120"
            :class="['form-input', { 'has-error': errors.age }]"
          />
          <div v-if="errors.age" class="form-error">{{ errors.age }}</div>
        </div>

        <div class="form-group mb-0">
          <label class="form-label">Стать (Gender) *</label>
          <select v-model="gender" :class="['form-select', { 'has-error': errors.gender }]">
            <option value="male">Чоловіча (male)</option>
            <option value="female">Жіноча (female)</option>
            <option value="other">Інша (other)</option>
          </select>
          <div v-if="errors.gender" class="form-error">{{ errors.gender }}</div>
        </div>

        <div class="form-group mb-0">
          <label class="form-label">Телефон (Phone) *</label>
          <input
            v-model="phone"
            type="tel"
            placeholder="+380XXXXXXXXX"
            :class="['form-input', { 'has-error': errors.phone }]"
          />
          <div v-if="errors.phone" class="form-error">{{ errors.phone }}</div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <RouterLink :to="`/users/${id}`" class="btn btn-secondary"> Скасувати </RouterLink>

        <button
          type="submit"
          class="btn btn-primary shadow-sm"
          :disabled="isSubmitting || usersStore.isLoading"
        >
          <span
            v-if="isSubmitting || usersStore.isLoading"
            class="spinner mr-2 border-white"
          ></span>
          Зберегти зміни
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUsersStore } from '@/stores/users'
import type { User, UpdateUserDto } from '@/types/user'

const props = defineProps<{
  id: number | string
  user?: User | null
}>()

const emit = defineEmits<{
  (e: 'saved', user: User): void
}>()

const router = useRouter()
const usersStore = useUsersStore()
const successMessage = ref('')

const validationSchema = yup.object({
  firstName: yup.string().required("Поле обов'язкове для заповнення"),
  lastName: yup.string().required("Поле обов'язкове для заповнення"),
  email: yup.string().required("Поле обов'язкове для заповнення").email('Некоректний email'),
  username: yup.string().required("Поле обов'язкове для заповнення").min(3, 'Мінімум 3 символи'),
  age: yup
    .number()
    .required("Поле обов'язкове для заповнення")
    .positive('Вік повинен бути додатнім'),
  gender: yup.string().required("Поле обов'язкове для заповнення"),
  phone: yup.string().required("Поле обов'язкове для заповнення"),
})

const { handleSubmit, errors, isSubmitting, setValues } = useForm({
  validationSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    age: 25,
    gender: 'male',
    phone: '',
  },
})

const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: email } = useField<string>('email')
const { value: username } = useField<string>('username')
const { value: age } = useField<number>('age')
const { value: gender } = useField<string>('gender')
const { value: phone } = useField<string>('phone')

const populateForm = (userData: User) => {
  setValues({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    username: userData.username || '',
    age: userData.age || 25,
    gender: userData.gender || 'male',
    phone: userData.phone || '',
  })
}

onMounted(async () => {
  const numericId = Number(props.id)
  if (props.user && props.user.id === numericId) {
    populateForm(props.user)
  } else {
    try {
      const fetched = await usersStore.getUserById(numericId)
      populateForm(fetched)
    } catch (err) {
      console.error('Failed to load user for edit:', err)
    }
  }
})

const onSubmit = handleSubmit(async (values) => {
  const numericId = Number(props.id)
  try {
    const updated = await usersStore.updateUser(numericId, values as UpdateUserDto)
    successMessage.value = 'Дані користувача успішно оновлено!'
    emit('saved', updated)

    setTimeout(() => {
      router.push(`/users/${numericId}`)
    }, 1000)
  } catch (err) {
    console.error('Update failed:', err)
  }
})
</script>
