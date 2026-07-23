import type { GitCommitSha, ReleaseId } from "@nakafa/aksara-contracts/ids";
import type {
  ContentReleaseCurrent,
  StagedContentRelease,
} from "@nakafa/aksara-contracts/release/current";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import type { ReleaseArguments, RollbackArguments } from "#cli/args";

/** Durable publication state does not permit the requested production command. */
export class ProductionStateError extends Schema.TaggedError<ProductionStateError>()(
  "ProductionStateError",
  {
    reason: Schema.Literal(
      "aborting",
      "missing-active",
      "mode-mismatch",
      "candidate-conflict",
      "recovery-conflict",
      "recovery-retained",
      "rollback-mismatch"
    ),
  }
) {}

/** Exact production work selected from authoritative durable target state. */
export type ProductionStateAction =
  | {
      readonly baseBundle: ContentReleaseBundle | null;
      readonly kind: "new";
      readonly mode: "git";
    }
  | {
      readonly kind: "new";
      readonly mode: "rollback";
      readonly rollbackOf: ReleaseId;
      readonly sourceBundle: ContentReleaseBundle;
    }
  | {
      readonly kind: "rebuild";
      readonly mode: "git";
      readonly candidate: StagedContentRelease;
      readonly sha: GitCommitSha;
    }
  | {
      readonly kind: "rebuild";
      readonly mode: "rollback";
      readonly candidate: StagedContentRelease;
      readonly rollbackOf: ReleaseId;
    }
  | { readonly bundle: ContentReleaseBundle; readonly kind: "resume" };

type StoredCommand =
  | { readonly mode: "git"; readonly sha: GitCommitSha }
  | { readonly mode: "rollback"; readonly rollbackOf: ReleaseId };
type ValidateStoredCommand = (
  args: ProductionArguments,
  bundle: ContentReleaseBundle
) => Effect.Effect<StoredCommand, ProductionStateError>;

type ProductionArguments = ReleaseArguments | RollbackArguments;
type SelectProductionAction = (
  args: ProductionArguments,
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
)((args: ProductionArguments, bundle: ContentReleaseBundle) => {
  const { manifest } = bundle.release;
  if (args.command === "release") {
    if (manifest.origin.kind === "git") {
      return Effect.succeed<StoredCommand>({
        mode: "git",
        sha: manifest.origin.sha,
      });
    }
    return Effect.fail(new ProductionStateError({ reason: "mode-mismatch" }));
  }
  if (manifest.origin.kind !== "rollback") {
    return Effect.fail(new ProductionStateError({ reason: "mode-mismatch" }));
  }
  if (manifest.baseReleaseId !== args.rollbackOf) {
    return Effect.fail(
      new ProductionStateError({ reason: "rollback-mismatch" })
    );
  }
  return Effect.succeed<StoredCommand>({
    mode: "rollback",
    rollbackOf: args.rollbackOf,
  });
});

/** Selects new preparation, exact rebuild, or a lost terminal receipt read. */
export const selectProductionAction: SelectProductionAction = Effect.fn(
  "AksaraCli.selectProductionAction"
)(function* (args: ProductionArguments, current: ContentReleaseCurrent) {
  const { active, candidate, recovery } = current;
  if (candidate !== null) {
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
      recovery !== null &&
      recovery.release.manifest.releaseId !== args.recoveryId
    ) {
      return yield* new ProductionStateError({ reason: "recovery-conflict" });
    }
    if (stored.mode === "git") {
      return {
        candidate,
        kind: "rebuild",
        mode: stored.mode,
        sha: stored.sha,
      };
    }
    return {
      candidate,
      kind: "rebuild",
      mode: stored.mode,
      rollbackOf: stored.rollbackOf,
    };
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
  if (args.command === "release") {
    return {
      baseBundle: active === null ? null : activeBundle(active),
      kind: "new",
      mode: "git",
    };
  }
  if (active === null) {
    return yield* new ProductionStateError({ reason: "missing-active" });
  }
  if (args.rollbackOf !== active.release.manifest.releaseId) {
    return yield* new ProductionStateError({ reason: "rollback-mismatch" });
  }
  return {
    kind: "new",
    mode: "rollback",
    rollbackOf: args.rollbackOf,
    sourceBundle: activeBundle(active),
  };
});
