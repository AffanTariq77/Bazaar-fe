export type NotificationType = 'ORDER_STATUS' | 'PROMOTION' | 'SYSTEM'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: string
}
