import { Link } from 'react-router-dom'
import { ProductGrid } from '../products/ProductGrid'
import { useProducts } from '../../hooks/useProducts'
import type { ProductQuery } from '../../types/product'

interface HomeSectionProps {
  title: string
  query: ProductQuery
}

export function HomeSection({ title, query }: HomeSectionProps) {
  const { data, isLoading } = useProducts(query)
  const items = data?.items ?? []
  if (!isLoading && items.length === 0) return null

  const seeAllParams = new URLSearchParams()
  if (query.sort) seeAllParams.set('sort', query.sort)
  if (query.minDiscount) seeAllParams.set('minDiscount', String(query.minDiscount))

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <Link to={`/products?${seeAllParams.toString()}`} className="text-sm font-medium text-primary-600 hover:underline">
          See All
        </Link>
      </div>
      <ProductGrid products={items} loading={isLoading} />
    </section>
  )
}
