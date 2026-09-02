import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-5xl font-extrabold text-primary-500">404</p>
      <p className="mt-3 text-lg font-medium text-gray-700">Page not found</p>
      <Link to="/" className="mt-4 text-sm font-medium text-primary-600 hover:underline">
        Back to home
      </Link>
    </div>
  )
}
