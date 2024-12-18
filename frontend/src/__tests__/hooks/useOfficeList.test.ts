import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, expect, describe, it, beforeEach,  } from 'vitest';
import useOfficeList from '../../hooks/useOfficeList';
import { fetchOffices } from '../../services/index';

vi.mock('../../services/index', () => ({
  fetchOffices: vi.fn(),
}));

describe('useOfficeList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useOfficeList());
    expect(result.current.offices).toEqual([]);
    expect(result.current.oficcesList).toEqual([]);
    expect(result.current.sortedLocations).toEqual([]);
  });

  it('should toggle online status of an office', () => {
    const { result } = renderHook(() => useOfficeList());
    const office = { id: 1, name: 'Office 1', online: false, lines: [{ waiting: 0, elapsed: 0 }] };
    
    act(() => {
      result.current.setOffices([office]);
    });

    act(() => {
      result.current.toggleOnlineStatus(1);
    });

    expect(result.current.offices[0].online).toBe(true);
  });

  it('should filter offices based on search term', () => {
    const { result } = renderHook(() => useOfficeList());
    const office1 = { id: 1, name: 'Office 1', online: false, lines: [{ waiting: 0, elapsed: 0 }] };
    const office2 = { id: 2, name: 'Office 2', online: true, lines: [{ waiting: 0, elapsed: 0 }] };

    act(() => {
      result.current.setOffices([office1, office2]);
      result.current.setSearchTerm('1');
    });

    expect(result.current.sortedLocations).toEqual([office1]);
  });

  it('should set office list', () => {
    const { result } = renderHook(() => useOfficeList());
    const office = { id: 1, name: 'Office 1', online: false, lines: [{ waiting: 0, elapsed: 0 }] };

    act(() => {
      result.current.setOfficeList([office]);
    });

    expect(result.current.oficcesList).toEqual([office]);
  });

  it('should fetch offices on mount and set interval', async () => {
    const offices = [{ id: 1, name: 'Office 1', online: false }];
    (fetchOffices as ReturnType<typeof vi.fn>).mockResolvedValue({ succes: true, data: offices });

    const { result } = renderHook(() => useOfficeList());

    await waitFor(() => {
      expect(result.current.offices).toEqual(offices);
    });

    expect(fetchOffices).toHaveBeenCalledTimes(1);
    expect(result.current.offices).toEqual(offices);

  });
});