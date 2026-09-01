import type { User } from '../../types/user'
import { apiClient, type ApiResponse } from './client'

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface RegisterPayload {
  name: string
  email: string
  phone?: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export const authApi = {
  async register(payload: RegisterPayload) {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', payload)
    return res.data.data
  },
  async login(payload: LoginPayload) {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', payload)
    return res.data.data
  },
  async logout() {
    await apiClient.post('/auth/logout')
  },
  async me() {
    const res = await apiClient.get<ApiResponse<User>>('/auth/me')
    return res.data.data
  },
}
