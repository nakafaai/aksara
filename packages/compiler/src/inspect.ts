import { createProcessor } from "@mdx-js/mdx";
import type { CompileDocumentRequest } from "@nakafa/aksara-contracts/content";
import type {
  ContentKey,
  CorpusSourcePath,
  Sha256Hash,
} from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import type { ArtifactLocale } from "@nakafa/aksara-contracts/locale";
import { selectRendererDomainCapability } from "@nakafa/aksara-contracts/renderer/contract";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect } from "effect";
import type { Root } from "mdast";
import { unified } from "unified";
import { createCompilerConfigHash } from "#compiler/config";
import {
  enforceContentByteLimit,
  validateCompileRequest,
} from "#compiler/engine";
import { MdxCompilationError } from "#compiler/errors";
import { hashUtf8 } from "#compiler/hash";
import type { AuthoredMetadata, MetadataSourceRange } from "#compiler/metadata";
import { readMetadataDocument } from "#compiler/metadata";
import {
  createSourcePolicy,
  type SourcePolicyError,
} from "#compiler/source-policy";

/** Lightweight source facts used before deciding whether code generation is needed. */
export interface ContentSourceInspection {
  readonly artifactLocale: ArtifactLocale;
  readonly bodyMdx: string;
  readonly compilerConfigHash: Sha256Hash;
  readonly contentKey: ContentKey;
  readonly metadata: AuthoredMetadata;
  readonly rendererDomain: RendererDomain;
  readonly sourceHash: Sha256Hash;
  readonly sourcePath: CorpusSourcePath;
}

/** Every expected failure surfaced by lightweight source inspection. */
export type ContentSourceInspectionError =
  | Effect.Error<ReturnType<typeof createCompilerConfigHash>>
  | Effect.Error<ReturnType<typeof enforceContentByteLimit>>
  | Effect.Error<ReturnType<typeof extractAuthoredBody>>
  | Effect.Error<ReturnType<typeof readMetadataDocument>>
  | Effect.Error<ReturnType<typeof validateCompileRequest>>
  | MdxCompilationError
  | SourcePolicyError;

/** Removes one validated metadata export while preserving exact authored MDX. */
export const extractAuthoredBody = Effect.fn(
  "AksaraCompiler.extractAuthoredBody"
)(function* (
  contentKey: CompileDocumentRequest["contentKey"],
  rawMdx: string,
  sourceRange: MetadataSourceRange | undefined
) {
  if (sourceRange === undefined) {
    return yield* new MdxCompilationError({
      cause: "metadata-source-range",
      contentKey,
      message: "The metadata source range is missing.",
    });
  }
  const metadataSource = rawMdx.slice(sourceRange.start, sourceRange.end);
  if (metadataSource !== sourceRange.source) {
    return yield* new MdxCompilationError({
      cause: "metadata-source-range",
      contentKey,
      message: "The metadata source range does not match the authored source.",
    });
  }
  return rawMdx.slice(0, sourceRange.start) + rawMdx.slice(sourceRange.end);
});

/** Parses one trusted source to metadata and hashes without emitting JavaScript. */
function parseSource(request: CompileDocumentRequest) {
  return Effect.try({
    catch: (cause) =>
      new MdxCompilationError({
        cause,
        contentKey: request.contentKey,
        message: String(cause),
      }),
    try: () => createProcessor({ format: "mdx" }).parse(request.rawMdx),
  });
}

/** Applies every authored-source policy before cache or publication reuse. */
const validateSourcePolicy = Effect.fn(
  "AksaraCompiler.validateInspectedSourcePolicy"
)(function* (request: CompileDocumentRequest, tree: Root) {
  const domain = yield* selectRendererDomainCapability(
    request.rendererManifest,
    request.rendererDomain
  );
  const allowedComponents = new Set(
    [
      ...request.rendererManifest.base.authoringComponents,
      ...domain.authoringComponents,
    ].map(({ name }) => name)
  );
  const policy = createSourcePolicy(request.contentKey, allowedComponents);
  yield* Effect.try({
    catch: (cause) =>
      new MdxCompilationError({
        cause,
        contentKey: request.contentKey,
        message: String(cause),
      }),
    try: () => unified().use(policy.remarkPlugins).runSync(tree),
  });
  yield* policy.validate();
});

/** Inspects one decoded source before cache or publication reuse. */
const inspectValidatedContentSource = Effect.fn(
  "AksaraCompiler.inspectValidatedContentSource"
)(function* (request: CompileDocumentRequest) {
  yield* enforceContentByteLimit(
    request.contentKey,
    "rawMdx",
    request.rawMdx,
    MAX_RAW_MDX_BYTES
  );
  const tree = yield* parseSource(request);
  const document = yield* readMetadataDocument(request.contentKey, tree);
  yield* validateSourcePolicy(request, document.bodyTree);
  const bodyMdx = yield* extractAuthoredBody(
    request.contentKey,
    request.rawMdx,
    document.sourceRange
  );
  return {
    artifactLocale: request.artifactLocale,
    bodyMdx,
    compilerConfigHash: yield* createCompilerConfigHash(
      request.rendererManifest,
      request.rendererDomain
    ),
    contentKey: request.contentKey,
    metadata: document.metadata,
    rendererDomain: request.rendererDomain,
    sourceHash: hashUtf8(request.rawMdx),
    sourcePath: request.sourcePath,
  } satisfies ContentSourceInspection;
});

/**
 * Inspects metadata and immutable inputs without running the MDX code generator.
 * A caller still performs full compilation for every changed fingerprint.
 */
export const inspectContentSource: (
  input: unknown
) => Effect.Effect<ContentSourceInspection, ContentSourceInspectionError> =
  Effect.fn("AksaraCompiler.inspectContentSource")((input: unknown) =>
    validateCompileRequest(input).pipe(
      Effect.flatMap(inspectValidatedContentSource)
    )
  );
