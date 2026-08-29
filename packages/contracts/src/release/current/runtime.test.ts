import { assert, describe, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { hasCurrentTryoutRuntimeBundle } from "#contracts/release/current/runtime";
import { ContentReleaseCurrentSchema } from "#contracts/release/current/state";
import {
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

describe("current permanent runtime bundle", () => {
  it("requires an explicit runtime field", () => {
    const current = {
      active: null,
      candidate: null,
      recovery: null,
      tryoutRuntimeBundle: null,
    };

    assert.strictEqual(
      accepts({ active: null, candidate: null, recovery: null }),
      false
    );
    assert.deepStrictEqual(
      Schema.decodeSync(ContentReleaseCurrentSchema)(current),
      current
    );
    assert.deepStrictEqual(
      Schema.encodeSync(ContentReleaseCurrentSchema)(current),
      current
    );
  });

  it("rejects an active try-out snapshot without its permanent bundle", () => {
    assert.strictEqual(
      hasCurrentTryoutRuntimeBundle(runtimeActive, null),
      false
    );
    assert.strictEqual(
      accepts({
        active: runtimeActive,
        candidate: null,
        recovery: null,
        tryoutRuntimeBundle: null,
      }),
      false
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
