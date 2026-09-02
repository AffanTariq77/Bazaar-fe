import { Link } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders'
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '../../utils/orderStatus'

function formatPkr(amount: string | number) {
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`
}

export default function Orders() {
  const { data, isLoading } = useOrders()

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">Loading…</div>
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-lg font-medium text-gray-700">You haven&apos;t placed any orders yet</p>
        <Link to="/products" className="mt-3 inline-block text-sm font-medium text-primary-600 hover:underline">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Orders</h1>
      <div className="space-y-3">
        {data.items.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
              <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                {ORDER_STATUS_LABELS[order.status]}
              </span>
              <span className="text-sm font-semibold text-gray-900">{formatPkr(order.total)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
