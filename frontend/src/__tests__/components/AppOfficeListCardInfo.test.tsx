import { render, screen } from '@testing-library/react'
import { describe, test, vi, expect } from 'vitest'
import AppOfficeListCardInfo from '../../components/AppOfficeListCardInfo'

vi.mock('../../hooks/useOfficeList', () => ({
  default: () => ({
    offices: [],
    sortedLocations: [],
    toggleOnlineStatus: vi.fn(),
    setOfficeList: vi.fn(),
    setSearchTerm: vi.fn(),
  }),
}))

describe('AppOfficeListCardInfo', () => {
  test('renders without crashing', () => {
    render(<AppOfficeListCardInfo />)
  })

  test('renders search input', () => {
    render(<AppOfficeListCardInfo />)
    expect(screen.getByPlaceholderText('Buscar sucursal'));
  })

  test('renders AppCardInfo components when there are sorted locations', () => {
    // Mock the useOfficeList hook with sorted locations
    vi.mock('../../hooks/useOfficeList', () => ({
      default: () => ({
        offices: [],
        sortedLocations: [
          {
            id: 1,
            name: 'Location 1',
            lines: [{ waiting: 5 }],
            online: true,
          },
        ],
        toggleOnlineStatus: vi.fn(),
        setOfficeList: vi.fn(),
        setSearchTerm: vi.fn(),
      }),
    }))

    render(<AppOfficeListCardInfo />)
    expect(screen.getByText('Location 1'))
  })
})