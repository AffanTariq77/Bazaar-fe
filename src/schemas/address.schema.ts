import { z } from 'zod'

export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(/^\+92\d{10}$/, 'Phone must be in +92XXXXXXXXXX format'),
  line1: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'Select a city'),
  province: z.string().min(1, 'Select a province'),
  postalCode: z.string().min(4, 'Postal code is required'),
})
export type AddressFormValues = z.infer<typeof addressSchema>
