import { Suggestion, RankedSuggestion } from "../../types/holiday";

export function rankSuggestions(suggestions: Suggestion[]): RankedSuggestion[] {
  const ranked = [...suggestions].sort((a, b) => {
    if (b.benefitScore !== a.benefitScore) {
      return b.benefitScore - a.benefitScore;
    }

    if (a.daysOffRequired !== b.daysOffRequired) {
      return a.daysOffRequired - b.daysOffRequired;
    }

    return b.totalDaysGained - a.totalDaysGained;
  });

  return ranked.map((suggestion, index) => ({
    ...suggestion,
    rank: index + 1,
  }));
}
