import { describe, it, expect } from 'vitest';
import { findLongWeekends } from './findLongWeekends';

describe('findLongWeekends', () => {
  it('should find long weekends with consecutive holidays', () => {
    const holidays = ['2024-12-23', '2024-12-24', '2024-12-25'];
    const result = findLongWeekends(holidays, 2024);

    expect(result.length).toBeGreaterThan(0);
    const christmasWeekend = result.find(lw => lw.start <= '2024-12-23' && lw.end >= '2024-12-25');
    expect(christmasWeekend).toBeDefined();
    expect(christmasWeekend?.days).toBeGreaterThanOrEqual(3);
  });

  it('should merge weekends with adjacent holidays', () => {
    const holidays = ['2024-01-05'];
    const result = findLongWeekends(holidays, 2024);

    const weekend = result.find(lw => lw.start <= '2024-01-05' && lw.end >= '2024-01-07');
    expect(weekend).toBeDefined();
    expect(weekend?.days).toBeGreaterThanOrEqual(3);
  });

  it('should handle empty holiday list', () => {
    const result = findLongWeekends([], 2024);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should only return weekends with 3+ days', () => {
    const holidays = ['2024-07-04'];
    const result = findLongWeekends(holidays, 2024);

    result.forEach(lw => {
      expect(lw.days).toBeGreaterThanOrEqual(3);
    });
  });

  it('should mark weekends that include holidays', () => {
    const holidays = ['2024-07-04'];
    const result = findLongWeekends(holidays, 2024);

    const julyWeekend = result.find(lw => lw.start <= '2024-07-04' && lw.end >= '2024-07-04');
    if (julyWeekend && julyWeekend.days >= 3) {
      expect(julyWeekend.includesHoliday).toBe(true);
    }
  });

  it('should return unique IDs for each long weekend', () => {
    const holidays = ['2024-01-01', '2024-07-04', '2024-12-25'];
    const result = findLongWeekends(holidays, 2024);

    const ids = result.map(lw => lw.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
