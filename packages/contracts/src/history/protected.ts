import { Schema } from "effect";

import { HistoricalSignedContentArtifactSchema } from "#contracts/history/artifact-spec";
import { HistoricalAppLocaleSchema } from "#contracts/history/locale";
import {
  HistoricalPrimitive,
  HistoricalSha256HashSchema,
  historicalQuestionKeyParts,
} from "#contracts/history/primitives";
import { HistoricalSignedContentReleaseSchema } from "#contracts/history/release";
import { HistoricalRendererManifestSchema } from "#contracts/history/renderer";
import {
  hasBoundedProtectedRuntimeResponse,
  MAX_PROTECTED_RUNTIME_SELECTORS,
} from "#contracts/runtime/protected/limits";
import { ContentRuntimeFailureCodeSchema } from "#contracts/runtime/result";

const { ContentKeySchema, CorpusSourcePathSchema, ReleaseIdSchema } =
  HistoricalPrimitive;

/** Opaque durable attempt identity required before retained bytes are read. */
export const StoredAttemptIdSchema = Schema.NonEmptyTrimmedString.pipe(
  Schema.maxLength(256),
  Schema.brand("@NakafaAI/AksaraStoredAttemptId")
);
export type StoredAttemptId = typeof StoredAttemptIdSchema.Type;

/** Checks one retained selector addresses its exact protected body kind. */
function hasHistoricalBodyKind(input: {
  readonly contentKey: string;
  readonly delivery: "authenticated" | "entitled";
}) {
  const separator = input.contentKey.lastIndexOf("/");
  if (separator < 1) {
    return false;
  }
  const root = input.contentKey.slice(0, separator);
  if (historicalQuestionKeyParts(root) === undefined) {
    return false;
  }
  const body = input.contentKey.slice(separator + 1);
  return input.delivery === "authenticated"
    ? body === "question"
    : body === "answer";
}

/** One exact historical artifact selected by an authenticated attempt. */
export const StoredProtectedRuntimeSelectorSchema = Schema.Struct({
  artifactHash: HistoricalSha256HashSchema,
  artifactLocale: HistoricalAppLocaleSchema,
  contentKey: ContentKeySchema,
  delivery: Schema.Literal("authenticated", "entitled"),
}).pipe(
  Schema.filter(hasHistoricalBodyKind, {
    message: () => "Expected one exact retained question or answer body.",
  })
);
export type StoredProtectedRuntimeSelector =
  typeof StoredProtectedRuntimeSelectorSchema.Type;

/** Checks a retained batch never repeats one immutable artifact. */
function hasUniqueSelectors(
  selectors: readonly StoredProtectedRuntimeSelector[]
) {
  const hashes = selectors.map(({ artifactHash }) => artifactHash);
  return new Set(hashes).size === hashes.length;
}

const StoredProtectedRuntimeSelectorsSchema = Schema.Array(
  StoredProtectedRuntimeSelectorSchema
).pipe(
  Schema.minItems(1),
  Schema.maxItems(MAX_PROTECTED_RUNTIME_SELECTORS),
  Schema.filter(hasUniqueSelectors, {
    message: () => "Expected unique retained artifact selectors.",
  })
);

/** Attempt-bound request allowed only after retained ownership is proven. */
export const StoredProtectedRuntimeRequestSchema = Schema.Struct({
  appLocale: HistoricalAppLocaleSchema,
  attemptId: StoredAttemptIdSchema,
  selectors: StoredProtectedRuntimeSelectorsSchema,
  snapshotId: HistoricalSha256HashSchema,
  snapshotReleaseId: ReleaseIdSchema,
});
export type StoredProtectedRuntimeRequest =
  typeof StoredProtectedRuntimeRequestSchema.Type;

/** One exact historical artifact returned in selector order. */
export const StoredProtectedRuntimeItemSchema = Schema.Struct({
  artifact: HistoricalSignedContentArtifactSchema,
  delivery: Schema.Literal("authenticated", "entitled"),
  sourcePath: CorpusSourcePathSchema,
});
export type StoredProtectedRuntimeItem =
  typeof StoredProtectedRuntimeItemSchema.Type;

/** Checks a retained response never repeats one immutable artifact. */
function hasUniqueArtifacts(items: readonly StoredProtectedRuntimeItem[]) {
  const hashes = items.map(({ artifact }) => artifact.artifactHash);
  return new Set(hashes).size === hashes.length;
}

const StoredProtectedRuntimeItemsSchema = Schema.Array(
  StoredProtectedRuntimeItemSchema
).pipe(
  Schema.minItems(1),
  Schema.maxItems(MAX_PROTECTED_RUNTIME_SELECTORS),
  Schema.filter(hasUniqueArtifacts, {
    message: () => "Expected unique retained response artifacts.",
  })
);

/** Authenticated historical bodies returned for one exact retained attempt. */
export const StoredProtectedRuntimeFoundSchema = Schema.Struct({
  appLocale: HistoricalAppLocaleSchema,
  attemptId: StoredAttemptIdSchema,
  items: StoredProtectedRuntimeItemsSchema,
  kind: Schema.Literal("found"),
  release: HistoricalSignedContentReleaseSchema,
  rendererManifest: HistoricalRendererManifestSchema,
  snapshotId: HistoricalSha256HashSchema,
  snapshotManifestHash: HistoricalSha256HashSchema,
  snapshotReleaseId: ReleaseIdSchema,
}).pipe(
  Schema.filter(hasBoundedProtectedRuntimeResponse, {
    message: () => "Expected retained runtime bytes below the wire ceiling.",
  })
);
export type StoredProtectedRuntimeFound =
  typeof StoredProtectedRuntimeFoundSchema.Type;

/** Attempt-bound absence response without historical content bytes. */
export const StoredProtectedRuntimeMissingSchema = Schema.Struct({
  appLocale: HistoricalAppLocaleSchema,
  attemptId: StoredAttemptIdSchema,
  kind: Schema.Literal("missing"),
});

/** Attempt-bound sanitized failure without historical content bytes. */
export const StoredProtectedRuntimeFailureSchema = Schema.Struct({
  appLocale: HistoricalAppLocaleSchema,
  attemptId: StoredAttemptIdSchema,
  code: ContentRuntimeFailureCodeSchema,
  kind: Schema.Literal("failure"),
});

/** Complete read-only response vocabulary for retained attempt delivery. */
export const StoredProtectedRuntimeResponseSchema = Schema.Union(
  StoredProtectedRuntimeFoundSchema,
  StoredProtectedRuntimeMissingSchema,
  StoredProtectedRuntimeFailureSchema
);
export type StoredProtectedRuntimeResponse =
  typeof StoredProtectedRuntimeResponseSchema.Type;
