import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useHolidays } from "../hooks/useHolidays";
import { findLongWeekends } from "../lib/algorithms/findLongWeekends";
import { suggestHolidays } from "../lib/algorithms/suggestHolidays";
import { rankSuggestions } from "../lib/algorithms/rankSuggestions";
import { CalendarLegend } from "../components/features/calendar/CalendarLegend";
import { SimpleCalendar } from "../components/features/calendar/SimpleCalendar";
import { SuggestionStats } from "../components/features/suggestions/SuggestionStats";
import { OnboardingModal } from "../components/shared/OnboardingModal";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function LongWeekends() {
  const { holidays, selectedYear, maxGapDays, addHoliday, importHolidays } = useHolidays();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const hasHolidays = holidays.length > 0;

    if (!hasSeenOnboarding && !hasHolidays) {
      setShowOnboarding(true);
    }
  }, [holidays.length]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleQuickStart = () => {
    const usHolidays2024 = [
      '2024-01-01', '2024-01-15', '2024-02-19', '2024-05-27',
      '2024-06-19', '2024-07-04', '2024-09-02', '2024-10-14',
      '2024-11-11', '2024-11-28', '2024-12-25'
    ];
    importHolidays(usHolidays2024);
  };

  const longWeekends = useMemo(
    () => findLongWeekends(holidays, selectedYear),
    [holidays, selectedYear]
  );

  const suggestions = useMemo(() => {
    const raw = suggestHolidays(holidays, selectedYear, maxGapDays);
    return rankSuggestions(raw);
  }, [holidays, selectedYear, maxGapDays]);

  // Get all dates for calendar highlighting
  const longWeekendDates = useMemo(() => {
    const dates: string[] = [];
    longWeekends.forEach(lw => {
      for (let i = 0; i < lw.days; i++) {
        const date = new Date(lw.start);
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0] || '');
      }
    });
    return dates.filter(Boolean);
  }, [longWeekends]);

  const suggestedDates = useMemo(() => {
    return suggestions.flatMap(s => s.dates);
  }, [suggestions]);

  const nextMonth = () => {
    setCurrentMonth((curr) => (curr === 12 ? 1 : curr + 1));
  };

  const prevMonth = () => {
    setCurrentMonth((curr) => (curr === 1 ? 12 : curr - 1));
  };

  const getPrevMonth = () => (currentMonth === 1 ? 12 : currentMonth - 1);
  const getNextMonth = () => (currentMonth === 12 ? 1 : currentMonth + 1);

  return (
    <>
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleCloseOnboarding}
        onLoadPreset={handleQuickStart}
      />

      <motion.div
        className="w-full p-4 lg:p-6 space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Long Weekends for {selectedYear}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {holidays.length === 0
              ? "Add holidays to see long weekends and suggestions"
              : `Found ${longWeekends.length} long weekends and ${suggestions.length} suggestions`}
          </p>
        </motion.div>

        {holidays.length > 0 && (
          <motion.div variants={itemVariants}>
            <SuggestionStats
              longWeekends={longWeekends}
              suggestionCount={suggestions.length}
              holidayCount={holidays.length}
            />
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="hidden md:block">
          <CalendarLegend />
        </motion.div>

      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={prevMonth} variant="secondary">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>
          <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 min-w-[150px] text-center">
            {new Date(selectedYear, currentMonth - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <Button onClick={nextMonth} variant="secondary">
            Next
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SimpleCalendar
            year={selectedYear}
            month={getPrevMonth()}
            holidays={holidays}
            longWeekendDates={longWeekendDates}
            suggestedDates={suggestedDates}
          />
          <SimpleCalendar
            year={selectedYear}
            month={currentMonth}
            holidays={holidays}
            longWeekendDates={longWeekendDates}
            suggestedDates={suggestedDates}
          />
          <SimpleCalendar
            year={selectedYear}
            month={getNextMonth()}
            holidays={holidays}
            longWeekendDates={longWeekendDates}
            suggestedDates={suggestedDates}
          />
        </div>
      </motion.div>

      {suggestions.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Suggested Holidays
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Take these days off to maximize your vacation time
          </p>
          <div className="space-y-3">
            {suggestions.slice(0, 5).map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="warning">Rank #{suggestion.rank}</Badge>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {suggestion.daysOffRequired} day{suggestion.daysOffRequired > 1 ? 's' : ''} off
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                    Take off: <strong>{suggestion.dates.join(', ')}</strong>
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Creates a {suggestion.totalDaysGained}-day weekend from{' '}
                    {suggestion.resultingWeekend.start} to {suggestion.resultingWeekend.end}
                  </p>
                  <p className="text-xs text-success-600 dark:text-success-400 mt-1">
                    Benefit Score: {suggestion.benefitScore.toFixed(1)}x
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => suggestion.dates.forEach(date => addHoliday(date, 'Suggested Holiday'))}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </Card>
        </motion.div>
      )}

      {longWeekends.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Your Long Weekends
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {longWeekends.map((weekend) => (
              <div
                key={weekend.id}
                className="p-3 rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/20"
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="success">{weekend.days} Days</Badge>
                  {weekend.includesHoliday && (
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {weekend.start} to {weekend.end}
                </p>
              </div>
            ))}
          </div>
        </Card>
        </motion.div>
      )}
      </motion.div>
    </>
  );
}
