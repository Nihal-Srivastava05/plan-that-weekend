import { describe, it, expect } from 'vitest';
import { suggestHolidays } from './suggestHolidays';

describe('suggestHolidays', () => {
  it('should suggest holidays to fill gaps', () => {
    const holidays = ['2024-07-04'];
    const result = suggestHolidays(holidays, 2024, 3);

    expect(Array.isArray(result)).toBe(true);
  });

  it('should respect maxGapDays parameter', () => {
    const holidays = ['2024-01-08'];
    const result = suggestHolidays(holidays, 2024, 1);

    result.forEach(suggestion => {
      expect(suggestion.daysOffRequired).toBeLessThanOrEqual(1);
    });
  });

  it('should calculate benefit score correctly', () => {
    const holidays = ['2024-01-08'];
    const result = suggestHolidays(holidays, 2024, 3);

    result.forEach(suggestion => {
      expect(suggestion.benefitScore).toBeGreaterThan(0);
      expect(suggestion.totalDaysGained).toBeGreaterThan(0);
      expect(suggestion.daysOffRequired).toBeGreaterThan(0);
    });
  });

  it('should include required dates in suggestions', () => {
    const holidays = ['2024-01-08'];
    const result = suggestHolidays(holidays, 2024, 3);

    result.forEach(suggestion => {
      expect(suggestion.dates.length).toBeGreaterThan(0);
      suggestion.dates.forEach(date => {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });

  it('should handle empty holiday list', () => {
    const result = suggestHolidays([], 2024, 3);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return valid resulting weekend info', () => {
    const holidays = ['2024-01-08'];
    const result = suggestHolidays(holidays, 2024, 3);

    result.forEach(suggestion => {
      expect(suggestion.resultingWeekend.start).toBeDefined();
      expect(suggestion.resultingWeekend.end).toBeDefined();
      expect(suggestion.resultingWeekend.days).toBeGreaterThan(0);
    });
  });
});
