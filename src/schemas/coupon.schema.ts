import { z } from 'zod'

export const couponSchema = z.object({
  code: z.string().min(3, 'Code is required'),
  discountPercent: z.coerce.number().min(1).max(100),
  minOrderAmount: z.coerce.number().min(0),
  maxDiscount: z.coerce.number().min(0),
  usageLimit: z.coerce.number().min(1),
  expiresAt: z.string().min(1, 'Expiry date is required'),
})
export type CouponFormInput = z.input<typeof couponSchema>
export type CouponFormValues = z.output<typeof couponSchema>
