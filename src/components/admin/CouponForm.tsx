import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { couponSchema, type CouponFormInput, type CouponFormValues } from '../../schemas/coupon.schema'
import type { Coupon } from '../../types/coupon'
import { FormField } from '../common/FormField'

interface CouponFormProps {
  initialValues?: Coupon
  onSubmit: (values: CouponFormValues) => void
  isPending: boolean
  onCancel?: () => void
}

export function CouponForm({ initialValues, onSubmit, isPending, onCancel }: CouponFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormInput, unknown, CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: initialValues
      ? {
          code: initialValues.code,
          discountPercent: initialValues.discountPercent,
          minOrderAmount: Number(initialValues.minOrderAmount),
          maxDiscount: Number(initialValues.maxDiscount),
          usageLimit: initialValues.usageLimit,
          expiresAt: initialValues.expiresAt.slice(0, 10),
        }
      : undefined,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <FormField label="Code" {...register('code')} error={errors.code} />
      <FormField label="Discount %" type="number" {...register('discountPercent')} error={errors.discountPercent} />
      <FormField label="Usage limit" type="number" {...register('usageLimit')} error={errors.usageLimit} />
      <FormField
        label="Min order (Rs.)"
        type="number"
        {...register('minOrderAmount')}
        error={errors.minOrderAmount}
      />
      <FormField label="Max discount (Rs.)" type="number" {...register('maxDiscount')} error={errors.maxDiscount} />
      <FormField label="Expires on" type="date" {...register('expiresAt')} error={errors.expiresAt} />
      <div className="flex items-end gap-2 sm:col-span-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
        >
          {isPending ? 'Saving…' : initialValues ? 'Update Coupon' : 'Create Coupon'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-md px-4 py-2 text-sm text-gray-500">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
