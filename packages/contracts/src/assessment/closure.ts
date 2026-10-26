import {
  Array as Arr,
  Effect,
  HashMap,
  HashSet,
  Option,
  Schema,
  Stream,
} from "effect";

import type { CatalogRow } from "#contracts/assessment/catalog";
import type { ItemFamily, ItemVersion } from "#contracts/assessment/item";
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

/** Every row of a snapshot, gathered by kind for the reference checks. */
interface Rows {
  readonly catalog: readonly CatalogRow[];
  readonly explanations: HashSet.HashSet<string>;
  readonly families: HashMap.HashMap<string, ItemFamily>;
  readonly items: HashMap.HashMap<string, ItemVersion>;
  readonly keys: HashSet.HashSet<string>;
  readonly papers: HashMap.HashMap<string, { hash: string; paper: Paper }>;
  readonly profiles: HashMap.HashMap<string, { hash: string; profile: ExamProfile }>;
  readonly stimuli: HashSet.HashSet<string>;
}

const EMPTY_ROWS: Rows = {
  catalog: [],
  explanations: HashSet.empty(),
  families: HashMap.empty(),
  items: HashMap.empty(),
  keys: HashSet.empty(),
  papers: HashMap.empty(),
  profiles: HashMap.empty(),
  stimuli: HashSet.empty(),
};

/** Adds one record to the rows gathered so far. */
function gather(rows: Rows, { row }: AssessmentRecord): Rows {
  if (row.kind === "catalog") {
    return { ...rows, catalog: Arr.append(rows.catalog, row.row) };
  }
  if (row.kind === "profile") {
    return {
      ...rows,
      profiles: HashMap.set(rows.profiles, row.profile.id, {
        hash: row.hash,
        profile: row.profile,
      }),
    };
  }
  if (row.kind === "paper") {
    return {
      ...rows,
      papers: HashMap.set(rows.papers, row.paper.id, {
        hash: row.hash,
        paper: row.paper,
      }),
    };
  }
  if (row.kind === "family") {
    return { ...rows, families: HashMap.set(rows.families, row.family.id, row.family) };
  }
  if (row.kind === "item") {
    return { ...rows, items: HashMap.set(rows.items, row.version.hash, row.version) };
  }
  if (row.kind === "stimulus") {
    return {
      ...rows,
      stimuli: HashSet.add(rows.stimuli, stimulusIdentity(row.version)),
    };
  }
  if (row.kind === "key") {
    return { ...rows, keys: HashSet.add(rows.keys, row.key.version) };
  }
  return {
    ...rows,
    explanations: HashSet.add(
      rows.explanations,
      `${row.explanation.version}\0${row.explanation.language}`
    ),
  };
}

/** The identity of one stimulus version: its identifier and its hash. */
function stimulusIdentity(version: Pick<StimulusVersion, "hash" | "id">) {
  return `${version.id}\0${version.hash}`;
}

/** Fails with one closure reason unless the condition holds. */
function require(holds: boolean, reason: typeof AssessmentClosureReasonSchema.Type, identity: string) {
  return holds
    ? Effect.void
    : Effect.fail(new AssessmentClosureError({ identity, reason }));
}

/** Checks that a paper follows its profile: the same sections, in order, each with its count of places. */
function fitsProfile(paper: Paper, profile: ExamProfile) {
  return (
    paper.sections.length === profile.sections.length &&
    Arr.every(Arr.zip(paper.sections, profile.sections), ([placed, section]) =>
      placed.section === section.id && placed.placements.length === section.items
    )
  );
}

