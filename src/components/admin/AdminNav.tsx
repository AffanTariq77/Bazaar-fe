import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/users', label: 'Users', end: false },
  { to: '/admin/sellers', label: 'Sellers', end: false },
  { to: '/admin/products', label: 'Products', end: false },
  { to: '/admin/orders', label: 'Orders', end: false },
  { to: '/admin/categories', label: 'Categories', end: false },
  { to: '/admin/coupons', label: 'Coupons', end: false },
]

export function AdminNav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-1 border-b border-gray-200">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
