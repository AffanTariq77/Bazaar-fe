import { useAdminCategories } from '../../hooks/useAdmin'

export default function AdminCategories() {
  const { data, isLoading } = useAdminCategories()

  if (isLoading) return <p className="text-sm text-gray-400">Loading…</p>

  return (
    <div className="space-y-3">
      {data?.map((category) => (
        <div key={category.id} className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800">{category.name}</p>
            <span className="text-xs text-gray-400">{category._count.products} products</span>
          </div>
          {category.children.length > 0 && (
            <ul className="mt-2 space-y-1 border-t border-gray-100 pt-2">
              {category.children.map((child) => (
                <li key={child.id} className="flex items-center justify-between text-sm text-gray-600">
                  <span>— {child.name}</span>
                  <span className="text-xs text-gray-400">{child._count.products} products</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
