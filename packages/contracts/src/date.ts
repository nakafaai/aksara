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
export const DateOnlySchema = Schema.String.pipe(
  Schema.check(Schema.makeFilter(isDateOnly))
);
export type DateOnly = typeof DateOnlySchema.Type;

const PUBLICATION_DATE_ORDER_MESSAGE =
  "Expected dateModified to be later than datePublished.";

const PublicationDateFields = {
  dateModified: Schema.optionalKey(DateOnlySchema),
  datePublished: DateOnlySchema,
};

const PublicationDatesStruct = Schema.Struct(PublicationDateFields).annotate({
  parseOptions: { onExcessProperty: "error" },
});

/**
 * Public article and material dates backed by signed activation history.
 * Publication is locale-specific; modification records only a later meaningful
 * content activation and is never synthesized from a runtime clock.
 */
export const PublicationDatesSchema = PublicationDatesStruct.pipe(
  Schema.check(
    Schema.makeFilter(
      (input) =>
        input.dateModified === undefined ||
        input.dateModified > input.datePublished,
      { message: PUBLICATION_DATE_ORDER_MESSAGE }
    )
  ),
  Schema.annotate({ parseOptions: { onExcessProperty: "error" } })
);
export type PublicationDates = typeof PublicationDatesSchema.Type;

/**
 * Adds exact publication dates and their chronological invariant to metadata.
 *
 * The date fields and their check remain one contract so callers cannot copy
 * the shape without also enforcing the public ordering rule.
 */
export function withPublicationDates<const Fields extends Schema.Struct.Fields>(
  fields: Fields
) {
  return PublicationDatesSchema.mapFields(
    (dateFields) => ({ ...fields, ...dateFields }),
    // Adding fields cannot invalidate the date check because the owning date
    // fields are preserved unchanged and always win key collisions.
    { unsafePreserveChecks: true }
  ).annotate({ parseOptions: { onExcessProperty: "error" } });
}
