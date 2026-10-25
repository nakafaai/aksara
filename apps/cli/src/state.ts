import {
  GitCommitShaSchema,
  type ReleaseId,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";

import {
  type ContentReleaseCurrent,
  type StagedContentRelease,
  StagedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release/current/state";
import {
  type ContentReleaseBundle,
  ContentReleaseBundleSchema,
} from "@nakafa/aksara-contracts/release/lifecycle";
import {
  canonicalizePublicationScope,
  PublicationScopeSchema,
} from "@nakafa/aksara-contracts/release/snapshot/scope";
import { SignedTryoutRuntimeBundleSchema } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import type { PublicationRetentionDecision } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, Schema } from "effect";
import type { ReleaseArguments } from "#cli/production/arguments";
import { encodeJsonText } from "#cli/text/json";

/**
 * Durable publication state does not permit the requested production command.
 *
 * The reason alone is not actionable, because the operator cannot name the
 * release that owns the blocking slot. Each optional identity names the exact
 * durable release that owns that slot, so `activeReleaseId` and
 * `recoveryReleaseId` form the pair an operator passes to `accept`.
 */
export class ProductionStateError extends Schema.TaggedError<
  ProductionStateError,
  { readonly brand: unique symbol }
>()("ProductionStateError", {
  activeReleaseId: Schema.optional(ReleaseIdSchema),
  candidateReleaseId: Schema.optional(ReleaseIdSchema),
  reason: Schema.Literals([
    "aborting",
    "bootstrap-base",
    "mode-mismatch",
    "candidate-conflict",
    "recovery-conflict",
    "recovery-retained",
    "scope-mismatch",
  ]),
  recoveryReleaseId: Schema.optional(ReleaseIdSchema),
}) {}

const NewActionSchema = Schema.Struct({
  baseBundle: Schema.NullOr(ContentReleaseBundleSchema),
  baseTryoutRuntimeBundle: Schema.NullOr(SignedTryoutRuntimeBundleSchema),
  kind: Schema.Literal("new"),
  scope: PublicationScopeSchema,
});
const RebuildActionSchema = Schema.Struct({
  baseBundle: Schema.NullOr(ContentReleaseBundleSchema),
  baseTryoutRuntimeBundle: Schema.NullOr(SignedTryoutRuntimeBundleSchema),
  candidate: StagedContentReleaseSchema,
  kind: Schema.Literal("rebuild"),
  scope: PublicationScopeSchema,
  sha: GitCommitShaSchema,
});
const ResumeActionSchema = Schema.Struct({
  bundle: ContentReleaseBundleSchema,
  kind: Schema.Literal("resume"),
  sha: GitCommitShaSchema,
});
const ProductionStateActionSchema = Schema.Union([
  NewActionSchema,
  RebuildActionSchema,
  ResumeActionSchema,
]);

/** Exact production work selected from authoritative durable target state. */
type ProductionStateAction = typeof ProductionStateActionSchema.Type;
/** The rebuild variant of the production work, which restores one exact candidate. */
export type ProductionRebuildAction = typeof RebuildActionSchema.Type;

const StoredCommandSchema = Schema.Struct({
  scope: PublicationScopeSchema,
  sha: GitCommitShaSchema,
});
type StoredCommand = typeof StoredCommandSchema.Type;
type ValidateStoredCommand = (
  args: ReleaseArguments,
  bundle: ContentReleaseBundle
) => Effect.Effect<StoredCommand, ProductionStateError>;

type SelectProductionAction = (
  args: ReleaseArguments,
  current: ContentReleaseCurrent
) => Effect.Effect<ProductionStateAction, ProductionStateError>;

/** Returns the immutable bundle from one active release snapshot. */
function activeBundle(active: NonNullable<ContentReleaseCurrent["active"]>) {
  const { receipt: _receipt, ...bundle } = active;
  return bundle;
}

/** Names the one retained inverse a retention decision expects, if it keeps one. */
function expectedRecoveryId(
  retention: PublicationRetentionDecision
): ReleaseId | null {
  return retention.kind === "inverse" ? retention.recoveryId : null;
}

/** Returns stored provenance only when command mode and identity match it. */
const validateStoredCommand: ValidateStoredCommand = Effect.fn(
  "AksaraCli.validateStoredCommand"
)(function* (args: ReleaseArguments, bundle: ContentReleaseBundle) {
  const { manifest } = bundle.release;
  if (
    encodeJsonText(canonicalizePublicationScope(args.scope)) !==
    encodeJsonText(canonicalizePublicationScope(manifest.scope))
  ) {
    return yield* new ProductionStateError({ reason: "scope-mismatch" });
  }
  if (manifest.origin.kind !== "git") {
    return yield* new ProductionStateError({ reason: "mode-mismatch" });
  }
  return {
    scope: args.scope,
    sha: manifest.origin.sha,
  } satisfies StoredCommand;
});

/** Restores one exact staged candidate after validating its current context. */
const selectRebuildAction = Effect.fn("AksaraCli.selectRebuildAction")(
  function* (
    args: ReleaseArguments,
    current: ContentReleaseCurrent,
    candidate: StagedContentRelease
  ) {
    if (candidate.release.manifest.releaseId !== args.releaseId) {
      return yield* new ProductionStateError({
        candidateReleaseId: candidate.release.manifest.releaseId,
        reason: "candidate-conflict",
      });
    }
    const stored: StoredCommand = yield* validateStoredCommand(args, candidate);
    if (candidate.phase === "aborting") {
      return yield* new ProductionStateError({
        candidateReleaseId: candidate.release.manifest.releaseId,
        reason: "aborting",
      });
    }
    if (
      args.retention.kind === "bootstrap" &&
      candidate.release.manifest.baseReleaseId !== args.retention.baseReleaseId
    ) {
      return yield* new ProductionStateError({
        candidateReleaseId: candidate.release.manifest.releaseId,
        reason: "bootstrap-base",
      });
    }
    const retainedId = current.recovery?.release.manifest.releaseId ?? null;
    if (
      retainedId !== null &&
      retainedId !== expectedRecoveryId(args.retention)
    ) {
      return yield* new ProductionStateError({
        candidateReleaseId: candidate.release.manifest.releaseId,
        reason: "recovery-conflict",
        recoveryReleaseId: retainedId,
      });
    }
    return {
      baseBundle: current.active === null ? null : activeBundle(current.active),
      baseTryoutRuntimeBundle: current.tryoutRuntimeBundle,
      candidate,
      kind: "rebuild",
      scope: stored.scope,
      sha: stored.sha,
    } satisfies ProductionStateAction;
  }
);

/** Selects new preparation, exact rebuild, or a lost terminal receipt read. */
export const selectProductionAction: SelectProductionAction = Effect.fn(
  "AksaraCli.selectProductionAction"
)(function* (args: ReleaseArguments, current: ContentReleaseCurrent) {
  const { active, candidate, recovery } = current;
  if (candidate !== null) {
    return yield* selectRebuildAction(args, current, candidate);
  }

  if (active?.release.manifest.releaseId === args.releaseId) {
    const bundle = activeBundle(active);
    const stored = yield* validateStoredCommand(args, bundle);
    if (
      args.retention.kind === "bootstrap" &&
      bundle.release.manifest.baseReleaseId !== args.retention.baseReleaseId
    ) {
      return yield* new ProductionStateError({
        activeReleaseId: active.release.manifest.releaseId,
        reason: "bootstrap-base",
      });
    }
    if (
      recovery !== null &&
      recovery.release.manifest.releaseId !== expectedRecoveryId(args.retention)
    ) {
      return yield* new ProductionStateError({
        activeReleaseId: active.release.manifest.releaseId,
        reason: "recovery-conflict",
        recoveryReleaseId: recovery.release.manifest.releaseId,
      });
    }
    return { bundle, kind: "resume", sha: stored.sha };
  }
  if (recovery !== null) {
    return yield* new ProductionStateError({
      activeReleaseId: active?.release.manifest.releaseId,
      reason: "recovery-retained",
      recoveryReleaseId: recovery.release.manifest.releaseId,
    });
  }
  if (
    args.retention.kind === "bootstrap" &&
    active?.release.manifest.releaseId !== args.retention.baseReleaseId
  ) {
    return yield* new ProductionStateError({
      activeReleaseId: active?.release.manifest.releaseId,
      reason: "bootstrap-base",
    });
  }
  return {
    baseBundle: active === null ? null : activeBundle(active),
    baseTryoutRuntimeBundle: current.tryoutRuntimeBundle,
    kind: "new",
    scope: args.scope,
  };
});
