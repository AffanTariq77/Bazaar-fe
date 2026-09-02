import { MiniBarChart } from '../../components/admin/MiniBarChart'
import { useAdminDashboard } from '../../hooks/useAdmin'
import type { AdminDashboardStats } from '../../types/admin'

function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

const CARDS: { key: keyof AdminDashboardStats; label: string; format: (n: number) => string | number }[] = [
  { key: 'totalRevenue', label: 'Total Revenue', format: formatPkr },
  { key: 'totalOrders', label: 'Total Orders', format: (n) => n },
  { key: 'totalUsers', label: 'Total Users', format: (n) => n },
  { key: 'totalSellers', label: 'Total Sellers', format: (n) => n },
  { key: 'totalProducts', label: 'Total Products', format: (n) => n },
  { key: 'pendingOrders', label: 'Pending Orders', format: (n) => n },
]

export default function AdminDashboard() {
  const { data, isLoading } = useAdminDashboard()

  if (isLoading || !data) {
    return <p className="text-sm text-gray-400">Loading…</p>
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {CARDS.map((card) => (
          <div key={card.key} className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">{card.label}</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {card.format(data[card.key] as number)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Revenue (last 7 days)</h3>
          <MiniBarChart data={data.charts.revenueByDay} formatValue={formatPkr} />
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Orders (last 7 days)</h3>
          <MiniBarChart data={data.charts.ordersByDay} />
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">New Users (last 7 days)</h3>
          <MiniBarChart data={data.charts.usersByDay} />
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Top Categories</h3>
          <MiniBarChart data={data.charts.topCategories} />
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Top Products by Revenue</h3>
          <MiniBarChart data={data.charts.topProducts} formatValue={formatPkr} />
        </div>
      </div>
    </div>
  )
}
