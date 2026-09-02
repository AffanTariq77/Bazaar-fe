import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { useCreateReview } from '../../hooks/useReviews'
import { reviewSchema, type ReviewFormValues } from '../../schemas/review.schema'

export function ReviewForm({ productId, onDone }: { productId: string; onDone?: () => void }) {
  const createReview = useCreateReview(productId)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, title: '', comment: '' },
  })

  const rating = useWatch({ control, name: 'rating' })

  const onSubmit = handleSubmit((values) => {
    createReview.mutate(values, {
      onSuccess: () => {
        reset()
        onDone?.()
      },
    })
  })

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-gray-200 p-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Your rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue('rating', star, { shouldValidate: true })}
              aria-label={`Rate ${star} stars`}
            >
              <Star className={`h-6 w-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-1 text-xs text-red-600">{errors.rating.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
        <input
          {...register('title')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Comment</label>
        <textarea
          {...register('comment')}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {errors.comment && <p className="mt-1 text-xs text-red-600">{errors.comment.message}</p>}
      </div>

      <button
        type="submit"
        disabled={createReview.isPending}
        className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
      >
        {createReview.isPending ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  )
}
