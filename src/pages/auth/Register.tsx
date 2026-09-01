import { RegisterForm } from '../../components/auth/RegisterForm'

export default function Register() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-xl font-bold text-gray-900">Create your BAZAAR account</h1>
        <RegisterForm />
      </div>
    </section>
  )
}
