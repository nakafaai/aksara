/**
 * Single public read-only entrypoint required by retained Nakafa attempts.
 * Implementations stay split by immutable wire ownership below this package
 * boundary so current writers never import historical contracts.
 */

// biome-ignore lint/performance/noBarrelFile: This externally mandated package entrypoint keeps immutable history behind one read-only seam.
export {
  StoredArtifactCompiledByteLengthMismatchError,
  StoredArtifactDecodeError,
  StoredArtifactFieldByteLimitError,
  StoredArtifactHashComputeError,
  StoredArtifactHashMismatchError,
  StoredArtifactSourceHashComputeError,
  StoredArtifactSourceHashMismatchError,
  StoredArtifactWireByteLimitError,
} from "#contracts/history/artifact-spec";
export { verifyStoredTryoutInventory } from "#contracts/history/inventory";
export {
  type StoredTryoutCatalogRow,
  type StoredTryoutInventory,
  StoredTryoutInventoryCountMismatchError,
  StoredTryoutInventoryDecodeError,
  StoredTryoutInventoryDigestMismatchError,
  StoredTryoutInventoryHashError,
  StoredTryoutInventoryOrderError,
  StoredTryoutInventorySnapshotMismatchError,
  type StoredTryoutPlacementRow,
} from "#contracts/history/inventory-spec";
export {
  StoredAttemptIdSchema,
  StoredProtectedRuntimeFailureSchema,
  type StoredProtectedRuntimeFound,
  StoredProtectedRuntimeFoundSchema,
  type StoredProtectedRuntimeItem,
  StoredProtectedRuntimeItemSchema,
  StoredProtectedRuntimeMissingSchema,
  type StoredProtectedRuntimeRequest,
  StoredProtectedRuntimeRequestSchema,
  type StoredProtectedRuntimeResponse,
  StoredProtectedRuntimeResponseSchema,
  type StoredProtectedRuntimeSelector,
  StoredProtectedRuntimeSelectorSchema,
} from "#contracts/history/protected";
export {
  decodeStoredRelease,
  decodeStoredTryoutRow,
  decodeStoredTryoutSnapshot,
  StoredContentHashError,
  StoredReleaseDecodeError,
  StoredReleaseHashMismatchError,
  type StoredTryoutRow,
  StoredTryoutRowDecodeError,
  StoredTryoutRowHashMismatchError,
  StoredTryoutSnapshotDecodeError,
  StoredTryoutSnapshotHashMismatchError,
} from "#contracts/history/read";
export {
  StoredRendererComponentMissingError,
  StoredRendererDecodeError,
  StoredRendererDomainUnpublishedError,
  StoredRendererHashComputeError,
  StoredRendererHashMismatchError,
  StoredRendererVersionUnsupportedError,
} from "#contracts/history/renderer";
export {
  StoredProtectedRuntimeDecodeError,
  StoredProtectedRuntimeMismatchError,
  verifyStoredProtectedContentRuntimeExchange,
} from "#contracts/history/runtime";
