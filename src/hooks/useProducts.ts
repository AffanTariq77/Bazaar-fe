import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { productsApi } from '../services/api/products.api'
import type { ProductQuery } from '../types/product'

export function useProducts(query: ProductQuery, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => productsApi.list(query),
    placeholderData: keepPreviousData,
    enabled: options?.enabled,
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['products', 'detail', slug],
    queryFn: () => productsApi.bySlug(slug),
    enabled: !!slug,
  })
}

export function useProductSuggestions(q: string) {
  return useQuery({
    queryKey: ['products', 'suggestions', q],
    queryFn: () => productsApi.suggestions(q),
    enabled: q.trim().length > 1,
  })
}
