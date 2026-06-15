import { useState } from 'react';
import { Button } from '../../ui/Button';
import { useHolidays } from '../../../hooks/useHolidays';
import { COUNTRIES, CountryCode } from '../../../lib/data/countryHolidays';
import { useToast } from '../../../hooks/useToast';

export function CountryPresets() {
  const { selectedYear, importHolidays } = useHolidays();
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('US');
  const toast = useToast();

  const loadCountryHolidays = () => {
    const country = COUNTRIES[selectedCountry];
    const yearHolidays = country.holidays[selectedYear as keyof typeof country.holidays];

    if (!yearHolidays) {
      toast.error(`No holiday data available for ${selectedYear}`);
      return;
    }

    const dates = yearHolidays.map(h => h.date);
    importHolidays(dates);
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor="country-selector"
        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        Country
      </label>
      <select
        id="country-selector"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value as CountryCode)}
        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md
                 bg-white dark:bg-neutral-700
                 text-neutral-900 dark:text-neutral-100
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        {(Object.keys(COUNTRIES) as CountryCode[]).map((code) => (
          <option key={code} value={code}>
            {COUNTRIES[code].name}
          </option>
        ))}
      </select>
      <Button onClick={loadCountryHolidays} size="sm" fullWidth>
        Load {COUNTRIES[selectedCountry].name} Holidays
      </Button>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        This will add holidays for {selectedYear}
      </p>
    </div>
  );
}
