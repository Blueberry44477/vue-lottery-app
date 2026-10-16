// src/services/__tests__/fake-user.service.ts

import type { Readable, Creatable, Editable, Deletable } from '../interfaces'
import type { User, CreateUserDto, UpdateUserDto, UsersResponse } from '@/types/user'

export class FakeUserService
  implements
    Readable<User>,
    Creatable<User, CreateUserDto>,
    Editable<User, UpdateUserDto>,
    Deletable<void>
{
  private items: User[] = [
    {
      id: 1,
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emilys@gmail.com',
      username: 'emilys',
      age: 28,
      gender: 'female',
      phone: '+380501234567',
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Williams',
      email: 'michaelw@gmail.com',
      username: 'michaelw',
      age: 35,
      gender: 'male',
      phone: '+380671234567',
    },
  ]

  async getAll(): Promise<User[]> {
    return [...this.items]
  }

  async getPaginated({ limit = 10, skip = 0, q = '' } = {}): Promise<UsersResponse> {
    let filtered = [...this.items]
    if (q) {
      const lower = q.toLowerCase()
      filtered = filtered.filter(
        (u) =>
          u.firstName.toLowerCase().includes(lower) ||
          u.lastName.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower),
      )
    }
    const sliced = filtered.slice(skip, skip + limit)
    return {
      users: sliced,
      total: filtered.length,
      skip,
      limit,
    }
  }

  async getById(id: number): Promise<User> {
    const item = this.items.find((u) => u.id === id)
    if (!item) throw new Error('User not found')
    return { ...item }
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser: User = {
      id: this.items.length ? Math.max(...this.items.map((i) => i.id)) + 1 : 1,
      ...data,
    }
    this.items.push(newUser)
    return { ...newUser }
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const index = this.items.findIndex((u) => u.id === id)
    if (index === -1) throw new Error('User not found')
    this.items[index] = { ...this.items[index], ...data } as User
    return { ...this.items[index] }
  }

  async delete(id: number): Promise<void> {
    const index = this.items.findIndex((u) => u.id === id)
    if (index === -1) throw new Error('User not found')
    this.items.splice(index, 1)
  }
}
