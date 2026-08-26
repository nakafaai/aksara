import type {
  CompiledContentPayload,
  decodeCompileDocumentRequest,
} from "@nakafa/aksara-contracts/content";
import type { selectRendererDomainCapability } from "@nakafa/aksara-contracts/renderer/contract";
import type { validateLiveRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
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
  MdxCompilationError,
  RendererComponentMissingError,
} from "#compiler/errors";
import type { AuthoredMetadata } from "#compiler/metadata";
import type { SourcePolicyError } from "#compiler/source-policy";

/** One generic compile result with its single AST-decoded metadata object. */
export interface CompiledContentResult {
  readonly metadata: AuthoredMetadata;
  readonly payload: CompiledContentPayload;
}

/** Every expected failure surfaced by trusted MDX compilation. */
export type CompileContentError =
  | Effect.Error<ReturnType<typeof decodeCompileDocumentRequest>>
  | Effect.Error<ReturnType<typeof selectRendererDomainCapability>>
  | Effect.Error<ReturnType<typeof validateLiveRendererManifestHash>>
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
