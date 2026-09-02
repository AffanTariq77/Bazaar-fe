export interface ChartPoint {
  day?: string
  name?: string
  value: number
}

export interface AdminDashboardStats {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  totalSellers: number
  totalProducts: number
  pendingOrders: number
  charts: {
    revenueByDay: ChartPoint[]
    ordersByDay: ChartPoint[]
    usersByDay: ChartPoint[]
    topCategories: ChartPoint[]
    topProducts: ChartPoint[]
  }
}

export interface AdminUser {
  id: string
  name: string
  email: string
  phone: string | null
  role: string
  createdAt: string
}

export interface AdminSeller {
  id: string
  storeName: string
  slug: string
  createdAt: string
  user: { name: string; email: string }
  _count: { products: number }
}
