// src/services/service-provider.ts

import { UserService } from './user.service'
import { AuthService } from './auth.service'

export class ServiceProvider {
  private static userService?: UserService
  private static authService?: AuthService

  static get users(): UserService {
    this.userService ??= new UserService()
    return this.userService
  }

  static get auth(): AuthService {
    this.authService ??= new AuthService()
    return this.authService
  }

  // Helpers for testing / mock substitution
  static setUsersService(service: UserService): void {
    this.userService = service
  }

  static setAuthService(service: AuthService): void {
    this.authService = service
  }

  static reset(): void {
    this.userService = undefined
    this.authService = undefined
  }
}
