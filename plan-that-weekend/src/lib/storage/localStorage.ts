import { StorageSchema, StorageData } from '../validation/holidaySchema';

const STORAGE_KEY = 'planThatWeekend';

export function loadFromStorage(): StorageData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return StorageSchema.parse(parsed);
  } catch (error) {
    console.error('Storage validation failed:', error);
    return null;
  }
}

export function saveToStorage(data: StorageData): void {
  try {
    const validated = StorageSchema.parse(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
  } catch (error) {
    console.error('Failed to save to storage:', error);
    throw error;
  }
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getDefaultStorage(): StorageData {
  const currentYear = new Date().getFullYear();
  return {
    version: 1,
    holidays: {},
    preferences: {
      defaultYear: currentYear,
      theme: 'light',
      maxGapDays: 3,
    },
    lastUpdated: new Date().toISOString(),
  };
}
