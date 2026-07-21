import { ContentKeySchema } from "@nakafaai/aksara-contracts/ids";
import { Schema } from "effect";

/** The trusted MDX compiler rejected syntax or failed to emit JavaScript. */
export class MdxCompilationError extends Schema.TaggedError<MdxCompilationError>()(
  "MdxCompilationError",
  {
    cause: Schema.Unknown,
    contentKey: ContentKeySchema,
    message: Schema.NonEmptyTrimmedString,
  }
) {}

/** Redacted location and statement class for unsupported MDX module syntax. */
export const UnsupportedMdxModuleOccurrenceSchema = Schema.Struct({
  column: Schema.Number.pipe(Schema.int(), Schema.positive()),
  kind: Schema.Literal("import", "export", "mixed", "unknown"),
  line: Schema.Number.pipe(Schema.int(), Schema.positive()),
});
export type UnsupportedMdxModuleOccurrence =
  typeof UnsupportedMdxModuleOccurrenceSchema.Type;

/** MDX module syntax would require runtime code outside the renderer registry. */
export class UnsupportedMdxModuleSyntaxError extends Schema.TaggedError<UnsupportedMdxModuleSyntaxError>()(
  "UnsupportedMdxModuleSyntaxError",
  {
    contentKey: ContentKeySchema,
    occurrences: Schema.Array(UnsupportedMdxModuleOccurrenceSchema).pipe(
      Schema.minItems(1)
    ),
  }
) {}

/** A compiled component is absent from the exact renderer contract. */
export class RendererComponentMissingError extends Schema.TaggedError<RendererComponentMissingError>()(
  "RendererComponentMissingError",
  {
    componentName: Schema.NonEmptyTrimmedString,
    contentKey: ContentKeySchema,
  }
) {}

/** One AST-level executable capability rejected by the trusted-author policy. */
export const ExecutablePolicyViolationSchema = Schema.Struct({
  identifier: Schema.optional(Schema.NonEmptyTrimmedString),
  rule: Schema.Literal(
    "dynamic-import",
    "require",
    "eval",
    "Function",
    "process",
    "globalThis",
    "network-global",
    "prototype-chain-access",
    "dangerous-jsx-attribute",
    "unknown-free-global"
  ),
});
export type ExecutablePolicyViolation =
  typeof ExecutablePolicyViolationSchema.Type;

/** Authored executable syntax exceeded the explicit MDX capability policy. */
export class ExecutablePolicyError extends Schema.TaggedError<ExecutablePolicyError>()(
  "ExecutablePolicyError",
  {
    contentKey: ContentKeySchema,
    violations: Schema.Array(ExecutablePolicyViolationSchema),
  }
) {}

/** One UTF-8 content field exceeded its evidence-led v1 byte ceiling. */
export class ContentByteLimitExceededError extends Schema.TaggedError<ContentByteLimitExceededError>()(
  "ContentByteLimitExceededError",
  {
    actualBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    contentKey: ContentKeySchema,
    field: Schema.Literal(
      "rawMdx",
      "compiledCode",
      "plainText",
      "canonicalPayload"
    ),
    maxBytes: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}

/** Static metadata syntax rejected without evaluating authored JavaScript. */
export const AuthoredMetadataSyntaxReasonSchema = Schema.Literal(
  "array-hole",
  "computed-property",
  "duplicate-property",
  "dynamic-value",
  "invalid-declaration",
  "mixed-metadata-module",
  "spread",
  "unsupported-property"
);
export type AuthoredMetadataSyntaxReason =
  typeof AuthoredMetadataSyntaxReasonSchema.Type;

/** Every authored MDX document must declare exactly one metadata export. */
export class AuthoredMetadataMissingError extends Schema.TaggedError<AuthoredMetadataMissingError>()(
  "AuthoredMetadataMissingError",
  { contentKey: ContentKeySchema }
) {}

/** More than one metadata export would make document identity ambiguous. */
export class AuthoredMetadataDuplicateError extends Schema.TaggedError<AuthoredMetadataDuplicateError>()(
  "AuthoredMetadataDuplicateError",
  {
    contentKey: ContentKeySchema,
    count: Schema.Number.pipe(Schema.int(), Schema.greaterThan(1)),
  }
) {}

/** Metadata contains syntax outside literal arrays and plain objects. */
export class AuthoredMetadataSyntaxError extends Schema.TaggedError<AuthoredMetadataSyntaxError>()(
  "AuthoredMetadataSyntaxError",
  {
    contentKey: ContentKeySchema,
    reasons: Schema.Array(AuthoredMetadataSyntaxReasonSchema).pipe(
      Schema.minItems(1)
    ),
  }
) {}

/** Static metadata did not satisfy the exact authored metadata contract. */
export class AuthoredMetadataContractError extends Schema.TaggedError<AuthoredMetadataContractError>()(
  "AuthoredMetadataContractError",
  {
    cause: Schema.Unknown,
    contentKey: ContentKeySchema,
  }
) {}
