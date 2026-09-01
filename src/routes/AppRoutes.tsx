import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home'))

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
      </Routes>
    </Suspense>
  )
}
