import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { authApi, type LoginPayload, type RegisterPayload } from '../services/api/auth.api'
import { useAuthStore } from '../store/auth.store'

function errorMessage(err: unknown, fallback: string) {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.message
    if (typeof message === 'string') return message
  }
  return fallback
}

export function useCurrentUser() {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.me,
    enabled: !!accessToken,
    retry: false,
  })
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth)
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: ({ accessToken, user }) => {
      setAuth(user, accessToken)
      toast.success(`Welcome back, ${user.name}`)
    },
    onError: (err) => toast.error(errorMessage(err, 'Invalid email or password')),
  })
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth)
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: ({ accessToken, user }) => {
      setAuth(user, accessToken)
      toast.success(`Welcome to BAZAAR, ${user.name}`)
    },
    onError: (err) => toast.error(errorMessage(err, 'Registration failed')),
  })
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAuth()
      queryClient.clear()
      toast.success('Logged out')
    },
  })
}
