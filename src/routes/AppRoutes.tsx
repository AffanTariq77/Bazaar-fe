import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/auth/Login'))
const Register = lazy(() => import('../pages/auth/Register'))
const ProductListing = lazy(() => import('../pages/products/ProductListing'))
const ProductDetail = lazy(() => import('../pages/products/ProductDetail'))
const Cart = lazy(() => import('../pages/cart/Cart'))
const Wishlist = lazy(() => import('../pages/wishlist/Wishlist'))
const Checkout = lazy(() => import('../pages/checkout/Checkout'))
const Orders = lazy(() => import('../pages/orders/Orders'))
const OrderDetail = lazy(() => import('../pages/orders/OrderDetail'))
const SellerLayout = lazy(() => import('../pages/seller/SellerLayout'))
const SellerDashboard = lazy(() => import('../pages/seller/SellerDashboard'))
const SellerProducts = lazy(() => import('../pages/seller/SellerProducts'))
const SellerProductCreate = lazy(() => import('../pages/seller/SellerProductCreate'))
const SellerProductEdit = lazy(() => import('../pages/seller/SellerProductEdit'))
const SellerOrders = lazy(() => import('../pages/seller/SellerOrders'))
const AdminLayout = lazy(() => import('../pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'))
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'))
const AdminSellers = lazy(() => import('../pages/admin/AdminSellers'))
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'))
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'))
const AdminCategories = lazy(() => import('../pages/admin/AdminCategories'))
const AdminCoupons = lazy(() => import('../pages/admin/AdminCoupons'))
const AccountLayout = lazy(() => import('../pages/account/AccountLayout'))
const AccountProfile = lazy(() => import('../pages/account/AccountProfile'))
const AccountAddresses = lazy(() => import('../pages/account/AccountAddresses'))
const AccountReviews = lazy(() => import('../pages/account/AccountReviews'))
const NotFound = lazy(() => import('../pages/NotFound'))

export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center py-24 text-gray-400">
          Loading…
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<AccountProfile />} />
            <Route path="addresses" element={<AccountAddresses />} />
            <Route path="reviews" element={<AccountReviews />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute roles={['SELLER']} />}>
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<SellerDashboard />} />
            <Route path="products" element={<SellerProducts />} />
            <Route path="products/create" element={<SellerProductCreate />} />
            <Route path="products/:id/edit" element={<SellerProductEdit />} />
            <Route path="orders" element={<SellerOrders />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute roles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="sellers" element={<AdminSellers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="coupons" element={<AdminCoupons />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
