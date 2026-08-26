import { assert, describe, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  inheritContentSnapshot,
  inheritContentSnapshots,
  replaceContentSnapshot,
} from "#contracts/release/snapshot/spec";
import {
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import {
  hash,
  recoveryRelease,
  release,
  rendererManifest,
} from "#contracts/test/request";
import { makeTestRuntimeBundle } from "#contracts/test/runtime/bundle";
import {
  TryoutRuntimeBundleSourceError,
  verifyTryoutRuntimeBundleSource,
} from "#contracts/tryout/runtime/source";
import {
  type SignedTryoutRuntimeBundle,
  SignedTryoutRuntimeBundleSchema,
} from "#contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";
import type { TryoutSnapshot } from "#contracts/tryout/snapshot/spec";

const sourceGitSha = GitCommitShaSchema.make("a".repeat(40));
const baseSnapshot = makeTryoutSnapshot({
  activeAppLocales: release.manifest.activeAppLocales,
  catalogDigest: hash,
  counts: { country: 1, exam: 0, section: 0, set: 0, track: 0 },
  placementCount: 0,
  placementDigest: hash,
  routeCount: 1,
});
const resultSnapshot = makeTryoutSnapshot({
  activeAppLocales: release.manifest.activeAppLocales,
  catalogDigest: hash,
  counts: { country: 1, exam: 1, section: 0, set: 0, track: 0 },
  placementCount: 0,
  placementDigest: hash,
  routeCount: 2,
});
const unrelatedSnapshot = makeTryoutSnapshot({
  activeAppLocales: release.manifest.activeAppLocales,
  catalogDigest: hash,
  counts: { country: 1, exam: 1, section: 1, set: 0, track: 0 },
  placementCount: 0,
  placementDigest: hash,
  routeCount: 3,
});

/** Builds one signed Git envelope with an exact try-out transition. */
function makeSourceRelease(
  tryout: SignedContentRelease["manifest"]["snapshots"]["tryout"]
) {
  return Schema.decodeSync(SignedContentReleaseSchema)({
    ...release,
    manifest: {
      ...release.manifest,
      baseActiveAppLocales: release.manifest.activeAppLocales,
      baseManifestHash: hash,
      baseReleaseId: ReleaseIdSchema.make("runtime-source-base"),
      origin: { kind: "git", sha: sourceGitSha },
      releaseId: ReleaseIdSchema.make("runtime-source"),
      scope: { families: ["material"], snapshots: ["tryout"] },
      snapshots: { ...inheritContentSnapshots(null), tryout },
    },
  });
}

const sourceRelease = makeSourceRelease(
  replaceContentSnapshot({
    baseSnapshotId: baseSnapshot.snapshotId,
    resultSnapshotId: resultSnapshot.snapshotId,
    rowCount: 1,
    rowDigest: hash,
  })
);

/** Builds a schema-valid transport fixture for one authenticated source pair. */
function makeBundle(snapshot: TryoutSnapshot) {
  return makeTestRuntimeBundle({
    release: sourceRelease,
    rendererManifest,
    snapshot,
    sourceGitSha,
  });
}

/** Changes source metadata without claiming to preserve its test signature. */
function changeBundle(
  bundle: SignedTryoutRuntimeBundle,
  payload: Partial<SignedTryoutRuntimeBundle["payload"]>
) {
  return Schema.decodeSync(SignedTryoutRuntimeBundleSchema)({
    ...bundle,
    payload: { ...bundle.payload, ...payload },
  });
}

const resultBundle = makeBundle(resultSnapshot);
const baseBundle = makeBundle(baseSnapshot);

describe("try-out runtime bundle source", () => {
  it.effect("accepts the Git result and distinct retained base pairs", () =>
    Effect.gen(function* () {
      assert.deepStrictEqual(
        yield* verifyTryoutRuntimeBundleSource({
          bundle: resultBundle,
          release: sourceRelease,
        }),
        resultBundle
      );
      assert.deepStrictEqual(
        yield* verifyTryoutRuntimeBundleSource({
          bundle: baseBundle,
          release: sourceRelease,
        }),
        baseBundle
      );
    })
  );

  it.effect("rejects every mismatched source identity", () =>
    Effect.gen(function* () {
      const cases = [
        [resultBundle, recoveryRelease, "origin"],
        [
          changeBundle(resultBundle, {
            sourceReleaseId: ReleaseIdSchema.make("runtime-source-other"),
          }),
          sourceRelease,
          "release",
        ],
        [
          changeBundle(resultBundle, {
            sourceManifestHash: Sha256HashSchema.make(
              `sha256:${"e".repeat(64)}`
            ),
          }),
          sourceRelease,
          "manifest",
        ],
        [
          changeBundle(resultBundle, {
            sourceGitSha: GitCommitShaSchema.make("b".repeat(40)),
          }),
          sourceRelease,
          "revision",
        ],
        [
          changeBundle(resultBundle, {
            rendererManifestHash: Sha256HashSchema.make(
              `sha256:${"f".repeat(64)}`
            ),
          }),
          sourceRelease,
          "renderer",
        ],
        [makeBundle(unrelatedSnapshot), sourceRelease, "snapshot"],
      ] as const;

      for (const [bundle, candidateRelease, reason] of cases) {
        const error = yield* verifyTryoutRuntimeBundleSource({
          bundle,
          release: candidateRelease,
        }).pipe(Effect.flip);
        assert.instanceOf(error, TryoutRuntimeBundleSourceError);
        assert.strictEqual(error.reason, reason);
      }
    })
  );

  it.effect("rejects a base pair outside a distinct replacement", () =>
    Effect.gen(function* () {
      const inherited = makeSourceRelease(
        inheritContentSnapshot(resultSnapshot.snapshotId)
      );
      const genesis = makeSourceRelease(
        replaceContentSnapshot({
          baseSnapshotId: null,
          resultSnapshotId: resultSnapshot.snapshotId,
          rowCount: 1,
          rowDigest: hash,
        })
      );

      for (const candidateRelease of [inherited, genesis]) {
        const error = yield* verifyTryoutRuntimeBundleSource({
          bundle: baseBundle,
          release: candidateRelease,
        }).pipe(Effect.flip);
        assert.strictEqual(error.reason, "snapshot");
      }
    })
  );
});
