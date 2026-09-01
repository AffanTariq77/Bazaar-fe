import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FormField } from '../common/FormField'
import { useRegister } from '../../hooks/useAuth'
import { registerSchema, type RegisterFormValues } from '../../schemas/auth.schema'

export function RegisterForm() {
  const navigate = useNavigate()
  const registerUser = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) })

  const onSubmit = handleSubmit(({ confirmPassword: _confirmPassword, ...payload }) => {
    registerUser.mutate(payload, { onSuccess: () => navigate('/') })
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormField label="Full name" {...register('name')} error={errors.name} />
      <FormField label="Email" type="email" {...register('email')} error={errors.email} />
      <FormField label="Phone (optional)" placeholder="+923001234567" {...register('phone')} error={errors.phone} />
      <FormField label="Password" type="password" {...register('password')} error={errors.password} />
      <FormField
        label="Confirm password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword}
      />
      <button
        type="submit"
        disabled={registerUser.isPending}
        className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:opacity-50"
      >
        {registerUser.isPending ? 'Creating account…' : 'Sign Up'}
      </button>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  )
}
