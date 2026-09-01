import { Link } from 'react-router-dom'
import { useCategories } from '../../hooks/useCategories'
import type { Category } from '../../types/category'

interface CategoryGridProps {
  title: string
  sortByPopularity?: boolean
  limit?: number
}

export function CategoryGrid({ title, sortByPopularity, limit }: CategoryGridProps) {
  const { data: categories } = useCategories()
  if (!categories || categories.length === 0) return null

  const sorted: Category[] = sortByPopularity
    ? [...categories].sort((a, b) => b._count.products - a._count.products)
    : categories
  const visible = limit ? sorted.slice(0, limit) : sorted

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-4 text-xl font-bold text-gray-900">{title}</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {visible.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-lg font-bold text-primary-600">
              {cat.name.charAt(0)}
            </div>
            <span className="text-xs font-medium text-gray-700">{cat.name}</span>
            <span className="text-[11px] text-gray-400">{cat._count.products} products</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
