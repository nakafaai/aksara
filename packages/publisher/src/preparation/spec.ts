import type { verifyCompiledContentSourceHash } from "@nakafaai/aksara-contracts/artifact/source";
import {
  CompileDocumentSourceSchema,
  CompiledContentPayloadSchema,
  type SignedContentArtifact,
} from "@nakafaai/aksara-contracts/content";
import type { GitCommitSha, ReleaseId } from "@nakafaai/aksara-contracts/ids";
import {
  type MaterialLessonProjection,
  MaterialLessonProjectionSchema,
} from "@nakafaai/aksara-contracts/projection/material";
import type { verifyContentProjections } from "@nakafaai/aksara-contracts/projection/verify";
import {
  ContentDeleteSchema,
  type ContentReleaseItem,
  type ContentReleaseManifest,
  ContentUpsertSchema,
} from "@nakafaai/aksara-contracts/release";
import type { verifyContentReleaseItems } from "@nakafaai/aksara-contracts/release/items";
import type { RendererManifestEnvelope } from "@nakafaai/aksara-contracts/renderer/contract";
import type { validateRendererManifestHash } from "@nakafaai/aksara-contracts/renderer/manifest";
import { type Effect, Schema, type Stream } from "effect";
import type {
  PreparedContentCoherenceError,
  PreparedContentDecodeError,
  PreparedContentOrderError,
  PreparedContentReplayError,
  PreparedContentRouteError,
  PreparedReleaseIdentityError,
} from "#publisher/preparation/errors";

const PreparedContentUpsertSchema = Schema.Struct({
  change: ContentUpsertSchema,
  payload: CompiledContentPayloadSchema,
  projection: MaterialLessonProjectionSchema,
  source: CompileDocumentSourceSchema,
});

const PreparedContentDeleteSchema = Schema.Struct({
  change: ContentDeleteSchema,
});

/** One authored upsert with every value needed to prove source coherence. */
export type PreparedContentUpsert = typeof PreparedContentUpsertSchema.Type;

/** One explicit tombstone that carries no artifact or projection body. */
export type PreparedContentDelete = typeof PreparedContentDeleteSchema.Type;

/** Complete v1 authored record vocabulary accepted by release preparation. */
export const PreparedContentRecordSchema = Schema.Union(
  PreparedContentUpsertSchema,
  PreparedContentDeleteSchema
);
export type PreparedContentRecord = typeof PreparedContentRecordSchema.Type;

/** Replay factory for one canonical authored record source. */
export type PreparedContentRecordSource<E, R> = () => Stream.Stream<
  unknown,
  E,
  R
>;

/** Exact immutable release identity plus its one authored record source. */
export interface PrepareContentReleaseInput<E, R> {
  readonly aksaraSha: GitCommitSha;
  readonly baseReleaseId: ReleaseId | null;
  readonly records: PreparedContentRecordSource<E, R>;
  readonly releaseId: ReleaseId;
  readonly rendererManifest: unknown;
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
  | PreparedContentRouteError
  | SourceHashError;

const PreparedContentReleaseTypeId: unique symbol = Symbol(
  "@NakafaAI/AksaraPreparedContentRelease"
);

/** Shared authenticated streams carried by every prepared release mode. */
interface PreparedContentReleaseBase<E, R> {
  /** Replays canonical items authenticated by the immutable manifest. */
  readonly items: () => Stream.Stream<ContentReleaseItem, E, R>;
  readonly manifest: ContentReleaseManifest;
  /** Replays canonical projections authenticated by the same manifest. */
  readonly projections: () => Stream.Stream<MaterialLessonProjection, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
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

/** Every expected failure surfaced before a release can be signed. */
export type PrepareContentReleaseError<E, R> =
  | ItemVerificationError<PreparedContentStreamError<E>, R>
  | PreparedContentStreamError<E>
  | PreparedReleaseIdentityError
  | ProjectionVerificationError<PreparedContentStreamError<E>, R>
  | RendererManifestError;

/** Complete Effect interface for one self-verified release preparation. */
export type PrepareContentRelease = <E, R>(
  input: PrepareContentReleaseInput<E, R>
) => Effect.Effect<
  PreparedGitRelease<PreparedContentStreamError<E>, R>,
  PrepareContentReleaseError<E, R>,
  R
>;

/** Creates a private exact-Git value after all preparation proofs pass. */
export function makePreparedGitRelease<E, R>(input: {
  /** Replays canonical items authenticated by the immutable manifest. */
  readonly items: () => Stream.Stream<ContentReleaseItem, E, R>;
  readonly manifest: ContentReleaseManifest;
  /** Replays canonical projections authenticated by the same manifest. */
  readonly projections: () => Stream.Stream<MaterialLessonProjection, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
}): PreparedGitRelease<E, R> {
  return {
    [PreparedContentReleaseTypeId]: true,
    kind: "git",
    ...input,
  };
}

/** Creates a private rollback value after all preparation proofs pass. */
export function makePreparedRollbackRelease<E, R>(input: {
  /** Replays exact old signed envelopes for every ordered upsert item. */
  readonly artifacts: () => Stream.Stream<SignedContentArtifact, E, R>;
  /** Replays canonical items authenticated by the immutable manifest. */
  readonly items: () => Stream.Stream<ContentReleaseItem, E, R>;
  readonly manifest: ContentReleaseManifest;
  /** Replays canonical projections authenticated by the same manifest. */
  readonly projections: () => Stream.Stream<MaterialLessonProjection, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
}): PreparedRollbackRelease<E, R> {
  return {
    [PreparedContentReleaseTypeId]: true,
    kind: "rollback",
    ...input,
  };
}
