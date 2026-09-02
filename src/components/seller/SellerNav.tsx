import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/seller', label: 'Dashboard', end: true },
  { to: '/seller/products', label: 'Products', end: false },
  { to: '/seller/orders', label: 'Orders', end: false },
]

export function SellerNav() {
  return (
    <nav className="mb-6 flex gap-1 border-b border-gray-200">
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
