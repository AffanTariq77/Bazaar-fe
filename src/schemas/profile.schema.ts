import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z
    .string()
    .regex(/^\+92\d{10}$/, 'Phone must be in +92XXXXXXXXXX format')
    .optional()
    .or(z.literal('')),
})
export type ProfileFormValues = z.infer<typeof profileSchema>
