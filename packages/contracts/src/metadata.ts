import { Schema } from "effect";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isRealIsoDate(value: string) {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }
  const [yearText, monthText, dayText] = value.split("-");
  const year = Number.parseInt(yearText ?? "", 10);
  const month = Number.parseInt(monthText ?? "", 10);
  const day = Number.parseInt(dayText ?? "", 10);
  if (year < 1) {
    return false;
  }
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/** A real calendar date authored in canonical `YYYY-MM-DD` form. */
export const AuthoredContentDateSchema = Schema.String.pipe(
  Schema.filter(isRealIsoDate, {
    message: () => "Expected a real calendar date in YYYY-MM-DD form.",
  }),
  Schema.brand("@NakafaAI/AksaraAuthoredContentDate")
);
export type AuthoredContentDate = typeof AuthoredContentDateSchema.Type;

/** One named author credited by an authored MDX document. */
export const AuthoredContentAuthorSchema = Schema.Struct({
  name: Schema.NonEmptyTrimmedString,
});
export type AuthoredContentAuthor = typeof AuthoredContentAuthorSchema.Type;

/** Exact metadata accepted from one trusted source-controlled MDX document. */
export const AuthoredContentMetadataSchema = Schema.Struct({
  authors: Schema.Array(AuthoredContentAuthorSchema).pipe(Schema.minItems(1)),
  date: AuthoredContentDateSchema,
  description: Schema.optional(Schema.NonEmptyTrimmedString),
  subject: Schema.optional(Schema.NonEmptyTrimmedString),
  title: Schema.NonEmptyTrimmedString,
});
export type AuthoredContentMetadata = typeof AuthoredContentMetadataSchema.Type;
