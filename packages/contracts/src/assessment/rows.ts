import { Array as Arr, Effect, HashMap, HashSet, Stream } from "effect";

import type { Paper } from "#contracts/assessment/paper";
import type {
  AssessmentRecord,
  AssessmentRow,
} from "#contracts/assessment/snapshot";
import type { StimulusVersion } from "#contracts/assessment/stimulus";

type RowOf<Kind extends AssessmentRow["kind"]> = Extract<
  AssessmentRow,
  { kind: Kind }
>;

/**
 * The facts the reference checks read, gathered while the records stream past.
 * An explanation keeps only its identity and the version it explains, and a
 * stimulus only its identity: explanation bodies are most of a snapshot's
 * bytes, and holding them pushed the assessment proof past an action's memory.
 */
interface RowFacts {
  readonly catalog: RowOf<"catalog">["row"][];
  readonly explanations: (readonly [string, string])[];
  readonly families: (readonly [string, RowOf<"family">["family"]])[];
  readonly items: (readonly [string, RowOf<"item">["version"]])[];
  readonly keys: (readonly [string, RowOf<"key">["key"]])[];
  readonly papers: (readonly [string, RowOf<"paper">])[];
  readonly profiles: (readonly [string, RowOf<"profile">])[];
  readonly stimuli: string[];
}

/** Starts the facts of one gathering run. */
function emptyFacts(): RowFacts {
  return {
    catalog: [],
    explanations: [],
    families: [],
    items: [],
    keys: [],
    papers: [],
    profiles: [],
    stimuli: [],
  };
}

/** Adds the facts of one record to the run that owns `facts`. */
function gatherRecord(facts: RowFacts, { row }: AssessmentRecord) {
  if (row.kind === "catalog") {
    facts.catalog.push(row.row);
  } else if (row.kind === "explanation") {
    facts.explanations.push([
      explanationIdentity(row.explanation.version, row.explanation.language),
      row.explanation.version,
    ]);
  } else if (row.kind === "family") {
    facts.families.push([row.family.id, row.family]);
  } else if (row.kind === "item") {
    facts.items.push([row.version.hash, row.version]);
  } else if (row.kind === "key") {
    facts.keys.push([row.key.version, row.key]);
  } else if (row.kind === "paper") {
    facts.papers.push([row.paper.id, row]);
  } else if (row.kind === "profile") {
    facts.profiles.push([row.profile.id, row]);
  } else {
    facts.stimuli.push(stimulusIdentity(row.version));
  }
  return facts;
}

/** Gathers the rows of a snapshot by kind for the reference checks, one record at a time. */
export function indexRecords<E, R>(
  records: Stream.Stream<AssessmentRecord, E, R>
) {
  return records.pipe(
    Stream.runFold(emptyFacts, gatherRecord),
    Effect.map((facts) => ({
      catalog: facts.catalog,
      explanations: HashMap.fromIterable(facts.explanations),
      families: HashMap.fromIterable(facts.families),
      items: HashMap.fromIterable(facts.items),
      keys: HashMap.fromIterable(facts.keys),
      papers: HashMap.fromIterable(facts.papers),
      profiles: HashMap.fromIterable(facts.profiles),
      stimuli: HashSet.fromIterable(facts.stimuli),
    }))
  );
}

/** The rows of a snapshot, gathered by kind. */
export type Rows = Effect.Success<ReturnType<typeof indexRecords>>;

/** The hash of every version a paper places, every language of every place. */
export function placedHashes(paper: Paper) {
  return Arr.flatMap(paper.sections, ({ placements }) =>
    Arr.flatMap(placements, ({ versions }) =>
      Arr.map(versions, ({ hash }) => hash)
    )
  );
}

/** The identity of one explanation: the version it explains and its language. */
export function explanationIdentity(version: string, language: string): string {
  return `${version}\0${language}`;
}

/** The identity of one stimulus version: its identifier and its hash. */
export function stimulusIdentity(
  version: Pick<StimulusVersion, "hash" | "id">
) {
  return `${version.id}\0${version.hash}`;
}
