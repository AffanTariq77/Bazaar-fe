import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCategories } from '../../hooks/useCategories'
import {
  sellerProductSchema,
  type SellerProductFormInput,
  type SellerProductFormValues,
} from '../../schemas/sellerProduct.schema'
import type { Category } from '../../types/category'
import type { Product } from '../../types/product'
import { FormField } from '../common/FormField'

interface SellerProductFormProps {
  initialValues?: Product
  onSubmit: (values: SellerProductFormValues) => void
  isPending: boolean
}

function flattenCategories(categories: Category[]) {
  return categories.flatMap((cat) => [
    { id: cat.id, name: cat.name },
    ...cat.children.map((child) => ({ id: child.id, name: `— ${child.name}` })),
  ])
}

export function SellerProductForm({ initialValues, onSubmit, isPending }: SellerProductFormProps) {
  const { data: categories } = useCategories()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerProductFormInput, unknown, SellerProductFormValues>({
    resolver: zodResolver(sellerProductSchema),
    defaultValues: initialValues
      ? {
          name: initialValues.name,
          description: initialValues.description,
          price: Number(initialValues.price),
          discount: initialValues.discount,
          sku: initialValues.sku,
          brand: initialValues.brand,
          categoryId: initialValues.category.id,
          stockQuantity: initialValues.inventory?.stockQuantity ?? 0,
          freeShipping: initialValues.freeShipping,
          imageUrl: initialValues.images[0]?.url ?? '',
        }
      : { freeShipping: true },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <FormField label="Product name" {...register('name')} error={errors.name} />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>
      <FormField label="Price (Rs.)" type="number" {...register('price')} error={errors.price} />
      <FormField label="Discount %" type="number" {...register('discount')} error={errors.discount} />
      <FormField label="SKU" {...register('sku')} error={errors.sku} />
      <FormField label="Brand" {...register('brand')} error={errors.brand} />
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
        <select {...register('categoryId')} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
          <option value="">Select category</option>
          {categories &&
            flattenCategories(categories).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
        {errors.categoryId && <p className="mt-1 text-xs text-red-600">{errors.categoryId.message}</p>}
      </div>
      <FormField label="Stock quantity" type="number" {...register('stockQuantity')} error={errors.stockQuantity} />
      <div className="sm:col-span-2">
        <FormField label="Image URL" placeholder="https://…" {...register('imageUrl')} error={errors.imageUrl} />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700 sm:col-span-2">
        <input type="checkbox" {...register('freeShipping')} />
        Free shipping
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-primary-500 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
        >
          {isPending ? 'Saving…' : 'Save Product'}
        </button>
      </div>
    </form>
  )
}
