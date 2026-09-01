import type { Category } from '../../types/category'
import { apiClient, type ApiResponse } from './client'

export const categoriesApi = {
  async list() {
    const res = await apiClient.get<ApiResponse<Category[]>>('/categories')
    return res.data.data
  },
}
