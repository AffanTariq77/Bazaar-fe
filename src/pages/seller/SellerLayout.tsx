import { Outlet } from 'react-router-dom'
import { SellerNav } from '../../components/seller/SellerNav'

export default function SellerLayout() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Seller Dashboard</h1>
      <SellerNav />
      <Outlet />
    </section>
  )
}
