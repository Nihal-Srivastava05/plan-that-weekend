import { useHolidays } from '../../hooks/useHolidays';

export function YearSelector() {
  const { selectedYear, setSelectedYear } = useHolidays();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear + i - 1);

  return (
    <div className="space-y-2">
      <label
        htmlFor="year-selector"
        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        Select Year
      </label>
      <select
        id="year-selector"
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md
                 bg-white dark:bg-neutral-700
                 text-neutral-900 dark:text-neutral-100
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                 cursor-pointer"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
