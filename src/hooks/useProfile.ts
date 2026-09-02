import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { usersApi, type UpdateProfilePayload } from '../services/api/users.api'
import { useAuthStore } from '../store/auth.store'
import { errorMessage } from '../utils/errorMessage'

export function useUpdateProfile() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const accessToken = useAuthStore((s) => s.accessToken)
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => usersApi.updateProfile(payload),
    onSuccess: (user) => {
      if (accessToken) setAuth(user, accessToken)
      toast.success('Profile updated')
    },
    onError: (err) => toast.error(errorMessage(err, 'Could not update profile')),
  })
}
