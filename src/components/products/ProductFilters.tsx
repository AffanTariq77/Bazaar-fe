import type { Category } from '../../types/category'
import type { ProductQuery } from '../../types/product'

interface ProductFiltersProps {
  query: ProductQuery
  categories: Category[]
  onChange: (patch: Partial<ProductQuery>) => void
}

const DISCOUNTS = [10, 20, 30]
const RATINGS = [4, 3, 2, 1]

function optionClass(active: boolean) {
  return active ? 'font-semibold text-primary-600' : 'text-gray-600 hover:text-primary-600'
}

export function ProductFilters({ query, categories, onChange }: ProductFiltersProps) {
  return (
    <aside className="w-full shrink-0 space-y-6 sm:w-56">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Category</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <button type="button" onClick={() => onChange({ category: undefined, page: 1 })} className={optionClass(!query.category)}>
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => onChange({ category: cat.slug, page: 1 })}
                className={optionClass(query.category === cat.slug)}
              >
                {cat.name}
              </button>
              {cat.children.length > 0 && (
                <ul className="ml-3 mt-1 space-y-1">
                  {cat.children.map((child) => (
                    <li key={child.id}>
                      <button
                        type="button"
                        onClick={() => onChange({ category: child.slug, page: 1 })}
                        className={optionClass(query.category === child.slug)}
                      >
                        {child.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Price (Rs.)</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            defaultValue={query.minPrice ?? ''}
            onBlur={(e) => onChange({ minPrice: e.target.value ? Number(e.target.value) : undefined, page: 1 })}
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            defaultValue={query.maxPrice ?? ''}
            onBlur={(e) => onChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined, page: 1 })}
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Rating</h3>
        <div className="space-y-1">
          {RATINGS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange({ minRating: query.minRating === r ? undefined : r, page: 1 })}
              className={`block text-sm ${optionClass(query.minRating === r)}`}
            >
              {r}★ &amp; up
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Discount</h3>
        <div className="space-y-1">
          {DISCOUNTS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onChange({ minDiscount: query.minDiscount === d ? undefined : d, page: 1 })}
              className={`block text-sm ${optionClass(query.minDiscount === d)}`}
            >
              {d}% or more
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={!!query.freeShipping}
            onChange={(e) => onChange({ freeShipping: e.target.checked || undefined, page: 1 })}
          />
          Free Shipping
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={!!query.inStock}
            onChange={(e) => onChange({ inStock: e.target.checked || undefined, page: 1 })}
          />
          In Stock Only
        </label>
      </div>
    </aside>
  )
}
