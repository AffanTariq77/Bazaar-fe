import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormField } from './FormField'

describe('FormField', () => {
  it('associates the label with the input so it is reachable by accessible name', () => {
    render(<FormField label="Email" name="email" placeholder="you@example.com" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('placeholder', 'you@example.com')
  })

  it('shows an error message when one is provided', () => {
    render(<FormField label="Email" name="email" error={{ message: 'Enter a valid email' }} />)
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
  })

  it('renders no error text when there is no error', () => {
    render(<FormField label="Email" name="email" />)
    expect(screen.queryByText(/./, { selector: 'p' })).not.toBeInTheDocument()
  })

  it('accepts typed input', () => {
    render(<FormField label="Name" name="name" />)
    const input = screen.getByLabelText('Name')
    fireEvent.change(input, { target: { value: 'Ali' } })
    expect(input).toHaveValue('Ali')
  })
})
