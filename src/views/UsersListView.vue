<template>
  <div class="space-y-6">
    <!-- Header Controls -->
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Учасники / Користувачі</h1>
        <p class="text-gray-500 text-sm mt-0.5">
          Всього в базі:
          <span class="font-semibold text-blue-600">{{ usersStore.total }}</span> користувачів
        </p>
      </div>

      <button type="button" class="btn btn-primary shadow-sm" @click="isAddModalOpen = true">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Додати користувача
      </button>
    </div>

    <!-- Search & Filter Bar -->
    <div
      class="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between"
    >
      <div class="relative w-full sm:max-w-md">
        <input
          v-model="searchInput"
          type="text"
          placeholder="Пошук за ім'ям, email або username..."
          class="form-input pl-10 pr-4 py-2 text-sm w-full"
          @input="onSearchInput"
        />
        <svg
          class="w-4 h-4 text-gray-400 absolute left-3.5 top-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <button
          v-if="searchInput"
          type="button"
          class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm"
          @click="clearSearch"
        >
          &times;
        </button>
      </div>

      <div class="text-xs text-gray-400 self-end sm:self-center">
        Сторінка {{ currentPage }} з {{ totalPages }}
      </div>
    </div>

    <!-- Error State -->
    <div v-if="usersStore.error" class="alert alert-danger flex items-center justify-between">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ usersStore.error }}</span>
      </div>
      <button type="button" class="btn btn-sm btn-outline text-xs" @click="loadData">
        Повторити
      </button>
    </div>

    <!-- Loading Overlay / Table -->
    <div class="table-responsive relative">
      <div
        v-if="usersStore.isLoading"
        class="absolute inset-0 bg-white/70 backdrop-blur-2xs flex items-center justify-center z-10"
      >
        <div class="flex flex-col items-center gap-2">
          <span class="spinner w-8 h-8 text-blue-600"></span>
          <span class="text-sm font-medium text-gray-600">Завантаження даних...</span>
        </div>
      </div>

      <table class="table-custom">
        <thead>
          <tr>
            <th class="w-12">#</th>
            <th>Користувач</th>
            <th>Контакти</th>
            <th>Вік / Стать</th>
            <th>Роль / Статус</th>
            <th class="text-right">Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!usersStore.isLoading && usersStore.users.length === 0">
            <td colspan="6" class="text-center py-12 text-gray-400">
              Користувачів не знайдено. Спробуйте змінити критерії пошуку.
            </td>
          </tr>

          <tr
            v-for="(user, idx) in usersStore.users"
            :key="user.id"
            class="hover:bg-blue-50/40 transition-colors"
          >
            <td class="font-mono text-xs text-gray-400">
              {{ (currentPage - 1) * limit + idx + 1 }}
            </td>

            <td>
              <div class="flex items-center gap-3">
                <img
                  v-if="user.image"
                  :src="user.image"
                  :alt="user.firstName"
                  class="w-10 h-10 rounded-full border border-gray-200 object-cover bg-gray-100"
                />
                <div
                  v-else
                  class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm"
                >
                  {{ user.firstName[0] }}{{ user.lastName[0] }}
                </div>
                <div>
                  <RouterLink
                    :to="`/users/${user.id}`"
                    class="font-semibold text-gray-900 hover:text-blue-600 transition-colors block"
                  >
                    {{ user.firstName }} {{ user.lastName }}
                  </RouterLink>
                  <span class="text-xs text-gray-400 font-mono">@{{ user.username }}</span>
                </div>
              </div>
            </td>

            <td>
              <div class="text-sm text-gray-700">{{ user.email }}</div>
              <div class="text-xs text-gray-400 font-mono">{{ user.phone }}</div>
            </td>

            <td>
              <div class="text-sm font-medium text-gray-800">{{ user.age }} р.</div>
              <div class="text-xs text-gray-400 capitalize">{{ user.gender }}</div>
            </td>

            <td>
              <span class="badge badge-primary uppercase text-[11px] tracking-wider font-semibold">
                {{ user.role || 'Participant' }}
              </span>
            </td>

            <td class="text-right">
              <div class="flex items-center justify-end gap-2">
                <RouterLink
                  :to="`/users/${user.id}`"
                  class="btn btn-outline btn-sm text-blue-600 hover:bg-blue-50"
                  title="Детальніше"
                >
                  Перегляд
                </RouterLink>

                <RouterLink
                  :to="`/users/${user.id}/edit`"
                  class="btn btn-outline btn-sm text-amber-600 hover:bg-amber-50"
                  title="Редагувати"
                >
                  Змінити
                </RouterLink>

                <button
                  type="button"
                  class="btn btn-outline btn-sm text-red-600 hover:bg-red-50 hover:border-red-200"
                  title="Видалити"
                  @click="openDeleteDialog(user)"
                >
                  Видалити
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div
      v-if="totalPages > 1"
      class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-xs"
    >
      <div class="text-xs text-gray-500">
        Показано {{ (currentPage - 1) * limit + 1 }} &mdash;
        {{ Math.min(currentPage * limit, usersStore.total) }} з {{ usersStore.total }}
      </div>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="btn btn-outline btn-sm"
          :disabled="currentPage <= 1 || usersStore.isLoading"
          @click="goToPage(currentPage - 1)"
        >
          &larr; Попередня
        </button>

        <template v-for="p in visiblePages" :key="p">
          <button
            v-if="typeof p === 'number'"
            type="button"
            :class="['btn btn-sm', p === currentPage ? 'btn-primary' : 'btn-outline']"
            :disabled="usersStore.isLoading"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>
          <span v-else class="px-2 text-gray-400">...</span>
        </template>

        <button
          type="button"
          class="btn btn-outline btn-sm"
          :disabled="currentPage >= totalPages || usersStore.isLoading"
          @click="goToPage(currentPage + 1)"
        >
          Наступна &rarr;
        </button>
      </div>
    </div>

    <!-- Add User Modal -->
    <UserFormModal
      :is-open="isAddModalOpen"
      :is-edit-mode="false"
      @close="isAddModalOpen = false"
      @save="handleAddUser"
    />

    <!-- Delete Confirmation Modal -->
    <div
      v-if="userToDelete"
      class="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center justify-center min-h-screen p-4 text-center">
        <div
          class="fixed inset-0 bg-gray-500/75 transition-opacity"
          @click="userToDelete = null"
        ></div>
        <div
          class="relative bg-white rounded-2xl max-w-md w-full p-6 text-left shadow-xl border border-gray-100"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-2">Підтвердження видалення</h3>
          <p class="text-sm text-gray-600 mb-6">
            Ви дійсно бажаєте видалити користувача
            <strong>{{ userToDelete.firstName }} {{ userToDelete.lastName }}</strong>
            (<em>{{ userToDelete.email }}</em
            >)?
          </p>
          <div class="flex justify-end gap-3">
            <button type="button" class="btn btn-secondary" @click="userToDelete = null">
              Скасувати
            </button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">Видалити</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import UserFormModal from '@/components/UserFormModal.vue'
