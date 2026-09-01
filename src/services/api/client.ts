import axios from 'axios'
import { useAuthStore } from '../../store/auth.store'
import type { User } from '../../types/user'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await apiClient.post<ApiResponse<{ accessToken: string; user: User }>>('/auth/refresh')
    const { accessToken, user } = res.data.data
    useAuthStore.getState().setAuth(user, accessToken)
    return accessToken
  } catch {
    useAuthStore.getState().clearAuth()
    return null
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retried) {
      original._retried = true
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null
      })
      const newToken = await refreshPromise
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`
        return apiClient(original)
      }
    }
    return Promise.reject(error)
  },
)
