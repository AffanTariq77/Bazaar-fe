import { Outlet } from 'react-router-dom'
import { AdminNav } from '../../components/admin/AdminNav'

export default function AdminLayout() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <AdminNav />
      <Outlet />
    </section>
  )
}
