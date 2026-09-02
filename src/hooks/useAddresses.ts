import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { addressesApi } from '../services/api/addresses.api'
import { useAuthStore } from '../store/auth.store'
import type { CreateAddressPayload } from '../types/address'
import { errorMessage } from '../utils/errorMessage'

const ADDRESSES_KEY = ['addresses']

export function useAddresses() {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: ADDRESSES_KEY,
    queryFn: addressesApi.list,
    enabled: !!accessToken,
  })
}

export function useCreateAddress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => addressesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY })
      toast.success('Address saved')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not save address')),
  })
}

export function useDeleteAddress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => addressesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY })
      toast.success('Address removed')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not remove address')),
  })
}
