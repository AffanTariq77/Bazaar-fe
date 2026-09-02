import { Heart, ShoppingCart, Star, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ImageGallery } from '../../components/products/ImageGallery'
import { ProductGrid } from '../../components/products/ProductGrid'
import { useAddToCart } from '../../hooks/useCart'
import { useProduct, useProducts } from '../../hooks/useProducts'
import { useToggleWishlist, useWishlist } from '../../hooks/useWishlist'
import { useAuthStore } from '../../store/auth.store'
import { salePrice } from '../../types/product'

function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const accessToken = useAuthStore((s) => s.accessToken)
  const { data: product, isLoading } = useProduct(slug)
  const { data: related } = useProducts(
    { category: product?.category.slug, limit: 6 },
    { enabled: !!product },
  )
  const { data: wishlist } = useWishlist()
  const toggleWishlist = useToggleWishlist()
  const addToCart = useAddToCart()
  const [quantity, setQuantity] = useState(1)

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">Loading…</div>
  }

  if (!product) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-500">Product not found.</div>
  }

  const discounted = salePrice(product)
  const stock = product.inventory?.stockQuantity ?? 0
  const lowStockThreshold = product.inventory?.lowStockThreshold ?? 5
  const relatedItems = (related?.items ?? []).filter((p) => p.id !== product.id).slice(0, 5)
  const inWishlist = !!wishlist?.some((p) => p.id === product.id)

  const requireAuth = (action: () => void) => {
    if (!accessToken) {
      navigate('/login')
      return
    }
    action()
  }

  const handleAddToCart = () => requireAuth(() => addToCart.mutate({ productId: product.id, quantity }))
  const handleBuyNow = () =>
    requireAuth(() =>
      addToCart.mutate({ productId: product.id, quantity }, { onSuccess: () => navigate('/cart') }),
    )

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-4 text-xs text-gray-400">
        <Link to="/" className="hover:text-primary-600">
          Home
        </Link>{' '}
        /{' '}
        <Link to={`/products?category=${product.category.slug}`} className="hover:text-primary-600">
          {product.category.name}
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ImageGallery images={product.images} alt={product.name} />

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-1 text-sm text-gray-500">Brand: {product.brand}</p>

          <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{Number(product.rating).toFixed(1)}</span>
            <span className="text-gray-400">({product.reviewCount} reviews)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">{formatPkr(discounted)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-gray-400 line-through">{formatPkr(Number(product.price))}</span>
                <span className="rounded bg-primary-50 px-2 py-0.5 text-sm font-semibold text-primary-600">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          <p
            className={`mt-3 text-sm font-medium ${
              stock === 0 ? 'text-red-600' : stock <= lowStockThreshold ? 'text-amber-600' : 'text-emerald-600'
            }`}
          >
            {stock === 0 ? 'Out of stock' : stock <= lowStockThreshold ? `Only ${stock} left in stock` : 'In stock'}
          </p>

          {product.freeShipping && (
            <div className="mt-2 flex items-center gap-1 text-sm text-emerald-600">
              <Truck className="h-4 w-4" />
              Free Shipping
            </div>
          )}

          <p className="mt-2 text-sm text-gray-500">
            Sold by <span className="font-medium text-gray-700">{product.seller.storeName}</span>
          </p>

          {stock > 0 && (
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center rounded-md border border-gray-300">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-50"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-400">{stock} available</span>
            </div>
          )}

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              disabled={stock === 0 || addToCart.isPending}
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-primary-500 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
            <button
              type="button"
              disabled={stock === 0 || addToCart.isPending}
              onClick={handleBuyNow}
              className="flex-1 rounded-md bg-primary-500 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-200"
            >
              Buy Now
            </button>
            <button
              type="button"
              aria-label="Toggle wishlist"
              onClick={() => requireAuth(() => toggleWishlist.mutate(product.id))}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50"
            >
              <Heart className={`h-5 w-5 ${inWishlist ? 'fill-primary-500 text-primary-500' : 'text-gray-500'}`} />
            </button>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <h2 className="mb-2 text-sm font-semibold text-gray-900">Description</h2>
            <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-gray-900">Specifications</h2>
            <dl className="grid grid-cols-2 gap-y-1 text-sm">
              <dt className="text-gray-500">Brand</dt>
              <dd className="text-gray-700">{product.brand}</dd>
              <dt className="text-gray-500">SKU</dt>
              <dd className="text-gray-700">{product.sku}</dd>
              <dt className="text-gray-500">Category</dt>
              <dd className="text-gray-700">{product.category.name}</dd>
            </dl>
          </div>
        </div>
      </div>

      {relatedItems.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Related Products</h2>
          <ProductGrid products={relatedItems} />
        </div>
      )}
    </section>
  )
}
