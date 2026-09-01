export type Role = 'CUSTOMER' | 'SELLER' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  phone: string | null
  role: Role
  createdAt: string
  updatedAt: string
}
