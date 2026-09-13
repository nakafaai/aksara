import { verifySignedContentArtifactIntegrity as verifyRetainedArtifact } from "@nakafa/aksara-retained/artifact/integrity";
import { verifySignedContentRelease as verifyRetainedRelease } from "@nakafa/aksara-retained/release/verify";
import { validateRendererManifestHash as validateRetainedRenderer } from "@nakafa/aksara-retained/renderer/manifest";
import { ContentVerificationKeyResolver as RetainedKeyResolver } from "@nakafa/aksara-retained/signature/spec";
import { verifySignedTryoutRuntimeBundle as verifyRetainedRuntime } from "@nakafa/aksara-retained/tryout/runtime/verify";
import { Effect, Schema } from "effect";
import {
  ContentReleaseBundleSchema,
  RendererManifestEnvelopeSchema,
  RetainedRendererComponentUnsupportedError,
  RollbackContentReleaseBundleSchema,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
  SignedContentReleaseSchema,
} from "#contracts/adoption/schema";
import { verifySignedContentArtifactIntegrity as verifyCurrentArtifact } from "#contracts/artifact/integrity";
import {
  ArtifactCompiledByteLengthMismatchError as CurrentArtifactCompiledByteLengthMismatchError,
  ArtifactHashComputationError as CurrentArtifactHashComputationError,
  ArtifactHashMismatchError as CurrentArtifactHashMismatchError,
  ArtifactPayloadFieldByteLimitError as CurrentArtifactPayloadFieldByteLimitError,
  ArtifactRendererComponentMissingError as CurrentArtifactRendererComponentMissingError,
  ArtifactRendererDomainUnpublishedError as CurrentArtifactRendererDomainUnpublishedError,
  ArtifactSourceHashComputationError as CurrentArtifactSourceHashComputationError,
  ArtifactSourceHashMismatchError as CurrentArtifactSourceHashMismatchError,
  ArtifactVerificationByteLimitError as CurrentArtifactVerificationByteLimitError,
  ArtifactVerificationDecodeError as CurrentArtifactVerificationDecodeError,
} from "#contracts/artifact/spec";
import { SignedContentArtifactSchema as CurrentArtifactSchema } from "#contracts/content";
import { decodeContract } from "#contracts/decode";
import { ContractDecodeError } from "#contracts/errors";
import { ReleaseHashComputationError } from "#contracts/release/hash";
import {
  ReleaseBundleVerificationDecodeError as CurrentReleaseBundleVerificationDecodeError,
  ReleaseManifestHashMismatchError as CurrentReleaseManifestHashMismatchError,
  ReleaseVerificationDecodeError as CurrentReleaseVerificationDecodeError,
  verifySignedContentRelease as verifyCurrentSignedContentRelease,
} from "#contracts/release/verify";
import {
  RendererManifestHashComputeError as CurrentRendererManifestHashComputeError,
  RendererManifestHashMismatchError as CurrentRendererManifestHashMismatchError,
} from "#contracts/renderer/contract";
import { validateRendererManifestHash as validateCurrentRenderer } from "#contracts/renderer/manifest";
import {
  ContentVerificationKeyResolver as CurrentContentVerificationKeyResolver,
  PublicKeyParseError as CurrentPublicKeyParseError,
  PublicKeyTypeError as CurrentPublicKeyTypeError,
  SignatureCheckError as CurrentSignatureCheckError,
  SignatureInvalidError as CurrentSignatureInvalidError,
  SigningKeyNotFoundError as CurrentSigningKeyNotFoundError,
  SigningKeyResolutionError as CurrentSigningKeyResolutionError,
} from "#contracts/signature/spec";
import { TryoutRuntimeBundleHashComputationError } from "#contracts/tryout/runtime/hash";
import {
  TryoutRuntimeBundleHashMismatchError as CurrentTryoutRuntimeBundleHashMismatchError,
  TryoutRuntimeBundleRendererMismatchError as CurrentTryoutRuntimeBundleRendererMismatchError,
  TryoutRuntimeBundleSnapshotMismatchError as CurrentTryoutRuntimeBundleSnapshotMismatchError,
  TryoutRuntimeBundleVerificationDecodeError as CurrentTryoutRuntimeBundleVerificationDecodeError,
  verifySignedTryoutRuntimeBundle as verifyCurrentSignedTryoutRuntimeBundle,
} from "#contracts/tryout/runtime/verify";

