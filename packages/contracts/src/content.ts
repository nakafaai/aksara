import { Effect, Schema } from "effect";
import { decodeContract } from "#contracts/decode";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  type PublicPath,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { type AppLocale, ArtifactLocaleSchema } from "#contracts/locale";
import { RendererComponentsSchema } from "#contracts/renderer/component";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import { RendererDomainSchema } from "#contracts/renderer/domain";
import { encodeJsonText } from "#contracts/text/json";
import { compareCodeUnits } from "#contracts/text/order";
import { ContentTreeSchema, canonicalizeContentTree } from "#contracts/tree";

/** Published content families backed by real Aksara source registries. */
export const ContentFamilySchema = Schema.Literals([
  "article",
  "material",
  "page",
]);
export type ContentFamily = typeof ContentFamilySchema.Type;

/** Exact authored person identity exposed by Nakafa content metadata. */
export const ContentAuthorSchema = Schema.Struct({ name: Schema.String });
export type ContentAuthor = typeof ContentAuthorSchema.Type;

/** Language-specific content head identity that artifacts and heads share. */
export const ContentHeadIdentitySchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
});

/** Stable language-specific identity shared by artifacts and content heads. */
export type ContentHeadIdentity = typeof ContentHeadIdentitySchema.Type;

/** Builds the unambiguous key used for one language-specific content head. */
export function headIdentity(input: ContentHeadIdentity) {
  return `${input.contentKey}\0${input.artifactLocale}`;
}

/** Builds the unambiguous key used for one application-localized route. */
export function routeIdentity(input: {
  readonly appLocale: AppLocale;
  readonly publicPath: PublicPath;
}) {
  return `${input.appLocale}\0${input.publicPath}`;
}

/** Compares content heads using deterministic Unicode code-unit order. */
export function compareContentHeads(
  left: ContentHeadIdentity,
  right: ContentHeadIdentity
) {
  const contentKeyOrder = compareCodeUnits(left.contentKey, right.contentKey);
  return (
    contentKeyOrder ||
    compareCodeUnits(left.artifactLocale, right.artifactLocale)
  );
}

/** Compiler protocol implemented by this Aksara compiler release. */
export const AKSARA_COMPILER_VERSION = "0.2.0";

/** Official MDX compiler version used to produce function-body artifacts. */
export const MDX_COMPILER_VERSION = "3.1.1";

/** Authored source identity accepted before deterministic compilation. */
export const CompileDocumentSourceSchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
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

/** Compiled trusted payload: its evaluated content tree is what Nakafa renders. */
export const CompiledContentPayloadSchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  compilerConfigHash: Sha256HashSchema,
  compilerVersion: Schema.Literal(AKSARA_COMPILER_VERSION),
  contentKey: ContentKeySchema,
  contentTree: ContentTreeSchema,
  format: Schema.Literal("content-tree"),
  mdxCompilerVersion: Schema.Literal(MDX_COMPILER_VERSION),
  plainText: Schema.String,
  rawMdx: Schema.String,
  rendererDomain: RendererDomainSchema,
  requiredComponents: RendererComponentsSchema,
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

const CONTENT_ARTIFACT_SIGNATURE_DOMAIN = "nakafa.aksara.content-artifact";

/** Serializes a compiled payload with stable field, prop, and element order. */
export function canonicalizeCompiledContentPayload(
  payload: CompiledContentPayload
) {
  return `{"artifactLocale":${encodeJsonText(payload.artifactLocale)},"compilerConfigHash":${encodeJsonText(payload.compilerConfigHash)},"compilerVersion":${encodeJsonText(payload.compilerVersion)},"contentKey":${encodeJsonText(payload.contentKey)},"contentTree":${canonicalizeContentTree(payload.contentTree)},"format":${encodeJsonText(payload.format)},"mdxCompilerVersion":${encodeJsonText(payload.mdxCompilerVersion)},"plainText":${encodeJsonText(payload.plainText)},"rawMdx":${encodeJsonText(payload.rawMdx)},"rendererDomain":${encodeJsonText(payload.rendererDomain)},"requiredComponents":${encodeJsonText(payload.requiredComponents)},"sourceHash":${encodeJsonText(payload.sourceHash)}}`;
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
  return `{"artifactHash":${encodeJsonText(artifact.artifactHash)},"keyId":${encodeJsonText(artifact.keyId)},"payload":${canonicalizeCompiledContentPayload(artifact.payload)},"signature":${encodeJsonText(artifact.signature)}}`;
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
