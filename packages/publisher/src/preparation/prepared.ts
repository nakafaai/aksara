import type { SignedContentArtifact } from "@nakafa/aksara-contracts/content";
import type { ContentProjection } from "@nakafa/aksara-contracts/projection/spec";
import type {
  ContentReleaseItem,
  ContentReleaseManifest,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type { RendererPreflight } from "@nakafa/aksara-contracts/release/policy";
import type { ContentRouteItem } from "@nakafa/aksara-contracts/release/route/spec";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { TryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import type { Stream } from "effect";

import type { PreparedSnapshotSources } from "#publisher/preparation/snapshot";

const PreparedContentReleaseTypeId: unique symbol = Symbol(
  "@NakafaAI/AksaraPreparedContentRelease"
);

/** Shared authenticated streams carried by every prepared release mode. */
interface PreparedContentReleaseBase<E, R>
  extends PreparedSnapshotSources<E, R> {
  /** Replays canonical items authenticated by the immutable manifest. */
  readonly items: Stream.Stream<ContentReleaseItem, E, R>;
  readonly manifest: ContentReleaseManifest;
  /** Replays canonical projections authenticated by the same manifest. */
  readonly projections: Stream.Stream<ContentProjection, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
  /** Replays canonical route changes authenticated by the same manifest. */
  readonly routes: Stream.Stream<ContentRouteItem, E, R>;
  /** Reuses one exact authenticated candidate envelope during deterministic rebuild. */
  readonly storedRelease: SignedContentRelease | null;
  readonly [PreparedContentReleaseTypeId]: true;
}

/** Candidate result plus an optional distinct base pair retained for recovery. */
export interface PreparedTryoutRuntimeTransition {
  readonly recovery: TryoutSnapshot | null;
  readonly result: TryoutSnapshot;
}

/** Exact-Git release whose artifacts must be reproducibly recompiled. */
export interface PreparedGitRelease<E, R>
  extends PreparedContentReleaseBase<E, R> {
  readonly kind: "git";
  readonly rendererPreflight: RendererPreflight;
  readonly tryoutRuntime: PreparedTryoutRuntimeTransition | null;
}

/** Forward rollback whose existing signed artifacts must remain unchanged. */
export interface PreparedRollbackRelease<E, R>
  extends PreparedContentReleaseBase<E, R> {
  /** Replays exact old signed envelopes for every ordered upsert item. */
  readonly artifacts: Stream.Stream<SignedContentArtifact, E, R>;
  readonly kind: "rollback";
}

/** Constructor-private prepared modes accepted by safe publication. */
export type PreparedContentRelease<E, R> =
  | PreparedGitRelease<E, R>
  | PreparedRollbackRelease<E, R>;

/** Creates a private exact-Git value after all preparation proofs pass. */
export function makePreparedGitRelease<E, R>(
  input: Omit<
    PreparedGitRelease<E, R>,
    "kind" | "storedRelease" | typeof PreparedContentReleaseTypeId
  >
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
  input: Omit<
    PreparedRollbackRelease<E, R>,
    "kind" | "storedRelease" | typeof PreparedContentReleaseTypeId
  >
): PreparedRollbackRelease<E, R> {
  return {
    [PreparedContentReleaseTypeId]: true,
    kind: "rollback",
    storedRelease: null,
    ...input,
  };
}
