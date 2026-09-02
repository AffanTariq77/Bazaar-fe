import { useAdminUsers } from '../../hooks/useAdmin'

export default function AdminUsers() {
  const { data, isLoading } = useAdminUsers()

  if (isLoading) return <p className="text-sm text-gray-400">Loading…</p>

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-100 text-xs uppercase text-gray-400">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Role</th>
            <th className="p-3">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.items.map((user) => (
            <tr key={user.id}>
              <td className="p-3">{user.name}</td>
              <td className="p-3 text-gray-500">{user.email}</td>
              <td className="p-3 text-gray-500">{user.phone ?? '—'}</td>
              <td className="p-3">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  {user.role}
                </span>
              </td>
              <td className="p-3 text-gray-400">{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-gray-100 p-3 text-xs text-gray-400">{data?.total} total users</p>
    </div>
  )
}
