import { Schema } from "effect";

/** Nonnegative release inventory count authenticated by one manifest. */
export const ReleaseCountSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);
