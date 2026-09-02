import { describe, expect, it } from 'vitest'
import { errorMessage } from './errorMessage'

function fakeAxiosError(message: unknown) {
  return { isAxiosError: true, response: { data: { message } } }
}

describe('errorMessage', () => {
  it('extracts the backend message from an axios error response', () => {
    expect(errorMessage(fakeAxiosError('Invalid credentials'), 'fallback')).toBe('Invalid credentials')
  })

  it('falls back when the axios error has no message', () => {
    expect(errorMessage(fakeAxiosError(undefined), 'fallback')).toBe('fallback')
  })

  it('falls back for a non-axios error', () => {
    expect(errorMessage(new Error('boom'), 'fallback')).toBe('fallback')
  })

  it('falls back for a completely unexpected value', () => {
    expect(errorMessage(null, 'fallback')).toBe('fallback')
  })
})
