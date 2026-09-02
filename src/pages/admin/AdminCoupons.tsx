import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { CouponForm } from '../../components/admin/CouponForm'
import { useAdminCoupons, useCreateCoupon, useDeleteCoupon, useUpdateCoupon } from '../../hooks/useCoupons'
import type { Coupon } from '../../types/coupon'

function formatPkr(amount: string | number) {
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`
}

export default function AdminCoupons() {
  const { data: coupons, isLoading } = useAdminCoupons()
  const createCoupon = useCreateCoupon()
  const updateCoupon = useUpdateCoupon()
  const deleteCoupon = useDeleteCoupon()
  const [editing, setEditing] = useState<Coupon | null>(null)

  return (
    <div>
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-gray-900">
          {editing ? `Edit ${editing.code}` : 'Create Coupon'}
        </h2>
        <CouponForm
          key={editing?.id ?? 'new'}
          initialValues={editing ?? undefined}
          isPending={createCoupon.isPending || updateCoupon.isPending}
          onCancel={editing ? () => setEditing(null) : undefined}
          onSubmit={(values) => {
            if (editing) {
              updateCoupon.mutate({ id: editing.id, payload: values }, { onSuccess: () => setEditing(null) })
            } else {
              createCoupon.mutate(values)
            }
          }}
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Min Order</th>
                <th className="p-3">Max Discount</th>
                <th className="p-3">Usage Limit</th>
                <th className="p-3">Expires</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons?.map((coupon) => (
                <tr key={coupon.id}>
                  <td className="p-3 font-medium text-gray-800">{coupon.code}</td>
                  <td className="p-3">{coupon.discountPercent}%</td>
                  <td className="p-3">{formatPkr(coupon.minOrderAmount)}</td>
                  <td className="p-3">{formatPkr(coupon.maxDiscount)}</td>
                  <td className="p-3">{coupon.usageLimit}</td>
                  <td className="p-3 text-gray-400">{new Date(coupon.expiresAt).toLocaleDateString('en-GB')}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditing(coupon)}
                        className="text-gray-400 hover:text-primary-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete coupon "${coupon.code}"?`)) deleteCoupon.mutate(coupon.id)
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {coupons?.length === 0 && <p className="p-6 text-center text-sm text-gray-400">No coupons yet.</p>}
        </div>
      )}
    </div>
  )
}
