import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ContentReleaseManifestSchema,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { hashContentReleaseManifest } from "@nakafa/aksara-contracts/release/hash";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  validateRecoveryManifest,
  validateRecoveryRevision,
} from "#cli/recovery";
import { RENDERER_MANIFEST } from "#test/real";

const manifest = ContentReleaseManifestSchema.make({
  baseReleaseId: null,
  deleteCount: 0,
  itemCount: 0,
  itemsDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  origin: { kind: "git", sha: GitCommitShaSchema.make("a".repeat(40)) },
  projectionCount: 0,
  projectionDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  releaseId: ReleaseIdSchema.make("test-recovery"),
  rendererContractVersion: RENDERER_MANIFEST.rendererContractVersion,
  rendererManifestHash: RENDERER_MANIFEST.hash,
  upsertCount: 0,
});
const release = SignedContentReleaseSchema.make({
  keyId: SigningKeyIdSchema.make("test-recovery-key"),
  manifest,
  manifestHash: Effect.runSync(hashContentReleaseManifest(manifest)),
  signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
});

describe("production recovery", () => {
  it("accepts only the exact stored Git revision", async () => {
    const expected = GitCommitShaSchema.make("a".repeat(40));
    await expect(
      Effect.runPromise(validateRecoveryRevision(expected, expected))
    ).resolves.toBeUndefined();
    await expect(
      Effect.runPromise(
        validateRecoveryRevision(
          expected,
          GitCommitShaSchema.make("b".repeat(40))
        ).pipe(Effect.flip)
      )
    ).resolves.toMatchObject({ _tag: "RecoveryRevisionMismatchError" });
  });

  it("accepts only a rebuilt manifest with the signed pending hash", async () => {
    await expect(
      Effect.runPromise(validateRecoveryManifest(release, manifest))
    ).resolves.toBeUndefined();
    await expect(
      Effect.runPromise(
        validateRecoveryManifest(
          release,
          ContentReleaseManifestSchema.make({
            ...manifest,
            origin: {
              kind: "git",
              sha: GitCommitShaSchema.make("b".repeat(40)),
            },
          })
        ).pipe(Effect.flip)
      )
    ).resolves.toMatchObject({ _tag: "RecoveryManifestMismatchError" });
  });
});
