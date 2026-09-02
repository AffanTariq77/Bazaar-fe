import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AddressForm } from '../../components/checkout/AddressForm'
import { useAddresses, useDeleteAddress } from '../../hooks/useAddresses'

export default function AccountAddresses() {
  const { data: addresses, isLoading } = useAddresses()
  const deleteAddress = useDeleteAddress()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-4">
      {isLoading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : (
        <div className="space-y-2">
          {addresses?.map((addr) => (
            <div
              key={addr.id}
              className="flex items-start justify-between rounded-md border border-gray-200 p-3 text-sm"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {addr.fullName} — {addr.phone}{' '}
                  {addr.isDefault && (
                    <span className="ml-1 rounded bg-primary-50 px-1.5 py-0.5 text-[10px] font-medium text-primary-600">
                      Default
                    </span>
                  )}
                </p>
                <p className="text-gray-500">
                  {addr.line1}, {addr.city}, {addr.province} {addr.postalCode}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this address?')) deleteAddress.mutate(addr.id)
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {addresses?.length === 0 && <p className="text-sm text-gray-400">No saved addresses yet.</p>}
        </div>
      )}

      {showForm ? (
        <AddressForm onCreated={() => setShowForm(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="text-sm font-medium text-primary-600 hover:underline"
        >
          + Add a new address
        </button>
      )}
    </div>
  )
}
