import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Schema } from "effect";

/** Official MDX parsing failed before import normalization could inspect it. */
export class MdxImportParseError extends Schema.TaggedError<MdxImportParseError>()(
  "MdxImportParseError",
  { cause: Schema.Unknown, sourcePath: Schema.String }
) {}

/** Imported executable syntax falls outside the reviewed migration contract. */
export class MdxImportNormalizationError extends Schema.TaggedError<MdxImportNormalizationError>()(
  "MdxImportNormalizationError",
  {
    binding: Schema.optional(Schema.String),
    importSource: Schema.optional(Schema.String),
    reason: Schema.Literal(
      "alias",
      "contract",
      "escaping",
      "mixed-module",
      "namespace",
      "side-effect",
      "source-path",
      "unknown-component",
      "unknown-module",
      "unresolved",
      "unsupported-use"
    ),
    sourcePath: Schema.String,
  }
) {}

/** One imported migration macro cannot be safely reduced to literal MDX. */
export class MdxMacroNormalizationError extends Schema.TaggedError<MdxMacroNormalizationError>()(
  "MdxMacroNormalizationError",
  {
    binding: Schema.optional(Schema.String),
    reason: Schema.Literal(
      "expression",
      "import-binding",
      "import-shape",
      "macro-input",
      "source-position",
      "unsupported-use"
    ),
    sourcePath: Schema.String,
  }
) {}

/** One approved direct design-system module and its exact JSX exports. */
export interface ApprovedComponentImport {
  readonly components: readonly string[];
  readonly source: string;
}

/** One component export provided by a resolved corpus-local TSX module. */
export interface RelativeComponentExport {
  readonly componentName: string;
  readonly exportName: "default" | string;
}

/** Exact resolved TSX module inventory from one pinned Nakafa source revision. */
export interface RelativeComponentModule {
  readonly exports: readonly RelativeComponentExport[];
  readonly rendererDomain: RendererDomain;
  readonly sourcePath: string;
}

/** Complete pure input needed to normalize imports in one authored MDX file. */
export interface NormalizeMdxImportsInput {
  readonly approvedImports: readonly ApprovedComponentImport[];
  readonly rawMdx: string;
  /** Exact realpath-verified inventory supplied by the Git/filesystem adapter. */
  readonly relativeModules: readonly RelativeComponentModule[];
  readonly sourcePath: string;
  /** Lexical root checked here after the adapter has rejected symlink escapes. */
  readonly sourceRoot: string;
}

/** Import-free MDX and the renderer contracts introduced by removed imports. */
export interface NormalizedMdxImports {
  readonly rawMdx: string;
  readonly requiredComponents: readonly string[];
}

/** Constructs one concise typed normalization rejection. */
export function rejectImport(
  sourcePath: string,
  reason: MdxImportNormalizationError["reason"],
  details: { readonly binding?: string; readonly importSource?: string } = {}
) {
  return new MdxImportNormalizationError({ ...details, reason, sourcePath });
}

/** Constructs one concise typed compile-time macro rejection. */
export function rejectMacro(
  sourcePath: string,
  reason: MdxMacroNormalizationError["reason"],
  binding?: string
) {
  return new MdxMacroNormalizationError({ binding, reason, sourcePath });
}
