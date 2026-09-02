export interface Address {
  id: string
  fullName: string
  phone: string
  line1: string
  city: string
  province: string
  postalCode: string
  isDefault: boolean
  createdAt: string
}

export interface CreateAddressPayload {
  fullName: string
  phone: string
  line1: string
  city: string
  province: string
  postalCode: string
  isDefault?: boolean
}
