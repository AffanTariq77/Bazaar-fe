import { useSellerOrders, useUpdateOrderStatus } from '../../hooks/useSeller'
import type { OrderStatus } from '../../types/order'
import { ORDER_STATUS_LABELS } from '../../utils/orderStatus'

function formatPkr(amount: string | number) {
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`
}

const ALL_STATUSES: OrderStatus[] = [
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED',
]

export default function SellerOrders() {
  const { data, isLoading } = useSellerOrders()
  const updateStatus = useUpdateOrderStatus()

  if (isLoading) {
    return <p className="text-sm text-gray-400">Loading…</p>
  }

  return (
    <div className="space-y-3">
      {data?.items.map((order) => (
        <div
          key={order.id}
          className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
            <p className="text-xs text-gray-400">
              {order.items.length} item(s) · {formatPkr(order.total)} ·{' '}
              {new Date(order.createdAt).toLocaleDateString('en-GB')}
            </p>
          </div>
          <select
            value={order.status}
            onChange={(e) => updateStatus.mutate({ id: order.id, status: e.target.value as OrderStatus })}
            className="rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          >
            {ALL_STATUSES.map((status) => (
              <option key={status} value={status}>
                {ORDER_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      ))}
      {data?.items.length === 0 && <p className="text-sm text-gray-400">No orders yet.</p>}
    </div>
  )
}
