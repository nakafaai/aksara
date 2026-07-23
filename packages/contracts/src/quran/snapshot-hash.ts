import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { type Sha256Hash, Sha256HashSchema } from "#contracts/ids";
import type { QuranSnapshotManifest } from "#contracts/quran/snapshot";

const SNAPSHOT_DOMAIN = "nakafa.aksara.quran-snapshot.v1";
const MANIFEST_DOMAIN = "nakafa.aksara.quran-manifest.v1";
const SIGNATURE_DOMAIN = "nakafa.aksara.quran-signature.v1";

/** Node could not complete a deterministic snapshot hash operation. */
export class QuranSnapshotHashError extends Schema.TaggedError<QuranSnapshotHashError>()(
  "QuranSnapshotHashError",
  { scope: Schema.Literal("manifest", "snapshot") }
) {}

/** Produces stable identity bytes without the self-referential snapshot ID. */
export function canonicalizeQuranSnapshotIdentity(
  manifest: Omit<QuranSnapshotManifest, "snapshotId">
) {
  return JSON.stringify(manifest);
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

/** Produces stable JSON for the complete self-identifying snapshot manifest. */
export function canonicalizeQuranSnapshotManifest(
  manifest: QuranSnapshotManifest
) {
  return JSON.stringify(manifest);
}

/** Computes the envelope hash for one complete Quran snapshot manifest. */
export function hashQuranSnapshotManifest(manifest: QuranSnapshotManifest) {
  return Effect.try({
    catch: () => new QuranSnapshotHashError({ scope: "manifest" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(
            `${MANIFEST_DOMAIN}\n${canonicalizeQuranSnapshotManifest(manifest)}`
          )
          .digest("hex")}`
      ),
  });
}

/** Returns canonical bytes covered by the snapshot Ed25519 signature. */
export function canonicalizeQuranSigningInput(
  manifestHash: Sha256Hash,
  manifest: QuranSnapshotManifest
) {
  return `${SIGNATURE_DOMAIN}\n${manifestHash}\n${canonicalizeQuranSnapshotManifest(manifest)}`;
}
