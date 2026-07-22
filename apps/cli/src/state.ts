import type { GitCommitSha, ReleaseId } from "@nakafa/aksara-contracts/ids";
import type {
  ContentReleaseBundle,
  ContentReleaseCurrent,
  PendingContentRelease,
} from "@nakafa/aksara-contracts/release/lifecycle";
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
      "pending-conflict",
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
      readonly pending: PendingContentRelease;
      readonly sha: GitCommitSha;
    }
  | {
      readonly kind: "rebuild";
      readonly mode: "rollback";
      readonly pending: PendingContentRelease;
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

/** Returns the immutable bundle from one completed active release. */
function completedBundle(
  completed: NonNullable<ContentReleaseCurrent["completed"]>
) {
  return {
    release: completed.release,
    rendererManifest: completed.rendererManifest,
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

/** Selects new preparation, exact rebuild, or finalization-only recovery. */
export const selectProductionAction: SelectProductionAction = Effect.fn(
  "AksaraCli.selectProductionAction"
)(function* (args: ProductionArguments, current: ContentReleaseCurrent) {
  const { completed, pending } = current;
  if (pending !== null) {
    if (pending.release.manifest.releaseId !== args.releaseId) {
      return yield* new ProductionStateError({
        reason: "pending-conflict",
      });
    }
    const stored: StoredCommand = yield* validateStoredCommand(args, pending);
    if (pending.phase === "aborting") {
      return yield* new ProductionStateError({ reason: "aborting" });
    }
    if (
      pending.phase === "verified" ||
      pending.phase === "active" ||
      pending.phase === "finalizing"
    ) {
      return {
        bundle: {
          release: pending.release,
          rendererManifest: pending.rendererManifest,
        },
        kind: "resume",
      };
    }
    if (stored.mode === "git") {
      return {
        kind: "rebuild",
        mode: stored.mode,
        pending,
        sha: stored.sha,
      };
    }
    return {
      kind: "rebuild",
      mode: stored.mode,
      pending,
      rollbackOf: stored.rollbackOf,
    };
  }

  if (completed?.release.manifest.releaseId === args.releaseId) {
    const bundle = completedBundle(completed);
    yield* validateStoredCommand(args, bundle);
    return { bundle, kind: "resume" };
  }
  if (args.command === "release") {
    return {
      baseBundle: completed === null ? null : completedBundle(completed),
      kind: "new",
      mode: "git",
    };
  }
  if (completed === null) {
    return yield* new ProductionStateError({ reason: "missing-active" });
  }
  if (args.rollbackOf !== completed.release.manifest.releaseId) {
    return yield* new ProductionStateError({ reason: "rollback-mismatch" });
  }
  return {
    kind: "new",
    mode: "rollback",
    rollbackOf: args.rollbackOf,
    sourceBundle: completedBundle(completed),
  };
});
