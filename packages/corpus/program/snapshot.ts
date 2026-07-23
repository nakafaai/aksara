import {
  digestProgramRows,
  makeProgramSnapshotRow,
  type ProgramDigestError,
  type ProgramHashError,
} from "@nakafa/aksara-contracts/program/row-hash";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  type ProgramSnapshot,
  ProgramSnapshotInputSchema,
  type ProgramSnapshotRow,
  ProgramSnapshotSchema,
} from "@nakafa/aksara-contracts/program/snapshot";
import {
  hashProgramSnapshot,
  type ProgramSnapshotHashError,
} from "@nakafa/aksara-contracts/program/snapshot-hash";
import { Effect, Stream } from "effect";

import {
  decodeProgramCatalog,
  type ProgramCatalogError,
  type ProgramIdentityError,
} from "#corpus/program/catalog";

/** Errors emitted while replaying source-decoded program records. */
export type ProgramRowError =
  | ProgramCatalogError
  | ProgramHashError
  | ProgramIdentityError;

/** Failures emitted while deriving the program manifest and row stream. */
export type ProgramSnapshotError =
  | ProgramDigestError
  | ProgramRowError
  | ProgramSnapshotHashError;

/** Replayable program snapshot prepared from the exact reviewed catalog. */
export interface PreparedProgramSnapshot {
  readonly manifest: ProgramSnapshot;
  /** Replays all six content-addressed program rows in display order. */
  readonly rows: () => Stream.Stream<ProgramSnapshotRow, ProgramRowError>;
}

/** Streams decoded program records without exposing mutable catalog storage. */
export function streamProgramRows(input?: unknown) {
  return Stream.fromIterableEffect(decodeProgramCatalog(input)).pipe(
    Stream.mapEffect(makeProgramSnapshotRow)
  );
}

/** Prepares the complete program snapshot selected by a global release. */
export const prepareProgramSnapshot: (
  input?: unknown
) => Effect.Effect<PreparedProgramSnapshot, ProgramSnapshotError> = Effect.fn(
  "AksaraCorpus.prepareProgramSnapshot"
)(function* (input) {
  /** Replays the same source-decoded rows used to derive the manifest. */
  const rows = () => streamProgramRows(input);
  const summary = yield* digestProgramRows(rows());
  const identity = ProgramSnapshotInputSchema.make({
    format: PROGRAM_SNAPSHOT_FORMAT,
    locales: ["en", "id"],
    ...summary,
  });
  const snapshotId = yield* hashProgramSnapshot(identity);
  const manifest = ProgramSnapshotSchema.make({ ...identity, snapshotId });
  return { manifest, rows };
});
