import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { Schema } from "effect";

/** The trusted MDX compiler rejected syntax or failed to emit JavaScript. */
export class MdxCompilationError extends Schema.TaggedError<MdxCompilationError>()(
  "MdxCompilationError",
  {
    cause: Schema.Unknown,
    contentKey: ContentKeySchema,
    message: Schema.Trimmed.check(Schema.isNonEmpty()),
  }
) {}

/** Redacted location and statement class for unsupported MDX module syntax. */
export const UnsupportedMdxModuleOccurrenceSchema = Schema.Struct({
  column: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  kind: Schema.Literals(["import", "export", "mixed", "unknown"]),
  line: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
});
export type UnsupportedMdxModuleOccurrence =
  typeof UnsupportedMdxModuleOccurrenceSchema.Type;

/** MDX module syntax would require runtime code outside the renderer registry. */
export class UnsupportedMdxModuleSyntaxError extends Schema.TaggedError<UnsupportedMdxModuleSyntaxError>()(
  "UnsupportedMdxModuleSyntaxError",
  {
    contentKey: ContentKeySchema,
    occurrences: Schema.Array(UnsupportedMdxModuleOccurrenceSchema).pipe(
      Schema.check(Schema.isMinLength(1))
    ),
  }
) {}

/** A compiled component is absent from the exact renderer contract. */
export class RendererComponentMissingError extends Schema.TaggedError<RendererComponentMissingError>()(
  "RendererComponentMissingError",
  {
    componentName: Schema.Trimmed.check(Schema.isNonEmpty()),
    contentKey: ContentKeySchema,
  }
) {}

/** One AST-level executable capability rejected by the trusted-author policy. */
export const ExecutablePolicyViolationSchema = Schema.Struct({
  identifier: Schema.optional(Schema.Trimmed.check(Schema.isNonEmpty())),
  rule: Schema.Literals([
    "dynamic-import",
    "import-meta",
    "require",
    "eval",
    "Function",
    "process",
    "globalThis",
    "network-global",
    "prototype-chain-access",
    "dynamic-property-access",
    "dangerous-jsx-attribute",
    "unknown-free-global",
  ]),
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

/** One UTF-8 content field exceeded its evidence-led byte ceiling. */
export class ContentByteLimitExceededError extends Schema.TaggedError<ContentByteLimitExceededError>()(
  "ContentByteLimitExceededError",
  {
    actualBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
    contentKey: ContentKeySchema,
    field: Schema.Literals([
      "rawMdx",
      "compiledCode",
      "plainText",
      "canonicalPayload",
    ]),
    maxBytes: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThan(0))
    ),
  }
) {}

/** Static metadata syntax rejected without evaluating authored JavaScript. */
export const AuthoredMetadataSyntaxReasonSchema = Schema.Literals([
  "array-hole",
  "computed-property",
  "duplicate-property",
  "dynamic-value",
  "invalid-declaration",
  "mixed-metadata-module",
  "metadata-not-object",
  "spread",
  "unsupported-property",
]);
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
    count: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThan(1))
    ),
  }
) {}

/** Metadata contains syntax outside literal arrays and plain objects. */
export class AuthoredMetadataSyntaxError extends Schema.TaggedError<AuthoredMetadataSyntaxError>()(
  "AuthoredMetadataSyntaxError",
  {
    contentKey: ContentKeySchema,
    reasons: Schema.Array(AuthoredMetadataSyntaxReasonSchema).pipe(
      Schema.check(Schema.isMinLength(1))
    ),
  }
) {}
