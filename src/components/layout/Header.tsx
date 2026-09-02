import { Heart, Menu, ShoppingBag, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useCategories } from '../../hooks/useCategories'
import { useLogout } from '../../hooks/useAuth'
import { useWishlist } from '../../hooks/useWishlist'
import { useAuthStore } from '../../store/auth.store'
import { CategoryNav } from './CategoryNav'
import { NotificationBell } from './NotificationBell'
import { SearchBar } from './SearchBar'

export function Header() {
  const user = useAuthStore((s) => s.user)
  const logout = useLogout()
  const { data: cart } = useCart()
  const { data: wishlist } = useWishlist()
  const { data: categories } = useCategories()
  const [mobileOpen, setMobileOpen] = useState(false)

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
              <Link to="/account" className="font-medium text-primary-600 hover:underline">
                My Account
              </Link>
              <Link to="/orders" className="font-medium text-primary-600 hover:underline">
                My Orders
              </Link>
              {user.role === 'SELLER' && (
                <Link to="/seller" className="font-medium text-primary-600 hover:underline">
                  Seller Dashboard
                </Link>
              )}
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="font-medium text-primary-600 hover:underline">
                  Admin Dashboard
                </Link>
              )}
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
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="text-gray-600 sm:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <ShoppingBag className="h-7 w-7 text-primary-500" strokeWidth={2.5} />
          <span className="text-2xl font-extrabold tracking-tight text-primary-600">BAZAAR</span>
        </Link>

        <div className="hidden flex-1 sm:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-4 sm:ml-0">
          {user && <NotificationBell />}
          <Link to="/wishlist" className="relative flex flex-col items-center text-gray-600 hover:text-primary-600">
            <Heart className="h-6 w-6" />
            {!!wishlist?.length && (
              <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
            <span className="hidden text-xs sm:block">Wishlist</span>
          </Link>
          <Link to="/cart" className="relative flex flex-col items-center text-gray-600 hover:text-primary-600">
            <ShoppingCart className="h-6 w-6" />
            {!!cart?.itemCount && (
              <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                {cart.itemCount}
              </span>
            )}
            <span className="hidden text-xs sm:block">Cart</span>
          </Link>
        </div>
      </div>

      <div className="px-4 pb-3 sm:hidden">
        <SearchBar />
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 sm:hidden">
          {user ? (
            <div className="mb-3 space-y-2 border-b border-gray-100 pb-3 text-sm">
              <p className="text-gray-700">Hi, {user.name}</p>
              <Link to="/account" onClick={() => setMobileOpen(false)} className="block text-primary-600">
                My Account
              </Link>
              <Link to="/orders" onClick={() => setMobileOpen(false)} className="block text-primary-600">
                My Orders
              </Link>
              {user.role === 'SELLER' && (
                <Link to="/seller" onClick={() => setMobileOpen(false)} className="block text-primary-600">
                  Seller Dashboard
                </Link>
              )}
              {user.role === 'ADMIN' && (
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="block text-primary-600">
                  Admin Dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  logout.mutate()
                  setMobileOpen(false)
                }}
                className="block text-primary-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mb-3 flex gap-4 border-b border-gray-100 pb-3 text-sm">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="font-medium text-primary-600">
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="font-medium text-primary-600">
                Sign Up
              </Link>
            </div>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="hidden sm:block">
        <CategoryNav />
      </div>
    </header>
  )
}
