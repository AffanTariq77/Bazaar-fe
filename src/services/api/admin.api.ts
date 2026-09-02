import type { AdminDashboardStats, AdminSeller, AdminUser } from '../../types/admin'
import type { Category } from '../../types/category'
import type { Order, OrderStatus } from '../../types/order'
import type { PaginatedResult, Product } from '../../types/product'
import { apiClient, type ApiResponse } from './client'

export const adminApi = {
  async dashboard() {
    const res = await apiClient.get<ApiResponse<AdminDashboardStats>>('/admin/dashboard')
    return res.data.data
  },
  async users(page = 1) {
    const res = await apiClient.get<ApiResponse<PaginatedResult<AdminUser>>>('/admin/users', { params: { page } })
    return res.data.data
  },
  async sellers(page = 1) {
    const res = await apiClient.get<ApiResponse<PaginatedResult<AdminSeller>>>('/admin/sellers', { params: { page } })
    return res.data.data
  },
  async products(page = 1) {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Product>>>('/admin/products', { params: { page } })
    return res.data.data
  },
  async orders(page = 1) {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Order>>>('/admin/orders', { params: { page } })
    return res.data.data
  },
  async updateOrderStatus(id: string, status: OrderStatus) {
    const res = await apiClient.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, { status })
    return res.data.data
  },
  async categories() {
    const res = await apiClient.get<ApiResponse<Category[]>>('/admin/categories')
    return res.data.data
  },
}
