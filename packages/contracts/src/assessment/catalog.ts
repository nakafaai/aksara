import { Array as Arr, Schema } from "effect";

import { KebabKeySchema, PaperIdSchema } from "#contracts/assessment/identity";
import { CountryCodeSchema } from "#contracts/country";
import { LearningGraphIdentitySchema } from "#contracts/graph/spec";
import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import { AppLocaleSchema } from "#contracts/locale";

const PositiveCountSchema = Schema.Int.check(Schema.isGreaterThan(0));

/** Bounded authored revision shared by one catalog source hierarchy. */
export const CatalogRevisionSchema = Schema.Trimmed.check(
  Schema.isNonEmpty(),
  Schema.isMaxLength(128)
);

/**
 * The one axis by which an exam divides its tracks into groups: the `year` of
 * a sitting (SNBT), the school `grade` a test is set for (TKA), or the
 * `institution` that sets it, such as a Studienkolleg.
 */
export const GroupAxisSchema = Schema.Literals([
  "grade",
  "institution",
  "year",
]);

/**
 * Public route behavior of one section: `visible` sections have a page of
 * their own, and an `internal-entry` section is entered from its set.
 */
export const SectionVisibilitySchema = Schema.Literals([
  "internal-entry",
  "visible",
]);

/** What every row of the catalog says in one app locale. */
const LocalizedFields = {
  appLocale: AppLocaleSchema,
  description: Schema.optionalKey(Schema.String),
  graph: LearningGraphIdentitySchema,
  sourceRevision: CatalogRevisionSchema,
  title: Schema.String,
};

const CountryFields = { countryKey: KebabKeySchema };
const ExamFields = { ...CountryFields, examKey: KebabKeySchema };
const GroupFields = { ...ExamFields, groupKey: KebabKeySchema };
const TrackFields = { ...ExamFields, trackKey: KebabKeySchema };
const SetFields = { ...TrackFields, setKey: KebabKeySchema };

/** One localized country of the catalog. */
export const CatalogCountrySchema = Schema.Struct({
  ...LocalizedFields,
  ...CountryFields,
  countryCode: CountryCodeSchema,
  kind: Schema.Literal("country"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
});

/** One localized exam of a country, and the axis that divides its tracks into groups. */
export const CatalogExamSchema = Schema.Struct({
  ...LocalizedFields,
  ...ExamFields,
  groupAxis: GroupAxisSchema,
  kind: Schema.Literal("exam"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
});

/** One localized group of an exam on its axis: a year, a grade, or an institution. */
export const CatalogGroupSchema = Schema.Struct({
  ...LocalizedFields,
  ...GroupFields,
  kind: Schema.Literal("group"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
});

/**
 * One localized track of an exam, in the group that holds it: one paper
 * format with its sets, such as a subject or a year's test. A track key is
 * unique within its exam, so the rows of a track and of its sets name the
 * track without its group.
 */
export const CatalogTrackSchema = Schema.Struct({
  ...LocalizedFields,
  ...TrackFields,
  groupKey: KebabKeySchema,
  kind: Schema.Literal("track"),
  order: PositiveCountSchema,
  publicPath: PublicPathSchema,
});

/**
 * One localized set of a track, and the paper a learner sits for it, by
 * identifier and hash. A set whose only section is entered from the set names
 * that section.
 */
export const CatalogSetSchema = Schema.Struct({
  ...LocalizedFields,
  ...SetFields,
  internalEntrySectionKey: Schema.optionalKey(KebabKeySchema),
  kind: Schema.Literal("set"),
  order: PositiveCountSchema,
  paper: Schema.Struct({ hash: Sha256HashSchema, id: PaperIdSchema }),
  publicPath: PublicPathSchema,
});

/**
 * One localized section of a set. Its key is the identifier of a section of
 * the exam profile that the set's paper follows, so the profile owns its time,
 * its items, and its scoring, and the paper owns its places.
 */
export const CatalogSectionSchema = Schema.Struct({
  ...LocalizedFields,
  ...SetFields,
  kind: Schema.Literal("section"),
  order: PositiveCountSchema,
  publicPath: Schema.optionalKey(PublicPathSchema),
  sectionKey: KebabKeySchema,
  visibility: SectionVisibilitySchema,
}).check(
  Schema.makeFilter(
    ({ publicPath, visibility }) =>
      (visibility === "visible") === (publicPath !== undefined),
    { message: "Expected a public path on a visible section only." }
  )
);

/** One row of the catalog, the navigation of the public try-outs. */
export const CatalogRowSchema = Schema.Union([
  CatalogCountrySchema,
  CatalogExamSchema,
  CatalogGroupSchema,
  CatalogTrackSchema,
  CatalogSetSchema,
  CatalogSectionSchema,
]);
export type CatalogRow = typeof CatalogRowSchema.Type;

/**
 * The identity of one catalog row, unique within a snapshot: its locale, its
 * kind, and the keys of its node and of every node above it. A group names
 * its own key; a track is unique within its exam, so a track and the rows
 * under it leave their group out.
 */
export function catalogRowIdentity(row: CatalogRow) {
  return Arr.join(
    [
      row.appLocale,
      row.kind,
      row.countryKey,
      "examKey" in row ? row.examKey : "",
      row.kind === "group" ? row.groupKey : "",
      "trackKey" in row ? row.trackKey : "",
      "setKey" in row ? row.setKey : "",
      "sectionKey" in row ? row.sectionKey : "",
    ],
    "\0"
  );
}
