import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart, useRemoveCartItem, useUpdateCartItem } from '../../hooks/useCart'

function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

export default function Cart() {
  const { data: cart, isLoading } = useCart()
  const updateItem = useUpdateCartItem()
  const removeItem = useRemoveCartItem()

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">Loading…</div>
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-lg font-medium text-gray-700">Your cart is empty</p>
        <Link to="/products" className="mt-3 inline-block text-sm font-medium text-primary-600 hover:underline">
          Browse products
        </Link>
      </div>
    )
  }

  const shipping = cart.items.every((item) => item.product.freeShipping) ? 0 : 200
  const total = cart.subtotal + shipping

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
          {cart.items.map((item) => {
            const stock = item.product.inventory?.stockQuantity ?? 0
            const unitPrice = Number(item.product.price) * (1 - item.product.discount / 100)
            return (
              <div key={item.id} className="flex gap-4 p-4">
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="h-20 w-20 shrink-0 rounded object-cover"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <Link
                    to={`/products/${item.product.slug}`}
                    className="text-sm font-medium text-gray-800 hover:text-primary-600"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-gray-400">{item.product.seller.storeName}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-gray-300">
                      <button
                        type="button"
                        onClick={() =>
                          updateItem.mutate({ itemId: item.id, quantity: Math.max(1, item.quantity - 1) })
                        }
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-50"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateItem.mutate({ itemId: item.id, quantity: Math.min(stock, item.quantity + 1) })
                        }
                        disabled={item.quantity >= stock}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPkr(Math.round(unitPrice * item.quantity))}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() => removeItem.mutate(item.id)}
                  className="self-start text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>

        <div className="w-full shrink-0 rounded-lg border border-gray-200 bg-white p-5 lg:w-80">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Order Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <dt>Subtotal</dt>
              <dd>{formatPkr(cart.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-gray-600">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? 'Free' : formatPkr(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
              <dt>Total</dt>
              <dd>{formatPkr(total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-5 block rounded-md bg-primary-500 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  )
}
