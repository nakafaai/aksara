import { Effect, Schema } from "effect";
import { decodeContract } from "#contracts/decode";
import {
  type ContentKey,
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  type PublicPath,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { CompiledContentRequirementsSchema } from "#contracts/renderer/component";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import { RendererDomainSchema } from "#contracts/renderer/domain";

/** Locale baseline pinned to Nakafa 25506da until its contract is migrated. */
export const ContentLocaleSchema = Schema.Literal("en", "id");
export type ContentLocale = typeof ContentLocaleSchema.Type;

/** Published content families backed by real Aksara source registries. */
export const ContentFamilySchema = Schema.Literal(
  "article",
  "material",
  "question"
);
export type ContentFamily = typeof ContentFamilySchema.Type;

/** Exact authored person identity exposed by Nakafa content metadata. */
export const ContentAuthorSchema = Schema.Struct({ name: Schema.String });
export type ContentAuthor = typeof ContentAuthorSchema.Type;

/** Stable locale-specific identity shared by content heads and projections. */
export interface ContentHeadIdentity {
  readonly contentKey: ContentKey;
  readonly locale: ContentLocale;
}

/** Builds the unambiguous key used for one locale-specific content head. */
export function headIdentity(input: ContentHeadIdentity) {
  return `${input.contentKey}\0${input.locale}`;
}

/** Builds the unambiguous key used for one locale-specific public route. */
export function routeIdentity(input: {
  readonly locale: ContentLocale;
  readonly publicPath: PublicPath;
}) {
  return `${input.locale}\0${input.publicPath}`;
}

/** Compares content heads using deterministic Unicode code-unit order. */
export function compareContentHeads(
  left: ContentHeadIdentity,
  right: ContentHeadIdentity
) {
  if (left.contentKey < right.contentKey) {
    return -1;
  }
  if (left.contentKey > right.contentKey) {
    return 1;
  }
  if (left.locale < right.locale) {
    return -1;
  }
  if (left.locale > right.locale) {
    return 1;
  }
  return 0;
}

/** Compiler protocol implemented by this Aksara compiler release. */
export const AKSARA_COMPILER_VERSION = "0.1.0";

/** Official MDX compiler version used to produce function-body artifacts. */
export const MDX_COMPILER_VERSION = "3.1.1";

/** Authored source identity accepted before deterministic compilation. */
export const CompileDocumentSourceSchema = Schema.Struct({
  contentKey: ContentKeySchema,
  locale: ContentLocaleSchema,
  rawMdx: Schema.String,
  rendererDomain: RendererDomainSchema,
  sourcePath: CorpusSourcePathSchema,
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
  plainText: Schema.String,
  rawMdx: Schema.String,
  rendererDomain: RendererDomainSchema,
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

const CONTENT_ARTIFACT_SIGNATURE_DOMAIN = "nakafa.aksara.content-artifact.v1";

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
    plainText: payload.plainText,
    rawMdx: payload.rawMdx,
    rendererDomain: payload.rendererDomain,
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
  decodeContract(CompileDocumentRequestSchema, "CompileDocumentRequest", input)
);

/** Strictly decodes one authored source before a publication recompile. */
export const decodeCompileDocumentSource = Effect.fn(
  "AksaraContracts.decodeCompileDocumentSource"
)((input: unknown) =>
  decodeContract(CompileDocumentSourceSchema, "CompileDocumentSource", input)
);
