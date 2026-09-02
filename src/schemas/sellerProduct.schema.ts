import { z } from 'zod'

export const sellerProductSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().min(10, 'Description is too short'),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  discount: z.coerce.number().min(0).max(100).optional(),
  sku: z.string().min(2, 'SKU is required'),
  brand: z.string().min(1, 'Brand is required'),
  categoryId: z.string().min(1, 'Select a category'),
  stockQuantity: z.coerce.number().min(0, 'Stock cannot be negative'),
  freeShipping: z.boolean().optional(),
  imageUrl: z.string().url('Enter a valid image URL').optional().or(z.literal('')),
})
export type SellerProductFormInput = z.input<typeof sellerProductSchema>
export type SellerProductFormValues = z.output<typeof sellerProductSchema>
