import { useParams } from 'react-router-dom'
import { useProduct } from '../../hooks/useProducts'

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const { data: product, isLoading } = useProduct(slug)

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">Loading…</div>
  }

  if (!product) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-500">Product not found.</div>
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
      <p className="mt-2 text-gray-500">Full product detail page lands in the next build phase.</p>
    </section>
  )
}
