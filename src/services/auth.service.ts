// src/services/auth.service.ts

import { http } from '@/api/http-client'
import type { LoginCredentials, AuthResponse, RefreshTokenResponse } from '@/types/auth'
import type { User } from '@/types/user'

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return await http<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      skipAuth: true,
    })
  }

  async getCurrentUser(): Promise<User> {
    return await http<User>('/auth/me')
  }

  async refresh(refreshToken: string): Promise<RefreshTokenResponse> {
    return await http<RefreshTokenResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 30,
      }),
      skipAuth: true,
    })
  }
}
