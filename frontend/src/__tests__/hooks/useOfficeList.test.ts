import { renderHook, act, waitFor } from '@testing-library/react';
import useOfficeList from '../../hooks/useOfficeList';
import { getOffices } from '../../services/index';
import { Offices } from '../../types';
import { describe, beforeEach, it, expect, vi, Mock } from 'vitest';
import io from 'socket.io-client';

// Mock the getOffices function
vi.mock('../../services/index', () => ({
  getOffices: vi.fn(),
}));

// Mock socket.io-client
vi.mock('socket.io-client', () => {
  const mSocket = {
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  };
  return {
    __esModule: true,
    default: () => mSocket,
  };
});

describe('useOfficeList', () => {
  const mockOffices: Offices[] = [
    { id: 1, name: 'Office 1', online: true, lines: [] },
    { id: 2, name: 'Office 2', online: false, lines: [] },
  ];

  beforeEach(() => {
    (getOffices as Mock).mockResolvedValue({ succes: true, data: mockOffices });
  });

  it('should fetch and set offices on mount', async () => {
    const { result } = renderHook(() => useOfficeList());

    await waitFor(() => {
      expect(result.current.offices).toEqual(mockOffices);
    });

    expect(result.current.offices).toEqual(mockOffices);
  });

  it('should filter offices based on search term', async () => {
    const { result } = renderHook(() => useOfficeList());

    await waitFor(() => {
      expect(result.current.offices).toEqual(mockOffices);
    });

    act(() => {
      result.current.setSearchTerm('Office 1');
    });

    expect(result.current.sortedLocations).toEqual([mockOffices[0]]);
  });

  it('should toggle online status of an office', async () => {
    const { result } = renderHook(() => useOfficeList());

    await waitFor(() => {
      expect(result.current.offices).toEqual(mockOffices);
    });

    act(() => {
      result.current.toggleOnlineStatus(1);
    });

    expect(result.current.offices[0].online).toBe(false);
  });

  it('should handle WebSocket updates', async () => {
    const { result } = renderHook(() => useOfficeList());
    const socket = io() as ReturnType<typeof io>;

    await waitFor(() => {
      expect(result.current.offices).toEqual(mockOffices);
    });

    act(() => {
      (socket.on as Mock).mock.calls[1][1](mockOffices);
    });

    expect(result.current.offices).toEqual(mockOffices);
  });
});