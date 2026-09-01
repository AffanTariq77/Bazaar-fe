import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductSuggestions } from '../../hooks/useProducts'

export function SearchBar() {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [debounced, setDebounced] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), 300)
    return () => clearTimeout(timeout)
  }, [value])

  const { data: suggestions } = useProductSuggestions(debounced)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const submit = (term: string) => {
    setOpen(false)
    if (term.trim()) navigate(`/products?search=${encodeURIComponent(term)}`)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
        className="flex items-center rounded-md border-2 border-primary-500 bg-white"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products, brands and categories"
          className="w-full rounded-l-md px-3 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex h-full items-center bg-primary-500 px-4 py-2.5 text-white"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {open && suggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => submit(s.name)}
                className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
