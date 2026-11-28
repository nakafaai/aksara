import type { Stream } from "effect";
import {
  Array as Arr,
  Effect,
  HashMap,
  HashSet,
  Option,
  Result,
  Schema,
} from "effect";

import { hasKeyedRubrics } from "#contracts/assessment/fit";
import { catalogLocaleBreach } from "#contracts/assessment/locales";
import type { Paper } from "#contracts/assessment/paper";
import {
  verifyPaperPlaces,
  verifyPaperStimuli,
} from "#contracts/assessment/paper";
import type { ExamProfile } from "#contracts/assessment/profile";
import type { Rows } from "#contracts/assessment/rows";
import {
  explanationIdentity,
  indexRecords,
  placedHashes,
  stimulusIdentity,
} from "#contracts/assessment/rows";
import type { AssessmentRecord } from "#contracts/assessment/snapshot";
import type { ActiveAppLocaleList } from "#contracts/locale";

/**
 * Why a snapshot is not closed: a reference names a row it does not hold, a
 * row is never reached, or a paper does not fit the profile it follows.
 */
export const AssessmentClosureReasonSchema = Schema.Literals([
  "explanation",
  "family",
  "key",
  "locale",
  "paper",
  "place",
  "profile",
  "section",
  "stimulus",
  "unplaced",
]);

/** A snapshot holds a reference that leads nowhere, or a row that nothing reaches. */
export class AssessmentClosureError extends Schema.TaggedError<
  AssessmentClosureError,
  { readonly brand: unique symbol }
>()("AssessmentClosureError", {
  identity: Schema.String,
  reason: AssessmentClosureReasonSchema,
}) {}

/** Fails with one closure reason unless the condition holds. */
function require(
  holds: boolean,
  reason: typeof AssessmentClosureReasonSchema.Type,
  identity: string
) {
  return holds
    ? Effect.void
    : Effect.fail(new AssessmentClosureError({ identity, reason }));
}

/** Checks that a paper follows its profile: the same sections, in order, each with its count of places. */
function fitsProfile(paper: Paper, profile: ExamProfile) {
  return (
    paper.sections.length === profile.sections.length &&
    Arr.every(
      Arr.zip(paper.sections, profile.sections),
      ([placed, section]) =>
        placed.section === section.id &&
        placed.placements.length === section.items
    )
  );
}

/** Verifies the papers: their profiles, their places, and the readings they list. */
const verifyPapers = Effect.fn("AksaraContracts.verifyAssessmentPapers")(
  function* (rows: Rows) {
    for (const { paper } of HashMap.values(rows.papers)) {
      const profile = HashMap.get(rows.profiles, paper.profile.id);
      yield* require(Option.exists(
        profile,
        ({ hash }) => hash === paper.profile.hash
      ), "profile", paper.id);
      yield* require(Option.exists(profile, (entry) =>
        fitsProfile(paper, entry.profile)
      ), "section", paper.id);
      const placed = Arr.flatMap(paper.sections, ({ placements }) =>
        Arr.flatMap(placements, (placement) =>
          Arr.map(placement.versions, (version) => ({
            ...version,
            family: placement.family,
          }))
        )
      );
      const versions = Arr.getSomes(
        Arr.map(placed, ({ family, hash, language }) =>
          Option.filter(
            HashMap.get(rows.items, hash),
            (version) =>
              version.family === family && version.deliveryLanguage === language
          )
        )
      );
      yield* verifyPaperPlaces(
        paper,
        versions,
        Arr.getSomes(
          Arr.map(versions, ({ hash }) => HashMap.get(rows.keys, hash))
        )
      ).pipe(
        Effect.mapError(
          ({ family, reason }) =>
            new AssessmentClosureError({
              identity: family,
              reason: reason === "key" ? "key" : "place",
            })
        )
      );
      yield* verifyPaperStimuli(paper, versions).pipe(
        Effect.mapError(
          () =>
            new AssessmentClosureError({
              identity: paper.id,
              reason: "stimulus",
            })
        )
      );
    }
  }
);

/**
 * The explanations the catalog asks for: each version a set's paper places,
 * in every locale that set is written in.
 */
function requiredExplanations(rows: Rows) {
  return HashSet.fromIterable(
    Arr.flatMap(rows.catalog, (row) => {
      if (row.kind !== "set") {
        return [];
      }
      const placed = Arr.flatMap(
        Option.toArray(HashMap.get(rows.papers, row.paper.id)),
        ({ paper }) => placedHashes(paper)
      );
      return Arr.flatMap(placed, (hash) =>
        Arr.map(row.appLocales, (language) =>
          explanationIdentity(hash, language)
        )
      );
    })
  );
}

