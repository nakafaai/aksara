import { Effect, Schema } from "effect";
import { hashText } from "#contracts/hash/text";
import {
  HistoricalPrimitive,
  HistoricalSha256HashSchema,
} from "#contracts/history/primitives";
import { HistoricalSignedContentReleaseSchema } from "#contracts/history/release";
import {
  canonicalizeHistoricalContentReleaseManifest,
  historicalReleaseSigningInput,
} from "#contracts/history/release-bytes";
import {
  canonicalizeHistoricalTryoutSnapshot,
  HISTORICAL_TRYOUT_SNAPSHOT_DOMAIN,
  HistoricalTryoutSnapshotSchema,
} from "#contracts/history/tryout";
import {
  canonicalizeHistoricalTryoutCatalog,
  canonicalizeHistoricalTryoutPlacement,
  HISTORICAL_TRYOUT_CATALOG_DOMAIN,
  HISTORICAL_TRYOUT_PLACEMENT_DOMAIN,
} from "#contracts/history/tryout-bytes";
import {
  type HistoricalTryoutRow,
  HistoricalTryoutRowSchema,
} from "#contracts/history/tryout-row";
import { verifyEd25519Signature } from "#contracts/signature/verify";

const { ReleaseIdSchema } = HistoricalPrimitive;
const Sha256HashSchema = HistoricalSha256HashSchema;

/** Unknown retained release bytes do not satisfy the immutable old contract. */
export class StoredReleaseDecodeError extends Schema.TaggedError<StoredReleaseDecodeError>()(
  "StoredReleaseDecodeError",
  {}
) {
  /** Explains why unknown retained release bytes were rejected. */
  get message() {
    return "Stored release bytes do not satisfy the immutable history contract.";
  }
}

/** A retained release hash does not authenticate its exact old manifest. */
export class StoredReleaseHashMismatchError extends Schema.TaggedError<StoredReleaseHashMismatchError>()(
  "StoredReleaseHashMismatchError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {
  /** Identifies the retained release whose hash did not authenticate. */
  get message() {
    return `Stored release ${this.releaseId} does not match its manifest hash.`;
  }
}

/** Web Crypto could not hash one retained immutable object. */
export class StoredContentHashError extends Schema.TaggedError<StoredContentHashError>()(
  "StoredContentHashError",
  { subject: Schema.Literals(["release", "tryout-row", "tryout-snapshot"]) }
) {
  /** Identifies which retained object could not be hashed. */
  get message() {
    return `Stored ${this.subject} bytes could not be hashed.`;
  }
}

/** Unknown retained try-out bytes do not satisfy the immutable old contract. */
export class StoredTryoutSnapshotDecodeError extends Schema.TaggedError<StoredTryoutSnapshotDecodeError>()(
  "StoredTryoutSnapshotDecodeError",
  {}
) {
  /** Explains why unknown retained try-out bytes were rejected. */
  get message() {
    return "Stored try-out snapshot bytes do not satisfy the immutable history contract.";
  }
}

/** A retained try-out snapshot ID does not authenticate its exact old facts. */
export class StoredTryoutSnapshotHashMismatchError extends Schema.TaggedError<StoredTryoutSnapshotHashMismatchError>()(
  "StoredTryoutSnapshotHashMismatchError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
  }
) {
  /** Explains that the retained snapshot identity did not authenticate. */
  get message() {
    return "Stored try-out snapshot does not match its content-addressed identity.";
  }
}

/** Unknown retained row bytes do not satisfy the immutable old contract. */
export class StoredTryoutRowDecodeError extends Schema.TaggedError<StoredTryoutRowDecodeError>()(
  "StoredTryoutRowDecodeError",
  {}
) {
  /** Explains why unknown retained row bytes were rejected. */
  get message() {
    return "Stored try-out row bytes do not satisfy the immutable history contract.";
  }
}

