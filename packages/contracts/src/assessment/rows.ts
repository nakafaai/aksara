import { Array as Arr, Effect, HashMap, HashSet, Result, Stream } from "effect";

import type { Paper } from "#contracts/assessment/paper";
import type { AssessmentRecord } from "#contracts/assessment/snapshot";
import type { StimulusVersion } from "#contracts/assessment/stimulus";

/**
 * Keeps what the reference checks read of one record. An explanation keeps
 * only its identity and the version it explains, and a stimulus only its
 * identity: explanation bodies are most of a snapshot's bytes, and no check
 * reads them.
 */
function referenceFacts({ row }: AssessmentRecord) {
  if (row.kind === "explanation") {
    return {
      identity: explanationIdentity(
        row.explanation.version,
        row.explanation.language
      ),
      kind: "explanation" as const,
      version: row.explanation.version,
    };
  }
  if (row.kind === "stimulus") {
    return {
      identity: stimulusIdentity(row.version),
      kind: "stimulus" as const,
    };
  }
  return row;
}

/** Gathers the facts of a snapshot by kind for the reference checks. */
function indexFacts(rows: readonly ReturnType<typeof referenceFacts>[]) {
  return {
    catalog: Arr.filterMap(rows, (row) =>
      row.kind === "catalog" ? Result.succeed(row.row) : Result.failVoid
    ),
    explanations: HashMap.fromIterable(
      Arr.filterMap(rows, (row) =>
        row.kind === "explanation"
          ? Result.succeed([row.identity, row.version] as const)
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
    keys: HashMap.fromIterable(
      Arr.filterMap(rows, (row) =>
        row.kind === "key"
          ? Result.succeed([row.key.version, row.key] as const)
          : Result.failVoid
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
        row.kind === "stimulus" ? Result.succeed(row.identity) : Result.failVoid
      )
    ),
  };
}

/** Gathers the rows of a snapshot by kind, holding only the facts the reference checks read. */
export function indexRecords<E, R>(
  records: Stream.Stream<AssessmentRecord, E, R>
) {
  return records.pipe(
    Stream.map(referenceFacts),
    Stream.runCollect,
    Effect.map(indexFacts)
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
