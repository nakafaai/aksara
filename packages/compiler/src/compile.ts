import type {
  CompiledContentPayload,
  decodeCompileDocumentRequest,
} from "@nakafaai/aksara-contracts/content";
import type { validateRendererManifestHash } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import {
  compileValidatedContent,
  validateCompileRequest,
} from "#compiler/engine";
import type {
  AuthoredMetadataDuplicateError,
  AuthoredMetadataMissingError,
  AuthoredMetadataSyntaxError,
  ContentByteLimitExceededError,
  ExecutablePolicyError,
  MdxCompilationError,
  RendererComponentMissingError,
  UnsupportedMdxModuleSyntaxError,
} from "#compiler/errors";
import type { AuthoredMetadata } from "#compiler/metadata";

/** One generic compile result with its single AST-decoded metadata object. */
export interface CompiledContentResult {
  readonly metadata: AuthoredMetadata;
  readonly payload: CompiledContentPayload;
}

/** Every expected failure surfaced by trusted MDX compilation. */
export type CompileContentError =
  | Effect.Effect.Error<ReturnType<typeof decodeCompileDocumentRequest>>
  | Effect.Effect.Error<ReturnType<typeof validateRendererManifestHash>>
  | AuthoredMetadataDuplicateError
  | AuthoredMetadataMissingError
  | AuthoredMetadataSyntaxError
  | ContentByteLimitExceededError
  | ExecutablePolicyError
  | MdxCompilationError
  | RendererComponentMissingError
  | UnsupportedMdxModuleSyntaxError;

/** Compiles trusted authored MDX without executing the emitted function body. */
export const compileContent: (
  input: unknown
) => Effect.Effect<CompiledContentResult, CompileContentError> = Effect.fn(
  "AksaraCompiler.compileContent"
)((input: unknown) =>
  validateCompileRequest(input).pipe(Effect.flatMap(compileValidatedContent))
);
