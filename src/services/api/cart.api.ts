import type { Cart } from '../../types/cart'
import { apiClient, type ApiResponse } from './client'

export const cartApi = {
  async get() {
    const res = await apiClient.get<ApiResponse<Cart>>('/cart')
    return res.data.data
  },
  async addItem(productId: string, quantity: number) {
    const res = await apiClient.post<ApiResponse<Cart>>('/cart/items', { productId, quantity })
    return res.data.data
  },
  async updateItem(itemId: string, quantity: number) {
    const res = await apiClient.patch<ApiResponse<Cart>>(`/cart/items/${itemId}`, { quantity })
    return res.data.data
  },
  async removeItem(itemId: string) {
    const res = await apiClient.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`)
    return res.data.data
  },
}
