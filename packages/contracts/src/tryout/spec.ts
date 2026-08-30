import { Schema } from "effect";

const TRYOUT_CONTENT_HASH_PATTERN = /^[a-f\d]{64}$/u;

/** Scoring model selected by one authored exam. */
export const TryoutScoringSchema = Schema.Literals(["irt", "raw"]);
export type TryoutScoring = typeof TryoutScoringSchema.Type;

/** Navigation role of one authored track. */
export const TryoutTrackKindSchema = Schema.Literals(["subject", "year"]);

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
