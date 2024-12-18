import { describe, it, expect } from 'vitest';
import { formatTime, calculateAverageElapsed } from '../../helpers/index';

describe('formatTime', () => {
  it('should format time correctly', () => {
    expect(formatTime(0)).toBe('0:00:00');
    expect(formatTime(1)).toBe('0:01:00');
    expect(formatTime(61)).toBe('1:01:00');
    expect(formatTime(123)).toBe('2:03:00');
  });
});

describe('calculateAverageElapsed', () => {
  it('should calculate average elapsed time correctly', () => {
    const lines = [
      { elapsed: 10 },
      { elapsed: 20 },
      { elapsed: 30 },
    ];
    expect(calculateAverageElapsed(lines)).toBe(20);
  });

  it('should handle empty array', () => {
    const lines: Array<{ elapsed: number }> = [];
    expect(calculateAverageElapsed(lines)).toBeNaN();
  });
});