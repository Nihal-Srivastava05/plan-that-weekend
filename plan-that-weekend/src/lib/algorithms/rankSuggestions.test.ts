import { describe, it, expect } from 'vitest';
import { rankSuggestions } from './rankSuggestions';
import { Suggestion } from '../../types/holiday';

describe('rankSuggestions', () => {
  it('should rank suggestions by benefit score', () => {
    const suggestions: Suggestion[] = [
      {
        id: '1',
        dates: ['2024-01-02'],
        resultingWeekend: { start: '2024-01-01', end: '2024-01-07', days: 7 },
        benefitScore: 7,
        daysOffRequired: 1,
        totalDaysGained: 7,
      },
      {
        id: '2',
        dates: ['2024-02-02', '2024-02-03'],
        resultingWeekend: { start: '2024-02-01', end: '2024-02-04', days: 4 },
        benefitScore: 2,
        daysOffRequired: 2,
        totalDaysGained: 4,
      },
    ];

    const result = rankSuggestions(suggestions);

    expect(result[0]?.rank).toBe(1);
    expect(result[1]?.rank).toBe(2);
    expect(result[0]?.benefitScore).toBeGreaterThanOrEqual(result[1]?.benefitScore || 0);
  });

  it('should handle equal benefit scores with secondary sorting', () => {
    const suggestions: Suggestion[] = [
      {
        id: '1',
        dates: ['2024-01-02', '2024-01-03'],
        resultingWeekend: { start: '2024-01-01', end: '2024-01-05', days: 5 },
        benefitScore: 2.5,
        daysOffRequired: 2,
        totalDaysGained: 5,
      },
      {
        id: '2',
        dates: ['2024-02-02'],
        resultingWeekend: { start: '2024-02-01', end: '2024-02-03', days: 5 },
        benefitScore: 2.5,
        daysOffRequired: 1,
        totalDaysGained: 5,
      },
    ];

    const result = rankSuggestions(suggestions);

    expect(result[0]?.daysOffRequired).toBeLessThanOrEqual(result[1]?.daysOffRequired || Infinity);
  });

  it('should return empty array for empty input', () => {
    const result = rankSuggestions([]);
    expect(result).toEqual([]);
  });

  it('should assign sequential ranks', () => {
    const suggestions: Suggestion[] = [
      {
        id: '1',
        dates: ['2024-01-02'],
        resultingWeekend: { start: '2024-01-01', end: '2024-01-07', days: 7 },
        benefitScore: 7,
        daysOffRequired: 1,
        totalDaysGained: 7,
      },
      {
        id: '2',
        dates: ['2024-02-02'],
        resultingWeekend: { start: '2024-02-01', end: '2024-02-05', days: 5 },
        benefitScore: 5,
        daysOffRequired: 1,
        totalDaysGained: 5,
      },
      {
        id: '3',
        dates: ['2024-03-02'],
        resultingWeekend: { start: '2024-03-01', end: '2024-03-04', days: 4 },
        benefitScore: 4,
        daysOffRequired: 1,
        totalDaysGained: 4,
      },
    ];

    const result = rankSuggestions(suggestions);

    expect(result[0]?.rank).toBe(1);
    expect(result[1]?.rank).toBe(2);
    expect(result[2]?.rank).toBe(3);
  });
});
