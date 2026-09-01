import { ShoppingBag } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4">
        <ShoppingBag className="h-7 w-7 text-primary-500" strokeWidth={2.5} />
        <span className="text-2xl font-extrabold tracking-tight text-primary-600">
          BAZAAR
        </span>
        <span className="ml-2 hidden text-sm text-gray-500 sm:inline">
          Pakistan&apos;s Online Marketplace
        </span>
      </div>
    </header>
  )
}
