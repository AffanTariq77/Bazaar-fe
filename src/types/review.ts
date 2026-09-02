export interface Review {
  id: string
  rating: number
  title: string
  comment: string
  verifiedPurchase: boolean
  createdAt: string
  user: { id: string; name: string }
}

export interface ReviewsResult {
  items: Review[]
  total: number
  page: number
  limit: number
  totalPages: number
  averageRating: number
  reviewCount: number
  ratingDistribution: { star: number; count: number }[]
}

export interface CreateReviewPayload {
  rating: number
  title: string
  comment: string
}
