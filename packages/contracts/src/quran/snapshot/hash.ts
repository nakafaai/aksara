import { Effect } from "effect";

import { hashText } from "#contracts/hash/text";
import {
  QURAN_SNAPSHOT_FORMAT,
  type QuranSnapshot,
  type QuranSnapshotFacts,
  QuranSnapshotSchema,
} from "#contracts/quran/snapshot/spec";
import { encodeJsonText } from "#contracts/text/json";

const SNAPSHOT_DOMAIN = "nakafa.aksara.localized-quran-snapshot";

/** Serializes Quran snapshot facts in stable signed field order. */
export function canonicalizeQuranSnapshot(input: QuranSnapshotFacts) {
  return encodeJsonText({
    activeAppLocales: input.activeAppLocales,
    attributionCount: input.attributionCount,
    chunkCount: input.chunkCount,
    format: QURAN_SNAPSHOT_FORMAT,
    projectionCount: input.projectionCount,
    projectionDigest: input.projectionDigest,
    provenanceDigest: input.provenanceDigest,
    provenanceStatus: input.provenanceStatus,
    runtimeCount: input.runtimeCount,
    runtimeDigest: input.runtimeDigest,
    searchCount: input.searchCount,
    searchDigest: input.searchDigest,
    sourceBytes: input.sourceBytes,
    sourceDigest: input.sourceDigest,
    sourceFileCount: input.sourceFileCount,
    surahCount: input.surahCount,
    tafsirLocales: input.tafsirLocales,
    verseCount: input.verseCount,
  });
}

/** Creates the content-addressed identity of one complete Quran snapshot. */
export const makeQuranSnapshot = Effect.fn("AksaraContracts.makeQuranSnapshot")(
  function* (input: QuranSnapshotFacts) {
    const snapshotId = yield* hashText(
      `${SNAPSHOT_DOMAIN}\n${canonicalizeQuranSnapshot(input)}`
    );
    return QuranSnapshotSchema.make({
      ...input,
      format: QURAN_SNAPSHOT_FORMAT,
      snapshotId,
    });
  }
);

/** Recomputes the content identity of one stored current snapshot. */
export function verifyQuranSnapshotHash(snapshot: QuranSnapshot) {
  const { format: _format, snapshotId: _snapshotId, ...facts } = snapshot;
  return makeQuranSnapshot(facts).pipe(Effect.map((value) => value.snapshotId));
}
