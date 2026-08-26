import type { GitCommitSha } from "@nakafa/aksara-contracts/ids";
import type {
  ContentReleaseCurrent,
  StagedContentRelease,
} from "@nakafa/aksara-contracts/release/current/state";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import {
  canonicalizePublicationScope,
  type PublicationScope,
} from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { Effect, Schema } from "effect";
import type { ReleaseArguments } from "#cli/production/arguments";

/** Durable publication state does not permit the requested production command. */
export class ProductionStateError extends Schema.TaggedError<ProductionStateError>()(
  "ProductionStateError",
  {
    reason: Schema.Literals([
      "aborting",
      "mode-mismatch",
      "candidate-conflict",
      "recovery-conflict",
      "recovery-retained",
      "scope-mismatch",
    ]),
  }
) {}

/** Exact production work selected from authoritative durable target state. */
export type ProductionStateAction =
  | {
      readonly baseBundle: ContentReleaseBundle | null;
      readonly baseTryoutRuntimeBundle: SignedTryoutRuntimeBundle | null;
      readonly kind: "new";
      readonly scope: PublicationScope;
    }
  | {
      readonly baseBundle: ContentReleaseBundle | null;
      readonly baseTryoutRuntimeBundle: SignedTryoutRuntimeBundle | null;
      readonly kind: "rebuild";
      readonly candidate: StagedContentRelease;
      readonly scope: PublicationScope;
      readonly sha: GitCommitSha;
    }
  | { readonly bundle: ContentReleaseBundle; readonly kind: "resume" };

interface StoredCommand {
  readonly scope: PublicationScope;
  readonly sha: GitCommitSha;
}
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
  return {
    release: active.release,
    rendererManifest: active.rendererManifest,
  } satisfies ContentReleaseBundle;
}

/** Returns stored provenance only when command mode and identity match it. */
const validateStoredCommand: ValidateStoredCommand = Effect.fn(
  "AksaraCli.validateStoredCommand"
)(function* (args: ReleaseArguments, bundle: ContentReleaseBundle) {
  const { manifest } = bundle.release;
  if (
    JSON.stringify(canonicalizePublicationScope(args.scope)) !==
    JSON.stringify(canonicalizePublicationScope(manifest.scope))
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
        reason: "candidate-conflict",
      });
    }
    const stored: StoredCommand = yield* validateStoredCommand(args, candidate);
    if (candidate.phase === "aborting") {
      return yield* new ProductionStateError({ reason: "aborting" });
    }
    if (
      current.recovery !== null &&
      current.recovery.release.manifest.releaseId !== args.recoveryId
    ) {
      return yield* new ProductionStateError({ reason: "recovery-conflict" });
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
    yield* validateStoredCommand(args, bundle);
    if (
      recovery !== null &&
      recovery.release.manifest.releaseId !== args.recoveryId
    ) {
      return yield* new ProductionStateError({ reason: "recovery-conflict" });
    }
    return { bundle, kind: "resume" };
  }
  if (recovery !== null) {
    return yield* new ProductionStateError({ reason: "recovery-retained" });
  }
  return {
    baseBundle: active === null ? null : activeBundle(active),
    baseTryoutRuntimeBundle: current.tryoutRuntimeBundle,
    kind: "new",
    scope: args.scope,
  };
});
