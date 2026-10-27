import {
  Array as Arr,
  Effect,
  HashMap,
  HashSet,
  Option,
  Result,
  Schema,
  Stream,
} from "effect";

import { catalogRowIdentity } from "#contracts/assessment/catalog";
import type { Paper } from "#contracts/assessment/paper";
import { verifyPaperStimuli } from "#contracts/assessment/paper";
import type { ExamProfile } from "#contracts/assessment/profile";
import type { AssessmentRecord } from "#contracts/assessment/snapshot";
import type { StimulusVersion } from "#contracts/assessment/stimulus";
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

/** Gathers the rows of a snapshot by kind for the reference checks. */
function indexRows(records: readonly AssessmentRecord[]) {
  const rows = Arr.map(records, ({ row }) => row);
  return {
    catalog: Arr.filterMap(rows, (row) =>
      row.kind === "catalog" ? Result.succeed(row.row) : Result.failVoid
    ),
    explanations: HashMap.fromIterable(
      Arr.filterMap(rows, (row) =>
        row.kind === "explanation"
          ? Result.succeed([
              explanationIdentity(
                row.explanation.version,
                row.explanation.language
              ),
              row.explanation.version,
            ] as const)
          : Result.failVoid
      )
    ),
    families: HashMap.fromIterable(
      Arr.filterMap(rows, (row) =>
        row.kind === "family"
          ? Result.succeed([row.family.id, row.family] as const)
          : Result.failVoid
      )
    ),
    items: HashMap.fromIterable(
      Arr.filterMap(rows, (row) =>
        row.kind === "item"
          ? Result.succeed([row.version.hash, row.version] as const)
          : Result.failVoid
      )
    ),
    keys: HashSet.fromIterable(
      Arr.filterMap(rows, (row) =>
        row.kind === "key" ? Result.succeed(row.key.version) : Result.failVoid
      )
    ),
    papers: HashMap.fromIterable(
      Arr.filterMap(rows, (row) =>
        row.kind === "paper"
          ? Result.succeed([row.paper.id, row] as const)
          : Result.failVoid
      )
    ),
    profiles: HashMap.fromIterable(
      Arr.filterMap(rows, (row) =>
        row.kind === "profile"
          ? Result.succeed([row.profile.id, row] as const)
          : Result.failVoid
      )
    ),
    stimuli: HashSet.fromIterable(
      Arr.filterMap(rows, (row) =>
        row.kind === "stimulus"
          ? Result.succeed(stimulusIdentity(row.version))
          : Result.failVoid
      )
    ),
  };
}

/** The rows of a snapshot, gathered by kind. */
type Rows = ReturnType<typeof indexRows>;

/** The identity of one explanation: the version it explains and its language. */
function explanationIdentity(version: string, language: string): string {
  return `${version}\0${language}`;
}

/** The identity of one stimulus version: its identifier and its hash. */
function stimulusIdentity(version: Pick<StimulusVersion, "hash" | "id">) {
  return `${version.id}\0${version.hash}`;
}

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
      const placed = Arr.flatMap(
        paper.sections,
        ({ placements }) => placements
      );
      const versions = Arr.getSomes(
        Arr.map(placed, ({ family, hash }) =>
          Option.filter(
            HashMap.get(rows.items, hash),
            (version) => version.family === family
          )
        )
      );
      yield* require(versions.length === placed.length, "place", paper.id);
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

/** Verifies each item version: its family, its reading, its key, its explanations, and a paper that places it. */
const verifyItems = Effect.fn("AksaraContracts.verifyAssessmentItems")(
  function* (rows: Rows, activeAppLocales: ActiveAppLocaleList) {
    const placed = HashSet.fromIterable(
      Arr.flatMap(Arr.fromIterable(HashMap.values(rows.papers)), ({ paper }) =>
        Arr.flatMap(paper.sections, ({ placements }) =>
          Arr.map(placements, ({ hash }) => hash)
        )
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
      yield* require(HashSet.has(rows.keys, version.hash), "key", version.hash);
      yield* require(HashSet.has(
        placed,
        version.hash
      ), "unplaced", version.hash);
      for (const language of activeAppLocales) {
        const identity = explanationIdentity(version.hash, language);
        yield* require(HashMap.has(
          rows.explanations,
          identity
        ), "explanation", identity);
      }
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
    for (const version of rows.keys) {
      yield* require(HashMap.has(rows.items, version), "key", version);
    }
    for (const [identity, version] of rows.explanations) {
      yield* require(HashMap.has(rows.items, version), "explanation", identity);
    }
  });
}

/**
 * Verifies the catalog: every node in every active app locale, every set's
 * paper, and the sections of each set equal to the sections of its paper.
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
    const present = HashSet.fromIterable(
      Arr.map(rows.catalog, catalogRowIdentity)
    );
    for (const row of rows.catalog) {
      for (const appLocale of activeAppLocales) {
        const identity = catalogRowIdentity({ ...row, appLocale });
        yield* require(HashSet.has(present, identity), "locale", identity);
      }
    }
  }
);

/**
 * Verifies that an assessment snapshot is closed: the catalog reaches papers it
 * holds, every paper fits the profile it follows and places versions it holds,
 * every version has its family, its reading, its key, and an explanation in
 * every active app locale, and no family, key, or explanation is left over.
 */
export const verifyAssessmentClosure = Effect.fn(
  "AksaraContracts.verifyAssessmentClosure"
)(function* <E, R>(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly records: Stream.Stream<AssessmentRecord, E, R>;
}) {
  const rows = indexRows(yield* Stream.runCollect(input.records));
  yield* verifyCatalog(rows, input.activeAppLocales);
  yield* verifyPapers(rows);
  yield* verifyItems(rows, input.activeAppLocales);
  yield* verifyRecordsOfItems(rows);
});
