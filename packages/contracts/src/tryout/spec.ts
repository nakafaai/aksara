import { Schema } from "effect";

const TRYOUT_CONTENT_HASH_PATTERN = /^[a-f\d]{64}$/u;

/**
 * Scoring strategy declared by one authored exam and repeated on its sets.
 * Every strategy reads a question's worth through `questionPoints`. `raw` sums
 * the worth of correct answers and the points of reached rubric levels.
 * `penalized` adds, for each question, its section's marks for a correct,
 * wrong, or blank answer times the question's worth. `irt` estimates ability
 * from correct and wrong outcomes. Rubric questions belong only to raw exams.
 */
export const TryoutScoringSchema = Schema.Literals(["irt", "penalized", "raw"]);
export type TryoutScoring = typeof TryoutScoringSchema.Type;

/**
 * Whole marks one section of a penalized exam awards per point of a question
 * for a correct, wrong, or blank answer, such as `+4`, `-1`, and `0`. A wrong
 * answer costs marks, a blank never scores below a wrong answer, and a correct
 * answer always scores above a blank.
 */
export const TryoutMarksSchema = Schema.Struct({
  blank: Schema.Int,
  correct: Schema.Int.check(Schema.isGreaterThan(0)),
  wrong: Schema.Int.check(Schema.isLessThan(0)),
}).check(
  Schema.makeFilter(
    ({ blank, correct, wrong }) => wrong <= blank && blank < correct,
    {
      message:
        "Expected wrong marks at or below blank marks, and blank marks below correct marks.",
    }
  )
);
export type TryoutMarks = typeof TryoutMarksSchema.Type;

/** Returns section marks in stable field order for signed canonicalizers. */
export function canonicalTryoutMarks(marks: TryoutMarks) {
  return { blank: marks.blank, correct: marks.correct, wrong: marks.wrong };
}

/**
 * Navigation role of one authored track: one exam `year`, one `subject`, or
 * the sets of one `institution`, such as a Studienkolleg.
 */
export const TryoutTrackKindSchema = Schema.Literals([
  "institution",
  "subject",
  "year",
]);

/** Public route behavior of one authored section. */
export const TryoutVisibilitySchema = Schema.Literals([
  "internal-entry",
  "visible",
]);

/** Bounded authored revision shared by one try-out source hierarchy. */
export const TryoutSourceRevisionSchema = Schema.Trimmed.check(
  Schema.isNonEmpty()
).pipe(Schema.check(Schema.isMaxLength(128)));

/** Durable complete-question identity retained by every frozen placement. */
export const TryoutContentHashSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(TRYOUT_CONTENT_HASH_PATTERN)),
  Schema.brand("@NakafaAI/AksaraTryoutContentHash")
);
export type TryoutContentHash = typeof TryoutContentHashSchema.Type;