/** Verifies the papers: their profiles, their places, and the readings they list. */
const verifyPapers = Effect.fn("AksaraContracts.verifyAssessmentPapers")(
  function* (rows: Rows) {
    for (const { paper } of HashMap.values(rows.papers)) {
      const profile = HashMap.get(rows.profiles, paper.profile.id);
      yield* require(
        Option.exists(profile, ({ hash }) => hash === paper.profile.hash),
        "profile",
        paper.id
      );
      yield* require(
        Option.exists(profile, (entry) => fitsProfile(paper, entry.profile)),
        "section",
        paper.id
      );
      const placed = Arr.flatMap(paper.sections, ({ placements }) => placements);
      const versions = Arr.getSomes(
        Arr.map(placed, ({ family, hash }) =>
          Option.filter(HashMap.get(rows.items, hash), (version) => version.family === family)
        )
      );
      yield* require(versions.length === placed.length, "place", paper.id);
      yield* verifyPaperStimuli(paper, versions).pipe(
        Effect.mapError(() => new AssessmentClosureError({ identity: paper.id, reason: "stimulus" }))
      );
    }
  }
);

/** Verifies each item version: its family, its reading, its key, its explanations, and a paper that places it. */
const verifyItems = Effect.fn("AksaraContracts.verifyAssessmentItems")(
  function* (rows: Rows, activeAppLocales: ActiveAppLocaleList) {
    const placed = HashSet.fromIterable(
      Arr.flatMap(Arr.fromIterable(HashMap.values(rows.papers)), ({ paper }) =>
        Arr.flatMap(paper.sections, ({ placements }) => Arr.map(placements, ({ hash }) => hash))
      )
    );
    for (const version of HashMap.values(rows.items)) {
      const family = HashMap.get(rows.families, version.family);
      yield* require(
        Option.exists(family, ({ stimulus }) => stimulus === version.stimulus?.id),
        "family",
        version.family
      );
      yield* require(
        version.stimulus === undefined || HashSet.has(rows.stimuli, stimulusIdentity(version.stimulus)),
        "stimulus",
        version.family
      );
      yield* require(HashSet.has(rows.keys, version.hash), "key", version.hash);
      yield* require(HashSet.has(placed, version.hash), "unplaced", version.hash);
      for (const language of activeAppLocales) {
        yield* require(
          HashSet.has(rows.explanations, `${version.hash}\0${language}`),
          "explanation",
          `${version.hash}\0${language}`
        );
      }
    }
    const familiesWithVersions = HashSet.fromIterable(
      Arr.map(Arr.fromIterable(HashMap.values(rows.items)), ({ family }) => family)
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
    for (const identity of rows.explanations) {
      const [version = ""] = identity.split("\0");
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
      yield* require(Option.exists(paper, ({ hash }) => hash === row.paper.hash), "paper", row.paper.id);
      const sections = Arr.filterMap(rows.catalog, (section) =>
        section.kind === "section" &&
        section.appLocale === row.appLocale &&
        section.countryKey === row.countryKey &&
        section.examKey === row.examKey &&
        section.trackKey === row.trackKey &&
        section.setKey === row.setKey
          ? Option.some(section.sectionKey)
          : Option.none()
      );
      yield* require(
        Option.exists(paper, (entry) =>
          HashSet.size(HashSet.fromIterable(sections)) === sections.length &&
          sections.length === entry.paper.sections.length &&
          Arr.every(entry.paper.sections, ({ section }) => Arr.contains(sections, section))
        ),
        "section",
        `${row.appLocale}\0${row.setKey}`
      );
    }
    const nodes = Arr.map(rows.catalog, (row) => ({
      appLocale: row.appLocale,
      node: Arr.join(
        [row.kind, row.countryKey, "examKey" in row ? row.examKey : "", "trackKey" in row ? row.trackKey : "", "setKey" in row ? row.setKey : "", "sectionKey" in row ? row.sectionKey : ""],
        "\0"
      ),
    }));
    const present = HashSet.fromIterable(Arr.map(nodes, ({ appLocale, node }) => `${appLocale}\0${node}`));
    for (const { node } of nodes) {
      for (const appLocale of activeAppLocales) {
        yield* require(HashSet.has(present, `${appLocale}\0${node}`), "locale", node);
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
  const rows = yield* input.records.pipe(Stream.runFold(() => EMPTY_ROWS, gather));
  yield* verifyCatalog(rows, input.activeAppLocales);
  yield* verifyPapers(rows);
  yield* verifyItems(rows, input.activeAppLocales);
  yield* verifyRecordsOfItems(rows);
});
