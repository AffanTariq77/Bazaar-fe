import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FormField } from '../common/FormField'
import { useLogin } from '../../hooks/useAuth'
import { loginSchema, type LoginFormValues } from '../../schemas/auth.schema'

export function LoginForm() {
  const navigate = useNavigate()
  const login = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, { onSuccess: () => navigate('/') })
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormField label="Email" type="email" {...register('email')} error={errors.email} />
      <FormField label="Password" type="password" {...register('password')} error={errors.password} />
      <button
        type="submit"
        disabled={login.isPending}
        className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:opacity-50"
      >
        {login.isPending ? 'Logging in…' : 'Log In'}
      </button>
      <p className="text-center text-sm text-gray-500">
        New to BAZAAR?{' '}
        <Link to="/register" className="font-medium text-primary-600 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  )
}
