import type { User } from '../../types/user'
import { apiClient, type ApiResponse } from './client'

export interface UpdateProfilePayload {
  name?: string
  phone?: string
}

export const usersApi = {
  async me() {
    const res = await apiClient.get<ApiResponse<User>>('/users/me')
    return res.data.data
  },
  async updateProfile(payload: UpdateProfilePayload) {
    const res = await apiClient.patch<ApiResponse<User>>('/users/me', payload)
    return res.data.data
  },
}
