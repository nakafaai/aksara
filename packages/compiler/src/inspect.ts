import { createProcessor } from "@mdx-js/mdx";
import type { CompileDocumentRequest } from "@nakafa/aksara-contracts/content";
import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { Effect } from "effect";
import { createCompilerConfigHash } from "#compiler/config";
import {
  enforceContentByteLimit,
  validateCompileRequest,
} from "#compiler/engine";
import { MdxCompilationError } from "#compiler/errors";
import { hashUtf8 } from "#compiler/hash";
import type { AuthoredMetadata, MetadataSourceRange } from "#compiler/metadata";
import { readMetadataDocument } from "#compiler/metadata";

/** Lightweight source facts used before deciding whether code generation is needed. */
export interface ContentSourceInspection {
  readonly bodyMdx: string;
  readonly compilerConfigHash: Sha256Hash;
  readonly metadata: AuthoredMetadata;
  readonly sourceHash: Sha256Hash;
}

/** Every expected failure surfaced by lightweight source inspection. */
export type ContentSourceInspectionError =
  | Effect.Error<ReturnType<typeof createCompilerConfigHash>>
  | Effect.Error<ReturnType<typeof enforceContentByteLimit>>
  | Effect.Error<ReturnType<typeof extractAuthoredBody>>
  | Effect.Error<ReturnType<typeof readMetadataDocument>>
  | Effect.Error<ReturnType<typeof validateCompileRequest>>
  | MdxCompilationError;

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

/**
 * Inspects metadata and immutable inputs without running the MDX code generator.
 * A caller still performs full compilation for every changed fingerprint.
 */
export const inspectContentSource: (
  input: unknown
) => Effect.Effect<ContentSourceInspection, ContentSourceInspectionError> =
  Effect.fn("AksaraCompiler.inspectContentSource")((input: unknown) =>
    validateCompileRequest(input).pipe(
      Effect.flatMap((request) =>
        Effect.gen(function* () {
          yield* enforceContentByteLimit(
            request.contentKey,
            "rawMdx",
            request.rawMdx,
            MAX_RAW_MDX_BYTES
          );
          const tree = yield* parseSource(request);
          const document = yield* readMetadataDocument(
            request.contentKey,
            tree
          );
          const bodyMdx = yield* extractAuthoredBody(
            request.contentKey,
            request.rawMdx,
            document.sourceRange
          );
          return {
            bodyMdx,
            compilerConfigHash: yield* createCompilerConfigHash(
              request.rendererManifest,
              request.rendererDomain
            ),
            metadata: document.metadata,
            sourceHash: hashUtf8(request.rawMdx),
          } satisfies ContentSourceInspection;
        })
      )
    )
  );