const RetainedFailureSchema = Schema.Union([
  CurrentArtifactHashComputationError,
  CurrentArtifactHashMismatchError,
  CurrentArtifactVerificationDecodeError,
  CurrentArtifactVerificationByteLimitError,
  CurrentArtifactCompiledByteLengthMismatchError,
  CurrentArtifactPayloadFieldByteLimitError,
  CurrentArtifactSourceHashComputationError,
  CurrentArtifactSourceHashMismatchError,
  CurrentSigningKeyNotFoundError,
  CurrentSigningKeyResolutionError,
  CurrentPublicKeyParseError,
  CurrentPublicKeyTypeError,
  CurrentSignatureCheckError,
  CurrentSignatureInvalidError,
  CurrentReleaseVerificationDecodeError,
  CurrentReleaseManifestHashMismatchError,
  CurrentRendererManifestHashComputeError,
  CurrentRendererManifestHashMismatchError,
  CurrentTryoutRuntimeBundleVerificationDecodeError,
  CurrentTryoutRuntimeBundleHashMismatchError,
  CurrentTryoutRuntimeBundleSnapshotMismatchError,
  CurrentTryoutRuntimeBundleRendererMismatchError,
  ContractDecodeError,
  ReleaseHashComputationError,
  TryoutRuntimeBundleHashComputationError,
]);

/** Reconstitutes current tagged errors at the temporary published-package seam. */
const failRetained = Effect.fn("AksaraContracts.adoption.failRetained")(
  (error: unknown) =>
    Schema.decodeUnknownEffect(RetainedFailureSchema)(error).pipe(
      Effect.orDie,
      Effect.flatMap(Effect.fail)
    )
);

/** Authenticates original bytes before inspecting any execution capability. */
export const verifySignedContentArtifactIntegrity = Effect.fn(
  "AksaraContracts.adoption.verifyArtifactIntegrity"
)(function* (input: unknown) {
  const artifact = yield* Schema.decodeUnknownEffect(
    SignedContentArtifactSchema
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      () =>
        new CurrentArtifactVerificationDecodeError({
          message:
            "Artifact verification input does not satisfy its exact wire contract.",
        })
    )
  );
  if (Schema.is(CurrentArtifactSchema)(artifact)) {
    return yield* verifyCurrentArtifact(artifact);
  }
  const resolver = yield* CurrentContentVerificationKeyResolver;
  return yield* verifyRetainedArtifact(artifact).pipe(
    Effect.provideService(RetainedKeyResolver, resolver),
    Effect.catch(failRetained)
  );
});

/** Selects unsigned execution names only after the caller authenticates bytes. */
export const selectVerifiedArtifactRenderer = Effect.fn(
  "AksaraContracts.adoption.selectVerifiedArtifactRenderer"
)(function* (artifact: SignedContentArtifact) {
  if (Schema.is(CurrentArtifactSchema)(artifact)) {
    return artifact.payload;
  }
  for (const component of artifact.payload.requiredComponents) {
    if (component.version !== 1) {
      return yield* new RetainedRendererComponentUnsupportedError({
        componentName: component.name,
        contentKey: artifact.payload.contentKey,
        version: component.version,
      });
    }
  }
  return {
    contentKey: artifact.payload.contentKey,
    rendererDomain: artifact.payload.rendererDomain,
    requiredComponents: artifact.payload.requiredComponents.map(
      ({ name }) => name
    ),
  };
});

/** Verifies each renderer with its exact published canonicalizer. */
export const validateRendererManifestHash = Effect.fn(
  "AksaraContracts.adoption.validateRenderer"
)(function* (input: unknown) {
  const renderer = yield* decodeContract(
    RendererManifestEnvelopeSchema,
    "RendererManifestEnvelope",
    input
  );
  if (renderer.format === "nakafa-mdx-renderer") {
    return yield* validateCurrentRenderer(renderer);
  }
  return yield* validateRetainedRenderer(renderer).pipe(
    Effect.catch(failRetained)
  );
});

