export * from './user'
export * from './auth'

// Keep original Participant interface for backwards compatibility with any lottery-specific logic
export interface Participant {
  id: string
  name: string
  dateOfBirth: string
  email: string
  phone: string
}
