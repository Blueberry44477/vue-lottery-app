<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-gray-500/75 transition-opacity" @click="close"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <!-- Modal Card -->
      <div
        class="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6"
      >
        <div class="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
          <h3 id="modal-title" class="text-lg font-bold text-gray-900">
            {{ isEditMode ? 'Редагувати дані користувача' : 'Додати нового користувача' }}
          </h3>
          <button
            type="button"
            class="text-gray-400 hover:text-gray-600 font-bold text-xl"
            @click="close"
          >
            &times;
          </button>
        </div>

        <form @submit="onSubmit" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group mb-0">
              <label class="form-label">Ім'я (First Name) *</label>
              <input
                v-model="firstName"
                type="text"
                placeholder="Іван"
                :class="['form-input', { 'has-error': errors.firstName }]"
              />
              <div v-if="errors.firstName" class="form-error">{{ errors.firstName }}</div>
            </div>

            <div class="form-group mb-0">
              <label class="form-label">Прізвище (Last Name) *</label>
              <input
                v-model="lastName"
                type="text"
                placeholder="Коваленко"
                :class="['form-input', { 'has-error': errors.lastName }]"
              />
              <div v-if="errors.lastName" class="form-error">{{ errors.lastName }}</div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <label class="form-label">Логін (Username) *</label>
              <input
                v-model="username"
                type="text"
                placeholder="ivan_koval"
                :class="['form-input', { 'has-error': errors.username }]"
              />
              <div v-if="errors.username" class="form-error">{{ errors.username }}</div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group mb-0">
              <label class="form-label">Вік (Age) *</label>
              <input
                v-model.number="age"
                type="number"
                min="1"
                max="120"
                placeholder="25"
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

          <div v-if="!isEditMode" class="form-group mb-0">
            <label class="form-label">Пароль (Password) *</label>
            <input
              v-model="password"
              type="password"
              placeholder="Мінімум 6 символів"
              :class="['form-input', { 'has-error': errors.password }]"
            />
            <div v-if="errors.password" class="form-error">{{ errors.password }}</div>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" class="btn btn-secondary" @click="close">Скасувати</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner mr-2 border-white"></span>
              {{ isEditMode ? 'Зберегти зміни' : 'Створити користувача' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import type { User, CreateUserDto } from '@/types/user'

const props = defineProps<{
  isOpen: boolean
  userToEdit?: User | null
  isEditMode?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: CreateUserDto): void
}>()

const validationSchema = yup.object({
  firstName: yup.string().required("Поле обов'язкове для заповнення"),
  lastName: yup.string().required("Поле обов'язкове для заповнення"),
  email: yup.string().required("Поле обов'язкове для заповнення").email('Некоректний формат email'),
  username: yup.string().required("Поле обов'язкове для заповнення").min(3, 'Мінімум 3 символи'),
  age: yup
    .number()
    .required("Поле обов'язкове для заповнення")
    .positive('Вік повинен бути додатнім')
    .integer(),
  gender: yup.string().required("Поле обов'язкове для заповнення"),
  phone: yup.string().required("Поле обов'язкове для заповнення"),
  password: yup.string().test('password-rule', 'Мінімум 6 символів', function (val) {
    if (props.isEditMode) return true
    if (!val) return this.createError({ message: "Поле обов'язкове для заповнення" })
    return val.length >= 6
  }),
})

const { handleSubmit, errors, isSubmitting, resetForm, setValues } = useForm({
  validationSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    age: 25,
    gender: 'male',
    phone: '',
    password: '',
  },
})

const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: email } = useField<string>('email')
const { value: username } = useField<string>('username')
const { value: age } = useField<number>('age')
const { value: gender } = useField<string>('gender')
const { value: phone } = useField<string>('phone')
const { value: password } = useField<string>('password')

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      if (props.isEditMode && props.userToEdit) {
        setValues({
          firstName: props.userToEdit.firstName || '',
          lastName: props.userToEdit.lastName || '',
          email: props.userToEdit.email || '',
          username: props.userToEdit.username || '',
          age: props.userToEdit.age || 25,
          gender: props.userToEdit.gender || 'male',
          phone: props.userToEdit.phone || '',
          password: '',
        })
      } else {
        resetForm({
          values: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            age: 25,
            gender: 'male',
            phone: '',
            password: '',
          },
        })
      }
    }
  },
)

const close = () => {
  emit('close')
}

const onSubmit = handleSubmit((values) => {
  emit('save', values as CreateUserDto)
  close()
})
</script>
