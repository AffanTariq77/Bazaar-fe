import type { Order, OrderStatus } from '../../types/order'
import type { PaginatedResult, Product } from '../../types/product'
import type { SellerDashboardStats } from '../../types/seller'
import { apiClient, type ApiResponse } from './client'

export interface SellerProductPayload {
  name: string
  description: string
  price: number
  discount?: number
  sku: string
  brand: string
  freeShipping?: boolean
  categoryId: string
  stockQuantity: number
  images?: string[]
}

export const sellerApi = {
  async dashboard() {
    const res = await apiClient.get<ApiResponse<SellerDashboardStats>>('/seller/dashboard')
    return res.data.data
  },
  async products(page = 1, limit = 20) {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Product>>>('/seller/products', {
      params: { page, limit },
    })
    return res.data.data
  },
  async product(id: string) {
    const res = await apiClient.get<ApiResponse<Product>>(`/seller/products/${id}`)
    return res.data.data
  },
  async createProduct(payload: SellerProductPayload) {
    const res = await apiClient.post<ApiResponse<Product>>('/seller/products', payload)
    return res.data.data
  },
  async updateProduct(id: string, payload: Partial<SellerProductPayload>) {
    const res = await apiClient.patch<ApiResponse<Product>>(`/seller/products/${id}`, payload)
    return res.data.data
  },
  async deleteProduct(id: string) {
    await apiClient.delete(`/seller/products/${id}`)
  },
  async orders(page = 1, limit = 10) {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Order>>>('/seller/orders', {
      params: { page, limit },
    })
    return res.data.data
  },
  async updateOrderStatus(id: string, status: OrderStatus) {
    const res = await apiClient.patch<ApiResponse<Order>>(`/seller/orders/${id}/status`, { status })
    return res.data.data
  },
}
