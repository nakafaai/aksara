import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { verifySignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/verify";
import { Effect, Schema } from "effect";

import type { ProductionBaseIdentity } from "#cli/production/base";

/** Current permanent runtime bundle does not identify the active try-out base. */
export class BaseTryoutRuntimeMismatchError extends Schema.TaggedError<BaseTryoutRuntimeMismatchError>()(
  "BaseTryoutRuntimeMismatchError",
  {
    reason: Schema.Literals([
      "missing-base",
      "missing-recovery",
      "snapshot",
      "unexpected-recovery",
    ]),
  }
) {}

/** Authenticates the optional permanent bundle and binds it to the active base. */
export const verifyBaseTryoutRuntimeBundle = Effect.fn(
  "AksaraCli.verifyBaseTryoutRuntimeBundle"
)(function* (
  bundle: SignedTryoutRuntimeBundle | null,
  baseBundle: ContentReleaseBundle | null,
  base: ProductionBaseIdentity | null
) {
  if (bundle === null) {
    return null;
  }
  if (baseBundle === null || base === null) {
    return yield* new BaseTryoutRuntimeMismatchError({
      reason: "missing-base",
    });
  }
  const verified = yield* verifySignedTryoutRuntimeBundle({
    bundle,
    rendererManifest: baseBundle.rendererManifest,
  });
  if (
    verified.payload.snapshot.snapshotId !==
    base.snapshots.tryout.resultSnapshotId
  ) {
    return yield* new BaseTryoutRuntimeMismatchError({
      reason: "snapshot",
    });
  }
  return verified;
});
