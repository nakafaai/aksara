import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { hashTryoutRuntimeBundlePayload } from "#contracts/tryout/runtime/hash";
import {
  TRYOUT_RUNTIME_BUNDLE_FORMAT,
  type TryoutRuntimeBundlePayload,
} from "#contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";
import { TryoutSnapshotFactsSchema } from "#contracts/tryout/snapshot/spec";

const snapshot = makeTryoutSnapshot(
  Schema.decodeSync(TryoutSnapshotFactsSchema)({
    activeAppLocales: ["en", "id", "de"],
    catalogDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
    counts: { country: 2, exam: 4, section: 34, set: 10, track: 4 },
    placementCount: 840,
    placementDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
    routeCount: 48,
  })
);
const payload: TryoutRuntimeBundlePayload = {
  format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
  rendererManifestHash: Sha256HashSchema.make(`sha256:${"3".repeat(64)}`),
  snapshot,
  sourceGitSha: GitCommitShaSchema.make("c".repeat(40)),
  sourceManifestHash: Sha256HashSchema.make(`sha256:${"4".repeat(64)}`),
  sourceReleaseId: ReleaseIdSchema.make("test-runtime-source"),
};

describe("try-out runtime bundle identity golden vector", () => {
  it.effect("pins the immutable bundle hash of the signed payload", () =>
    Effect.gen(function* () {
      expect(yield* hashTryoutRuntimeBundlePayload(payload)).toBe(
        "sha256:1214315fc4bbd4c6145381df3401a6b80d0550eb724c23cfd668c8b634a5f5d0"
      );
    })
  );
});
