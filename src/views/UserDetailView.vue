<template>
  <div class="space-y-6">
    <!-- Breadcrumbs -->
    <nav class="flex items-center text-sm text-gray-500 gap-2">
      <RouterLink to="/users" class="hover:text-blue-600 transition-colors">
        Користувачі
      </RouterLink>
      <span>/</span>
      <span class="text-gray-900 font-medium">
        {{ user ? `${user.firstName} ${user.lastName}` : `Користувач #${id}` }}
      </span>
      <template v-if="isEditRoute">
        <span>/</span>
        <span class="text-blue-600 font-medium">Редагування</span>
      </template>
    </nav>

    <!-- Loading State -->
    <div
      v-if="usersStore.isLoading && !user"
      class="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-xs"
    >
      <span class="spinner w-8 h-8 text-blue-600 mb-3"></span>
      <p class="text-gray-500 text-sm">Завантаження профілю користувача...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="usersStore.error && !user"
      class="alert alert-danger flex items-center justify-between"
    >
      <span>{{ usersStore.error }}</span>
      <RouterLink to="/users" class="btn btn-sm btn-outline"> Повернутися до списку </RouterLink>
    </div>

    <!-- Nested Edit Route Container -->
    <div v-if="isEditRoute">
      <RouterView :id="numericId" :user="user" @saved="handleUserSaved" />
    </div>

    <!-- User Full Profile View (When not in Edit route) -->
    <div v-else-if="user" class="space-y-6">
      <!-- Profile Header Card -->
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div
            class="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left"
          >
            <img
              v-if="user.image"
              :src="user.image"
              :alt="user.firstName"
              class="w-24 h-24 rounded-2xl border border-gray-200 object-cover bg-gray-100 shadow-xs"
            />
            <div
              v-else
              class="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-3xl flex items-center justify-center shadow-md"
            >
              {{ user.firstName[0] }}{{ user.lastName[0] }}
            </div>

            <div>
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
                  {{ user.firstName }} {{ user.lastName }}
                </h1>
                <span class="badge badge-primary text-xs uppercase tracking-wider">
                  {{ user.role || 'Participant' }}
                </span>
              </div>
              <p class="text-gray-400 text-sm font-mono mb-3">
                @{{ user.username }} &bull; ID: #{{ user.id }}
              </p>
              <div
                class="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-600"
              >
                <span class="flex items-center gap-1">
                  <strong>Вік:</strong> {{ user.age }} років
                </span>
                <span>&bull;</span>
                <span class="flex items-center gap-1 capitalize">
                  <strong>Стать:</strong> {{ user.gender }}
                </span>
                <span v-if="user.birthDate">&bull;</span>
                <span v-if="user.birthDate" class="flex items-center gap-1">
                  <strong>Дата народження:</strong> {{ user.birthDate }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <RouterLink to="/users" class="btn btn-outline btn-sm"> &larr; До списку </RouterLink>
            <RouterLink :to="`/users/${user.id}/edit`" class="btn btn-primary btn-sm shadow-sm">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Редагувати профіль
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Detail Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Contact Information -->
        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
          <h2
            class="text-base font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Контактна інформація
          </h2>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between py-1">
              <dt class="text-gray-500">Email адреса:</dt>
              <dd class="font-medium text-gray-900">{{ user.email }}</dd>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-50">
              <dt class="text-gray-500">Номер телефону:</dt>
              <dd class="font-medium text-gray-900 font-mono">{{ user.phone }}</dd>
            </div>
            <div v-if="user.bloodGroup" class="flex justify-between py-1 border-t border-gray-50">
              <dt class="text-gray-500">Група крові:</dt>
              <dd class="font-medium text-gray-900">{{ user.bloodGroup }}</dd>
            </div>
            <div
              v-if="user.height && user.weight"
              class="flex justify-between py-1 border-t border-gray-50"
            >
              <dt class="text-gray-500">Зріст / Вага:</dt>
              <dd class="font-medium text-gray-900">{{ user.height }} см / {{ user.weight }} кг</dd>
            </div>
          </dl>
        </div>

        <!-- Address & Location -->
        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
          <h2
            class="text-base font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Адреса проживання
          </h2>
          <dl v-if="user.address" class="space-y-3 text-sm">
            <div class="flex justify-between py-1">
              <dt class="text-gray-500">Вулиця:</dt>
              <dd class="font-medium text-gray-900">{{ user.address.address || '—' }}</dd>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-50">
              <dt class="text-gray-500">Місто:</dt>
              <dd class="font-medium text-gray-900">{{ user.address.city || '—' }}</dd>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-50">
              <dt class="text-gray-500">Поштовий індекс:</dt>
              <dd class="font-medium text-gray-900 font-mono">
                {{ user.address.postalCode || '—' }}
              </dd>
            </div>
            <div class="flex justify-between py-1 border-t border-gray-50">
              <dt class="text-gray-500">Штат / Регіон:</dt>
              <dd class="font-medium text-gray-900">
                {{ user.address.state || user.address.country || '—' }}
              </dd>
            </div>
          </dl>
          <p v-else class="text-sm text-gray-400 py-4">Дані адреси відсутні</p>
        </div>

        <!-- Company & Employment -->
        <div
          v-if="user.company"
          class="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs md:col-span-2"
        >
          <h2
            class="text-base font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Місце роботи та посада
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div class="p-3 bg-slate-50 rounded-lg">
              <div class="text-xs text-gray-400">Компанія</div>
              <div class="font-semibold text-gray-900 mt-0.5">{{ user.company.name || '—' }}</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-lg">
              <div class="text-xs text-gray-400">Посада</div>
              <div class="font-semibold text-gray-900 mt-0.5">{{ user.company.title || '—' }}</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-lg">
              <div class="text-xs text-gray-400">Відділ</div>
              <div class="font-semibold text-gray-900 mt-0.5">
                {{ user.company.department || '—' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import type { User } from '@/types/user'

const props = defineProps<{
  id: number | string
}>()

const route = useRoute()
const usersStore = useUsersStore()
const user = ref<User | null>(null)

const numericId = computed(() => Number(props.id))

const isEditRoute = computed(() => {
  return route.name === 'user-edit' || route.path.endsWith('/edit')
})

const loadUser = async () => {
  try {
    user.value = await usersStore.getUserById(numericId.value)
  } catch (err) {
    console.error('Failed to load user detail:', err)
  }
}

const handleUserSaved = (updated: User) => {
  user.value = updated
}

watch(
  () => props.id,
  () => {
    loadUser()
  },
)

onMounted(() => {
  loadUser()
})
</script>
