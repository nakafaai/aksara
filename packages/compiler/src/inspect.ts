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
import type { AuthoredMetadata } from "#compiler/metadata";
import { readMetadataTree } from "#compiler/metadata";

/** Lightweight source facts used before deciding whether code generation is needed. */
export interface ContentSourceInspection {
  readonly compilerConfigHash: Sha256Hash;
  readonly metadata: AuthoredMetadata;
  readonly sourceHash: Sha256Hash;
}

/** Every expected failure surfaced by lightweight source inspection. */
export type ContentSourceInspectionError =
  | Effect.Effect.Error<ReturnType<typeof enforceContentByteLimit>>
  | Effect.Effect.Error<ReturnType<typeof readMetadataTree>>
  | Effect.Effect.Error<ReturnType<typeof validateCompileRequest>>
  | MdxCompilationError;

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
          const metadata = yield* readMetadataTree(request.contentKey, tree);
          return {
            compilerConfigHash: createCompilerConfigHash(
              request.rendererManifest,
              request.rendererDomain
            ),
            metadata,
            sourceHash: hashUtf8(request.rawMdx),
          } satisfies ContentSourceInspection;
        })
      )
    )
  );
