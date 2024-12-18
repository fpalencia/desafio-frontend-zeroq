import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AppHeader from '../../components/AppHeader'
import '@testing-library/jest-dom'

describe('AppHeader', () => {
  test('renders without crashing', () => {
    render(<AppHeader />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  test('header has correct classes', () => {
    render(<AppHeader />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('text-white h-20 flex items-center')
  })

  test('img has correct src and alt attributes', () => {
    render(<AppHeader />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/logo.png')
    expect(img).toHaveAttribute('alt', 'logo')
  })
})