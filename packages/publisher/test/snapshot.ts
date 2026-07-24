import {
  type ContentSnapshotSet,
  inheritContentSnapshots,
  replaceContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot-data";
import { prepareProgramSnapshot } from "@nakafa/aksara-corpus/program/snapshot";
import { Effect, Stream } from "effect";

const preparedProgramSnapshot = await Effect.runPromise(
  prepareProgramSnapshot()
);

/** Replayable empty structured sources for body-only publisher fixtures. */
export const emptySnapshotSources = {
  snapshotManifests: () => Stream.empty,
  snapshotRows: () => Stream.empty,
} as const;

/** Builds one replacement from the exact source-owned program catalog. */
export function makeProgramSnapshotFixture(
  previous: ContentSnapshotSet = inheritContentSnapshots(null)
) {
  const prepared = preparedProgramSnapshot;
  const snapshot: ContentSnapshotManifest = {
    family: "program",
    manifest: prepared.manifest,
  };
  const snapshots = {
    ...previous,
    program: replaceContentSnapshot({
      baseSnapshotId: previous.program.resultSnapshotId,
      resultSnapshotId: prepared.manifest.snapshotId,
      rowCount: prepared.manifest.rowCount,
      rowDigest: prepared.manifest.rowDigest,
    }),
  };
  /** Replays the exact program manifest selected by this fixture. */
  const snapshotManifests = () => Stream.make(snapshot);
  /** Replays exact source-owned program rows in canonical display order. */
  const snapshotRows = () =>
    prepared
      .rows()
      .pipe(
        Stream.map(
          (record): ContentSnapshotRow => ({ family: "program", record })
        )
      );
  return { snapshot, snapshotManifests, snapshotRows, snapshots };
}
