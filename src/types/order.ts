import type { Address } from './address'

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'

export type DeliveryMethod = 'STANDARD' | 'EXPRESS'
export type PaymentMethod = 'COD' | 'CARD' | 'EASYPAISA' | 'JAZZCASH' | 'BANK_TRANSFER'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

export interface OrderItem {
  id: string
  quantity: number
  price: string
  product: {
    id: string
    name: string
    slug: string
    images: { id: string; url: string }[]
  }
}

export interface Payment {
  method: PaymentMethod
  status: PaymentStatus
  paidAt: string | null
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  deliveryMethod: DeliveryMethod
  subtotal: string
  shippingFee: string
  discount: string
  total: string
  address: Address
  items: OrderItem[]
  payment: Payment
  createdAt: string
  /** Only populated on seller/admin order-list responses, not the customer's own /orders. */
  user?: { name: string; email: string }
}

export interface CreateOrderPayload {
  addressId: string
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  couponCode?: string
}
