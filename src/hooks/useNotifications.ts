import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationsApi } from '../services/api/notifications.api'
import { useAuthStore } from '../store/auth.store'

export function useNotifications() {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.list,
    enabled: !!accessToken,
    refetchInterval: 30000,
  })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })
}
