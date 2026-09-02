import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { wishlistApi } from '../services/api/wishlist.api'
import { useAuthStore } from '../store/auth.store'
import { errorMessage } from '../utils/errorMessage'

const WISHLIST_KEY = ['wishlist']
const CART_KEY = ['cart']

export function useWishlist() {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: WISHLIST_KEY,
    queryFn: wishlistApi.list,
    enabled: !!accessToken,
  })
}

export function useToggleWishlist() {
  const queryClient = useQueryClient()
  const wishlist = queryClient.getQueryData<{ id: string }[]>(WISHLIST_KEY) ?? []

  return useMutation({
    mutationFn: (productId: string) => {
      const inWishlist = wishlist.some((p) => p.id === productId)
      return inWishlist ? wishlistApi.remove(productId) : wishlistApi.add(productId)
    },
    onSuccess: (products, productId) => {
      queryClient.setQueryData(WISHLIST_KEY, products)
      const stillIn = products.some((p) => p.id === productId)
      toast.success(stillIn ? 'Added to wishlist' : 'Removed from wishlist')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not update wishlist')),
  })
}

export function useMoveToCart() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ productId, quantity = 1 }: { productId: string; quantity?: number }) =>
      wishlistApi.moveToCart(productId, quantity),
    onSuccess: (cart) => {
      queryClient.setQueryData(CART_KEY, cart)
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEY })
      toast.success('Moved to cart')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not move to cart')),
  })
}
