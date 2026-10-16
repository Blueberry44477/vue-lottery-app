// src/stores/users.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ServiceProvider } from '@/services/service-provider'
import type { User, CreateUserDto, UpdateUserDto } from '@/types/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const total = ref<number>(0)
  const limit = ref<number>(10)
  const page = ref<number>(1)
  const searchQuery = ref<string>('')
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const currentUser = ref<User | null>(null)

  // Local state overlays for simulated backend mutations
  const locallyCreated = ref<User[]>([])
  const locallyUpdated = ref<Map<number, User>>(new Map())
  const locallyDeleted = ref<Set<number>>(new Set())

  const fetchUsers = async (params: { page?: number; limit?: number; q?: string } = {}) => {
    isLoading.value = true
    error.value = null

    if (params.page !== undefined) page.value = params.page
    if (params.limit !== undefined) limit.value = params.limit
    if (params.q !== undefined) searchQuery.value = params.q

    const skip = (page.value - 1) * limit.value

    try {
      const response = await ServiceProvider.users.getPaginated({
        limit: limit.value,
        skip,
        q: searchQuery.value,
      })

      // Apply local overrides
      let list = response.users.map((u) => {
        if (locallyUpdated.value.has(u.id)) {
          return { ...u, ...locallyUpdated.value.get(u.id) }
        }
        return u
      })

      // Filter out deleted
      list = list.filter((u) => !locallyDeleted.value.has(u.id))

      // Prepend locally created users on page 1 if query matches
      if (page.value === 1) {
        const matchingCreated = locallyCreated.value.filter((u) => {
          if (locallyDeleted.value.has(u.id)) return false
          if (!searchQuery.value) return true
          const q = searchQuery.value.toLowerCase()
          return (
            u.firstName.toLowerCase().includes(q) ||
            u.lastName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.username.toLowerCase().includes(q)
          )
        })

        // Avoid duplicates
        const existingIds = new Set(list.map((u) => u.id))
        const newOnes = matchingCreated.filter((u) => !existingIds.has(u.id))
        list = [...newOnes, ...list].slice(0, limit.value)
      }

      users.value = list
      total.value = response.total + locallyCreated.value.length - locallyDeleted.value.size
    } catch (err) {
      error.value = (err as Error).message || 'Failed to fetch users'
    } finally {
      isLoading.value = false
    }
  }

  const getUserById = async (id: number): Promise<User> => {
    isLoading.value = true
    error.value = null
    try {
      if (locallyUpdated.value.has(id)) {
        const u = locallyUpdated.value.get(id)!
        currentUser.value = u
        return u
      }

      const created = locallyCreated.value.find((u) => u.id === id)
      if (created) {
        currentUser.value = created
        return created
      }

      const user = await ServiceProvider.users.getById(id)
      currentUser.value = user
      return user
    } catch (err) {
      error.value = (err as Error).message || 'Failed to fetch user'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const createUser = async (data: CreateUserDto): Promise<User> => {
    isLoading.value = true
    error.value = null
    try {
      const created = await ServiceProvider.users.create(data)

      // Ensure id uniqueness if dummyjson returns a static id like 209
      const newId = created.id || Date.now()
      const newUser: User = { ...created, id: newId }

      locallyCreated.value.unshift(newUser)

      // Update current displayed list immediately
      users.value = [newUser, ...users.value.filter((u) => u.id !== newId)].slice(0, limit.value)
      total.value += 1

      return newUser
    } catch (err) {
      error.value = (err as Error).message || 'Failed to create user'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateUser = async (id: number, data: UpdateUserDto): Promise<User> => {
    isLoading.value = true
    error.value = null
    try {
      const updated = await ServiceProvider.users.update(id, data)
      const merged: User = { ...currentUser.value, ...updated, id } as User

      locallyUpdated.value.set(id, merged)

      // Update in currently loaded users list
      const idx = users.value.findIndex((u) => u.id === id)
      if (idx !== -1) {
        users.value[idx] = merged
      }

      // Update in locallyCreated list if it was a created user
      const createdIdx = locallyCreated.value.findIndex((u) => u.id === id)
      if (createdIdx !== -1) {
        locallyCreated.value[createdIdx] = merged
      }

      currentUser.value = merged
      return merged
    } catch (err) {
      error.value = (err as Error).message || 'Failed to update user'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteUser = async (id: number): Promise<void> => {
    isLoading.value = true
    error.value = null
    try {
      await ServiceProvider.users.delete(id)
      locallyDeleted.value.add(id)

      users.value = users.value.filter((u) => u.id !== id)
      locallyCreated.value = locallyCreated.value.filter((u) => u.id !== id)
      locallyUpdated.value.delete(id)

      if (total.value > 0) {
        total.value -= 1
      }
      if (currentUser.value?.id === id) {
        currentUser.value = null
      }
    } catch (err) {
      error.value = (err as Error).message || 'Failed to delete user'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    users,
    total,
    limit,
    page,
    searchQuery,
    isLoading,
    error,
    currentUser,
    fetchUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }
})