/** Verifies an independently signed artifact against an authenticated renderer. */
export const verifySignedContentArtifact = Effect.fn(
  "AksaraContracts.adoption.verifyArtifact"
)(function* (input: unknown) {
  const request = yield* Schema.decodeUnknownEffect(
    Schema.Struct({
      artifact: SignedContentArtifactSchema,
      rendererManifest: RendererManifestEnvelopeSchema,
    })
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      () =>
        new CurrentArtifactVerificationDecodeError({
          message:
            "Artifact verification input does not satisfy its exact wire contract.",
        })
    )
  );
  const artifact = yield* verifySignedContentArtifactIntegrity(
    request.artifact
  );
  const selection = yield* selectVerifiedArtifactRenderer(artifact);
  const renderer = yield* validateRendererManifestHash(
    request.rendererManifest
  );
  if (!renderer.publishedDomains.includes(selection.rendererDomain)) {
    return yield* new CurrentArtifactRendererDomainUnpublishedError({
      contentKey: selection.contentKey,
      rendererDomain: selection.rendererDomain,
    });
  }
  const available =
    renderer.format === "nakafa-mdx-renderer"
      ? [
          ...renderer.base,
          ...renderer.domains
            .filter(({ name }) => name === selection.rendererDomain)
            .flatMap(({ components }) => components),
        ]
      : [
          ...renderer.base.supportedComponents,
          ...renderer.domains
            .filter(({ name }) => name === selection.rendererDomain)
            .flatMap(({ supportedComponents }) => supportedComponents),
        ]
          .filter(({ version }) => version === 1)
          .map(({ name }) => name);
  for (const name of selection.requiredComponents) {
    if (!available.includes(name)) {
      return yield* new CurrentArtifactRendererComponentMissingError({
        componentName: name,
        contentKey: selection.contentKey,
      });
    }
  }
  return artifact;
});

/** Authenticates old and current release envelopes without rewriting manifests. */
export const verifySignedContentRelease = Effect.fn(
  "AksaraContracts.adoption.verifyRelease"
)(function* (input: unknown) {
  const release = yield* Schema.decodeUnknownEffect(SignedContentReleaseSchema)(
    input,
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError(
      () =>
        new CurrentReleaseVerificationDecodeError({
          message:
            "Release verification input does not satisfy its exact wire contract.",
        })
    )
  );
  if (!("rendererContractVersion" in release.manifest)) {
    return yield* verifyCurrentSignedContentRelease(release);
  }
  const resolver = yield* CurrentContentVerificationKeyResolver;
  return yield* verifyRetainedRelease(release).pipe(
    Effect.provideService(RetainedKeyResolver, resolver),
    Effect.catch(failRetained)
  );
});

/** Authenticates release and renderer independently, retaining exact hash binding. */
export const verifyContentReleaseBundle = Effect.fn(
  "AksaraContracts.adoption.verifyBundle"
)(function* (input: unknown) {
  const bundle = yield* Schema.decodeUnknownEffect(ContentReleaseBundleSchema)(
    input,
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError(
      () =>
        new CurrentReleaseBundleVerificationDecodeError({
          message:
            "Release bundle verification input does not satisfy its exact wire contract.",
        })
    )
  );
  yield* verifySignedContentRelease(bundle.release);
  yield* validateRendererManifestHash(bundle.rendererManifest);
  return bundle;
});

/** Authenticates a renderer-bound inverse from either encoding before recovery. */
export const verifyRollbackContentReleaseBundle = Effect.fn(
  "AksaraContracts.adoption.verifyRollbackBundle"
)(function* (input: unknown) {
  const bundle = yield* Schema.decodeUnknownEffect(
    RollbackContentReleaseBundleSchema
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      () =>
        new CurrentReleaseBundleVerificationDecodeError({
          message:
            "Release bundle verification input does not satisfy its exact wire contract.",
        })
    )
  );
  yield* verifySignedContentRelease(bundle.release);
  yield* validateRendererManifestHash(bundle.rendererManifest);
  return bundle;
});

/** Keeps permanent runtime bundles bound to their exact frozen renderer hash. */
export const verifySignedTryoutRuntimeBundle = Effect.fn(
  "AksaraContracts.adoption.verifyRuntimeBundle"
)(function* (input: {
  readonly bundle: unknown;
  readonly rendererManifest: unknown;
}) {
  const renderer = yield* validateRendererManifestHash(input.rendererManifest);
  if (renderer.format === "nakafa-mdx-renderer") {
    return yield* verifyCurrentSignedTryoutRuntimeBundle(input);
  }
  const resolver = yield* CurrentContentVerificationKeyResolver;
  return yield* verifyRetainedRuntime(input).pipe(
    Effect.provideService(RetainedKeyResolver, resolver),
    Effect.catch(failRetained)
  );
});
