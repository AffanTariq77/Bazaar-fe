import { useNavigate, useParams } from 'react-router-dom'
import { SellerProductForm } from '../../components/seller/SellerProductForm'
import { useSellerProduct, useUpdateSellerProduct } from '../../hooks/useSeller'

export default function SellerProductEdit() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading } = useSellerProduct(id)
  const updateProduct = useUpdateSellerProduct(id)

  if (isLoading || !product) {
    return <p className="text-sm text-gray-400">Loading…</p>
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Edit Product</h2>
      <SellerProductForm
        initialValues={product}
        isPending={updateProduct.isPending}
        onSubmit={(values) =>
          updateProduct.mutate(
            { ...values, images: values.imageUrl ? [values.imageUrl] : undefined },
            { onSuccess: () => navigate('/seller/products') },
          )
        }
      />
    </div>
  )
}
