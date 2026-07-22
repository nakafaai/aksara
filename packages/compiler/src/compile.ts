import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { compile } from "@mdx-js/mdx";
import {
  AKSARA_COMPILER_VERSION,
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  decodeCompileDocumentRequest,
  MDX_COMPILER_VERSION,
} from "@nakafaai/aksara-contracts/content";
import type { ContentKey } from "@nakafaai/aksara-contracts/ids";
import { Sha256HashSchema } from "@nakafaai/aksara-contracts/ids";
import {
  MAX_CANONICAL_PAYLOAD_BYTES,
  MAX_COMPILED_CODE_BYTES,
  MAX_PLAIN_TEXT_BYTES,
  MAX_RAW_MDX_BYTES,
} from "@nakafaai/aksara-contracts/limits";
import type { RendererComponentRequirement } from "@nakafaai/aksara-contracts/renderer/component";
import { sortRendererComponentRequirements } from "@nakafaai/aksara-contracts/renderer/component";
import type { RendererManifestEnvelope } from "@nakafaai/aksara-contracts/renderer/contract";
import { selectRendererDomainCapability } from "@nakafaai/aksara-contracts/renderer/contract";
import type { RendererDomain } from "@nakafaai/aksara-contracts/renderer/domain";
import { validateRendererManifestHash } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import type { Program } from "estree-jsx";
import { visit } from "estree-util-visit";
import type { Root } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { Plugin } from "unified";
import {
  createCompilerConfigHash,
  MDX_PROVIDER_SOURCE,
} from "#compiler/config";
import {
  type AuthoredMetadataDuplicateError,
  type AuthoredMetadataMissingError,
  type AuthoredMetadataSyntaxError,
  ContentByteLimitExceededError,
  ExecutablePolicyError,
  type ExecutablePolicyViolation,
  MdxCompilationError,
  RendererComponentMissingError,
  type UnsupportedMdxModuleOccurrence,
  UnsupportedMdxModuleSyntaxError,
} from "#compiler/errors";
import {
  type AuthoredMetadata,
  extractMetadata,
  type MetadataCollector,
  validateMetadata,
} from "#compiler/metadata";
import { enforceExecutablePolicy } from "#compiler/policy";

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

