import { describe, expect, it } from 'vitest'
import { salePrice } from './product'

describe('salePrice', () => {
  it('returns the full price when there is no discount', () => {
    expect(salePrice({ price: '1000', discount: 0 })).toBe(1000)
  })

  it('applies a percentage discount', () => {
    expect(salePrice({ price: '2000', discount: 25 })).toBe(1500)
  })

  it('rounds to the nearest whole rupee', () => {
    expect(salePrice({ price: '999', discount: 10 })).toBe(899)
  })

  it('handles a 100% discount as free', () => {
    expect(salePrice({ price: '500', discount: 100 })).toBe(0)
  })
})
