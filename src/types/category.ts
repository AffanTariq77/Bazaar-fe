export interface Category {
  id: string
  name: string
  slug: string
  parentId: string | null
  children: Category[]
  _count: { products: number }
}
