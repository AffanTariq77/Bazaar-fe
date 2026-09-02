import type { Product } from './product'

export interface CartItem {
  id: string
  quantity: number
  product: Product
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  itemCount: number
}
