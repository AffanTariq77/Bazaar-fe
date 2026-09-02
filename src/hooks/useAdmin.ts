import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { adminApi } from '../services/api/admin.api'
import type { OrderStatus } from '../types/order'
import { errorMessage } from '../utils/errorMessage'

export function useAdminDashboard() {
  return useQuery({ queryKey: ['admin', 'dashboard'], queryFn: adminApi.dashboard })
}

export function useAdminUsers(page = 1) {
  return useQuery({ queryKey: ['admin', 'users', page], queryFn: () => adminApi.users(page) })
}

export function useAdminSellers(page = 1) {
  return useQuery({ queryKey: ['admin', 'sellers', page], queryFn: () => adminApi.sellers(page) })
}

export function useAdminProducts(page = 1) {
  return useQuery({ queryKey: ['admin', 'products', page], queryFn: () => adminApi.products(page) })
}

export function useAdminOrders(page = 1) {
  return useQuery({ queryKey: ['admin', 'orders', page], queryFn: () => adminApi.orders(page) })
}

export function useAdminUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => adminApi.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] })
      toast.success('Order status updated')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not update order status')),
  })
}

export function useAdminCategories() {
  return useQuery({ queryKey: ['admin', 'categories'], queryFn: adminApi.categories })
}
