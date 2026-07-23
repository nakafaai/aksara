import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot-data";
import type {
  SnapshotManifestDecodeError,
  SnapshotManifestOrderError,
  SnapshotRowDecodeError,
} from "@nakafa/aksara-contracts/release/snapshot-verify";
import type { Stream } from "effect";

/** Raw replay factories required before structured snapshots are verified. */
export interface SnapshotPreparationSources<E, R> {
  /** Replays replacement manifests in canonical family order. */
  readonly snapshotManifests: () => Stream.Stream<unknown, E, R>;
  /** Replays immutable rows for every replacement manifest. */
  readonly snapshotRows: () => Stream.Stream<unknown, E, R>;
}

/** Strict decoded snapshot streams carried after preparation succeeds. */
export interface PreparedSnapshotSources<E, R> {
  /** Replays decoded replacement manifests in canonical family order. */
  readonly snapshotManifests: () => Stream.Stream<
    ContentSnapshotManifest,
    E,
    R
  >;
  /** Replays decoded immutable rows for every replacement manifest. */
  readonly snapshotRows: () => Stream.Stream<ContentSnapshotRow, E, R>;
}

/** Failures possible when replaying strictly decoded snapshot sources. */
export type PreparedSnapshotStreamError<E> =
  | E
  | SnapshotManifestDecodeError
  | SnapshotManifestOrderError
  | SnapshotRowDecodeError;
