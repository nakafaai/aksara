import { Schema } from "effect";
import { DateOnlySchema, withPublicationDates } from "#contracts/date";

const LegacyDatesSchema = Schema.Struct({
  date: DateOnlySchema,
  dateModified: Schema.optionalKey(Schema.Never),
  datePublished: Schema.optionalKey(Schema.Never),
});

/**
 * Adds the exact legacy-or-current union required by signed projections.
 * Source decoders stay current-only so new publications cannot write `date`.
 */
export function withProjectionDates<const Fields extends Schema.Struct.Fields>(
  fields: Fields
) {
  const legacy = LegacyDatesSchema.mapFields(
    (dateFields) => ({ ...fields, ...dateFields }),
    { unsafePreserveChecks: true }
  );
  const current = withPublicationDates({
    ...fields,
    date: Schema.optionalKey(Schema.Never),
  });
  return Schema.Union([legacy, current]);
}