/** Produces the canonical SHA-256 identifier for one UTF-8 value. */
function sha256(value: string) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(value).digest("hex")}`
  );
}

/** Captures the searchable plain-text projection from the parsed MDX tree. */
function capturePlainText(
  setPlainText: (value: string) => void
): Plugin<[], Root> {
  return () => (tree) => {
    setPlainText(mdastToString(tree));
  };
}

/** Measures one artifact field and fails when its encoded size exceeds policy. */
function enforceByteLimit(
  contentKey: ContentKey,
  field: "rawMdx" | "compiledCode" | "plainText" | "canonicalPayload",
  value: string,
  maxBytes: number
) {
  const actualBytes = Buffer.byteLength(value, "utf8");
  if (actualBytes <= maxBytes) {
    return Effect.succeed(actualBytes);
  }
  return Effect.fail(
    new ContentByteLimitExceededError({
      actualBytes,
      contentKey,
      field,
      maxBytes,
    })
  );
}

/**
 * Captures custom component dependencies emitted as missing references.
 * Intrinsic Markdown tags are covered globally by rendererContractVersion and
 * are intentionally not repeated in each artifact requirement list.
 */
function captureRequiredComponents(names: Set<string>): Plugin<[], Program> {
  return () => (tree) => {
    visit(tree, (node) => {
      if (node.type !== "CallExpression") {
        return;
      }
      if (
        node.callee.type !== "Identifier" ||
        node.callee.name !== "_missingMdxReference"
      ) {
        return;
      }
      const [name] = node.arguments;
      if (name?.type === "Literal" && typeof name.value === "string") {
        names.add(name.value);
      }
    });
  };
}

/** Resolves referenced component names to pinned renderer requirements. */
function selectRendererRequirements(
  contentKey: ContentKey,
  names: ReadonlySet<string>,
  manifest: RendererManifestEnvelope,
  rendererDomain: RendererDomain
) {
  const domain = selectRendererDomainCapability(manifest, rendererDomain);
  const authoringComponents = [
    ...manifest.base.authoringComponents,
    ...domain.authoringComponents,
  ];
  return Effect.forEach([...names].sort(), (componentName) => {
    const selected = authoringComponents.find(
      (requirement) => requirement.name === componentName
    );
    if (!selected) {
      return Effect.fail(
        new RendererComponentMissingError({ componentName, contentKey })
      );
    }
    return Effect.succeed<RendererComponentRequirement>(selected);
  }).pipe(Effect.map(sortRendererComponentRequirements));
}

/** Compiles trusted authored MDX without executing the emitted function body. */
export const compileContent: (
  input: unknown
) => Effect.Effect<CompiledContentResult, CompileContentError> = Effect.fn(
  "AksaraCompiler.compileContent"
)((input: unknown) =>
  decodeCompileDocumentRequest(input).pipe(
    Effect.flatMap((request) => {
      const unsupportedModules: UnsupportedMdxModuleOccurrence[] = [];
      const policyViolations: ExecutablePolicyViolation[] = [];
      const requiredComponentNames = new Set<string>();
      const metadataCollector: MetadataCollector = {
        candidates: [],
        syntaxReasons: [],
      };
      let plainText = "";

      return Effect.gen(function* () {
        yield* enforceByteLimit(
          request.contentKey,
          "rawMdx",
          request.rawMdx,
          MAX_RAW_MDX_BYTES
        );
        yield* validateRendererManifestHash(request.rendererManifest);
        const file = yield* Effect.tryPromise({
          catch: (cause) =>
            new MdxCompilationError({
              cause,
              contentKey: request.contentKey,
              message: String(cause),
            }),
          try: () =>
            compile(request.rawMdx, {
              development: false,
              format: "mdx",
              outputFormat: "function-body",
              providerImportSource: MDX_PROVIDER_SOURCE,
              recmaPlugins: [captureRequiredComponents(requiredComponentNames)],
              remarkPlugins: [
                extractMetadata(metadataCollector),
                enforceExecutablePolicy(unsupportedModules, policyViolations),
                capturePlainText((value) => {
                  plainText = value;
                }),
                remarkGfm,
                [remarkMath, { singleDollarTextMath: false }],
              ],
            }),
        });

        const metadata = yield* validateMetadata(
          request.contentKey,
          metadataCollector
        );

        if (unsupportedModules.length > 0) {
          return yield* new UnsupportedMdxModuleSyntaxError({
            contentKey: request.contentKey,
            occurrences: unsupportedModules,
          });
        }
        if (policyViolations.length > 0) {
          return yield* new ExecutablePolicyError({
            contentKey: request.contentKey,
            violations: policyViolations,
          });
        }

        const compiledCode = String(file);
        const byteLength = yield* enforceByteLimit(
          request.contentKey,
          "compiledCode",
          compiledCode,
          MAX_COMPILED_CODE_BYTES
        );
        yield* enforceByteLimit(
          request.contentKey,
          "plainText",
          plainText,
          MAX_PLAIN_TEXT_BYTES
        );
        const requiredComponents = yield* selectRendererRequirements(
          request.contentKey,
          requiredComponentNames,
          request.rendererManifest,
          request.rendererDomain
        );
        const payload = CompiledContentPayloadSchema.make({
          byteLength,
          compiledCode,
          compilerConfigHash: createCompilerConfigHash(
            request.rendererManifest,
            request.rendererDomain
          ),
          compilerVersion: AKSARA_COMPILER_VERSION,
          contentKey: request.contentKey,
          format: "mdx-function-body-v1",
          locale: request.locale,
          mdxCompilerVersion: MDX_COMPILER_VERSION,
          plainText,
          rawMdx: request.rawMdx,
          rendererDomain: request.rendererDomain,
          requiredComponents,
          sourceHash: sha256(request.rawMdx),
        });
        yield* enforceByteLimit(
          request.contentKey,
          "canonicalPayload",
          canonicalizeCompiledContentPayload(payload),
          MAX_CANONICAL_PAYLOAD_BYTES
        );
        return { metadata, payload } satisfies CompiledContentResult;
      });
    })
  )
);
