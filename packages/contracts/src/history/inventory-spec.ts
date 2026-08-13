import { Schema } from "effect";

import { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import { HistoricalTryoutSnapshotSchema } from "#contracts/history/tryout";
import {
  type HistoricalTryoutCatalogEnvelope,
  HistoricalTryoutCatalogEnvelopeSchema,
  type HistoricalTryoutPlacementEnvelope,
  HistoricalTryoutPlacementEnvelopeSchema,
} from "#contracts/history/tryout-row";

const NonNegativeCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);
const InventoryKindSchema = Schema.Literal(
  "catalog",
  "country",
  "exam",
  "placement",
  "route",
  "section",
  "set",
  "track"
);
type StoredTryoutInventoryKind = typeof InventoryKindSchema.Type;
const InventoryRowKindSchema = Schema.Literal("catalog", "placement");

export type { StoredTryoutInventoryKind };

export const HistoricalTryoutInventorySchema = Schema.Struct({
  catalog: Schema.Array(HistoricalTryoutCatalogEnvelopeSchema),
  expectedSnapshotId: HistoricalSha256HashSchema,
  placements: Schema.Array(HistoricalTryoutPlacementEnvelopeSchema),
  snapshot: HistoricalTryoutSnapshotSchema,
});

/** Exact retained inventory accepted by the history-only verifier. */
export type StoredTryoutInventory = typeof HistoricalTryoutInventorySchema.Type;

/** Unknown inventory rows do not satisfy the frozen retained contract. */
export class StoredTryoutInventoryDecodeError extends Schema.TaggedError<StoredTryoutInventoryDecodeError>()(
  "StoredTryoutInventoryDecodeError",
  {}
) {
  /** Explains why the retained inventory shape was rejected. */
  get message() {
    return "Stored try-out inventory does not satisfy the immutable history contract.";
  }
}

/** A retained inventory count disagrees with its authenticated snapshot. */
export class StoredTryoutInventoryCountMismatchError extends Schema.TaggedError<StoredTryoutInventoryCountMismatchError>()(
  "StoredTryoutInventoryCountMismatchError",
  {
    actual: NonNegativeCountSchema,
    expected: NonNegativeCountSchema,
    kind: InventoryKindSchema,
  }
) {
  /** Identifies the inventory count that does not close over the snapshot. */
  get message() {
    return `Stored try-out ${this.kind} count ${this.actual} does not match ${this.expected}.`;
  }
}

/** Retained rows are duplicated or outside their exact historical order. */
export class StoredTryoutInventoryOrderError extends Schema.TaggedError<StoredTryoutInventoryOrderError>()(
  "StoredTryoutInventoryOrderError",
  {
    identity: Schema.String,
    previousIdentity: Schema.String,
    rowKind: InventoryRowKindSchema,
  }
) {
  /** Explains which immutable row stream is not canonically ordered. */
  get message() {
    return `Stored try-out ${this.rowKind} row ${this.identity} is not ordered after ${this.previousIdentity}.`;
  }
}

/** Web Crypto could not hash one complete retained row inventory. */
export class StoredTryoutInventoryHashError extends Schema.TaggedError<StoredTryoutInventoryHashError>()(
  "StoredTryoutInventoryHashError",
  { rowKind: InventoryRowKindSchema }
) {
  /** Identifies the retained stream whose aggregate hash failed. */
  get message() {
    return `Stored try-out ${this.rowKind} inventory could not be hashed.`;
  }
}

/** A retained row inventory does not match its snapshot aggregate digest. */
export class StoredTryoutInventoryDigestMismatchError extends Schema.TaggedError<StoredTryoutInventoryDigestMismatchError>()(
  "StoredTryoutInventoryDigestMismatchError",
  {
    actualHash: HistoricalSha256HashSchema,
    expectedHash: HistoricalSha256HashSchema,
    rowKind: InventoryRowKindSchema,
  }
) {
  /** Identifies the aggregate digest that does not authenticate. */
  get message() {
    return `Stored try-out ${this.rowKind} inventory does not match its snapshot digest.`;
  }
}

/** The signed release and retained snapshot select different identities. */
export class StoredTryoutInventorySnapshotMismatchError extends Schema.TaggedError<StoredTryoutInventorySnapshotMismatchError>()(
  "StoredTryoutInventorySnapshotMismatchError",
  {
    actualSnapshotId: HistoricalSha256HashSchema,
    expectedSnapshotId: HistoricalSha256HashSchema,
  }
) {
  /** Explains that the inventory lacks an authenticated release root. */
  get message() {
    return "Stored try-out snapshot does not match the identity selected by its authenticated release.";
  }
}

/** Exact retained catalog envelope accepted by the inventory verifier. */
export type StoredTryoutCatalogRow = HistoricalTryoutCatalogEnvelope;

/** Exact retained placement envelope accepted by the inventory verifier. */
export type StoredTryoutPlacementRow = HistoricalTryoutPlacementEnvelope;
