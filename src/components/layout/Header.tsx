import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useAuth'
import { useAuthStore } from '../../store/auth.store'
import { CategoryNav } from './CategoryNav'
import { SearchBar } from './SearchBar'

export function Header() {
  const user = useAuthStore((s) => s.user)
  const logout = useLogout()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="hidden border-b border-gray-100 bg-gray-50 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 px-4 py-1.5 text-xs text-gray-500">
          <span>Save More on App</span>
          <span>Sell on Bazaar</span>
          <span>Help &amp; Support</span>
          {user ? (
            <>
              <span className="text-gray-700">Hi, {user.name}</span>
              <button
                type="button"
                onClick={() => logout.mutate()}
                className="font-medium text-primary-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium text-primary-600 hover:underline">
                Login
              </Link>
              <Link to="/register" className="font-medium text-primary-600 hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <ShoppingBag className="h-7 w-7 text-primary-500" strokeWidth={2.5} />
          <span className="text-2xl font-extrabold tracking-tight text-primary-600">BAZAAR</span>
        </Link>
        <SearchBar />
      </div>

      <CategoryNav />
    </header>
  )
}
