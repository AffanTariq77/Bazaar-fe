import { useSellerDashboard } from '../../hooks/useSeller'
import type { SellerDashboardStats } from '../../types/seller'

function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

const CARDS: { key: keyof SellerDashboardStats; label: string; format: (n: number) => string | number }[] = [
  { key: 'totalRevenue', label: 'Total Revenue', format: formatPkr },
  { key: 'totalOrders', label: 'Orders', format: (n) => n },
  { key: 'totalProducts', label: 'Products', format: (n) => n },
  { key: 'totalCustomers', label: 'Customers', format: (n) => n },
  { key: 'pendingOrders', label: 'Pending Orders', format: (n) => n },
  { key: 'lowStockProducts', label: 'Low Stock', format: (n) => n },
]

export default function SellerDashboard() {
  const { data, isLoading } = useSellerDashboard()

  if (isLoading || !data) {
    return <p className="text-sm text-gray-400">Loading…</p>
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {CARDS.map((card) => (
        <div key={card.key} className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">{card.label}</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{card.format(data[card.key])}</p>
        </div>
      ))}
    </div>
  )
}
