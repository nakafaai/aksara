import { Effect, Schema } from "effect";
import { ContractDecodeError } from "./errors.js";
import {
  ContentKeySchema,
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "./ids.js";
import { AuthoredContentMetadataSchema } from "./metadata.js";
import {
  CompiledContentRequirementsSchema,
  RendererManifestEnvelopeSchema,
} from "./renderer.js";

/** Locales represented by the initial parity fixture. */
export const ContentLocaleSchema = Schema.Literal("en", "id");
export type ContentLocale = typeof ContentLocaleSchema.Type;

/** First-class content families understood by the compilation wire contract. */
export const ContentKindSchema = Schema.Literal(
  "article",
  "material",
  "question",
  "answer",
  "curriculum",
  "tryout",
  "quran"
);
export type ContentKind = typeof ContentKindSchema.Type;

/** Compiler protocol implemented by this Aksara compiler release. */
export const AKSARA_COMPILER_VERSION = "0.1.0";

/** Official MDX compiler version used to produce function-body artifacts. */
export const MDX_COMPILER_VERSION = "3.1.1";

/** Authored source identity accepted before deterministic compilation. */
export const CompileDocumentSourceSchema = Schema.Struct({
  contentKey: ContentKeySchema,
  locale: ContentLocaleSchema,
  rawMdx: Schema.String,
});
export type CompileDocumentSource = typeof CompileDocumentSourceSchema.Type;

/** Validated request accepted by the trusted MDX compiler. */
export const CompileDocumentRequestSchema = Schema.Struct({
  ...CompileDocumentSourceSchema.fields,
  rendererManifest: RendererManifestEnvelopeSchema,
});
export type CompileDocumentRequest = typeof CompileDocumentRequestSchema.Type;

/** Precompiled trusted payload stored and signed before server-only execution. */
export const CompiledContentPayloadSchema = Schema.Struct({
  byteLength: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
  compiledCode: Schema.String,
  compilerConfigHash: Sha256HashSchema,
  compilerVersion: Schema.Literal(AKSARA_COMPILER_VERSION),
  contentKey: ContentKeySchema,
  format: Schema.Literal("mdx-function-body-v1"),
  locale: ContentLocaleSchema,
  mdxCompilerVersion: Schema.Literal(MDX_COMPILER_VERSION),
  metadata: AuthoredContentMetadataSchema,
  plainText: Schema.String,
  rawMdx: Schema.String,
  requiredComponents: CompiledContentRequirementsSchema,
  sourceHash: Sha256HashSchema,
});
export type CompiledContentPayload = typeof CompiledContentPayloadSchema.Type;

/** Immutable compiled payload plus its asymmetric authenticity proof. */
export const SignedContentArtifactSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  keyId: SigningKeyIdSchema,
  payload: CompiledContentPayloadSchema,
  signature: Ed25519SignatureSchema,
});
export type SignedContentArtifact = typeof SignedContentArtifactSchema.Type;

export const CONTENT_ARTIFACT_SIGNATURE_DOMAIN =
  "nakafa.aksara.content-artifact.v1";

function canonicalizeMetadata(
  metadata: typeof AuthoredContentMetadataSchema.Type
) {
  return {
    authors: metadata.authors.map(({ name }) => ({ name })),
    date: metadata.date,
    ...(metadata.description === undefined
      ? {}
      : { description: metadata.description }),
    ...(metadata.subject === undefined ? {} : { subject: metadata.subject }),
    title: metadata.title,
  };
}

/** Serializes a compiled payload with stable field and component order. */
export function canonicalizeCompiledContentPayload(
  payload: CompiledContentPayload
) {
  return JSON.stringify({
    byteLength: payload.byteLength,
    compiledCode: payload.compiledCode,
    compilerConfigHash: payload.compilerConfigHash,
    compilerVersion: payload.compilerVersion,
    contentKey: payload.contentKey,
    format: payload.format,
    locale: payload.locale,
    mdxCompilerVersion: payload.mdxCompilerVersion,
    metadata: canonicalizeMetadata(payload.metadata),
    plainText: payload.plainText,
    rawMdx: payload.rawMdx,
    requiredComponents: payload.requiredComponents.map(({ name, version }) => ({
      name,
      version,
    })),
    sourceHash: payload.sourceHash,
  });
}

/** Returns the domain-separated canonical bytes covered by Ed25519. */
export function canonicalizeContentArtifactSigningInput(
  artifactHash: typeof Sha256HashSchema.Type,
  payload: CompiledContentPayload
) {
  return `${CONTENT_ARTIFACT_SIGNATURE_DOMAIN}\n${artifactHash}\n${canonicalizeCompiledContentPayload(payload)}`;
}

/** Serializes a complete signed artifact with deterministic wire field order. */
export function canonicalizeSignedContentArtifact(
  artifact: SignedContentArtifact
) {
  return `{"artifactHash":${JSON.stringify(artifact.artifactHash)},"keyId":${JSON.stringify(artifact.keyId)},"payload":${canonicalizeCompiledContentPayload(artifact.payload)},"signature":${JSON.stringify(artifact.signature)}}`;
}

/** Decodes unknown compiler input without throwing parser exceptions. */
export const decodeCompileDocumentRequest = Effect.fn(
  "AksaraContracts.decodeCompileDocumentRequest"
)((input: unknown) =>
  Schema.decodeUnknown(CompileDocumentRequestSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new ContractDecodeError({
          cause,
          contract: "CompileDocumentRequest",
          message: String(cause),
        })
    )
  )
);

/** Strictly decodes one authored source before a publication recompile. */
export const decodeCompileDocumentSource = Effect.fn(
  "AksaraContracts.decodeCompileDocumentSource"
)((input: unknown) =>
  Schema.decodeUnknown(CompileDocumentSourceSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new ContractDecodeError({
          cause,
          contract: "CompileDocumentSource",
          message: String(cause),
        })
    )
  )
);
