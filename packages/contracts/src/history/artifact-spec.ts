import { Schema } from "effect";

import { HistoricalAppLocaleSchema } from "#contracts/history/locale";
import {
  compareHistoricalCodeUnits,
  HistoricalPrimitive,
  HistoricalSha256HashSchema,
} from "#contracts/history/primitives";

const {
  ContentKeySchema,
  Ed25519SignatureSchema,
  RendererDomainSchema,
  SigningKeyIdSchema,
} = HistoricalPrimitive;

/** Frozen artifact ceilings covered by retained runtime tests. */
export const HISTORICAL_ARTIFACT_LIMITS = {
  canonicalPayload: 448 * 1024,
  compiledCode: 256 * 1024,
  plainText: 128 * 1024,
  rawMdx: 128 * 1024,
  signedArtifact: 480 * 1024,
} as const;

/** Unknown retained artifact bytes do not satisfy the frozen old contract. */
export class StoredArtifactDecodeError extends Schema.TaggedError<StoredArtifactDecodeError>()(
  "StoredArtifactDecodeError",
  {}
) {}

/** A retained artifact exceeded its frozen complete-wire ceiling. */
export class StoredArtifactWireByteLimitError extends Schema.TaggedError<StoredArtifactWireByteLimitError>()(
  "StoredArtifactWireByteLimitError",
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

/** Retained compiled bytes differ from their signed declared length. */
export class StoredArtifactCompiledByteLengthMismatchError extends Schema.TaggedError<StoredArtifactCompiledByteLengthMismatchError>()(
  "StoredArtifactCompiledByteLengthMismatchError",
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

/** One retained payload field exceeded its frozen byte ceiling. */
export class StoredArtifactFieldByteLimitError extends Schema.TaggedError<StoredArtifactFieldByteLimitError>()(
  "StoredArtifactFieldByteLimitError",
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

/** Web Crypto could not hash one retained canonical artifact payload. */
export class StoredArtifactHashComputeError extends Schema.TaggedError<StoredArtifactHashComputeError>()(
  "StoredArtifactHashComputeError",
  { contentKey: ContentKeySchema }
) {}

/** A retained artifact hash does not identify its exact canonical payload. */
export class StoredArtifactHashMismatchError extends Schema.TaggedError<StoredArtifactHashMismatchError>()(
  "StoredArtifactHashMismatchError",
  {
    actualHash: HistoricalSha256HashSchema,
    contentKey: ContentKeySchema,
    expectedHash: HistoricalSha256HashSchema,
  }
) {}

/** Web Crypto could not hash one retained raw MDX source. */
export class StoredArtifactSourceHashComputeError extends Schema.TaggedError<StoredArtifactSourceHashComputeError>()(
  "StoredArtifactSourceHashComputeError",
  { contentKey: ContentKeySchema }
) {}

/** A retained source hash does not identify its exact raw MDX bytes. */
export class StoredArtifactSourceHashMismatchError extends Schema.TaggedError<StoredArtifactSourceHashMismatchError>()(
  "StoredArtifactSourceHashMismatchError",
  {
    actualHash: HistoricalSha256HashSchema,
    contentKey: ContentKeySchema,
    expectedHash: HistoricalSha256HashSchema,
  }
) {}

const HistoricalComponentRequirementSchema = Schema.Struct({
  name: Schema.String.pipe(
    Schema.check(Schema.isPattern(/^[A-Za-z][A-Za-z0-9]*$/u))
  ),
  version: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
});
type HistoricalComponentRequirement =
  typeof HistoricalComponentRequirementSchema.Type;

/** Checks retained component requirements are unique and canonical. */
function hasCanonicalRequirements(
  requirements: readonly HistoricalComponentRequirement[]
) {
  return requirements.every((requirement, index) => {
    const previous = requirements[index - 1];
    return (
      previous === undefined ||
      compareHistoricalCodeUnits(previous.name, requirement.name) < 0
    );
  });
}

const HistoricalRequirementsSchema = Schema.Array(
  HistoricalComponentRequirementSchema
).pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalRequirements, {
      message: "Stored renderer requirements are not canonical.",
    })
  )
);

/** Exact compiled payload shape signed before application-locale separation. */
export const HistoricalCompiledContentPayloadSchema = Schema.Struct({
  byteLength: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThanOrEqualTo(0))
  ),
  compiledCode: Schema.String,
  compilerConfigHash: HistoricalSha256HashSchema,
  compilerVersion: Schema.Literal("0.1.0"),
  contentKey: ContentKeySchema,
  format: Schema.Literal("mdx-function-body-v1"),
  locale: HistoricalAppLocaleSchema,
  mdxCompilerVersion: Schema.Literal("3.1.1"),
  plainText: Schema.String,
  rawMdx: Schema.String,
  rendererDomain: RendererDomainSchema,
  requiredComponents: HistoricalRequirementsSchema,
  sourceHash: HistoricalSha256HashSchema,
});
export type HistoricalCompiledContentPayload =
  typeof HistoricalCompiledContentPayloadSchema.Type;

/** Exact signed artifact envelope retained by existing attempts. */
export const HistoricalSignedContentArtifactSchema = Schema.Struct({
  artifactHash: HistoricalSha256HashSchema,
  keyId: SigningKeyIdSchema,
  payload: HistoricalCompiledContentPayloadSchema,
  signature: Ed25519SignatureSchema,
});
export type HistoricalSignedContentArtifact =
  typeof HistoricalSignedContentArtifactSchema.Type;
