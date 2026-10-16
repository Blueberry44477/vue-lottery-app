export interface UserAddress {
  address?: string
  city?: string
  state?: string
  stateCode?: string
  postalCode?: string
  country?: string
}

export interface UserCompany {
  department?: string
  name?: string
  title?: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName?: string
  age: number
  gender: 'male' | 'female' | 'other' | string
  email: string
  phone: string
  username: string
  password?: string
  birthDate?: string
  image?: string
  bloodGroup?: string
  height?: number
  weight?: number
  eyeColor?: string
  address?: UserAddress
  company?: UserCompany
  role?: string
}

export interface CreateUserDto {
  firstName: string
  lastName: string
  email: string
  username: string
  password?: string
  age: number
  gender: string
  phone: string
  image?: string
  birthDate?: string
  role?: string
}

export type UpdateUserDto = Partial<CreateUserDto>

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
