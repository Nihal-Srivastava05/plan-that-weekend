import { motion } from 'framer-motion';
import { Card } from '../../ui/Card';
import { LongWeekend } from '../../../types/holiday';

interface SuggestionStatsProps {
  longWeekends: LongWeekend[];
  suggestionCount: number;
  holidayCount: number;
}

export function SuggestionStats({ longWeekends, suggestionCount }: SuggestionStatsProps) {
  const longestWeekend = longWeekends.reduce((max, lw) => lw.days > max ? lw.days : max, 0);
  const totalLongWeekendDays = longWeekends.reduce((sum, lw) => sum + lw.days, 0);

  const stats = [
    {
      label: 'Long Weekends',
      value: longWeekends.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-success-600 dark:text-success-400',
      bgColor: 'bg-success-100 dark:bg-success-900/30',
    },
    {
      label: 'Longest Streak',
      value: `${longestWeekend} days`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'text-primary-600 dark:text-primary-400',
      bgColor: 'bg-primary-100 dark:bg-primary-900/30',
    },
    {
      label: 'Suggestions',
      value: suggestionCount,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'text-warning-600 dark:text-warning-400',
      bgColor: 'bg-warning-100 dark:bg-warning-900/30',
    },
    {
      label: 'Total Days Off',
      value: totalLongWeekendDays,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      color: 'text-neutral-600 dark:text-neutral-400',
      bgColor: 'bg-neutral-100 dark:bg-neutral-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card padding="sm" className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
