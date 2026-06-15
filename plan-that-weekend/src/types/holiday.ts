export type DateString = string;

export interface Holiday {
  id: string;
  date: DateString;
  name?: string;
  country?: string;
  isUserAdded: boolean;
}

export interface LongWeekend {
  id: string;
  start: DateString;
  end: DateString;
  days: number;
  includesHoliday: boolean;
}

export interface Suggestion {
  id: string;
  dates: DateString[];
  resultingWeekend: {
    start: DateString;
    end: DateString;
    days: number;
  };
  benefitScore: number;
  daysOffRequired: number;
  totalDaysGained: number;
}

export interface RankedSuggestion extends Suggestion {
  rank: number;
}
