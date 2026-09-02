import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { sellerApi, type SellerProductPayload } from '../services/api/seller.api'
import type { OrderStatus } from '../types/order'
import { errorMessage } from '../utils/errorMessage'

export function useSellerDashboard() {
  return useQuery({ queryKey: ['seller', 'dashboard'], queryFn: sellerApi.dashboard })
}

export function useSellerProducts(page = 1) {
  return useQuery({ queryKey: ['seller', 'products', page], queryFn: () => sellerApi.products(page) })
}

export function useSellerProduct(id: string) {
  return useQuery({ queryKey: ['seller', 'products', 'detail', id], queryFn: () => sellerApi.product(id), enabled: !!id })
}

export function useCreateSellerProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: SellerProductPayload) => sellerApi.createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller', 'products'] })
      queryClient.invalidateQueries({ queryKey: ['seller', 'dashboard'] })
      toast.success('Product created')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not create product')),
  })
}

export function useUpdateSellerProduct(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<SellerProductPayload>) => sellerApi.updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller', 'products'] })
      toast.success('Product updated')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not update product')),
  })
}

export function useDeleteSellerProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => sellerApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller', 'products'] })
      queryClient.invalidateQueries({ queryKey: ['seller', 'dashboard'] })
      toast.success('Product deleted')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not delete product')),
  })
}

export function useSellerOrders(page = 1) {
  return useQuery({ queryKey: ['seller', 'orders', page], queryFn: () => sellerApi.orders(page) })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => sellerApi.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller', 'orders'] })
      toast.success('Order status updated')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not update order status')),
  })
}
