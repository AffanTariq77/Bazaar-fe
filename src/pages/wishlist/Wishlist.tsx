import { ShoppingCart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMoveToCart, useToggleWishlist, useWishlist } from '../../hooks/useWishlist'
import { salePrice } from '../../types/product'

function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

export default function Wishlist() {
  const { data: wishlist, isLoading } = useWishlist()
  const toggleWishlist = useToggleWishlist()
  const moveToCart = useMoveToCart()

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">Loading…</div>
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-lg font-medium text-gray-700">Your wishlist is empty</p>
        <Link to="/products" className="mt-3 inline-block text-sm font-medium text-primary-600 hover:underline">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Wishlist</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((product) => {
          const outOfStock = (product.inventory?.stockQuantity ?? 0) === 0
          return (
            <div key={product.id} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3">
              <Link to={`/products/${product.slug}`} className="shrink-0">
                <img src={product.images[0]?.url} alt={product.name} className="h-20 w-20 rounded object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link
                  to={`/products/${product.slug}`}
                  className="line-clamp-2 text-sm font-medium text-gray-800 hover:text-primary-600"
                >
                  {product.name}
                </Link>
                <p className="text-sm font-bold text-gray-900">{formatPkr(salePrice(product))}</p>
                <div className="mt-auto flex items-center gap-2">
                  <button
                    type="button"
                    disabled={outOfStock || moveToCart.isPending}
                    onClick={() => moveToCart.mutate({ productId: product.id })}
                    className="flex items-center gap-1 rounded-md border border-primary-500 px-2 py-1 text-xs font-semibold text-primary-600 hover:bg-primary-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {outOfStock ? 'Out of Stock' : 'Move to Cart'}
                  </button>
                  <button
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={() => toggleWishlist.mutate(product.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
