export interface Coupon {
  id: string
  code: string
  discountPercent: number
  minOrderAmount: string
  maxDiscount: string
  usageLimit: number
  expiresAt: string
  createdAt: string
}

export interface CouponPayload {
  code: string
  discountPercent: number
  minOrderAmount: number
  maxDiscount: number
  usageLimit: number
  expiresAt: string
}

export interface CouponPreview {
  code: string
  discountPercent: number
  discount: number
}
