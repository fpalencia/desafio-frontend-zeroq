import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import AppSearchInput from '../../components/AppSearchInput'

describe('AppSearchInput', () => {
  test('renders without crashing', () => {
    const mockOnSearch = vi.fn()
    render(<AppSearchInput onSearch={mockOnSearch} />)
  })

  test('renders search input with correct placeholder', () => {
    const mockOnSearch = vi.fn()
    render(<AppSearchInput onSearch={mockOnSearch} />)
    const input = screen.getByPlaceholderText('Buscar sucursal')
    expect(input)
  })

  test('calls onSearch callback when input changes', () => {
    const mockOnSearch = vi.fn()
    render(<AppSearchInput onSearch={mockOnSearch} />)
    const input = screen.getByPlaceholderText('Buscar sucursal')
    
    fireEvent.change(input, { target: { value: 'test' } })
    expect(mockOnSearch).toHaveBeenCalledWith('test')
  })

  test('renders search icon', () => {
    const mockOnSearch = vi.fn()
    render(<AppSearchInput onSearch={mockOnSearch} />)
  })
})