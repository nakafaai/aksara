import { createProcessor } from "@mdx-js/mdx";
import type { CompileDocumentRequest } from "@nakafa/aksara-contracts/content";
import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { selectRendererDomainCapability } from "@nakafa/aksara-contracts/renderer/contract";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, HashSet, Schema } from "effect";
import type { Root } from "mdast";
import { unified } from "unified";
import { createCompilerConfigHash } from "#compiler/config";
import {
  enforceContentByteLimit,
  validateCompileRequest,
} from "#compiler/engine";
import { MdxCompilationError } from "#compiler/errors";
import { hashUtf8 } from "#compiler/hash";
import {
  AuthoredMetadataSchema,
  type MetadataSourceRange,
  readMetadataDocument,
} from "#compiler/metadata";
import {
  createSourcePolicy,
  type SourcePolicyError,
} from "#compiler/policy/source";

/** Lightweight source facts used before deciding whether code generation is needed. */
const ContentSourceInspectionSchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  bodyMdx: Schema.String,
  compilerConfigHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  metadata: AuthoredMetadataSchema,
  rendererDomain: RendererDomainSchema,
  sourceHash: Sha256HashSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type ContentSourceInspection = typeof ContentSourceInspectionSchema.Type;

const HistoricalContentSourceRequestSchema = Schema.Struct({
  contentKey: ContentKeySchema,
  rawMdx: Schema.String,
});

/** Decodes the minimal authenticated historical source-inspection request. */
const decodeHistoricalContentSourceRequest = Effect.fn(
  "AksaraCompiler.decodeHistoricalContentSourceRequest"
)((input: unknown) =>
  Schema.decodeUnknownEffect(HistoricalContentSourceRequestSchema)(input, {
    onExcessProperty: "error",
  })
);

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
function parseSource(request: {
  readonly contentKey: ContentKey;
  readonly rawMdx: string;
}) {
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

/**
 * Reads authenticated historical metadata without applying today's authored
 * source policy. It preserves the exact body bytes for lossless conversion.
 */
export const inspectHistoricalContentSource = Effect.fn(
  "AksaraCompiler.inspectHistoricalContentSource"
)((input: unknown) =>
  decodeHistoricalContentSourceRequest(input).pipe(
    Effect.flatMap((request) =>
      Effect.gen(function* () {
        yield* enforceContentByteLimit(
          request.contentKey,
          "rawMdx",
          request.rawMdx,
          MAX_RAW_MDX_BYTES
        );
        const tree = yield* parseSource(request);
        const document = yield* readMetadataDocument(request.contentKey, tree);
        const bodyMdx = yield* extractAuthoredBody(
          request.contentKey,
          request.rawMdx,
          document.sourceRange
        );
        return {
          bodyMdx,
          contentKey: request.contentKey,
          metadata: document.metadata,
          sourceHash: hashUtf8(request.rawMdx),
        };
      })
    )
  )
);

/** Applies every authored-source policy before cache or publication reuse. */
const validateSourcePolicy = Effect.fn(
  "AksaraCompiler.validateInspectedSourcePolicy"
)(function* (request: CompileDocumentRequest, tree: Root) {
  const domain = yield* selectRendererDomainCapability(
    request.rendererManifest,
    request.rendererDomain
  );
  const allowedComponents = HashSet.fromIterable([
    ...request.rendererManifest.base,
    ...domain.components,
  ]);
  const policy = createSourcePolicy(
    request.contentKey,
    request.sourcePath,
    allowedComponents
  );
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
