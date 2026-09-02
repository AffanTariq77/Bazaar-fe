import { Check } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useOrder } from '../../hooks/useOrders'
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS } from '../../utils/orderStatus'

function formatPkr(amount: string | number) {
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`
}

export default function OrderDetail() {
  const { id = '' } = useParams()
  const { data: order, isLoading } = useOrder(id)

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">Loading…</div>
  }

  if (!order) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-500">Order not found.</div>
  }

  const isCancelled = order.status === 'CANCELLED'
  const currentIndex = ORDER_STATUS_FLOW.indexOf(order.status)

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{order.orderNumber}</h1>
          <p className="text-sm text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </div>

      {!isCancelled && (
        <ol className="mb-8 flex flex-wrap items-center gap-2">
          {ORDER_STATUS_FLOW.map((status, i) => (
            <li key={status} className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                  i <= currentIndex ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}
              >
                {i < currentIndex ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={`text-xs ${i <= currentIndex ? 'font-medium text-gray-900' : 'text-gray-400'}`}>
                {ORDER_STATUS_LABELS[status]}
              </span>
              {i < ORDER_STATUS_FLOW.length - 1 && <span className="mx-1 h-px w-6 bg-gray-200" />}
            </li>
          ))}
        </ol>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-gray-900">Items</h2>
        <div className="divide-y divide-gray-100">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-3">
              <img
                src={item.product.images[0]?.url}
                alt={item.product.name}
                className="h-14 w-14 rounded object-cover"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{item.product.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {formatPkr(Number(item.price) * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatPkr(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{Number(order.shippingFee) === 0 ? 'Free' : formatPkr(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPkr(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
          <h3 className="mb-1 font-semibold text-gray-900">Shipping Address</h3>
          <p className="text-gray-600">
            {order.address.fullName} — {order.address.phone}
            <br />
            {order.address.line1}, {order.address.city}, {order.address.province} {order.address.postalCode}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
          <h3 className="mb-1 font-semibold text-gray-900">Payment</h3>
          <p className="text-gray-600">
            {order.payment.method} — {order.payment.status}
          </p>
        </div>
      </div>
    </section>
  )
}
