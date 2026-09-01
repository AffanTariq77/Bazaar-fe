export interface ProductImage {
  id: string
  url: string
  position: number
}

export interface ProductSeller {
  id: string
  storeName: string
  slug: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
}

export interface ProductInventory {
  stockQuantity: number
  lowStockThreshold: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: string
  discount: number
  sku: string
  brand: string
  freeShipping: boolean
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED'
  rating: string
  reviewCount: number
  images: ProductImage[]
  category: ProductCategory
  seller: ProductSeller
  inventory?: ProductInventory
  createdAt: string
  updatedAt: string
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type ProductSort = 'popular' | 'newest' | 'price_asc' | 'price_desc' | 'rating'

export interface ProductQuery {
  search?: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  minDiscount?: number
  freeShipping?: boolean
  inStock?: boolean
  sort?: ProductSort
  page?: number
  limit?: number
}

export function salePrice(product: Pick<Product, 'price' | 'discount'>): number {
  const price = Number(product.price)
  return Math.round(price * (1 - product.discount / 100))
}
