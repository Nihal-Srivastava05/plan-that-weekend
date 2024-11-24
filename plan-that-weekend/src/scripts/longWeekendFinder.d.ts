declare module "longWeekendFinder" {
  export function findLongWeekends(
    dates: string[]
  ): { start: string; end: string }[];
}
