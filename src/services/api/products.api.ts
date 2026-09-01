import type { PaginatedResult, Product, ProductQuery } from '../../types/product'
import { apiClient, type ApiResponse } from './client'

export interface ProductSuggestion {
  id: string
  name: string
  slug: string
}

export const productsApi = {
  async list(query: ProductQuery) {
    const res = await apiClient.get<ApiResponse<PaginatedResult<Product>>>('/products', { params: query })
    return res.data.data
  },
  async bySlug(slug: string) {
    const res = await apiClient.get<ApiResponse<Product>>(`/products/${slug}`)
    return res.data.data
  },
  async suggestions(q: string) {
    const res = await apiClient.get<ApiResponse<ProductSuggestion[]>>('/products/suggestions', { params: { q } })
    return res.data.data
  },
}
