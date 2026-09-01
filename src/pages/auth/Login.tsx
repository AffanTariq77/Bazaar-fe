import { LoginForm } from '../../components/auth/LoginForm'

export default function Login() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-xl font-bold text-gray-900">Log in to BAZAAR</h1>
        <LoginForm />
      </div>
    </section>
  )
}
