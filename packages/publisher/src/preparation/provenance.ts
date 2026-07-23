import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { ContentSnapshotManifest } from "@nakafa/aksara-contracts/release/snapshot-data";
import { Effect, Schema } from "effect";

/** A Git release attempted to replace Quran with unapproved source provenance. */
export class QuranProvenanceBlockedError extends Schema.TaggedError<QuranProvenanceBlockedError>()(
  "QuranProvenanceBlockedError",
  { provenanceDigest: Sha256HashSchema }
) {}

/** Rejects Quran replacement until every source scope has approved provenance. */
export function requireSnapshotProvenance(
  snapshot: ContentSnapshotManifest
): Effect.Effect<void, QuranProvenanceBlockedError> {
  if (
    snapshot.family !== "quran" ||
    snapshot.manifest.provenanceStatus === "approved"
  ) {
    return Effect.void;
  }
  return Effect.fail(
    new QuranProvenanceBlockedError({
      provenanceDigest: snapshot.manifest.provenanceDigest,
    })
  );
}
