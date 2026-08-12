import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type {
  QuranSnapshotInput,
  QuranSnapshotV3Input,
} from "#contracts/quran/snapshot/spec";

const SNAPSHOT_DOMAIN = "nakafa.aksara.quran-snapshot.v2";
const SNAPSHOT_V3_DOMAIN = "nakafa.aksara.quran-snapshot.v3";

/** Node could not complete a deterministic snapshot hash operation. */
export class QuranSnapshotHashError extends Schema.TaggedError<QuranSnapshotHashError>()(
  "QuranSnapshotHashError",
  { scope: Schema.Literal("snapshot") }
) {}

/** Produces stable identity bytes without the self-referential snapshot ID. */
export function canonicalizeQuranSnapshotIdentity(
  manifest: QuranSnapshotInput
) {
  return JSON.stringify({
    attributionCount: manifest.attributionCount,
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
    sourceFileCount: manifest.sourceFileCount,
    surahCount: manifest.surahCount,
    tafsirLocales: manifest.tafsirLocales,
    verseCount: manifest.verseCount,
  });
}

/** Computes the content identity of one complete Quran snapshot. */
export function hashQuranSnapshot(manifest: QuranSnapshotInput) {
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

/** Produces stable v3 identity bytes without the snapshot ID. */
export function canonicalizeQuranSnapshotV3Identity(
  manifest: QuranSnapshotV3Input
) {
  return JSON.stringify({
    activeAppLocales: manifest.activeAppLocales,
    attributionCount: manifest.attributionCount,
    chunkCount: manifest.chunkCount,
    editorialReviewDigest: manifest.editorialReviewDigest,
    format: manifest.format,
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
    sourceFileCount: manifest.sourceFileCount,
    surahCount: manifest.surahCount,
    tafsirLocales: manifest.tafsirLocales,
    verseCount: manifest.verseCount,
  });
}

/** Computes the content identity of one complete v3 Quran snapshot. */
export function hashQuranSnapshotV3(manifest: QuranSnapshotV3Input) {
  return Effect.try({
    catch: () => new QuranSnapshotHashError({ scope: "snapshot" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(
            `${SNAPSHOT_V3_DOMAIN}\n${canonicalizeQuranSnapshotV3Identity(
              manifest
            )}`
          )
          .digest("hex")}`
      ),
  });
}
