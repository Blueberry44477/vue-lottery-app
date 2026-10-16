<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Вхід до системи</h2>
      <p class="text-sm text-gray-500 mt-1">
        Введіть облікові дані для доступу до списку користувачів
      </p>
    </div>

    <!-- Error Alert -->
    <div v-if="authStore.error" class="alert alert-danger mb-5 flex items-center justify-between">
      <span>{{ authStore.error }}</span>
      <button
        type="button"
        class="text-red-700 hover:text-red-900 text-sm font-bold ml-2"
        @click="authStore.error = null"
      >
        &times;
      </button>
    </div>

    <!-- Login Form -->
    <form @submit="onSubmit" class="space-y-4">
      <div class="form-group">
        <label for="username" class="form-label">Ім'я користувача (Username)</label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Введіть username (наприклад, emilys)"
          autocomplete="username"
          :class="['form-input', { 'has-error': errors.username }]"
        />
        <div v-if="errors.username" class="form-error">{{ errors.username }}</div>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Пароль (Password)</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Введіть пароль"
          autocomplete="current-password"
          :class="['form-input', { 'has-error': errors.password }]"
        />
        <div v-if="errors.password" class="form-error">{{ errors.password }}</div>
      </div>

      <button
        type="submit"
        class="btn btn-primary w-full py-2.5 text-base font-semibold shadow-md flex items-center justify-center"
        :disabled="authStore.isLoading || isSubmitting"
      >
        <span v-if="authStore.isLoading || isSubmitting" class="spinner mr-2 border-white"></span>
        <span v-if="authStore.isLoading || isSubmitting">Вхід у систему...</span>
        <span v-else>Увійти</span>
      </button>
    </form>

    <!-- Test credentials hint box -->
    <div class="mt-6 pt-5 border-t border-gray-100 bg-slate-50 p-4 rounded-xl">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold uppercase tracking-wider text-gray-500">
          Тестові облікові дані (DummyJSON):
        </span>
        <button
          type="button"
          class="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline"
          @click="fillDemoCredentials('emilys', 'emilyspass')"
        >
          Заповнити
        </button>
      </div>
      <div class="text-xs text-gray-600 space-y-1 font-mono">
        <div><strong>Username:</strong> emilys</div>
        <div><strong>Password:</strong> emilyspass</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Validation schema with VeeValidate & Yup
const validationSchema = yup.object({
  username: yup
    .string()
    .required("Поле обов'язкове для заповнення")
    .min(3, 'Мінімальна довжина імені 3 символи'),
  password: yup
    .string()
    .required("Поле обов'язкове для заповнення")
    .min(6, 'Пароль повинен містити щонайменше 6 символів'),
})

const { handleSubmit, errors, isSubmitting, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    password: '',
  },
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')

const fillDemoCredentials = (u: string, p: string) => {
  setFieldValue('username', u)
  setFieldValue('password', p)
}

const onSubmit = handleSubmit(async (values) => {
  const success = await authStore.login({
    username: values.username,
    password: values.password,
  })

  if (success) {
    const redirect = (route.query.redirect as string) || '/users'
    router.push(redirect)
  }
})
</script>
