import { Outlet } from 'react-router-dom'
import { AccountNav } from '../../components/account/AccountNav'

export default function AccountLayout() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">My Account</h1>
      <AccountNav />
      <Outlet />
    </section>
  )
}
