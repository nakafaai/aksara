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
export class ArtifactVerificationDecodeError extends Schema.TaggedError<
  ArtifactVerificationDecodeError,
  { readonly brand: unique symbol }
>()("ArtifactVerificationDecodeError", {
  message: Schema.Literal(
    "Artifact verification input does not satisfy its exact wire contract."
  ),
}) {}

/** A signed artifact exceeded the canonical UTF-8 wire ceiling. */
export class ArtifactVerificationByteLimitError extends Schema.TaggedError<
  ArtifactVerificationByteLimitError,
  { readonly brand: unique symbol }
>()("ArtifactVerificationByteLimitError", {
  actualBytes: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThanOrEqualTo(0))
  ),
  maxBytes: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
}) {}

/** One authenticated payload field exceeded its shared runtime ceiling. */
export class ArtifactPayloadFieldByteLimitError extends Schema.TaggedError<
  ArtifactPayloadFieldByteLimitError,
  { readonly brand: unique symbol }
>()("ArtifactPayloadFieldByteLimitError", {
  actualBytes: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThanOrEqualTo(0))
  ),
  contentKey: ContentKeySchema,
  field: Schema.Literals([
    "rawMdx",
    "contentTree",
    "plainText",
    "canonicalPayload",
  ]),
  maxBytes: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
}) {}

/** Fields that name one content hash, its content key, and the hash that failed. */
const ContentHashMismatchFields = {
  actualHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  expectedHash: Sha256HashSchema,
};

/** The signed artifact hash does not identify its canonical payload. */
export class ArtifactHashMismatchError extends Schema.TaggedError<
  ArtifactHashMismatchError,
  { readonly brand: unique symbol }
>()("ArtifactHashMismatchError", { ...ContentHashMismatchFields }) {}

/** The authenticated source hash does not identify the complete raw MDX. */
export class ArtifactSourceHashMismatchError extends Schema.TaggedError<
  ArtifactSourceHashMismatchError,
  { readonly brand: unique symbol }
>()("ArtifactSourceHashMismatchError", { ...ContentHashMismatchFields }) {}

/** A custom component required by the artifact is absent from the renderer. */
export class ArtifactRendererComponentMissingError extends Schema.TaggedError<
  ArtifactRendererComponentMissingError,
  { readonly brand: unique symbol }
>()("ArtifactRendererComponentMissingError", {
  componentName: RendererComponentNameSchema,
  contentKey: ContentKeySchema,
}) {}

/** The content tree uses a component that the artifact does not declare as required. */
export class ArtifactTreeComponentUnlistedError extends Schema.TaggedError<
  ArtifactTreeComponentUnlistedError,
  { readonly brand: unique symbol }
>()("ArtifactTreeComponentUnlistedError", {
  componentName: Schema.String.check(Schema.isNonEmpty()),
  contentKey: ContentKeySchema,
}) {}

/** The deployed Nakafa app cannot route this artifact's renderer domain. */
export class ArtifactRendererDomainUnpublishedError extends Schema.TaggedError<
  ArtifactRendererDomainUnpublishedError,
  { readonly brand: unique symbol }
>()("ArtifactRendererDomainUnpublishedError", {
  contentKey: ContentKeySchema,
  rendererDomain: RendererDomainSchema,
}) {}
