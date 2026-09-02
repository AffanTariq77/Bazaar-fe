import type { PaginatedResult } from '../../types/product'
import type { CreateOrderPayload, Order } from '../../types/order'
import { apiClient, type ApiResponse } from './client'

export const ordersApi = {
  async create(payload: CreateOrderPayload) {
    const res = await apiClient.post<ApiResponse<Order>>('/orders', payload)
    return res.data.data
  },
  async list(page = 1, limit = 10) {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Order>>>('/orders', { params: { page, limit } })
    return res.data.data
  },
  async byId(id: string) {
    const res = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`)
    return res.data.data
  },
}
