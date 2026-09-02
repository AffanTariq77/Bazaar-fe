import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/account/profile', label: 'Profile' },
  { to: '/account/addresses', label: 'Addresses' },
  { to: '/orders', label: 'Orders' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/account/reviews', label: 'Reviews' },
]

export function AccountNav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-1 border-b border-gray-200">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
