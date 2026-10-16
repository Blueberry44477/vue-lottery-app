import type { User } from './user'

export interface LoginCredentials {
  username: string
  password: string
  expiresInMins?: number
}

export interface AuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export interface AuthUser extends Partial<User> {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}
