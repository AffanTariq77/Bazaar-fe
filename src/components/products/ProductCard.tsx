import { Star, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { salePrice, type Product } from '../../types/product'

function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0]?.url
  const discounted = salePrice(product)

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {image && (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        )}
        {product.discount > 0 && (
          <span className="absolute left-2 top-2 rounded bg-primary-500 px-1.5 py-0.5 text-xs font-semibold text-white">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-2 text-sm text-gray-800">{product.name}</p>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{Number(product.rating).toFixed(1)}</span>
          <span>({product.reviewCount})</span>
        </div>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">{formatPkr(discounted)}</span>
          {product.discount > 0 && (
            <span className="text-xs text-gray-400 line-through">{formatPkr(Number(product.price))}</span>
          )}
        </div>

        {product.freeShipping && (
          <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
            <Truck className="h-3.5 w-3.5" />
            <span>Free Shipping</span>
          </div>
        )}

        <p className="mt-auto pt-1 text-xs text-gray-400">{product.seller.storeName}</p>
      </div>
    </Link>
  )
}
