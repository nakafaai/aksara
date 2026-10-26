import {
  SectionVisibilitySchema,
  TrackKindSchema,
} from "@nakafa/aksara-contracts/assessment/catalog";
import { KebabKeySchema } from "@nakafa/aksara-contracts/assessment/identity";
import { InteractionKindSchema } from "@nakafa/aksara-contracts/assessment/interaction";
import { ReportFormSchema } from "@nakafa/aksara-contracts/assessment/profile";
import {
  ScoreScaleSchema,
  ScoringStrategySchema,
} from "@nakafa/aksara-contracts/assessment/scoring";
import { CountryCodeSchema } from "@nakafa/aksara-contracts/country";
import { AppLocaleCodeSchema } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, MutableHashSet, Schema } from "effect";
import { localizedSourceMapSchema } from "#corpus/locale/source";
import {
  PublicRouteSegmentSchema,
  PublicRouteSlugMapSchema,
} from "#corpus/route/schema";

const PositiveIntSchema = Schema.Int.check(Schema.isGreaterThan(0));

const TranslationMapSchema = localizedSourceMapSchema(
  Schema.Struct({
    description: Schema.optional(Schema.String),
    title: Schema.String,
  })
);

/**
 * One section of an exam profile: the language its items are asked in, how
 * many items it has, how long it lasts, the interactions it allows, and its
 * names and routes. Every set of the track sits the same sections in this
 * order, each with its own items.
 */
export const SectionSourceSchema = Schema.Struct({
  interactions: Schema.NonEmptyArray(InteractionKindSchema),
  items: PositiveIntSchema,
  key: KebabKeySchema,
  language: AppLocaleCodeSchema,
  routeSlugs: Schema.optionalKey(PublicRouteSlugMapSchema),
  seconds: PositiveIntSchema,
  translations: TranslationMapSchema,
  visibility: SectionVisibilitySchema,
}).check(
  Schema.makeFilter(
    ({ routeSlugs, visibility }) =>
      (visibility === "visible") === (routeSlugs !== undefined),
    { message: "Expected route slugs on a visible section only." }
  )
);
export type SectionSource = typeof SectionSourceSchema.Type;
export type SectionSourceInput = typeof SectionSourceSchema.Encoded;

/** Requires visible sections, or one section entered from its set. */
function hasReachableSections(sections: readonly SectionSource[]) {
  const internal = Arr.filter(
    sections,
    ({ visibility }) => visibility === "internal-entry"
  ).length;
  return internal === 0 || (internal === 1 && sections.length === 1);
}

/**
 * The exam profile of one track, as authored: its names, its scoring and
 * report, and its sections. The facts that every Nakafa try-out shares, such
 * as the deadline allowances and the tools, are in `tryout/profile`.
 */
export const ProfileSourceSchema = Schema.Struct({
  names: TranslationMapSchema,
  report: ReportFormSchema,
  scale: Schema.optionalKey(ScoreScaleSchema),
  scoring: ScoringStrategySchema,
  sections: Schema.NonEmptyArray(SectionSourceSchema).check(
    Schema.makeFilter(hasReachableSections, {
      message:
        "Expected visible sections, or one section entered from its set.",
    })
  ),
});
export type ProfileSource = typeof ProfileSourceSchema.Type;

/** One set of a track: its names and routes. Its paper sits the track's sections. */
export const SetSourceSchema = Schema.Struct({
  key: KebabKeySchema,
  order: PositiveIntSchema,
  routeSlugs: PublicRouteSlugMapSchema,
  translations: TranslationMapSchema,
});
export type SetSource = typeof SetSourceSchema.Type;

/** One track of an exam: a year, a subject, or an institution, with its profile and sets. */
export const TrackSourceSchema = Schema.Struct({
  key: KebabKeySchema,
  kind: TrackKindSchema,
  order: PositiveIntSchema,
  profile: ProfileSourceSchema,
  routeSlugs: PublicRouteSlugMapSchema,
  sets: Schema.Array(SetSourceSchema),
  translations: TranslationMapSchema,
});
export type TrackSource = typeof TrackSourceSchema.Type;
export type TrackSourceInput = typeof TrackSourceSchema.Encoded;

const CountrySourceSchema = Schema.Struct({
  countryCode: CountryCodeSchema,
  countryKey: KebabKeySchema,
  countryOrder: PositiveIntSchema,
  countryRevision: PublicRouteSegmentSchema,
  countryRouteSlugs: PublicRouteSlugMapSchema,
  countryTranslations: TranslationMapSchema,
});
export type CountrySourceInput = typeof CountrySourceSchema.Encoded;

/** One authored try-out exam: its country, its names and routes, and its tracks. */
export const ExamSourceSchema = Schema.Struct({
  ...CountrySourceSchema.fields,
  examKey: KebabKeySchema,
  examOrder: PositiveIntSchema,
  examRouteSlugs: PublicRouteSlugMapSchema,
  examTranslations: TranslationMapSchema,
  sourceRevision: PublicRouteSegmentSchema,
  tracks: Schema.Array(TrackSourceSchema),
});
export type ExamSourceInput = typeof ExamSourceSchema.Encoded;
export type ExamSource = typeof ExamSourceSchema.Type;

/** One authored try-out exam failed strict schema decoding. */
export class ExamSourceDecodeError extends Schema.TaggedError<
  ExamSourceDecodeError,
  { readonly brand: unique symbol }
>()("ExamSourceDecodeError", { cause: Schema.Unknown }) {}

/** One authored scope contains the same stable key twice. */
export class ExamSourceDuplicateError extends Schema.TaggedError<
  ExamSourceDuplicateError,
  { readonly brand: unique symbol }
>()("ExamSourceDuplicateError", {
  key: KebabKeySchema,
  scope: Schema.Trimmed.check(Schema.isNonEmpty()),
}) {}

/** Rejects duplicate stable keys within one authored scope. */
function requireUniqueKeys(
  entries: readonly { readonly key: string }[],
  scope: string
) {
  const keys = MutableHashSet.empty<string>();
  for (const { key } of entries) {
    if (MutableHashSet.has(keys, key)) {
      return Effect.fail(new ExamSourceDuplicateError({ key, scope }));
    }
    MutableHashSet.add(keys, key);
  }
  return Effect.void;
}

/** Strictly decodes one try-out exam and validates its stable keys. */
export const defineExamSource = Effect.fn("AksaraCorpus.defineExamSource")(
  function* (input: ExamSourceInput) {
    const source = yield* Schema.decodeEffect(ExamSourceSchema)(input, {
      onExcessProperty: "error",
    }).pipe(Effect.mapError((cause) => new ExamSourceDecodeError({ cause })));
    yield* requireUniqueKeys(source.tracks, `${source.examKey}:tracks`);
    for (const track of source.tracks) {
      yield* requireUniqueKeys(
        track.sets,
        `${source.examKey}:${track.key}:sets`
      );
      yield* requireUniqueKeys(
        track.profile.sections,
        `${source.examKey}:${track.key}:sections`
      );
    }
    return source;
  }
);
