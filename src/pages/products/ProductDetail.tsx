import { Star, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ImageGallery } from '../../components/products/ImageGallery'
import { ProductGrid } from '../../components/products/ProductGrid'
import { useProduct, useProducts } from '../../hooks/useProducts'
import { salePrice } from '../../types/product'

function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const { data: product, isLoading } = useProduct(slug)
  const { data: related } = useProducts(
    { category: product?.category.slug, limit: 6 },
    { enabled: !!product },
  )

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

          <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-400">
            Cart and checkout land in the next build phase.
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
