import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../test/renderWithProviders'
import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

const product: Product = {
  id: '1',
  name: 'Test Widget',
  slug: 'test-widget',
  description: 'A widget for testing.',
  price: '2000',
  discount: 25,
  sku: 'SKU-1',
  brand: 'TestBrand',
  freeShipping: true,
  status: 'ACTIVE',
  rating: '4.5',
  reviewCount: 10,
  images: [{ id: 'img-1', url: 'https://example.com/image.jpg', position: 0 }],
  category: { id: 'cat-1', name: 'Test Category', slug: 'test-category' },
  seller: { id: 'seller-1', storeName: 'Test Store', slug: 'test-store' },
  inventory: { stockQuantity: 10, lowStockThreshold: 5 },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

describe('ProductCard', () => {
  it('renders the product name, discounted price, and discount badge', () => {
    renderWithProviders(<ProductCard product={product} />)
    expect(screen.getByText('Test Widget')).toBeInTheDocument()
    expect(screen.getByText('Rs. 1,500')).toBeInTheDocument()
    expect(screen.getByText('-25%')).toBeInTheDocument()
  })

  it('shows the original price struck through next to the sale price', () => {
    renderWithProviders(<ProductCard product={product} />)
    expect(screen.getByText('Rs. 2,000')).toBeInTheDocument()
  })

  it('shows the free shipping badge when applicable', () => {
    renderWithProviders(<ProductCard product={product} />)
    expect(screen.getByText('Free Shipping')).toBeInTheDocument()
  })

  it('disables the add-to-cart button and labels it "Out of Stock" when stock is zero', () => {
    renderWithProviders(
      <ProductCard product={{ ...product, inventory: { stockQuantity: 0, lowStockThreshold: 5 } }} />,
    )
    const button = screen.getByRole('button', { name: /out of stock/i })
    expect(button).toBeDisabled()
  })
})
