import { describe, expect, it } from "@effect/vitest";
import { canonicalizeSignedContentArtifact as canonicalizeRetainedSignedContentArtifact } from "@nakafa/aksara-retained/content";
import { Effect } from "effect";
import {
  canonicalizeSignedContentArtifact,
  RetainedRendererComponentUnsupportedError,
} from "#contracts/adoption/schema";
import {
  verifyContentReleaseBundle,
  verifyRollbackContentReleaseBundle,
  verifySignedContentArtifact,
  verifySignedContentArtifactIntegrity,
  verifySignedContentRelease,
  verifySignedTryoutRuntimeBundle,
} from "#contracts/adoption/verify";
import { ArtifactHashMismatchError } from "#contracts/artifact/spec";
import { createRendererManifest } from "#contracts/renderer/manifest";
import { SignatureInvalidError } from "#contracts/signature/spec";
import {
  artifact,
  keyId,
  live,
  newRelease,
  newRollbackBundle,
  oldArtifact,
  oldRelease,
  oldRenderer,
  oldRollbackBundle,
  retainedArtifact,
  signature,
  trust,
} from "#contracts/test/adoption";
import { runtimeBundle } from "#contracts/test/runtime/fixture";
import { canonicalizeTryoutRuntimeBundleSigningInput } from "#contracts/tryout/runtime/canonical";
import { hashTryoutRuntimeBundlePayload } from "#contracts/tryout/runtime/hash";
import { SignedTryoutRuntimeBundleSchema } from "#contracts/tryout/runtime/spec";

