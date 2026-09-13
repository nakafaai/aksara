import { Schema } from "effect";
import { SignedContentArtifactSchema } from "#contracts/content";
import { ContentKeySchema, Sha256HashSchema } from "#contracts/ids";
import { RendererComponentNameSchema } from "#contracts/renderer/component";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import { RendererDomainSchema } from "#contracts/renderer/domain";

/** Complete input needed to authenticate an artifact against its renderer. */
export const ArtifactVerificationRequestSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
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
    actualBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
    maxBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThan(0))
    ),
  }
) {}

/** Declared compiled bytes differ from the authenticated function body. */
export class ArtifactCompiledByteLengthMismatchError extends Schema.TaggedError<ArtifactCompiledByteLengthMismatchError>()(
  "ArtifactCompiledByteLengthMismatchError",
  {
    actualBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
    contentKey: ContentKeySchema,
    declaredBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
  }
) {}

/** One authenticated payload field exceeded its shared runtime ceiling. */
export class ArtifactPayloadFieldByteLimitError extends Schema.TaggedError<ArtifactPayloadFieldByteLimitError>()(
  "ArtifactPayloadFieldByteLimitError",
  {
    actualBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
    contentKey: ContentKeySchema,
    field: Schema.Literals([
      "rawMdx",
      "compiledCode",
      "plainText",
      "canonicalPayload",
    ]),
    maxBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThan(0))
    ),
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

/** A custom component required by the artifact is absent from the renderer. */
export class ArtifactRendererComponentMissingError extends Schema.TaggedError<ArtifactRendererComponentMissingError>()(
  "ArtifactRendererComponentMissingError",
  {
    componentName: RendererComponentNameSchema,
    contentKey: ContentKeySchema,
  }
) {}

/** The deployed Nakafa app cannot route this artifact's renderer domain. */
export class ArtifactRendererDomainUnpublishedError extends Schema.TaggedError<ArtifactRendererDomainUnpublishedError>()(
  "ArtifactRendererDomainUnpublishedError",
  {
    contentKey: ContentKeySchema,
    rendererDomain: RendererDomainSchema,
  }
) {}
