import { assert, describe, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { ActiveContentReleaseSchema } from "#contracts/release/current/evidence";
import { LEGACY_TRYOUT_RUNTIME } from "#contracts/release/current/legacy";
import { hasCurrentTryoutRuntimeBundle } from "#contracts/release/current/runtime";
import { ContentReleaseCurrentSchema } from "#contracts/release/current/state";
import {
  inheritContentSnapshot,
  inheritContentSnapshots,
  replaceContentSnapshot,
} from "#contracts/release/snapshot/spec";
import { SignedContentReleaseSchema } from "#contracts/release/spec";
import {
  hash,
  release,
  rendererManifest,
  tryoutRuntimeBundle,
} from "#contracts/test/request";
import { receiptFor } from "#contracts/test/response";

const otherHash = `sha256:${"f".repeat(64)}`;

/** Builds one completed active release from its signed bundle. */
function activeRelease(signedRelease: typeof release = release) {
  return {
    receipt: receiptFor(signedRelease),
    release: signedRelease,
    rendererManifest,
  };
}

/** Strictly checks current-state schema acceptance. */
function accepts(input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(ContentReleaseCurrentSchema)(input, {
      onExcessProperty: "error",
    })
  );
}

const runtimeRelease = Schema.decodeSync(SignedContentReleaseSchema)({
  ...release,
  manifest: {
    ...release.manifest,
    scope: { families: [], snapshots: ["tryout"] },
    snapshots: {
      ...inheritContentSnapshots(null),
      tryout: replaceContentSnapshot({
        baseSnapshotId: null,
        resultSnapshotId: tryoutRuntimeBundle.payload.snapshot.snapshotId,
        rowCount: 1,
        rowDigest: hash,
      }),
    },
  },
});
const runtimeActive = activeRelease(runtimeRelease);
const legacyRelease = Schema.decodeSync(SignedContentReleaseSchema)({
  ...runtimeRelease,
  manifest: {
    ...runtimeRelease.manifest,
    baseActiveAppLocales: runtimeRelease.manifest.activeAppLocales,
    baseManifestHash: otherHash,
    baseReleaseId: "legacy-base",
    baseResultCount: runtimeRelease.manifest.resultCount,
    baseResultDigest: runtimeRelease.manifest.resultDigest,
    releaseId: LEGACY_TRYOUT_RUNTIME.releaseId,
    rendererManifestHash: LEGACY_TRYOUT_RUNTIME.rendererManifestHash,
    snapshots: {
      ...inheritContentSnapshots(null),
      tryout: inheritContentSnapshot(LEGACY_TRYOUT_RUNTIME.snapshotId),
    },
  },
  manifestHash: LEGACY_TRYOUT_RUNTIME.manifestHash,
});
const legacyActive = Schema.decodeSync(ActiveContentReleaseSchema)({
  receipt: receiptFor(legacyRelease),
  release: legacyRelease,
  rendererManifest: {
    ...rendererManifest,
    hash: LEGACY_TRYOUT_RUNTIME.rendererManifestHash,
  },
});

describe("current permanent runtime bundle", () => {
  it("normalizes a predecessor response without a runtime bundle", () => {
    const predecessor = { active: null, candidate: null, recovery: null };
    const current = Schema.decodeSync(ContentReleaseCurrentSchema)(predecessor);
    const normalized = {
      active: null,
      candidate: null,
      recovery: null,
      tryoutRuntimeBundle: null,
    };

    assert.deepStrictEqual(current, normalized);
    assert.deepStrictEqual(
      Schema.encodeSync(ContentReleaseCurrentSchema)(current),
      normalized
    );
  });

  it("accepts a predecessor active runtime before permanent cutover", () => {
    assert.strictEqual(hasCurrentTryoutRuntimeBundle(legacyActive, null), true);
    assert.strictEqual(
      hasCurrentTryoutRuntimeBundle(runtimeActive, null),
      false
    );
    assert.strictEqual(
      accepts({
        active: legacyActive,
        candidate: null,
        recovery: null,
        tryoutRuntimeBundle: null,
      }),
      true
    );
  });

  it("accepts the bundle bound to the active snapshot and renderer", () => {
    assert.strictEqual(
      hasCurrentTryoutRuntimeBundle(runtimeActive, tryoutRuntimeBundle),
      true
    );
    assert.strictEqual(
      accepts({
        active: runtimeActive,
        candidate: null,
        recovery: null,
        tryoutRuntimeBundle,
      }),
      true
    );
  });

  it("rejects a bundle without its exact active runtime pair", () => {
    assert.strictEqual(
      hasCurrentTryoutRuntimeBundle(null, tryoutRuntimeBundle),
      false
    );
    for (const state of [
      {
        active: null,
        candidate: null,
        recovery: null,
        tryoutRuntimeBundle,
      },
      {
        active: activeRelease(),
        candidate: null,
        recovery: null,
        tryoutRuntimeBundle,
      },
      {
        active: runtimeActive,
        candidate: null,
        recovery: null,
        tryoutRuntimeBundle: {
          ...tryoutRuntimeBundle,
          payload: {
            ...tryoutRuntimeBundle.payload,
            rendererManifestHash: otherHash,
          },
        },
      },
    ]) {
      assert.strictEqual(accepts(state), false);
    }
  });
});
