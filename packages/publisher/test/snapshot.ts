import {
  type ContentSnapshotSet,
  emptyContentSnapshots,
  replaceContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot-data";
import { prepareProgramSnapshot } from "@nakafa/aksara-corpus/program/snapshot";
import { Effect, Stream } from "effect";

/** Replayable empty structured sources for body-only publisher fixtures. */
export const emptySnapshotSources = {
  snapshotManifests: () => Stream.empty,
  snapshotRows: () => Stream.empty,
} as const;

/** Builds one replacement from the exact source-owned program catalog. */
export async function makeProgramSnapshotFixture(
  previous: ContentSnapshotSet = emptyContentSnapshots()
) {
  const prepared = await Effect.runPromise(prepareProgramSnapshot());
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
