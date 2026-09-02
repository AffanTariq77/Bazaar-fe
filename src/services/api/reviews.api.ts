import type { CreateReviewPayload, Review, ReviewsResult } from '../../types/review'
import { apiClient, type ApiResponse } from './client'

export const reviewsApi = {
  async list(productId: string) {
    const res = await apiClient.get<ApiResponse<ReviewsResult>>(`/products/${productId}/reviews`)
    return res.data.data
  },
  async create(productId: string, payload: CreateReviewPayload) {
    const res = await apiClient.post<ApiResponse<Review>>(`/products/${productId}/reviews`, payload)
    return res.data.data
  },
}
