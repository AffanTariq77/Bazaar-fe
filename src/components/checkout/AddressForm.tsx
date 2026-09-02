import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCreateAddress } from '../../hooks/useAddresses'
import { addressSchema, type AddressFormValues } from '../../schemas/address.schema'
import { PAKISTAN_CITIES, PAKISTAN_PROVINCES } from '../../utils/pakistan'
import { FormField } from '../common/FormField'

interface AddressFormProps {
  onCreated: (addressId: string) => void
}

export function AddressForm({ onCreated }: AddressFormProps) {
  const createAddress = useCreateAddress()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({ resolver: zodResolver(addressSchema) })

  const onSubmit = handleSubmit((values) => {
    createAddress.mutate({ ...values, isDefault: true }, { onSuccess: (address) => onCreated(address.id) })
  })

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <FormField label="Full name" {...register('fullName')} error={errors.fullName} />
      <FormField label="Phone" placeholder="+923001234567" {...register('phone')} error={errors.phone} />
      <div className="sm:col-span-2">
        <FormField label="Address" {...register('line1')} error={errors.line1} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
        <select {...register('city')} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
          <option value="">Select city</option>
          {PAKISTAN_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Province</label>
        <select {...register('province')} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
          <option value="">Select province</option>
          {PAKISTAN_PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.province && <p className="mt-1 text-xs text-red-600">{errors.province.message}</p>}
      </div>
      <FormField label="Postal code" {...register('postalCode')} error={errors.postalCode} />
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={createAddress.isPending}
          className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
        >
          {createAddress.isPending ? 'Saving…' : 'Save Address'}
        </button>
      </div>
    </form>
  )
}
