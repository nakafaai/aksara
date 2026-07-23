import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { QuranSnapshotManifest } from "#contracts/quran/snapshot";

const SNAPSHOT_DOMAIN = "nakafa.aksara.quran-snapshot.v1";

/** Node could not complete a deterministic snapshot hash operation. */
export class QuranSnapshotHashError extends Schema.TaggedError<QuranSnapshotHashError>()(
  "QuranSnapshotHashError",
  { scope: Schema.Literal("snapshot") }
) {}

/** Produces stable identity bytes without the self-referential snapshot ID. */
export function canonicalizeQuranSnapshotIdentity(
  manifest: Omit<QuranSnapshotManifest, "snapshotId">
) {
  return JSON.stringify({
    chunkCount: manifest.chunkCount,
    format: manifest.format,
    locales: manifest.locales,
    projectionCount: manifest.projectionCount,
    projectionDigest: manifest.projectionDigest,
    provenanceDigest: manifest.provenanceDigest,
    provenanceStatus: manifest.provenanceStatus,
    runtimeCount: manifest.runtimeCount,
    runtimeDigest: manifest.runtimeDigest,
    searchCount: manifest.searchCount,
    searchDigest: manifest.searchDigest,
    sourceBytes: manifest.sourceBytes,
    sourceDigest: manifest.sourceDigest,
    surahCount: manifest.surahCount,
    tafsirLocales: manifest.tafsirLocales,
    verseCount: manifest.verseCount,
  });
}

/** Computes the content identity of one complete Quran snapshot. */
export function hashQuranSnapshot(
  manifest: Omit<QuranSnapshotManifest, "snapshotId">
) {
  return Effect.try({
    catch: () => new QuranSnapshotHashError({ scope: "snapshot" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(
            `${SNAPSHOT_DOMAIN}\n${canonicalizeQuranSnapshotIdentity(manifest)}`
          )
          .digest("hex")}`
      ),
  });
}
