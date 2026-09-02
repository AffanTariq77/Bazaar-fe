import { Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDeleteSellerProduct, useSellerProducts } from '../../hooks/useSeller'

function formatPkr(amount: string | number) {
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`
}

export default function SellerProducts() {
  const { data, isLoading } = useSellerProducts()
  const deleteProduct = useDeleteSellerProduct()

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Link
          to="/seller/products/create"
          className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600"
        >
          + Add Product
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.items.map((product) => (
                <tr key={product.id}>
                  <td className="flex items-center gap-2 p-3">
                    <img src={product.images[0]?.url} alt="" className="h-10 w-10 rounded object-cover" />
                    <span className="line-clamp-1">{product.name}</span>
                  </td>
                  <td className="p-3">{formatPkr(product.price)}</td>
                  <td className="p-3">{product.inventory?.stockQuantity ?? 0}</td>
                  <td className="p-3">{product.status}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/seller/products/${product.id}/edit`}
                        className="text-gray-400 hover:text-primary-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete "${product.name}"?`)) deleteProduct.mutate(product.id)
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data?.items.length === 0 && <p className="p-6 text-center text-sm text-gray-400">No products yet.</p>}
        </div>
      )}
    </div>
  )
}
