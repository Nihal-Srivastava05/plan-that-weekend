declare module "longWeekendSuggester" {
  export function findLongWeekendSuggester(
    dates: string[]
  ): { start: string; end: string }[];
}
