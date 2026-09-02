import type { Cart } from '../../types/cart'
import type { Product } from '../../types/product'
import { apiClient, type ApiResponse } from './client'

export const wishlistApi = {
  async list() {
    const res = await apiClient.get<ApiResponse<Product[]>>('/wishlist')
    return res.data.data
  },
  async add(productId: string) {
    const res = await apiClient.post<ApiResponse<Product[]>>(`/wishlist/${productId}`)
    return res.data.data
  },
  async remove(productId: string) {
    const res = await apiClient.delete<ApiResponse<Product[]>>(`/wishlist/${productId}`)
    return res.data.data
  },
  async moveToCart(productId: string, quantity = 1) {
    const res = await apiClient.post<ApiResponse<Cart>>(`/wishlist/${productId}/move-to-cart`, { quantity })
    return res.data.data
  },
}
