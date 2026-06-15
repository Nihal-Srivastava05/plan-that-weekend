export function CalendarLegend() {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4 p-3 md:p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-success-200 dark:bg-success-900/30 border border-success-500 flex-shrink-0"></div>
        <span className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300">Long Weekend</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-primary-200 dark:bg-primary-900/30 border border-primary-500 flex-shrink-0"></div>
        <span className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300">Your Holiday</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-warning-200 dark:bg-warning-900/30 border border-warning-500 flex-shrink-0"></div>
        <span className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300">Suggested</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 flex-shrink-0"></div>
        <span className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300">Weekend</span>
      </div>
    </div>
  );
}
