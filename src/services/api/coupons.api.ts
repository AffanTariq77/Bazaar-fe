import type { Coupon, CouponPayload, CouponPreview } from '../../types/coupon'
import { apiClient, type ApiResponse } from './client'

export const couponsApi = {
  async validate(code: string) {
    const res = await apiClient.post<ApiResponse<CouponPreview>>('/coupons/validate', { code })
    return res.data.data
  },
  async list() {
    const res = await apiClient.get<ApiResponse<Coupon[]>>('/admin/coupons')
    return res.data.data
  },
  async create(payload: CouponPayload) {
    const res = await apiClient.post<ApiResponse<Coupon>>('/admin/coupons', payload)
    return res.data.data
  },
  async update(id: string, payload: Partial<CouponPayload>) {
    const res = await apiClient.patch<ApiResponse<Coupon>>(`/admin/coupons/${id}`, payload)
    return res.data.data
  },
  async remove(id: string) {
    await apiClient.delete(`/admin/coupons/${id}`)
  },
}
