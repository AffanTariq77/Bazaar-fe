import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddressForm } from '../../components/checkout/AddressForm'
import { useAddresses } from '../../hooks/useAddresses'
import { useCart } from '../../hooks/useCart'
import { useCreateOrder } from '../../hooks/useOrders'
import type { DeliveryMethod, PaymentMethod } from '../../types/order'

function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

const DELIVERY_OPTIONS: { value: DeliveryMethod; label: string; description: string; fee: number }[] = [
  { value: 'STANDARD', label: 'Standard Delivery', description: '5-7 business days', fee: 0 },
  { value: 'EXPRESS', label: 'Express Delivery', description: '1-2 business days', fee: 300 },
]

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: 'COD', label: 'Cash on Delivery' },
  { value: 'CARD', label: 'Credit/Debit Card (mock)' },
  { value: 'EASYPAISA', label: 'EasyPaisa (mock)' },
  { value: 'JAZZCASH', label: 'JazzCash (mock)' },
  { value: 'BANK_TRANSFER', label: 'Bank Transfer (mock)' },
]

const STEPS = ['Address', 'Delivery', 'Payment', 'Review']

export default function Checkout() {
  const navigate = useNavigate()
  const { data: cart, isLoading: cartLoading } = useCart()
  const { data: addresses, isLoading: addressesLoading } = useAddresses()
  const createOrder = useCreateOrder()

  const [step, setStep] = useState(0)
  const [showNewAddress, setShowNewAddress] = useState(false)
  const [addressId, setAddressId] = useState<string | null>(null)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('STANDARD')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD')

  if (cartLoading || addressesLoading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">Loading…</div>
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-lg font-medium text-gray-700">Your cart is empty</p>
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="mt-3 text-sm font-medium text-primary-600 hover:underline"
        >
          Browse products
        </button>
      </div>
    )
  }

  const freeShipping = cart.items.every((item) => item.product.freeShipping)
  const deliveryFee = DELIVERY_OPTIONS.find((d) => d.value === deliveryMethod)?.fee ?? 0
  const shippingFee = freeShipping ? 0 : deliveryFee
  const total = cart.subtotal + shippingFee
  const selectedAddress = addresses?.find((a) => a.id === addressId)

  const handlePlaceOrder = () => {
    if (!addressId) return
    createOrder.mutate(
      { addressId, deliveryMethod, paymentMethod },
      { onSuccess: (order) => navigate(`/orders/${order.id}`) },
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Checkout</h1>

      <ol className="mb-8 flex flex-wrap items-center gap-2 text-sm">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                i <= step ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i + 1}
            </span>
            <span className={i <= step ? 'font-medium text-gray-900' : 'text-gray-400'}>{label}</span>
            {i < STEPS.length - 1 && <span className="mx-2 h-px w-8 bg-gray-200" />}
          </li>
        ))}
      </ol>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        {step === 0 && (
          <div className="space-y-4">
            {addresses && addresses.length > 0 && !showNewAddress && (
              <div className="space-y-2">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm ${
                      addressId === addr.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={addressId === addr.id}
                      onChange={() => setAddressId(addr.id)}
                      className="mt-1"
                    />
                    <span>
                      <span className="block font-medium text-gray-800">
                        {addr.fullName} — {addr.phone}
                      </span>
                      <span className="block text-gray-500">
                        {addr.line1}, {addr.city}, {addr.province} {addr.postalCode}
                      </span>
                    </span>
                  </label>
                ))}
                <button
                  type="button"
                  onClick={() => setShowNewAddress(true)}
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  + Add a new address
                </button>
              </div>
            )}

            {(showNewAddress || !addresses || addresses.length === 0) && (
              <AddressForm
                onCreated={(id) => {
                  setAddressId(id)
                  setShowNewAddress(false)
                }}
              />
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2">
            {DELIVERY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center justify-between rounded-md border p-3 text-sm ${
                  deliveryMethod === opt.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === opt.value}
                    onChange={() => setDeliveryMethod(opt.value)}
                  />
                  <span>
                    <span className="block font-medium text-gray-800">{opt.label}</span>
                    <span className="block text-gray-500">{opt.description}</span>
                  </span>
                </span>
                <span className="font-medium text-gray-700">
                  {freeShipping || opt.fee === 0 ? 'Free' : formatPkr(opt.fee)}
                </span>
              </label>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            {PAYMENT_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-sm ${
                  paymentMethod === opt.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === opt.value}
                  onChange={() => setPaymentMethod(opt.value)}
                />
                <span className="font-medium text-gray-800">{opt.label}</span>
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="mb-1 font-semibold text-gray-900">Shipping to</h3>
              {selectedAddress && (
                <p className="text-gray-600">
                  {selectedAddress.fullName} — {selectedAddress.phone}
                  <br />
                  {selectedAddress.line1}, {selectedAddress.city}, {selectedAddress.province}{' '}
                  {selectedAddress.postalCode}
                </p>
              )}
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-gray-900">Delivery</h3>
              <p className="text-gray-600">{DELIVERY_OPTIONS.find((d) => d.value === deliveryMethod)?.label}</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-gray-900">Payment</h3>
              <p className="text-gray-600">{PAYMENT_OPTIONS.find((p) => p.value === paymentMethod)?.label}</p>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPkr(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : formatPkr(shippingFee)}</span>
              </div>
              <div className="mt-1 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPkr(total)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-500 disabled:opacity-0"
          >
            Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              disabled={step === 0 && !addressId}
              onClick={() => setStep((s) => s + 1)}
              className="rounded-md bg-primary-500 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              disabled={createOrder.isPending}
              onClick={handlePlaceOrder}
              className="rounded-md bg-primary-500 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
            >
              {createOrder.isPending ? 'Placing order…' : 'Place Order'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
