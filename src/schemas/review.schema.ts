import { z } from 'zod'

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Select a rating').max(5),
  title: z.string().min(3, 'Title is too short'),
  comment: z.string().min(5, 'Comment is too short'),
})
export type ReviewFormValues = z.infer<typeof reviewSchema>
