import {
  GroupAxisSchema,
  SectionVisibilitySchema,
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
import { Array as Arr, Effect, MutableHashSet, Option, Schema } from "effect";
import { localizedSourceMapSchema } from "#corpus/locale/source";
import {
  PublicRouteSegmentSchema,
  PublicRouteSlugMapSchema,
} from "#corpus/route/schema";
import { SetRatingSchema } from "#corpus/tryout/level";

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

/**
 * One set of a track: its names, routes, and the difficulty panel's rating of
 * it. Its paper sits the track's sections.
 */
export const SetSourceSchema = Schema.Struct({
  key: KebabKeySchema,
  order: PositiveIntSchema,
  rating: SetRatingSchema,
  routeSlugs: PublicRouteSlugMapSchema,
  translations: TranslationMapSchema,
});
export type SetSource = typeof SetSourceSchema.Type;

/**
 * One track of an exam: one paper format, such as a subject or a year's test,
 * with its profile and sets, in the group of the exam that holds it. Its key
 * is unique within the exam, so it names the track in every group.
 */
export const TrackSourceSchema = Schema.Struct({
  group: KebabKeySchema,
  key: KebabKeySchema,
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

/**
 * One group of an exam on its axis: a year such as 2027, a grade such as
 * SMA/MA/SMK, or an institution such as a Studienkolleg, with its names and
 * routes. A year's route is the year itself.
 */
export const GroupSourceSchema = Schema.Struct({
  key: KebabKeySchema,
  order: PositiveIntSchema,
  routeSlugs: PublicRouteSlugMapSchema,
  translations: TranslationMapSchema,
});
export type GroupSource = typeof GroupSourceSchema.Type;

/** The one axis that divides an exam's tracks, and the groups on it. */
const GroupingSourceSchema = Schema.Struct({
  axis: GroupAxisSchema,
  groups: Schema.NonEmptyArray(GroupSourceSchema),
});

/** One authored try-out exam: its country, its names and routes, its groups, and its tracks. */
export const ExamSourceSchema = Schema.Struct({
  ...CountrySourceSchema.fields,
  examKey: KebabKeySchema,
  examOrder: PositiveIntSchema,
  examRouteSlugs: PublicRouteSlugMapSchema,
  examTranslations: TranslationMapSchema,
  grouping: GroupingSourceSchema,
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

/**
 * A track names a group its exam does not declare, or a group holds no
 * track, which would be a page with nothing to sit.
 */
export class ExamSourceGroupError extends Schema.TaggedError<
  ExamSourceGroupError,
  { readonly brand: unique symbol }
>()("ExamSourceGroupError", {
  key: KebabKeySchema,
  reason: Schema.Literals(["empty", "undeclared"]),
}) {}

/** One authored scope contains the same stable key twice. */
export class ExamSourceDuplicateError extends Schema.TaggedError<
  ExamSourceDuplicateError,
  { readonly brand: unique symbol }
>()("ExamSourceDuplicateError", {
  key: KebabKeySchema,
  scope: Schema.Trimmed.check(Schema.isNonEmpty()),
}) {}

/** Rejects duplicate stable keys within one authored scope. */
function requireUniqueKeys(keys: readonly string[], scope: string) {
  const seen = MutableHashSet.empty<string>();
  for (const key of keys) {
    if (MutableHashSet.has(seen, key)) {
      return Effect.fail(new ExamSourceDuplicateError({ key, scope }));
    }
    MutableHashSet.add(seen, key);
  }
  return Effect.void;
}

/** Requires every track to name a declared group, and every group to hold a track. */
function requireGroupedTracks(source: ExamSource) {
  const declared = Arr.map(source.grouping.groups, ({ key }) => key);
  const used = Arr.map(source.tracks, ({ group }) => group);
  const undeclared = Arr.findFirst(used, (key) => !Arr.contains(declared, key));
  if (Option.isSome(undeclared)) {
    return Effect.fail(
      new ExamSourceGroupError({ key: undeclared.value, reason: "undeclared" })
    );
  }
  const empty = Arr.findFirst(declared, (key) => !Arr.contains(used, key));
  if (Option.isSome(empty)) {
    return Effect.fail(
      new ExamSourceGroupError({ key: empty.value, reason: "empty" })
    );
  }
  return Effect.void;
}

/** Strictly decodes one try-out exam and validates its stable keys and groups. */
export const defineExamSource = Effect.fn("AksaraCorpus.defineExamSource")(
  function* (input: ExamSourceInput) {
    const source = yield* Schema.decodeEffect(ExamSourceSchema)(input, {
      onExcessProperty: "error",
    }).pipe(Effect.mapError((cause) => new ExamSourceDecodeError({ cause })));
    yield* requireUniqueKeys(
      Arr.map(source.grouping.groups, ({ key }) => key),
      `${source.examKey}:groups`
    );
    yield* requireUniqueKeys(
      Arr.map(source.tracks, ({ key }) => key),
      `${source.examKey}:tracks`
    );
    yield* requireGroupedTracks(source);
    for (const track of source.tracks) {
      yield* requireUniqueKeys(
        Arr.map(track.sets, ({ key }) => key),
        `${source.examKey}:${track.key}:sets`
      );
      yield* requireUniqueKeys(
        Arr.map(track.profile.sections, ({ key }) => key),
        `${source.examKey}:${track.key}:sections`
      );
    }
    return source;
  }
);
