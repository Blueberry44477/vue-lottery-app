// src/__tests__/repository.spec.ts

import { describe, it, expect, beforeEach } from 'vitest'
import { FakeUserService } from '@/services/__tests__/fake-user.service'
import { ServiceProvider } from '@/services/service-provider'

describe('Repository Pattern with FakeUserService', () => {
  let fakeService: FakeUserService

  beforeEach(() => {
    fakeService = new FakeUserService()
    ServiceProvider.setUsersService(
      fakeService as unknown as import('@/services/user.service').UserService,
    )
  })

  it('reads all users via repository', async () => {
    const users = await ServiceProvider.users.getAll()
    expect(users).toHaveLength(2)
    expect(users[0]?.firstName).toBe('Emily')
  })

  it('gets user by id', async () => {
    const user = await ServiceProvider.users.getById(1)
    expect(user.id).toBe(1)
    expect(user.username).toBe('emilys')
  })

  it('creates new user via repository', async () => {
    const newUser = await ServiceProvider.users.create({
      firstName: 'Anna',
      lastName: 'Koval',
      email: 'anna@example.com',
      username: 'annak',
      age: 22,
      gender: 'female',
      phone: '+380509998877',
    })

    expect(newUser.id).toBeDefined()
    expect(newUser.firstName).toBe('Anna')

    const all = await ServiceProvider.users.getAll()
    expect(all).toHaveLength(3)
  })

  it('updates existing user via repository', async () => {
    const updated = await ServiceProvider.users.update(1, {
      firstName: 'Emily Updated',
    })

    expect(updated.firstName).toBe('Emily Updated')

    const fetched = await ServiceProvider.users.getById(1)
    expect(fetched.firstName).toBe('Emily Updated')
  })

  it('deletes user via repository', async () => {
    await ServiceProvider.users.delete(1)
    const all = await ServiceProvider.users.getAll()
    expect(all).toHaveLength(1)
    expect(all.find((u) => u.id === 1)).toBeUndefined()
  })

  it('supports pagination and search query in fake repository', async () => {
    const res = await fakeService.getPaginated({ limit: 1, skip: 0, q: 'Williams' })
    expect(res.users).toHaveLength(1)
    expect(res.users[0]?.lastName).toBe('Williams')
    expect(res.total).toBe(1)
  })
})
