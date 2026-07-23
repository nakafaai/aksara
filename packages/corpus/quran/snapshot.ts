import {
  type Sha256Hash,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  makeQuranProvenanceManifest,
  type QuranProvenanceManifest,
} from "@nakafa/aksara-contracts/quran/provenance";
import {
  bindQuranRow,
  digestQuranRows,
  hashQuranRow,
  type QuranHashError,
} from "@nakafa/aksara-contracts/quran/row-hash";
import {
  QURAN_SNAPSHOT_FORMAT,
  type QuranSnapshotManifest,
  QuranSnapshotManifestSchema,
} from "@nakafa/aksara-contracts/quran/snapshot";
import { hashQuranSnapshot } from "@nakafa/aksara-contracts/quran/snapshot-hash";
import {
  QURAN_CHUNK_COUNT,
  QURAN_LOCALES,
  QURAN_SURAH_COUNT,
  QURAN_TAFSIR_LOCALES,
  QURAN_VERSE_COUNT,
  type QuranRowPayload,
  type QuranSnapshotRow,
} from "@nakafa/aksara-contracts/quran/spec";
import { Effect, Schema, Stream } from "effect";

import {
  type QuranProjectionError,
  type QuranRegistrySource,
  streamQuranRows,
} from "#corpus/quran/projection";
import { quranProvenanceRecords } from "#corpus/quran/provenance";
import { streamQuranRegistry } from "#corpus/quran/registry";
import { digestQuranSource } from "#corpus/quran/source-hash";

type PreparedQuranRowError = QuranHashError | QuranProjectionError;

/** Replayable complete snapshot prepared from one exact Quran source. */
export interface PreparedQuranSnapshot {
  readonly manifest: QuranSnapshotManifest;
  readonly provenance: QuranProvenanceManifest;
  /** Replays every content-addressed row bound to the snapshot identity. */
  readonly rows: () => Stream.Stream<QuranSnapshotRow, PreparedQuranRowError>;
}

/** Quran production publication remains blocked by unapproved provenance. */
export class QuranProvenanceBlockedError extends Schema.TaggedError<QuranProvenanceBlockedError>()(
  "QuranProvenanceBlockedError",
  { digest: Sha256HashSchema }
) {}

/** Computes row hashes while keeping the replayable corpus stream bounded. */
function rowHashStream<E, R>(rows: Stream.Stream<QuranRowPayload, E, R>) {
  return rows.pipe(
    Stream.mapEffect((payload) =>
      hashQuranRow(payload).pipe(
        Effect.map((rowHash) => ({ payload, rowHash }))
      )
    )
  );
}

/** Rebinds verified payloads to the finalized immutable snapshot identity. */
function bindRows<E, R>(
  snapshotId: Sha256Hash,
  rows: Stream.Stream<QuranRowPayload, E, R>
) {
  return rows.pipe(
    Stream.mapEffect((payload) => bindQuranRow(snapshotId, payload))
  );
}

/** Prepares one complete structured Quran snapshot without retaining bodies. */
export const prepareQuranSnapshot = Effect.fn(
  "AksaraCorpus.prepareQuranSnapshot"
)(function* (source: QuranRegistrySource = () => streamQuranRegistry()) {
  const provenance = yield* makeQuranProvenanceManifest(quranProvenanceRecords);
  const sourceSummary = yield* digestQuranSource(source());
  const rowSummary = yield* digestQuranRows(
    rowHashStream(streamQuranRows(source))
  );
  const identity = {
    chunkCount: QURAN_CHUNK_COUNT,
    format: QURAN_SNAPSHOT_FORMAT,
    locales: QURAN_LOCALES,
    projectionCount: rowSummary.projectionCount,
    projectionDigest: rowSummary.projectionDigest,
    provenanceDigest: provenance.digest,
    provenanceStatus: provenance.status,
    runtimeCount: rowSummary.runtimeCount,
    runtimeDigest: rowSummary.runtimeDigest,
    searchCount: rowSummary.searchCount,
    searchDigest: rowSummary.searchDigest,
    sourceBytes: sourceSummary.bytes,
    sourceDigest: sourceSummary.digest,
    surahCount: QURAN_SURAH_COUNT,
    tafsirLocales: QURAN_TAFSIR_LOCALES,
    verseCount: QURAN_VERSE_COUNT,
  };
  const snapshotId = yield* hashQuranSnapshot(identity);
  const manifest = QuranSnapshotManifestSchema.make({
    ...identity,
    snapshotId,
  });
  return {
    manifest,
    provenance,
    /** Replays exact source rows and binds them to the finalized snapshot. */
    rows: () => bindRows(snapshotId, streamQuranRows(source)),
  } satisfies PreparedQuranSnapshot;
});

/** Rejects production activation while any signed provenance record is blocked. */
export function requireQuranProductionApproval(
  snapshot: PreparedQuranSnapshot
) {
  if (snapshot.provenance.status === "approved") {
    return Effect.void;
  }
  return Effect.fail(
    new QuranProvenanceBlockedError({
      digest: snapshot.provenance.digest,
    })
  );
}
