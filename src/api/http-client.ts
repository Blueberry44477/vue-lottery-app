// src/api/http-client.ts

export const BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://dummyjson.com'

export interface HttpOptions extends RequestInit {
  _retry?: boolean
  skipAuth?: boolean
}

// Token event listeners for store synchronization
type AuthExpiredListener = () => void
type TokenRefreshedListener = (newToken: string, newRefreshToken: string) => void

const authExpiredListeners: AuthExpiredListener[] = []
const tokenRefreshedListeners: TokenRefreshedListener[] = []

export function onAuthExpired(listener: AuthExpiredListener): () => void {
  authExpiredListeners.push(listener)
  return () => {
    const idx = authExpiredListeners.indexOf(listener)
    if (idx !== -1) authExpiredListeners.splice(idx, 1)
  }
}

export function onTokenRefreshed(listener: TokenRefreshedListener): () => void {
  tokenRefreshedListeners.push(listener)
  return () => {
    const idx = tokenRefreshedListeners.indexOf(listener)
    if (idx !== -1) tokenRefreshedListeners.splice(idx, 1)
  }
}

let isRefreshing = false
let refreshSubscribers: Array<(token: string | null) => void> = []

function subscribeTokenRefresh(cb: (token: string | null) => void) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token: string | null) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken) {
    return null
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 30,
      }),
    })

    if (!response.ok) {
      throw new Error(`Refresh failed with status ${response.status}`)
    }

    const data = (await response.json()) as { accessToken: string; refreshToken?: string }
    const newAccessToken = data.accessToken
    const newRefreshToken = data.refreshToken || refreshToken

    localStorage.setItem('access_token', newAccessToken)
    localStorage.setItem('refresh_token', newRefreshToken)

    tokenRefreshedListeners.forEach((fn) => fn(newAccessToken, newRefreshToken))
    return newAccessToken
  } catch {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('auth_user')
    authExpiredListeners.forEach((fn) => fn())
    return null
  }
}

export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
  const { _retry = false, skipAuth = false, headers: customHeaders, ...restOptions } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  }

  const token = localStorage.getItem('access_token')
  if (token && !skipAuth && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const response = await fetch(`${BASE_URL}${normalizedPath}`, {
    headers,
    ...restOptions,
  })

  // 401 Interceptor: Automatic token refresh
  if (
    response.status === 401 &&
    !_retry &&
    !path.includes('/auth/login') &&
    !path.includes('/auth/refresh')
  ) {
    if (isRefreshing) {
      return new Promise<T>((resolve, reject) => {
        subscribeTokenRefresh(async (newToken) => {
          if (!newToken) {
            reject(new Error('Session expired. Please log in again.'))
            return
          }
          try {
            const retryRes = await http<T>(path, { ...options, _retry: true })
            resolve(retryRes)
          } catch (err) {
            reject(err)
          }
        })
      })
    }

    isRefreshing = true
    try {
      const newToken = await refreshAccessToken()
      onRefreshed(newToken)

      if (newToken) {
        return await http<T>(path, { ...options, _retry: true })
      } else {
        throw new Error('Unauthorized: Session expired.')
      }
    } finally {
      isRefreshing = false
    }
  }

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`
    try {
      const errBody = (await response.json()) as { message?: string }
      if (errBody && errBody.message) {
        errorMessage = errBody.message
      }
    } catch {
      // Keep default message
    }
    throw new Error(errorMessage)
  }

  // Handle empty bodies (e.g. 204 No Content)
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return (await response.json()) as T
  }

  const text = await response.text()
  return (text ? JSON.parse(text) : {}) as T
}
