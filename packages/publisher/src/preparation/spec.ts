import type { verifyCompiledContentSourceHash } from "@nakafa/aksara-contracts/artifact/source";
import {
  CompileDocumentSourceSchema,
  CompiledContentPayloadSchema,
} from "@nakafa/aksara-contracts/content";
import type {
  GitCommitSha,
  ReleaseId,
  Sha256Hash,
} from "@nakafa/aksara-contracts/ids";
import type { ActiveAppLocaleList } from "@nakafa/aksara-contracts/locale";
import { CurrentContentProjectionSchema } from "@nakafa/aksara-contracts/projection/spec";
import type { verifyContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import {
  ContentDeleteSchema,
  ContentUpsertSchema,
} from "@nakafa/aksara-contracts/release";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import type { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import type { verifyReleasePolicyTransition } from "@nakafa/aksara-contracts/release/policy";
import type {
  createResultCatalogDigest,
  finalizeResultCatalogDigest,
  updateResultCatalogDigest,
  verifyResultCatalog,
} from "@nakafa/aksara-contracts/release/result/digest";
import type { verifyRollbackSnapshot } from "@nakafa/aksara-contracts/release/rollback/digest";
import { RollbackSnapshotStateSchema } from "@nakafa/aksara-contracts/release/rollback/spec";
import type { digestRoutes } from "@nakafa/aksara-contracts/release/route/digest";
import type { verifyContentRoutes } from "@nakafa/aksara-contracts/release/route/verify";
import type {
  GitPublicationScope,
  verifyGitPublicationScope,
} from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { ContentSnapshotSet } from "@nakafa/aksara-contracts/release/snapshot/spec";
import type { verifyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/verify";
import type { verifyContentRendererCompatibility } from "@nakafa/aksara-contracts/renderer/compatibility";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { type Effect, Schema, type Stream } from "effect";
import type {
  PreparedContentCoherenceError,
  PreparedContentDecodeError,
  PreparedContentOrderError,
  PreparedReleaseBaseIdentityError,
  PreparedReleaseIdentityError,
  PreparedSnapshotScopeError,
  PreparedTryoutRuntimeMissingError,
  PreparedTryoutRuntimeSnapshotError,
  PreparedTryoutRuntimeTransitionError,
} from "#publisher/preparation/errors";
import type {
  PreparedGitRelease,
  PreparedTryoutRuntimeTransition,
} from "#publisher/preparation/prepared";
import type { QuranProvenanceBlockedError } from "#publisher/preparation/provenance";
import type {
  PreparedSnapshotStreamError,
  SnapshotPreparationSources,
} from "#publisher/preparation/snapshot";
import type {
  RoutePlanConflictError,
  RouteTransition,
} from "#publisher/routes";

const PreparedContentUpsertSchema = Schema.Struct({
  change: ContentUpsertSchema,
  payload: CompiledContentPayloadSchema,
  projection: CurrentContentProjectionSchema,
  source: CompileDocumentSourceSchema,
});

const PreparedContentDeleteSchema = Schema.Struct({
  change: ContentDeleteSchema,
});

/** One authored upsert with every value needed to prove source coherence. */
export type PreparedContentUpsert = typeof PreparedContentUpsertSchema.Type;

/** Complete authored record vocabulary accepted by release preparation. */
export const PreparedContentRecordSchema = Schema.Union([
  PreparedContentUpsertSchema,
  PreparedContentDeleteSchema,
]);
export type PreparedContentRecord = typeof PreparedContentRecordSchema.Type;

/** One forward record paired with the exact state it replaces. */
export const PreparedContentTransitionSchema = Schema.Struct({
  prior: RollbackSnapshotStateSchema,
  record: PreparedContentRecordSchema,
});
export type PreparedContentTransition =
  typeof PreparedContentTransitionSchema.Type;

/** Replay factory for one canonical authored transition source. */
export type PreparedContentTransitionSource<E, R> = Stream.Stream<
  unknown,
  E,
  R
>;

/** Replay factory for one complete canonically ordered result catalog. */
export type PreparedResultCatalogSource<E, R> = Stream.Stream<
  ContentHead,
  E,
  R
>;

/** Replay factory for independent public-route transitions. */
export type PreparedRouteSource<E, R> = Stream.Stream<RouteTransition, E, R>;

/** Exact immutable release identity plus its one authored record source. */
export interface PrepareContentReleaseInput<E, R>
  extends SnapshotPreparationSources<E, R> {
  readonly aksaraSha: GitCommitSha;
  readonly baseActiveAppLocales: ActiveAppLocaleList | null;
  readonly baseManifestHash: Sha256Hash | null;
  readonly baseReleaseId: ReleaseId | null;
  readonly baseRendererManifestHash: Sha256Hash | null;
  readonly baseResultCount: number;
  readonly baseResultDigest: Sha256Hash;
  readonly previousSnapshots: ContentSnapshotSet | null;
  readonly records: PreparedContentTransitionSource<E, R>;
  readonly releaseId: ReleaseId;
  readonly rendererManifest: unknown;
  readonly result: PreparedResultCatalogSource<E, R>;
  readonly routes: PreparedRouteSource<E, R>;
  readonly scope: GitPublicationScope;
  /** Candidate runtime pair plus an optional distinct retained inverse. */
  readonly tryoutRuntime: PreparedTryoutRuntimeTransition | null;
}

type SourceHashError = Effect.Error<
  ReturnType<typeof verifyCompiledContentSourceHash>
>;

/** Failures possible on every replay of the one authored record source. */
export type PreparedContentStreamError<E> =
  | E
  | PreparedContentCoherenceError
  | PreparedContentDecodeError
  | PreparedContentOrderError
  | RoutePlanConflictError
  | SourceHashError;

/** Combined replay failures carried by one fully prepared release. */
export type PreparedReleaseStreamError<E> =
  | PreparedContentStreamError<E>
  | PreparedSnapshotStreamError<E>;

type ItemVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyContentReleaseItems<E, R>>
>;

type ProjectionVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyContentProjections<E, R>>
>;

type RendererManifestError = Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;

type RendererCompatibilityError = Effect.Error<
  ReturnType<typeof verifyContentRendererCompatibility>
>;

type RouteVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyContentRoutes<E, R>>
>;

type RouteDigestError<E, R> = Effect.Error<
  ReturnType<typeof digestRoutes<E, R>>
>;

type RollbackVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyRollbackSnapshot<E, R>>
>;

type ResultVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyResultCatalog<E, R>>
>;

type ResultDigestError =
  | Effect.Error<ReturnType<typeof createResultCatalogDigest>>
  | Effect.Error<ReturnType<typeof finalizeResultCatalogDigest>>
  | Effect.Error<ReturnType<typeof updateResultCatalogDigest>>;

type SnapshotVerificationError<E, R> = Effect.Error<
  ReturnType<typeof verifyContentSnapshots<E, R, E, R>>
>;

type SnapshotPolicyError = Effect.Error<
  ReturnType<typeof verifyReleasePolicyTransition>
>;

type GitScopeError = Effect.Error<ReturnType<typeof verifyGitPublicationScope>>;

/** Every expected failure surfaced before a release can be signed. */
type PrepareContentReleaseError<E, R> =
  | ItemVerificationError<PreparedContentStreamError<E>, R>
  | PreparedContentStreamError<E>
  | PreparedReleaseBaseIdentityError
  | PreparedReleaseIdentityError
  | PreparedSnapshotScopeError
  | PreparedTryoutRuntimeMissingError
  | PreparedTryoutRuntimeSnapshotError
  | PreparedTryoutRuntimeTransitionError
  | GitScopeError
  | QuranProvenanceBlockedError
  | ProjectionVerificationError<PreparedContentStreamError<E>, R>
  | RendererCompatibilityError
  | RendererManifestError
  | ResultDigestError
  | ResultVerificationError<E, R>
  | RollbackVerificationError<PreparedContentStreamError<E>, R>
  | SnapshotPolicyError
  | SnapshotVerificationError<E, R>
  | RouteDigestError<PreparedContentStreamError<E>, R>
  | RouteVerificationError<PreparedContentStreamError<E>, R>;

/** Complete Effect interface for one self-verified release preparation. */
export type PrepareContentRelease = <E, R>(
  input: PrepareContentReleaseInput<E, R>
) => Effect.Effect<
  PreparedGitRelease<PreparedReleaseStreamError<E>, R>,
  PrepareContentReleaseError<E, R>,
  R
>;
