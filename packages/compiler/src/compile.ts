import {
  CompiledContentPayloadSchema,
  type decodeCompileDocumentRequest,
} from "@nakafa/aksara-contracts/content";
import type { selectRendererDomainCapability } from "@nakafa/aksara-contracts/renderer/contract";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Schema } from "effect";
import {
  compileValidatedContent,
  validateCompileRequest,
} from "#compiler/engine";
import type {
  AuthoredMetadataDuplicateError,
  AuthoredMetadataMissingError,
  AuthoredMetadataSyntaxError,
  ContentByteLimitExceededError,
  MdxCompilationError,
  RendererComponentMissingError,
} from "#compiler/errors";
import { AuthoredMetadataSchema } from "#compiler/metadata";
import type { SourcePolicyError } from "#compiler/policy/source";

/** One generic compile result with its single AST-decoded metadata object. */
export const CompiledContentResultSchema = Schema.Struct({
  metadata: AuthoredMetadataSchema,
  payload: CompiledContentPayloadSchema,
});
export type CompiledContentResult = typeof CompiledContentResultSchema.Type;

/** Every expected failure surfaced by trusted MDX compilation. */
export type CompileContentError =
  | Effect.Error<ReturnType<typeof decodeCompileDocumentRequest>>
  | Effect.Error<ReturnType<typeof selectRendererDomainCapability>>
  | Effect.Error<ReturnType<typeof validateRendererManifestHash>>
  | AuthoredMetadataDuplicateError
  | AuthoredMetadataMissingError
  | AuthoredMetadataSyntaxError
  | ContentByteLimitExceededError
  | MdxCompilationError
  | RendererComponentMissingError
  | SourcePolicyError;

/** Compiles trusted authored MDX without executing the emitted function body. */
export const compileContent: (
  input: unknown
) => Effect.Effect<CompiledContentResult, CompileContentError> = Effect.fn(
  "AksaraCompiler.compileContent"
)((input: unknown) =>
  validateCompileRequest(input).pipe(Effect.flatMap(compileValidatedContent))
);
