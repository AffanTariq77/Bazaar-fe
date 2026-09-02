import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { couponsApi } from '../services/api/coupons.api'
import type { CouponPayload } from '../types/coupon'
import { errorMessage } from '../utils/errorMessage'

export function useValidateCoupon() {
  return useMutation({
    mutationFn: (code: string) => couponsApi.validate(code),
    onError: (err) => toast.error(errorMessage(err, 'Invalid coupon')),
  })
}

export function useAdminCoupons() {
  return useQuery({ queryKey: ['admin', 'coupons'], queryFn: couponsApi.list })
}

export function useCreateCoupon() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CouponPayload) => couponsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'coupons'] })
      toast.success('Coupon created')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not create coupon')),
  })
}

export function useUpdateCoupon() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CouponPayload> }) =>
      couponsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'coupons'] })
      toast.success('Coupon updated')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not update coupon')),
  })
}

export function useDeleteCoupon() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => couponsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'coupons'] })
      toast.success('Coupon deleted')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not delete coupon')),
  })
}
