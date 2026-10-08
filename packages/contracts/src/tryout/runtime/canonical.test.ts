import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  canonicalizeTryoutRuntimeBundlePayload,
  canonicalizeTryoutRuntimeBundleSigningInput,
} from "#contracts/tryout/runtime/canonical";
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

describe("try-out runtime bundle canonical golden bytes", () => {
  it("pins the exact signed payload bytes with stable field order", () => {
    expect(canonicalizeTryoutRuntimeBundlePayload(payload)).toBe(
      '{"format":"signed-tryout-runtime-bundle","rendererManifestHash":"sha256:3333333333333333333333333333333333333333333333333333333333333333","snapshot":{"activeAppLocales":["en","id","de"],"catalogDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","counts":{"country":2,"exam":4,"section":34,"set":10,"track":4},"format":"localized-tryout-snapshot","placementCount":840,"placementDigest":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","routeCount":48,"snapshotId":"sha256:b8066804ee09fc79af009a462775813ea3a2683e414e9095a0290f1693a8dfc5"},"sourceGitSha":"cccccccccccccccccccccccccccccccccccccccc","sourceManifestHash":"sha256:4444444444444444444444444444444444444444444444444444444444444444","sourceReleaseId":"test-runtime-source"}'
    );
  });

  it("pins the domain-separated signing input over the bundle hash and payload", () => {
    expect(
      canonicalizeTryoutRuntimeBundleSigningInput(
        Sha256HashSchema.make(`sha256:${"5".repeat(64)}`),
        payload
      )
    ).toBe(
      'nakafa.aksara.tryout-runtime-bundle\nsha256:5555555555555555555555555555555555555555555555555555555555555555\n{"format":"signed-tryout-runtime-bundle","rendererManifestHash":"sha256:3333333333333333333333333333333333333333333333333333333333333333","snapshot":{"activeAppLocales":["en","id","de"],"catalogDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","counts":{"country":2,"exam":4,"section":34,"set":10,"track":4},"format":"localized-tryout-snapshot","placementCount":840,"placementDigest":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","routeCount":48,"snapshotId":"sha256:b8066804ee09fc79af009a462775813ea3a2683e414e9095a0290f1693a8dfc5"},"sourceGitSha":"cccccccccccccccccccccccccccccccccccccccc","sourceManifestHash":"sha256:4444444444444444444444444444444444444444444444444444444444444444","sourceReleaseId":"test-runtime-source"}'
    );
  });
});