/**
 * Verifies each item version: its family, its reading, its key, a paper that
 * places it, and its explanation in every locale of every set that places it.
 */
const verifyItems = Effect.fn("AksaraContracts.verifyAssessmentItems")(
  function* (rows: Rows) {
    const placed = HashSet.fromIterable(
      Arr.flatMap(Arr.fromIterable(HashMap.values(rows.papers)), ({ paper }) =>
        placedHashes(paper)
      )
    );
    for (const version of HashMap.values(rows.items)) {
      const family = HashMap.get(rows.families, version.family);
      yield* require(Option.exists(
        family,
        ({ stimulus }) => stimulus === version.stimulus?.id
      ), "family", version.family);
      yield* require(version.stimulus === undefined ||
        HashSet.has(
          rows.stimuli,
          stimulusIdentity(version.stimulus)
        ), "stimulus", version.family);
      yield* require(Option.exists(
        HashMap.get(rows.keys, version.hash),
        (key) => hasKeyedRubrics(version, key)
      ), "key", version.hash);
      yield* require(HashSet.has(
        placed,
        version.hash
      ), "unplaced", version.hash);
    }
    for (const identity of requiredExplanations(rows)) {
      yield* require(HashMap.has(
        rows.explanations,
        identity
      ), "explanation", identity);
    }
    const familiesWithVersions = HashSet.fromIterable(
      Arr.map(
        Arr.fromIterable(HashMap.values(rows.items)),
        ({ family }) => family
      )
    );
    for (const id of HashMap.keys(rows.families)) {
      yield* require(HashSet.has(familiesWithVersions, id), "family", id);
    }
  }
);

/** Verifies that keys and explanations name item versions the snapshot holds. */
function verifyRecordsOfItems(rows: Rows) {
  return Effect.gen(function* () {
    for (const version of HashMap.keys(rows.keys)) {
      yield* require(HashMap.has(rows.items, version), "key", version);
    }
    for (const [identity, version] of rows.explanations) {
      yield* require(HashMap.has(rows.items, version), "explanation", identity);
    }
  });
}

/**
 * Verifies the catalog: every set's paper, the sections of each set equal to
 * the sections of its paper, and every node in exactly the locales it serves.
 */
const verifyCatalog = Effect.fn("AksaraContracts.verifyAssessmentCatalog")(
  function* (rows: Rows, activeAppLocales: ActiveAppLocaleList) {
    for (const row of rows.catalog) {
      if (row.kind !== "set") {
        continue;
      }
      const paper = HashMap.get(rows.papers, row.paper.id);
      yield* require(Option.exists(
        paper,
        ({ hash }) => hash === row.paper.hash
      ), "paper", row.paper.id);
      const sections = Arr.filterMap(rows.catalog, (section) =>
        section.kind === "section" &&
        section.appLocale === row.appLocale &&
        section.countryKey === row.countryKey &&
        section.examKey === row.examKey &&
        section.trackKey === row.trackKey &&
        section.setKey === row.setKey
          ? Result.succeed(section.sectionKey)
          : Result.failVoid
      );
      yield* require(Option.exists(
        paper,
        (entry) =>
          HashSet.size(HashSet.fromIterable(sections)) === sections.length &&
          sections.length === entry.paper.sections.length &&
          Arr.every(entry.paper.sections, ({ section }) =>
            Arr.contains(sections, section)
          )
      ), "section", `${row.appLocale}\0${row.setKey}`);
    }
    const breach = catalogLocaleBreach(rows.catalog, activeAppLocales);
    yield* require(Option.isNone(breach), "locale", Option.getOrElse(
      breach,
      () => ""
    ));
  }
);

/**
 * Verifies that an assessment snapshot is closed: the catalog reaches papers it
 * holds, every paper fits the profile it follows and places versions it holds,
 * every version has its family, its reading, its key, and an explanation in
 * every locale of each set that places it, and no family, key, or explanation
 * is left over.
 */
export const verifyAssessmentClosure = Effect.fn(
  "AksaraContracts.verifyAssessmentClosure"
)(function* <E, R>(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly records: Stream.Stream<AssessmentRecord, E, R>;
}) {
  const rows = yield* indexRecords(input.records);
  yield* verifyCatalog(rows, input.activeAppLocales);
  yield* verifyPapers(rows);
  yield* verifyItems(rows);
  yield* verifyRecordsOfItems(rows);
});
