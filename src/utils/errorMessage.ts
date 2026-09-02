import axios from 'axios'

export function errorMessage(err: unknown, fallback: string) {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.message
    if (typeof message === 'string') return message
  }
  return fallback
}
