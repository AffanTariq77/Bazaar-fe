import { useAdminOrders, useAdminUpdateOrderStatus } from '../../hooks/useAdmin'
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

export default function AdminOrders() {
  const { data, isLoading } = useAdminOrders()
  const updateStatus = useAdminUpdateOrderStatus()

  if (isLoading) return <p className="text-sm text-gray-400">Loading…</p>

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-100 text-xs uppercase text-gray-400">
          <tr>
            <th className="p-3">Order</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.items.map((order) => (
            <tr key={order.id}>
              <td className="p-3 font-medium text-gray-800">{order.orderNumber}</td>
              <td className="p-3 text-gray-500">{order.user?.email}</td>
              <td className="p-3">{formatPkr(order.total)}</td>
              <td className="p-3">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus.mutate({ id: order.id, status: e.target.value as OrderStatus })
                  }
                  className="rounded-md border border-gray-300 px-2 py-1 text-xs"
                >
                  {ALL_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {ORDER_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-3 text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-gray-100 p-3 text-xs text-gray-400">{data?.total} total orders</p>
    </div>
  )
}
