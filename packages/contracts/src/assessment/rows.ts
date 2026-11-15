import { Array as Arr, HashMap, HashSet, Result } from "effect";

import type { Paper } from "#contracts/assessment/paper";
import type { AssessmentRecord } from "#contracts/assessment/snapshot";
import type { StimulusVersion } from "#contracts/assessment/stimulus";

/** Gathers the rows of a snapshot by kind for the reference checks. */
export function indexRows(records: readonly AssessmentRecord[]) {
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
        row.kind === "stimulus"
          ? Result.succeed(stimulusIdentity(row.version))
          : Result.failVoid
      )
    ),
  };
}

/** The rows of a snapshot, gathered by kind. */
export type Rows = ReturnType<typeof indexRows>;

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
