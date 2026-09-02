import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormField } from '../../components/common/FormField'
import { useUpdateProfile } from '../../hooks/useProfile'
import { profileSchema, type ProfileFormValues } from '../../schemas/profile.schema'
import { useAuthStore } from '../../store/auth.store'

export default function AccountProfile() {
  const user = useAuthStore((s) => s.user)
  const updateProfile = useUpdateProfile()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? '', phone: user?.phone ?? '' },
  })

  if (!user) return null

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit((values) => updateProfile.mutate(values))} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
          />
        </div>
        <FormField label="Full name" {...register('name')} error={errors.name} />
        <FormField label="Phone" placeholder="+923001234567" {...register('phone')} error={errors.phone} />
        <button
          type="submit"
          disabled={updateProfile.isPending}
          className="rounded-md bg-primary-500 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
        >
          {updateProfile.isPending ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
