import { Schema } from "effect";

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/u;

/** Checks a source-authored date against the real ISO calendar. */
function isDateOnly(value: string) {
  if (!DATE_ONLY_PATTERN.test(value)) {
    return false;
  }

  const year = Number.parseInt(value.slice(0, 4), 10);
  const month = Number.parseInt(value.slice(5, 7), 10);
  const day = Number.parseInt(value.slice(8, 10), 10);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/** Exact source-authored calendar date shared by content projections. */
export const DateOnlySchema = Schema.String.pipe(Schema.filter(isDateOnly));
export type DateOnly = typeof DateOnlySchema.Type;
