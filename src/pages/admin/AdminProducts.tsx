import { useAdminProducts } from '../../hooks/useAdmin'

function formatPkr(amount: string | number) {
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`
}

export default function AdminProducts() {
  const { data, isLoading } = useAdminProducts()

  if (isLoading) return <p className="text-sm text-gray-400">Loading…</p>

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-100 text-xs uppercase text-gray-400">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">Seller</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.items.map((product) => (
            <tr key={product.id}>
              <td className="flex items-center gap-2 p-3">
                <img src={product.images[0]?.url} alt="" className="h-9 w-9 rounded object-cover" />
                <span className="line-clamp-1">{product.name}</span>
              </td>
              <td className="p-3 text-gray-500">{product.seller.storeName}</td>
              <td className="p-3">{formatPkr(product.price)}</td>
              <td className="p-3">{product.inventory?.stockQuantity ?? 0}</td>
              <td className="p-3">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-gray-100 p-3 text-xs text-gray-400">{data?.total} total products</p>
    </div>
  )
}
