import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import {
  makeQuranProvenanceManifest,
  type QuranProvenanceManifest,
} from "@nakafa/aksara-contracts/quran/provenance";
import { digestQuranRows } from "@nakafa/aksara-contracts/quran/snapshot/digest";
import { makeQuranSnapshot } from "@nakafa/aksara-contracts/quran/snapshot/hash";
import type {
  QuranRowPayload,
  QuranSnapshotRow,
} from "@nakafa/aksara-contracts/quran/snapshot/row";
import {
  bindQuranRow,
  hashQuranRow,
  type QuranRowHashError,
} from "@nakafa/aksara-contracts/quran/snapshot/row-hash";
import {
  type QuranSnapshot,
  QuranSnapshotFactsSchema,
} from "@nakafa/aksara-contracts/quran/snapshot/spec";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { Effect, Stream } from "effect";

import {
  type QuranProjectionError,
  streamQuranRows,
} from "#corpus/quran/projection";
import { quranProvenanceRecords } from "#corpus/quran/provenance";
import { loadVerifiedQuranSource } from "#corpus/quran/source/integrity";

type PreparedQuranRowError = QuranRowHashError | QuranProjectionError;

/** Replayable complete snapshot prepared from one exact Quran source. */
export interface PreparedQuranSnapshot {
  readonly manifest: QuranSnapshot;
  readonly provenance: QuranProvenanceManifest;
  /** Replays every content-addressed row bound to the snapshot identity. */
  readonly rows: () => Stream.Stream<QuranSnapshotRow, PreparedQuranRowError>;
}

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
)(function* (input: { readonly checkoutRoot: string }) {
  const verifiedSource = yield* loadVerifiedQuranSource(input.checkoutRoot);
  const provenance = yield* makeQuranProvenanceManifest({
    activeAppLocales: ACTIVE_APP_LOCALES,
    records: quranProvenanceRecords,
  });
  const rowSummary = yield* digestQuranRows({
    activeAppLocales: ACTIVE_APP_LOCALES,
    rows: rowHashStream(streamQuranRows(verifiedSource.source)),
  });
  const facts = QuranSnapshotFactsSchema.make({
    activeAppLocales: ACTIVE_APP_LOCALES,
    attributionCount: rowSummary.attributionCount,
    chunkCount: rowSummary.chunkCount,
    projectionCount: rowSummary.projectionCount,
    projectionDigest: rowSummary.projectionDigest,
    provenanceDigest: provenance.digest,
    provenanceStatus: provenance.status,
    runtimeCount: rowSummary.runtimeCount,
    runtimeDigest: rowSummary.runtimeDigest,
    searchCount: rowSummary.searchCount,
    searchDigest: rowSummary.searchDigest,
    sourceBytes: verifiedSource.summary.byteCount,
    sourceDigest: verifiedSource.summary.digest,
    sourceFileCount: verifiedSource.summary.fileCount,
    surahCount: QURAN_SURAH_COUNT,
    tafsirLocales: ["id"],
    verseCount: QURAN_VERSE_COUNT,
  });
  const manifest = yield* makeQuranSnapshot(facts);
  return {
    manifest,
    provenance,
    /** Replays exact source rows and binds them to the finalized snapshot. */
    rows: () =>
      bindRows(manifest.snapshotId, streamQuranRows(verifiedSource.source)),
  } satisfies PreparedQuranSnapshot;
});
