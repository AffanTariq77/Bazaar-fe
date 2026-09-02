import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMyReviews } from '../../hooks/useReviews'

export default function AccountReviews() {
  const { data: reviews, isLoading } = useMyReviews()

  if (isLoading) return <p className="text-sm text-gray-400">Loading…</p>

  if (!reviews || reviews.length === 0) {
    return <p className="text-sm text-gray-400">You haven&apos;t written any reviews yet.</p>
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-md border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <Link
              to={`/products/${review.product.slug}`}
              className="text-sm font-medium text-gray-800 hover:text-primary-600"
            >
              {review.product.name}
            </Link>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-700">{review.title}</p>
          <p className="text-sm text-gray-500">{review.comment}</p>
          <p className="mt-1 text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString('en-GB')}</p>
        </div>
      ))}
    </div>
  )
}
