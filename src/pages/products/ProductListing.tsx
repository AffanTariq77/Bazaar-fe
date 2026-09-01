import { useSearchParams } from 'react-router-dom'
import { ProductFilters } from '../../components/products/ProductFilters'
import { ProductGrid } from '../../components/products/ProductGrid'
import { useCategories } from '../../hooks/useCategories'
import { useProducts } from '../../hooks/useProducts'
import type { ProductQuery, ProductSort } from '../../types/product'

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
]

function parseQuery(params: URLSearchParams): ProductQuery {
  const num = (key: string) => (params.get(key) ? Number(params.get(key)) : undefined)
  return {
    search: params.get('search') ?? undefined,
    category: params.get('category') ?? undefined,
    brand: params.get('brand') ?? undefined,
    minPrice: num('minPrice'),
    maxPrice: num('maxPrice'),
    minRating: num('minRating'),
    minDiscount: num('minDiscount'),
    freeShipping: params.get('freeShipping') === 'true' || undefined,
    inStock: params.get('inStock') === 'true' || undefined,
    sort: (params.get('sort') as ProductSort) || undefined,
    page: num('page') ?? 1,
    limit: 20,
  }
}

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = parseQuery(searchParams)
  const { data: categories } = useCategories()
  const { data, isLoading } = useProducts(query)

  const updateQuery = (patch: Partial<ProductQuery>) => {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined || value === '') next.delete(key)
      else next.set(key, String(value))
    }
    setSearchParams(next)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      {query.search && (
        <h1 className="mb-4 text-lg font-semibold text-gray-900">
          Search results for &ldquo;{query.search}&rdquo;
        </h1>
      )}

      <div className="flex flex-col gap-6 sm:flex-row">
        <ProductFilters query={query} categories={categories ?? []} onChange={updateQuery} />

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">{data ? `${data.total} products` : 'Loading products…'}</p>
            <select
              value={query.sort ?? 'popular'}
              onChange={(e) => updateQuery({ sort: e.target.value as ProductSort })}
              className="rounded border border-gray-300 px-2 py-1.5 text-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <ProductGrid products={data?.items ?? []} loading={isLoading} />

          {data && data.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => updateQuery({ page: p })}
                  className={`h-8 w-8 rounded text-sm ${
                    p === data.page ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
