import { describe, expect, it } from 'vitest'
import { loginSchema, registerSchema } from './auth.schema'

describe('loginSchema', () => {
  it('accepts a valid email and password', () => {
    expect(loginSchema.safeParse({ email: 'user@example.com', password: 'secret' }).success).toBe(true)
  })

  it('rejects an invalid email', () => {
    expect(loginSchema.safeParse({ email: 'not-an-email', password: 'secret' }).success).toBe(false)
  })
})

describe('registerSchema', () => {
  const base = {
    name: 'Ali Khan',
    email: 'ali@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  }

  it('accepts matching passwords', () => {
    expect(registerSchema.safeParse(base).success).toBe(true)
  })

  it('rejects mismatched passwords, flagging the confirmPassword field', () => {
    const result = registerSchema.safeParse({ ...base, confirmPassword: 'different' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('confirmPassword')
    }
  })

  it('rejects a phone number not in +92 format', () => {
    expect(registerSchema.safeParse({ ...base, phone: '03001234567' }).success).toBe(false)
  })

  it('accepts a valid +92 phone number', () => {
    expect(registerSchema.safeParse({ ...base, phone: '+923001234567' }).success).toBe(true)
  })

  it('accepts an omitted phone number since it is optional', () => {
    expect(registerSchema.safeParse(base).success).toBe(true)
  })
})
