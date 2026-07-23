import type { verifyCompiledContentSourceHash } from "@nakafa/aksara-contracts/artifact/source";
import {
  CompileDocumentSourceSchema,
  CompiledContentPayloadSchema,
  type SignedContentArtifact,
} from "@nakafa/aksara-contracts/content";
import type {
  GitCommitSha,
  ReleaseId,
  Sha256Hash,
} from "@nakafa/aksara-contracts/ids";
import {
  type ContentProjection,
  ContentProjectionSchema,
} from "@nakafa/aksara-contracts/projection/spec";
import type { verifyContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import {
  ContentDeleteSchema,
  type ContentReleaseItem,
  type ContentReleaseManifest,
  ContentUpsertSchema,
  type SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import type { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import type {
  createResultCatalogDigest,
  finalizeResultCatalogDigest,
  updateResultCatalogDigest,
  verifyResultCatalog,
} from "@nakafa/aksara-contracts/release/result-digest";
import { RollbackSnapshotStateSchema } from "@nakafa/aksara-contracts/release/rollback";
import type { verifyRollbackSnapshot } from "@nakafa/aksara-contracts/release/rollback-digest";
import type { ContentRouteItem } from "@nakafa/aksara-contracts/release/route";
import type { digestRoutes } from "@nakafa/aksara-contracts/release/route-digest";
import type { verifyContentRoutes } from "@nakafa/aksara-contracts/release/routes";
import type { ContentSnapshotSet } from "@nakafa/aksara-contracts/release/snapshot";
import type { verifyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot-verify";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { type Effect, Schema, type Stream } from "effect";
import type {
  PreparedContentCoherenceError,
  PreparedContentDecodeError,
  PreparedContentOrderError,
  PreparedContentReplayError,
  PreparedReleaseBaseIdentityError,
  PreparedReleaseIdentityError,
} from "#publisher/preparation/errors";
import type { QuranProvenanceBlockedError } from "#publisher/preparation/provenance";
import type {
  PreparedSnapshotSources,
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
  projection: ContentProjectionSchema,
  source: CompileDocumentSourceSchema,
});

const PreparedContentDeleteSchema = Schema.Struct({
  change: ContentDeleteSchema,
});

/** One authored upsert with every value needed to prove source coherence. */
export type PreparedContentUpsert = typeof PreparedContentUpsertSchema.Type;

/** Complete v1 authored record vocabulary accepted by release preparation. */
export const PreparedContentRecordSchema = Schema.Union(
  PreparedContentUpsertSchema,
  PreparedContentDeleteSchema
);
export type PreparedContentRecord = typeof PreparedContentRecordSchema.Type;

/** One forward record paired with the exact state it replaces. */
export const PreparedContentTransitionSchema = Schema.Struct({
  prior: RollbackSnapshotStateSchema,
  record: PreparedContentRecordSchema,
});
export type PreparedContentTransition =
  typeof PreparedContentTransitionSchema.Type;

/** Replay factory for one canonical authored transition source. */
export type PreparedContentTransitionSource<E, R> = () => Stream.Stream<
  unknown,
  E,
  R
>;

/** Replay factory for one complete canonically ordered result catalog. */
export type PreparedResultCatalogSource<E, R> = () => Stream.Stream<
  ContentHead,
  E,
  R
>;

/** Replay factory for independent public-route transitions. */
export type PreparedRouteSource<E, R> = () => Stream.Stream<
  RouteTransition,
  E,
  R
>;

/** Exact immutable release identity plus its one authored record source. */
export interface PrepareContentReleaseInput<E, R>
  extends SnapshotPreparationSources<E, R> {
  readonly aksaraSha: GitCommitSha;
  readonly baseManifestHash: Sha256Hash | null;
  readonly baseReleaseId: ReleaseId | null;
  readonly baseResultCount: number;
  readonly baseResultDigest: Sha256Hash;
  readonly previousSnapshots: ContentSnapshotSet | null;
  readonly records: PreparedContentTransitionSource<E, R>;
  readonly releaseId: ReleaseId;
  readonly rendererManifest: unknown;
  readonly result: PreparedResultCatalogSource<E, R>;
  readonly routes: PreparedRouteSource<E, R>;
}

type SourceHashError = Effect.Effect.Error<
  ReturnType<typeof verifyCompiledContentSourceHash>
>;

/** Failures possible on every replay of the one authored record source. */
export type PreparedContentStreamError<E> =
  | E
  | PreparedContentCoherenceError
  | PreparedContentDecodeError
  | PreparedContentOrderError
  | PreparedContentReplayError
  | RoutePlanConflictError
  | SourceHashError;

/** Combined replay failures carried by one fully prepared release. */
export type PreparedReleaseStreamError<E> =
  | PreparedContentStreamError<E>
  | PreparedSnapshotStreamError<E>;

const PreparedContentReleaseTypeId: unique symbol = Symbol(
  "@NakafaAI/AksaraPreparedContentRelease"
);

/** Shared authenticated streams carried by every prepared release mode. */
interface PreparedContentReleaseBase<E, R>
  extends PreparedSnapshotSources<E, R> {
  /** Replays canonical items authenticated by the immutable manifest. */
  readonly items: () => Stream.Stream<ContentReleaseItem, E, R>;
  readonly manifest: ContentReleaseManifest;
  /** Replays canonical projections authenticated by the same manifest. */
  readonly projections: () => Stream.Stream<ContentProjection, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
  /** Replays canonical route changes authenticated by the same manifest. */
  readonly routes: () => Stream.Stream<ContentRouteItem, E, R>;
  /** Reuses one exact authenticated candidate envelope during deterministic rebuild. */
  readonly storedRelease: SignedContentRelease | null;
  readonly [PreparedContentReleaseTypeId]: true;
}

/** Exact-Git release whose artifacts must be reproducibly recompiled. */
export interface PreparedGitRelease<E, R>
  extends PreparedContentReleaseBase<E, R> {
  readonly kind: "git";
}

/** Forward rollback whose existing signed artifacts must remain unchanged. */
export interface PreparedRollbackRelease<E, R>
  extends PreparedContentReleaseBase<E, R> {
  /** Replays exact old signed envelopes for every ordered upsert item. */
  readonly artifacts: () => Stream.Stream<SignedContentArtifact, E, R>;
  readonly kind: "rollback";
}

/** Constructor-private prepared modes accepted by safe publication. */
export type PreparedContentRelease<E, R> =
  | PreparedGitRelease<E, R>
  | PreparedRollbackRelease<E, R>;

type ItemVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentReleaseItems<E, R>>
>;

type ProjectionVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentProjections<E, R>>
>;

type RendererManifestError = Effect.Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;

type RouteVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentRoutes<E, R>>
>;

type RouteDigestError<E, R> = Effect.Effect.Error<
  ReturnType<typeof digestRoutes<E, R>>
>;

type RollbackVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyRollbackSnapshot<E, R>>
>;

type ResultVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyResultCatalog<E, R>>
>;

type ResultDigestError =
  | Effect.Effect.Error<ReturnType<typeof createResultCatalogDigest>>
  | Effect.Effect.Error<ReturnType<typeof finalizeResultCatalogDigest>>
  | Effect.Effect.Error<ReturnType<typeof updateResultCatalogDigest>>;

type SnapshotVerificationError<E, R> = Effect.Effect.Error<
  ReturnType<typeof verifyContentSnapshots<E, R, E, R>>
>;

/** Every expected failure surfaced before a release can be signed. */
type PrepareContentReleaseError<E, R> =
  | ItemVerificationError<PreparedContentStreamError<E>, R>
  | PreparedContentStreamError<E>
  | PreparedReleaseBaseIdentityError
  | PreparedReleaseIdentityError
  | QuranProvenanceBlockedError
  | ProjectionVerificationError<PreparedContentStreamError<E>, R>
  | RendererManifestError
  | ResultDigestError
  | ResultVerificationError<E, R>
  | RollbackVerificationError<PreparedContentStreamError<E>, R>
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

/** Creates a private exact-Git value after all preparation proofs pass. */
export function makePreparedGitRelease<E, R>(
  input: PreparedSnapshotSources<E, R> & {
    /** Replays canonical items authenticated by the immutable manifest. */
    readonly items: () => Stream.Stream<ContentReleaseItem, E, R>;
    readonly manifest: ContentReleaseManifest;
    /** Replays canonical projections authenticated by the same manifest. */
    readonly projections: () => Stream.Stream<ContentProjection, E, R>;
    readonly rendererManifest: RendererManifestEnvelope;
    /** Replays canonical route changes authenticated by the same manifest. */
    readonly routes: () => Stream.Stream<ContentRouteItem, E, R>;
  }
): PreparedGitRelease<E, R> {
  return {
    [PreparedContentReleaseTypeId]: true,
    kind: "git",
    storedRelease: null,
    ...input,
  };
}

/** Creates a private rollback value after all preparation proofs pass. */
export function makePreparedRollbackRelease<E, R>(
  input: PreparedSnapshotSources<E, R> & {
    /** Replays exact old signed envelopes for every ordered upsert item. */
    readonly artifacts: () => Stream.Stream<SignedContentArtifact, E, R>;
    /** Replays canonical items authenticated by the immutable manifest. */
    readonly items: () => Stream.Stream<ContentReleaseItem, E, R>;
    readonly manifest: ContentReleaseManifest;
    /** Replays canonical projections authenticated by the same manifest. */
    readonly projections: () => Stream.Stream<ContentProjection, E, R>;
    readonly rendererManifest: RendererManifestEnvelope;
    /** Replays canonical route changes authenticated by the same manifest. */
    readonly routes: () => Stream.Stream<ContentRouteItem, E, R>;
  }
): PreparedRollbackRelease<E, R> {
  return {
    [PreparedContentReleaseTypeId]: true,
    kind: "rollback",
    storedRelease: null,
    ...input,
  };
}
