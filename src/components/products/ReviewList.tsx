import { Star } from 'lucide-react'
import { useState } from 'react'
import { useReviews } from '../../hooks/useReviews'
import { useAuthStore } from '../../store/auth.store'
import { ReviewForm } from './ReviewForm'

export function ReviewList({ productId }: { productId: string }) {
  const { data, isLoading } = useReviews(productId)
  const accessToken = useAuthStore((s) => s.accessToken)
  const [showForm, setShowForm] = useState(false)

  if (isLoading || !data) {
    return <p className="text-sm text-gray-400">Loading reviews…</p>
  }

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex shrink-0 flex-col items-center">
          <p className="text-4xl font-bold text-gray-900">{data.averageRating.toFixed(1)}</p>
          <div className="mt-1 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(data.averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-400">{data.reviewCount} reviews</p>
        </div>

        <div className="flex-1 space-y-1">
          {data.ratingDistribution.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-8">{star}★</span>
              <div className="h-2 flex-1 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-amber-400"
                  style={{ width: data.reviewCount ? `${(count / data.reviewCount) * 100}%` : '0%' }}
                />
              </div>
              <span className="w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {accessToken && (
        <div className="mt-6">
          {showForm ? (
            <ReviewForm productId={productId} onDone={() => setShowForm(false)} />
          ) : (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="rounded-md border border-primary-500 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
            >
              Write a Review
            </button>
          )}
        </div>
      )}

      <div className="mt-6 divide-y divide-gray-100 border-t border-gray-100">
        {data.items.length === 0 && <p className="py-4 text-sm text-gray-400">No reviews yet.</p>}
        {data.items.map((review) => (
          <div key={review.id} className="py-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-800">{review.title}</p>
              {review.verifiedPurchase && (
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">
                  Verified Purchase
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
            <p className="mt-1 text-xs text-gray-400">
              {review.user.name} · {new Date(review.createdAt).toLocaleDateString('en-GB')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
