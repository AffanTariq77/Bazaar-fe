import { Link } from 'react-router-dom'
import { useCategories } from '../../hooks/useCategories'

export function CategoryNav() {
  const { data: categories } = useCategories()
  if (!categories || categories.length === 0) return null

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-2 text-sm text-gray-600">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className="whitespace-nowrap hover:text-primary-600"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