import type { User, CreateUserDto } from '@/types/user'

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()

const limit = 10
const searchInput = ref<string>((route.query.q as string) || '')
const isAddModalOpen = ref(false)
const userToDelete = ref<User | null>(null)

const currentPage = computed(() => {
  const p = Number(route.query.page)
  return isNaN(p) || p < 1 ? 1 : p
})

const totalPages = computed(() => {
  return Math.ceil(usersStore.total / limit) || 1
})

let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null

const onSearchInput = () => {
  if (searchDebounceTimer) clearTimeout(searchDebounceTimer)
  searchDebounceTimer = setTimeout(() => {
    updateQueryParams(1, searchInput.value)
  }, 350)
}

const clearSearch = () => {
  searchInput.value = ''
  updateQueryParams(1, '')
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  updateQueryParams(page, searchInput.value)
}

const updateQueryParams = (page: number, q: string) => {
  const query: Record<string, string> = {}
  if (page > 1) query.page = String(page)
  if (q.trim()) query.q = q.trim()

  router.push({
    path: '/users',
    query,
  })
}

const loadData = async () => {
  const q = (route.query.q as string) || ''
  searchInput.value = q
  await usersStore.fetchUsers({
    page: currentPage.value,
    limit,
    q,
  })
}

watch(
  () => [route.query.page, route.query.q],
  () => {
    loadData()
  },
)

onMounted(() => {
  loadData()
})

const handleAddUser = async (data: CreateUserDto) => {
  try {
    await usersStore.createUser(data)
  } catch (err) {
    console.error('Failed to create user:', err)
  }
}

const openDeleteDialog = (user: User) => {
  userToDelete.value = user
}

const confirmDelete = async () => {
  if (!userToDelete.value) return
  try {
    await usersStore.deleteUser(userToDelete.value.id)
    userToDelete.value = null
  } catch (err) {
    console.error('Failed to delete user:', err)
  }
}

// Pagination numbers array with ellipses
const visiblePages = computed(() => {
  const current = currentPage.value
  const total = totalPages.value
  const pages: Array<number | string> = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) pages.push('...')
  pages.push(total)

  return pages
})
</script>
