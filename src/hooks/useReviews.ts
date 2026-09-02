import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { reviewsApi } from '../services/api/reviews.api'
import type { CreateReviewPayload } from '../types/review'
import { errorMessage } from '../utils/errorMessage'

export function useReviews(productId: string) {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewsApi.list(productId),
    enabled: !!productId,
  })
}

export function useMyReviews() {
  return useQuery({ queryKey: ['reviews', 'mine'], queryFn: reviewsApi.mine })
}

export function useCreateReview(productId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewsApi.create(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
      queryClient.invalidateQueries({ queryKey: ['reviews', 'mine'] })
      queryClient.invalidateQueries({ queryKey: ['products', 'detail'] })
      toast.success('Review submitted')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not submit review')),
  })
}