/** A retained row hash does not authenticate its exact old row facts. */
export class StoredTryoutRowHashMismatchError extends Schema.TaggedError<StoredTryoutRowHashMismatchError>()(
  "StoredTryoutRowHashMismatchError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
    rowKind: Schema.Literals(["catalog", "placement"]),
  }
) {
  /** Identifies the retained row kind whose bytes did not authenticate. */
  get message() {
    return `Stored try-out ${this.rowKind} row does not match its content-addressed identity.`;
  }
}

/** Hashes canonical immutable bytes with one explicit history domain. */
function hashStoredContent(
  parts: readonly string[],
  subject: "release" | "tryout-row" | "tryout-snapshot"
) {
  return hashText(parts.join("")).pipe(
    Effect.mapError(() => new StoredContentHashError({ subject }))
  );
}

/** Authenticates immutable release bytes retained by existing user history. */
export const decodeStoredRelease = Effect.fn(
  "AksaraContracts.decodeStoredRelease"
)(function* (input: unknown) {
  const release = yield* Schema.decodeUnknownEffect(
    HistoricalSignedContentReleaseSchema
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(() => new StoredReleaseDecodeError())
  );
  const actualHash = yield* hashStoredContent(
    [canonicalizeHistoricalContentReleaseManifest(release.manifest)],
    "release"
  );
  if (actualHash !== release.manifestHash) {
    return yield* new StoredReleaseHashMismatchError({
      actualHash,
      expectedHash: release.manifestHash,
      releaseId: release.manifest.releaseId,
    });
  }
  yield* verifyEd25519Signature({
    keyId: release.keyId,
    message: historicalReleaseSigningInput(
      release.manifestHash,
      release.manifest
    ),
    signature: release.signature,
    subject: "release",
  });
  return release;
});

/** Authenticates one immutable try-out snapshot retained by user attempts. */
export const decodeStoredTryoutSnapshot = Effect.fn(
  "AksaraContracts.decodeStoredTryoutSnapshot"
)(function* (input: unknown) {
  const snapshot = yield* Schema.decodeUnknownEffect(
    HistoricalTryoutSnapshotSchema
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(() => new StoredTryoutSnapshotDecodeError())
  );
  const actualHash = yield* hashStoredContent(
    [
      HISTORICAL_TRYOUT_SNAPSHOT_DOMAIN,
      "\n",
      canonicalizeHistoricalTryoutSnapshot(snapshot),
    ],
    "tryout-snapshot"
  );
  if (actualHash !== snapshot.snapshotId) {
    return yield* new StoredTryoutSnapshotHashMismatchError({
      actualHash,
      expectedHash: snapshot.snapshotId,
    });
  }
  return snapshot;
});

/** Authenticates one immutable catalog or placement row retained by attempts. */
export const decodeStoredTryoutRow = Effect.fn(
  "AksaraContracts.decodeStoredTryoutRow"
)(function* (input: unknown) {
  const envelope = yield* Schema.decodeUnknownEffect(HistoricalTryoutRowSchema)(
    input,
    { onExcessProperty: "error" }
  ).pipe(Effect.mapError(() => new StoredTryoutRowDecodeError()));
  const domain =
    envelope.rowKind === "catalog"
      ? HISTORICAL_TRYOUT_CATALOG_DOMAIN
      : HISTORICAL_TRYOUT_PLACEMENT_DOMAIN;
  const canonical =
    envelope.rowKind === "catalog"
      ? canonicalizeHistoricalTryoutCatalog(envelope.record.row)
      : canonicalizeHistoricalTryoutPlacement(envelope.record.row);
  const actualHash = yield* hashStoredContent(
    [domain, "\n", canonical],
    "tryout-row"
  );
  if (actualHash !== envelope.record.rowHash) {
    return yield* new StoredTryoutRowHashMismatchError({
      actualHash,
      expectedHash: envelope.record.rowHash,
      rowKind: envelope.rowKind,
    });
  }
  return envelope;
});

/** Semantic retained row result exposed only through the read-only history seam. */
export type StoredTryoutRow = HistoricalTryoutRow;
