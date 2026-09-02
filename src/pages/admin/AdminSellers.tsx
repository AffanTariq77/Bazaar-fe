import { useAdminSellers } from '../../hooks/useAdmin'

export default function AdminSellers() {
  const { data, isLoading } = useAdminSellers()

  if (isLoading) return <p className="text-sm text-gray-400">Loading…</p>

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-100 text-xs uppercase text-gray-400">
          <tr>
            <th className="p-3">Store</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Products</th>
            <th className="p-3">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.items.map((seller) => (
            <tr key={seller.id}>
              <td className="p-3 font-medium text-gray-800">{seller.storeName}</td>
              <td className="p-3 text-gray-500">
                {seller.user.name} · {seller.user.email}
              </td>
              <td className="p-3">{seller._count.products}</td>
              <td className="p-3 text-gray-400">{new Date(seller.createdAt).toLocaleDateString('en-GB')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-gray-100 p-3 text-xs text-gray-400">{data?.total} total sellers</p>
    </div>
  )
}
