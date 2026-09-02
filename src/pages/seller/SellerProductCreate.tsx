import { useNavigate } from 'react-router-dom'
import { SellerProductForm } from '../../components/seller/SellerProductForm'
import { useCreateSellerProduct } from '../../hooks/useSeller'

export default function SellerProductCreate() {
  const navigate = useNavigate()
  const createProduct = useCreateSellerProduct()

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Create Product</h2>
      <SellerProductForm
        isPending={createProduct.isPending}
        onSubmit={(values) =>
          createProduct.mutate(
            { ...values, images: values.imageUrl ? [values.imageUrl] : [] },
            { onSuccess: () => navigate('/seller/products') },
          )
        }
      />
    </div>
  )
}