describe("retained adoption verify", () => {
  it.effect(
    "rejects malformed verification inputs and an unpublished domain",
    () =>
      Effect.gen(function* () {
        expect(
          yield* verifySignedContentArtifact({
            artifact: oldArtifact,
            extra: true,
            rendererManifest: live,
          }).pipe(trust, Effect.flip)
        ).toMatchObject({ _tag: "ArtifactVerificationDecodeError" });
        expect(
          yield* verifySignedContentRelease({
            ...oldRelease,
            extra: true,
          }).pipe(trust, Effect.flip)
        ).toMatchObject({ _tag: "ReleaseVerificationDecodeError" });
        const otherDomain = yield* createRendererManifest({
          base: live.base,
          domains: live.domains,
          publishedDomains: ["biology"],
        });
        expect(
          yield* verifySignedContentArtifact({
            artifact: oldArtifact,
            rendererManifest: otherDomain,
          }).pipe(trust, Effect.flip)
        ).toMatchObject({ _tag: "ArtifactRendererDomainUnpublishedError" });
      })
  );
  it.effect(
    "authenticates both encodings independently and keeps the old inverse hash",
    () =>
      Effect.gen(function* () {
        expect(
          yield* verifySignedContentArtifact({
            artifact: oldArtifact,
            rendererManifest: live,
          }).pipe(trust)
        ).toEqual(oldArtifact);
        expect(
          yield* verifySignedContentArtifact({
            artifact: oldArtifact,
            rendererManifest: oldRenderer,
          }).pipe(trust)
        ).toEqual(oldArtifact);
        expect(
          yield* verifySignedContentArtifact({
            artifact,
            rendererManifest: live,
          }).pipe(trust)
        ).toEqual(artifact);
        expect(artifact.artifactHash).not.toBe(oldArtifact.artifactHash);
        expect(canonicalizeSignedContentArtifact(oldArtifact)).toBe(
          canonicalizeRetainedSignedContentArtifact(oldArtifact)
        );
      })
  );
  it.effect(
    "rejects altered signed fields without trying another verification format",
    () =>
      Effect.gen(function* () {
        const tampered = {
          ...oldArtifact,
          payload: {
            ...oldArtifact.payload,
            requiredComponents: [{ name: "BlockMath", version: 2 }],
          },
        };
        expect(
          yield* verifySignedContentArtifactIntegrity(tampered).pipe(
            trust,
            Effect.flip
          )
        ).toBeInstanceOf(ArtifactHashMismatchError);
        expect(
          yield* verifySignedContentArtifactIntegrity({
            ...oldArtifact,
            signature: artifact.signature,
          }).pipe(trust, Effect.flip)
        ).toBeInstanceOf(SignatureInvalidError);
        expect(
          yield* verifySignedContentArtifactIntegrity({
            ...oldArtifact,
            unexpected: true,
          }).pipe(trust, Effect.flip)
        ).toMatchObject({ _tag: "ArtifactVerificationDecodeError" });
      })
  );
  it.effect(
    "rejects even authentically signed unsupported retained versions",
    () =>
      Effect.gen(function* () {
        const unsupported = retainedArtifact(2);
        expect(
          yield* verifySignedContentArtifactIntegrity(unsupported).pipe(trust)
        ).toEqual(unsupported);
        expect(
          yield* verifySignedContentArtifact({
            artifact: unsupported,
            rendererManifest: live,
          }).pipe(trust, Effect.flip)
        ).toBeInstanceOf(RetainedRendererComponentUnsupportedError);
      })
  );
  it.effect(
    "binds old and current releases to their original renderer hashes",
    () =>
      Effect.gen(function* () {
        expect(
          yield* verifyContentReleaseBundle({
            release: oldRelease,
            rendererManifest: oldRenderer,
          }).pipe(trust)
        ).toEqual({ release: oldRelease, rendererManifest: oldRenderer });
        expect(
          yield* verifyContentReleaseBundle({
            release: newRelease,
            rendererManifest: live,
          }).pipe(trust)
        ).toEqual({ release: newRelease, rendererManifest: live });
        expect(
          yield* verifyContentReleaseBundle({
            release: oldRelease,
            rendererManifest: live,
          }).pipe(trust, Effect.flip)
        ).toMatchObject({ _tag: "ReleaseBundleVerificationDecodeError" });
      })
  );
  it.effect(
    "accepts rollback-owned bundles from either encoding and rejects forward origins",
    () =>
      Effect.gen(function* () {
        expect(
          yield* verifyRollbackContentReleaseBundle(newRollbackBundle).pipe(
            trust
          )
        ).toEqual(newRollbackBundle);
        expect(
          yield* verifyRollbackContentReleaseBundle(oldRollbackBundle).pipe(
            trust
          )
        ).toEqual(oldRollbackBundle);
        expect(
          yield* verifyRollbackContentReleaseBundle({
            release: newRelease,
            rendererManifest: live,
          }).pipe(trust, Effect.flip)
        ).toMatchObject({ _tag: "ReleaseBundleVerificationDecodeError" });
        expect(
          yield* verifyRollbackContentReleaseBundle({
            release: newRelease,
            rendererManifest: live,
            unexpected: true,
          }).pipe(trust, Effect.flip)
        ).toMatchObject({ _tag: "ReleaseBundleVerificationDecodeError" });
      })
  );
  it.effect(
    "verifies permanent bundles with retained renderers and unchanged payload signatures",
    () =>
      Effect.gen(function* () {
        const payload = {
          ...runtimeBundle.payload,
          rendererManifestHash: oldRenderer.hash,
        };
        const bundleHash = yield* hashTryoutRuntimeBundlePayload(payload);
        const bundle = SignedTryoutRuntimeBundleSchema.make({
          bundleHash,
          keyId,
          payload,
          signature: signature(
            canonicalizeTryoutRuntimeBundleSigningInput(bundleHash, payload)
          ),
        });
        expect(
          yield* verifySignedTryoutRuntimeBundle({
            bundle,
            rendererManifest: oldRenderer,
          }).pipe(trust)
        ).toEqual(bundle);
        expect(
          yield* verifySignedTryoutRuntimeBundle({
            bundle: { ...bundle, signature: artifact.signature },
            rendererManifest: oldRenderer,
          }).pipe(trust, Effect.flip)
        ).toBeInstanceOf(SignatureInvalidError);
      })
  );
});
