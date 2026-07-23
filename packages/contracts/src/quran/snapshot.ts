import { Schema } from "effect";

import {
  Ed25519SignatureSchema,
  type Sha256Hash,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import {
  QURAN_CHUNK_COUNT,
  QURAN_LOCALES,
  QURAN_ROW_COUNT,
  QURAN_SEARCH_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_TAFSIR_LOCALES,
  QURAN_VERSE_COUNT,
} from "#contracts/quran/spec";

/** Wire format for the first immutable structured Quran snapshot. */
export const QURAN_SNAPSHOT_FORMAT = "quran-snapshot-v1" as const;

/** Canonical digest for a release that stages no Quran projection rows. */
export const EMPTY_QURAN_PROJECTION_DIGEST = Sha256HashSchema.make(
  "sha256:65d34e1f37f36439534492757157d430a52aeb4f92c1c99abee756bdedc852fc"
);

const CountSchema = Schema.Int.pipe(Schema.nonNegative());
const SourceBytesSchema = Schema.Int.pipe(Schema.positive());

/** Production publication status derived from reviewed provenance records. */
export const QuranProvenanceStatusSchema = Schema.Literal(
  "approved",
  "blocked"
);
export type QuranProvenanceStatus = typeof QuranProvenanceStatusSchema.Type;

/** Checks fixed corpus counts and the aggregate projection count. */
function hasCompleteSnapshotCounts(input: {
  readonly chunkCount: number;
  readonly projectionCount: number;
  readonly searchCount: number;
  readonly surahCount: number;
  readonly verseCount: number;
}) {
  return (
    input.surahCount === QURAN_SURAH_COUNT &&
    input.verseCount === QURAN_VERSE_COUNT &&
    input.chunkCount === QURAN_CHUNK_COUNT &&
    input.searchCount === QURAN_SEARCH_COUNT &&
    input.projectionCount === QURAN_ROW_COUNT
  );
}

/** Immutable identity and completeness proof for one Quran snapshot. */
export const QuranSnapshotManifestSchema = Schema.Struct({
  chunkCount: CountSchema,
  format: Schema.Literal(QURAN_SNAPSHOT_FORMAT),
  locales: Schema.Tuple(
    Schema.Literal(QURAN_LOCALES[0]),
    Schema.Literal(QURAN_LOCALES[1])
  ),
  projectionCount: CountSchema,
  projectionDigest: Sha256HashSchema,
  provenanceDigest: Sha256HashSchema,
  provenanceStatus: QuranProvenanceStatusSchema,
  runtimeCount: CountSchema,
  runtimeDigest: Sha256HashSchema,
  searchCount: CountSchema,
  searchDigest: Sha256HashSchema,
  snapshotId: Sha256HashSchema,
  sourceBytes: SourceBytesSchema,
  sourceDigest: Sha256HashSchema,
  surahCount: CountSchema,
  tafsirLocales: Schema.Tuple(Schema.Literal(QURAN_TAFSIR_LOCALES[0])),
  verseCount: CountSchema,
}).pipe(
  Schema.filter(hasCompleteSnapshotCounts, {
    message: () => "Expected the complete reviewed Quran snapshot counts.",
  }),
  Schema.filter(
    (manifest) =>
      manifest.runtimeCount === manifest.surahCount + manifest.chunkCount &&
      manifest.projectionCount === manifest.runtimeCount + manifest.searchCount,
    {
      message: () =>
        "Expected Quran runtime and search counts to cover every projection.",
    }
  )
);
export type QuranSnapshotManifest = typeof QuranSnapshotManifestSchema.Type;

/** Signed snapshot manifest independently authenticates its structured rows. */
export const SignedQuranSnapshotSchema = Schema.Struct({
  keyId: SigningKeyIdSchema,
  manifest: QuranSnapshotManifestSchema,
  manifestHash: Sha256HashSchema,
  signature: Ed25519SignatureSchema,
});
export type SignedQuranSnapshot = typeof SignedQuranSnapshotSchema.Type;

/** One release's inherited or newly staged Quran snapshot transition. */
export const QuranReleaseStateSchema = Schema.Struct({
  baseSnapshotId: Schema.NullOr(Sha256HashSchema),
  mode: Schema.Literal("inherit", "replace", "restore"),
  projectionCount: CountSchema,
  projectionDigest: Sha256HashSchema,
  resultSnapshotId: Schema.NullOr(Sha256HashSchema),
}).pipe(
  Schema.filter(hasCoherentQuranReleaseState, {
    message: () => "Expected a coherent Quran snapshot release transition.",
  })
);
export type QuranReleaseState = typeof QuranReleaseStateSchema.Type;

/** Returns whether a release stages a complete replacement Quran snapshot. */
export function changesQuranSnapshot(state: {
  readonly baseSnapshotId: Sha256Hash | null;
  readonly resultSnapshotId: Sha256Hash | null;
}) {
  return state.baseSnapshotId !== state.resultSnapshotId;
}

/** Checks inheritance versus full-snapshot staging semantics. */
export function hasCoherentQuranReleaseState(state: {
  readonly baseSnapshotId: Sha256Hash | null;
  readonly mode: "inherit" | "replace" | "restore";
  readonly projectionCount: number;
  readonly projectionDigest: Sha256Hash;
  readonly resultSnapshotId: Sha256Hash | null;
}) {
  if (state.mode === "inherit") {
    return (
      !changesQuranSnapshot(state) &&
      state.projectionCount === 0 &&
      state.projectionDigest === EMPTY_QURAN_PROJECTION_DIGEST
    );
  }
  if (state.mode === "replace") {
    return (
      changesQuranSnapshot(state) &&
      state.resultSnapshotId !== null &&
      state.projectionCount === QURAN_ROW_COUNT
    );
  }
  return (
    changesQuranSnapshot(state) &&
    state.projectionCount === 0 &&
    state.projectionDigest === EMPTY_QURAN_PROJECTION_DIGEST
  );
}

/** Builds a zero-row release that inherits the active Quran snapshot. */
export function inheritQuranSnapshot(
  snapshotId: QuranReleaseState["resultSnapshotId"]
) {
  return QuranReleaseStateSchema.make({
    baseSnapshotId: snapshotId,
    mode: "inherit",
    projectionCount: 0,
    projectionDigest: EMPTY_QURAN_PROJECTION_DIGEST,
    resultSnapshotId: snapshotId,
  });
}

/** Builds a complete replacement transition from one prepared snapshot. */
export function replaceQuranSnapshot(
  baseSnapshotId: QuranReleaseState["baseSnapshotId"],
  snapshot: QuranSnapshotManifest
) {
  return QuranReleaseStateSchema.make({
    baseSnapshotId,
    mode: "replace",
    projectionCount: snapshot.projectionCount,
    projectionDigest: snapshot.projectionDigest,
    resultSnapshotId: snapshot.snapshotId,
  });
}

/** Builds a zero-row forward rollback to an existing immutable snapshot. */
export function restoreQuranSnapshot(
  baseSnapshotId: QuranReleaseState["baseSnapshotId"],
  resultSnapshotId: QuranReleaseState["resultSnapshotId"]
) {
  return QuranReleaseStateSchema.make({
    baseSnapshotId,
    mode: "restore",
    projectionCount: 0,
    projectionDigest: EMPTY_QURAN_PROJECTION_DIGEST,
    resultSnapshotId,
  });
}
