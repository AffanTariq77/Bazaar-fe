import type { Notification } from '../../types/notification'
import { apiClient, type ApiResponse } from './client'

export const notificationsApi = {
  async list() {
    const res = await apiClient.get<ApiResponse<Notification[]>>('/notifications')
    return res.data.data
  },
  async markRead(id: string) {
    const res = await apiClient.patch<ApiResponse<Notification>>(`/notifications/${id}/read`)
    return res.data.data
  },
}
