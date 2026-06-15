import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage, getDefaultStorage } from '../lib/storage/localStorage';
import { StorageData } from '../lib/validation/holidaySchema';
import { useToast } from './useToast';

interface HolidaysContextType {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  holidays: string[];
  addHoliday: (date: string, name?: string) => void;
  removeHoliday: (date: string) => void;
  importHolidays: (dates: string[]) => void;
  clearAllHolidays: () => void;
  maxGapDays: number;
  setMaxGapDays: (days: number) => void;
}

const HolidaysContext = createContext<HolidaysContextType | undefined>(undefined);

export function HolidaysProvider({ children }: { children: ReactNode }) {
  const [storage, setStorage] = useState<StorageData>(() => {
    const loaded = loadFromStorage();
    return loaded || getDefaultStorage();
  });
  const toast = useToast();

  const [selectedYear, setSelectedYear] = useState(storage.preferences.defaultYear);

  useEffect(() => {
    const updated = {
      ...storage,
      lastUpdated: new Date().toISOString(),
    };
    saveToStorage(updated);
  }, [storage]);

  const holidays = storage.holidays[selectedYear.toString()] || [];
  const holidayDates = holidays.map(h => h.date);

  const addHoliday = (date: string, name?: string) => {
    const yearKey = selectedYear.toString();
    const existing = storage.holidays[yearKey] || [];

    if (existing.some(h => h.date === date)) {
      toast.warning('This holiday already exists');
      return;
    }

    const newHoliday = {
      id: `holiday-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      date,
      name,
      isUserAdded: true,
    };

    setStorage(prev => ({
      ...prev,
      holidays: {
        ...prev.holidays,
        [yearKey]: [...existing, newHoliday].sort((a, b) => a.date.localeCompare(b.date)),
      },
    }));

    toast.success('Holiday added successfully');
  };

  const removeHoliday = (date: string) => {
    const yearKey = selectedYear.toString();
    const existing = storage.holidays[yearKey] || [];

    setStorage(prev => ({
      ...prev,
      holidays: {
        ...prev.holidays,
        [yearKey]: existing.filter(h => h.date !== date),
      },
    }));

    toast.success('Holiday removed');
  };

  const importHolidays = (dates: string[]) => {
    const yearKey = selectedYear.toString();
    const existing = storage.holidays[yearKey] || [];
    const existingDates = new Set(existing.map(h => h.date));

    const newHolidays = dates
      .filter(date => !existingDates.has(date))
      .map(date => ({
        id: `holiday-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        date,
        isUserAdded: true,
      }));

    if (newHolidays.length === 0) {
      toast.info('All holidays already exist');
      return;
    }

    setStorage(prev => ({
      ...prev,
      holidays: {
        ...prev.holidays,
        [yearKey]: [...existing, ...newHolidays].sort((a, b) => a.date.localeCompare(b.date)),
      },
    }));

    toast.success(`Imported ${newHolidays.length} new holidays`);
  };

  const clearAllHolidays = () => {
    const yearKey = selectedYear.toString();
    setStorage(prev => ({
      ...prev,
      holidays: {
        ...prev.holidays,
        [yearKey]: [],
      },
    }));
    toast.success('All holidays cleared');
  };

  const setMaxGapDays = (days: number) => {
    setStorage(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        maxGapDays: days,
      },
    }));
  };

  return (
    <HolidaysContext.Provider
      value={{
        selectedYear,
        setSelectedYear,
        holidays: holidayDates,
        addHoliday,
        removeHoliday,
        importHolidays,
        clearAllHolidays,
        maxGapDays: storage.preferences.maxGapDays,
        setMaxGapDays,
      }}
    >
      {children}
    </HolidaysContext.Provider>
  );
}

export function useHolidays() {
  const context = useContext(HolidaysContext);
  if (!context) {
    throw new Error('useHolidays must be used within HolidaysProvider');
  }
  return context;
}
