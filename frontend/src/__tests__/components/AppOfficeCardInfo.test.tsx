import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AppOfficeCardInfo from '../../components/AppOfficeCardInfo'
import '@testing-library/jest-dom'

describe('AppOfficeCardInfo', () => {
  const defaultProps = {
    name: 'Test App',
    waiting: [1, 2, 3],
    time: '10:00',
    onToggleStatus: vi.fn()
  }

  test('renders all provided information', () => {
    render(<AppOfficeCardInfo {...defaultProps} />)
    
    expect(screen.getByText('Test App')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument() // totalWaiting
    expect(screen.getByText('10:00')).toBeInTheDocument()
  })

  test('calculates total waiting correctly', () => {
    const props = { ...defaultProps, waiting: [5, 10, 15] }
    render(<AppOfficeCardInfo {...props} />)
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  test('applies correct classes when disabled', () => {
    const { container } = render(<AppOfficeCardInfo {...defaultProps} isDisabled={true} />)
    const mainDiv = container.firstChild as HTMLElement
    
    expect(mainDiv).toHaveClass('online')
    expect(mainDiv).toHaveClass('bg-[#2d4f83]')
  })

  test('applies correct classes when enabled', () => {
    const { container } = render(<AppOfficeCardInfo {...defaultProps} isDisabled={false} />)
    const mainDiv = container.firstChild as HTMLElement
    
    expect(mainDiv).toHaveClass('offline')
    expect(mainDiv).toHaveClass('bg-gray-300')
  })

  test('calls onToggleStatus when clicked', () => {
    render(<AppOfficeCardInfo {...defaultProps} />)
    const card = screen.getByText('Test App').closest('.card')
    fireEvent.click(card!)
    
    expect(defaultProps.onToggleStatus).toHaveBeenCalledTimes(1)
  })

  test('renders with empty waiting array', () => {
    const props = { ...defaultProps, waiting: [] }
    render(<AppOfficeCardInfo {...props} />)
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})