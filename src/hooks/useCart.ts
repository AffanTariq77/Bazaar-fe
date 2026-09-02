import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { cartApi } from '../services/api/cart.api'
import { useAuthStore } from '../store/auth.store'
import { errorMessage } from '../utils/errorMessage'

const CART_KEY = ['cart']

export function useCart() {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: CART_KEY,
    queryFn: cartApi.get,
    enabled: !!accessToken,
  })
}

export function useAddToCart() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: (cart) => {
      queryClient.setQueryData(CART_KEY, cart)
      toast.success('Added to cart')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not add to cart')),
  })
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) => cartApi.updateItem(itemId, quantity),
    onSuccess: (cart) => queryClient.setQueryData(CART_KEY, cart),
    onError: (err) => toast.error(errorMessage(err, 'Could not update quantity')),
  })
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: (cart) => {
      queryClient.setQueryData(CART_KEY, cart)
      toast.success('Removed from cart')
    },
  })
}
