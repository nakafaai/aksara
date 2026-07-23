import { Schema } from "effect";

/** Navigation levels used by the imported curriculum trees. */
export const ProgramNavigationLevelSchema = Schema.Literal(
  "class",
  "course",
  "lesson",
  "stage",
  "subject",
  "unit"
);
export type ProgramNavigationLevel = typeof ProgramNavigationLevelSchema.Type;

/** Navigation icons referenced by the imported curriculum trees. */
export const ProgramNavigationIconKeySchema = Schema.Literal(
  "advanced",
  "early-years",
  "grade-1",
  "grade-2",
  "grade-3",
  "grade-4",
  "grade-5",
  "grade-6",
  "grade-7",
  "grade-8",
  "grade-9",
  "grade-10",
  "grade-11",
  "grade-12",
  "high-school",
  "mathematics",
  "middle-school",
  "primary-school",
  "school",
  "science"
);
