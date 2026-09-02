import { Bell } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMarkNotificationRead, useNotifications } from '../../hooks/useNotifications'

export function NotificationBell() {
  const { data: notifications } = useNotifications()
  const markRead = useMarkNotificationRead()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative flex flex-col items-center text-gray-600 hover:text-primary-600"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="max-h-96 overflow-y-auto">
            {(!notifications || notifications.length === 0) && (
              <p className="p-4 text-center text-sm text-gray-400">No notifications</p>
            )}
            {notifications?.map((n) => (
              <button
                type="button"
                key={n.id}
                onClick={() => {
                  if (!n.isRead) markRead.mutate(n.id)
                }}
                className={`block w-full border-b border-gray-100 p-3 text-left text-sm last:border-0 ${
                  n.isRead ? 'bg-white' : 'bg-primary-50'
                }`}
              >
                <p className="font-medium text-gray-800">{n.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{n.message}</p>
                <p className="mt-1 text-[10px] text-gray-400">{new Date(n.createdAt).toLocaleString('en-GB')}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
