import { Schema } from "effect";
import { SignedContentArtifactSchema } from "#contracts/content.js";
import { ContentKeySchema, Sha256HashSchema } from "#contracts/ids.js";
import {
  RendererComponentNameSchema,
  RendererContractVersionSchema,
  RendererManifestEnvelopeSchema,
} from "#contracts/renderer/contract.js";

/**
 * Complete server-only input needed to authenticate one compiled artifact.
 * `rendererContractVersion` comes from the active release because payloads do
 * not duplicate that release-scoped value.
 */
export const ArtifactVerificationRequestSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
  rendererContractVersion: RendererContractVersionSchema,
  rendererManifest: RendererManifestEnvelopeSchema,
});
export type ArtifactVerificationRequest =
  typeof ArtifactVerificationRequestSchema.Type;

/** Unknown artifact input did not exactly satisfy the verification contract. */
export class ArtifactVerificationDecodeError extends Schema.TaggedError<ArtifactVerificationDecodeError>()(
  "ArtifactVerificationDecodeError",
  {
    message: Schema.Literal(
      "Artifact verification input does not satisfy its exact wire contract."
    ),
  }
) {}

/** A signed artifact exceeded the canonical UTF-8 wire ceiling. */
export class ArtifactVerificationByteLimitError extends Schema.TaggedError<ArtifactVerificationByteLimitError>()(
  "ArtifactVerificationByteLimitError",
  {
    actualBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    maxBytes: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}

/** Declared compiled bytes differ from the authenticated function body. */
export class ArtifactCompiledByteLengthMismatchError extends Schema.TaggedError<ArtifactCompiledByteLengthMismatchError>()(
  "ArtifactCompiledByteLengthMismatchError",
  {
    actualBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    contentKey: ContentKeySchema,
    declaredBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
  }
) {}

/** One authenticated payload field exceeded its shared runtime ceiling. */
export class ArtifactPayloadFieldByteLimitError extends Schema.TaggedError<ArtifactPayloadFieldByteLimitError>()(
  "ArtifactPayloadFieldByteLimitError",
  {
    actualBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    contentKey: ContentKeySchema,
    field: Schema.Literal(
      "rawMdx",
      "compiledCode",
      "plainText",
      "canonicalPayload"
    ),
    maxBytes: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}

/** SHA-256 computation failed before authenticity could be established. */
export class ArtifactHashComputationError extends Schema.TaggedError<ArtifactHashComputationError>()(
  "ArtifactHashComputationError",
  { contentKey: ContentKeySchema }
) {}

/** The signed artifact hash does not identify its canonical payload. */
export class ArtifactHashMismatchError extends Schema.TaggedError<ArtifactHashMismatchError>()(
  "ArtifactHashMismatchError",
  {
    actualHash: Sha256HashSchema,
    contentKey: ContentKeySchema,
    expectedHash: Sha256HashSchema,
  }
) {}

/** SHA-256 could not be calculated for the authenticated authored source. */
export class ArtifactSourceHashComputationError extends Schema.TaggedError<ArtifactSourceHashComputationError>()(
  "ArtifactSourceHashComputationError",
  { contentKey: ContentKeySchema }
) {}

/** The authenticated source hash does not identify the complete raw MDX. */
export class ArtifactSourceHashMismatchError extends Schema.TaggedError<ArtifactSourceHashMismatchError>()(
  "ArtifactSourceHashMismatchError",
  {
    actualHash: Sha256HashSchema,
    contentKey: ContentKeySchema,
    expectedHash: Sha256HashSchema,
  }
) {}

/** The runtime and hash-validated renderer envelope disagree globally. */
export class RendererContractVersionMismatchError extends Schema.TaggedError<RendererContractVersionMismatchError>()(
  "RendererContractVersionMismatchError",
  {
    actualVersion: RendererContractVersionSchema,
    expectedVersion: RendererContractVersionSchema,
  }
) {}

/** A custom component required by the artifact is absent from the renderer. */
export class ArtifactRendererComponentMissingError extends Schema.TaggedError<ArtifactRendererComponentMissingError>()(
  "ArtifactRendererComponentMissingError",
  {
    componentName: RendererComponentNameSchema,
    contentKey: ContentKeySchema,
  }
) {}

/** The renderer does not implement the exact required component version. */
export class ArtifactRendererVersionUnsupportedError extends Schema.TaggedError<ArtifactRendererVersionUnsupportedError>()(
  "ArtifactRendererVersionUnsupportedError",
  {
    componentName: RendererComponentNameSchema,
    contentKey: ContentKeySchema,
    requiredVersion: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}
