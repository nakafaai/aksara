import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import { Array as Arr, Effect, Option, Predicate, Schema } from "effect";
import type { Program } from "estree-jsx";
import type { Root, RootContent } from "mdast";
import type { MdxjsEsm } from "mdast-util-mdx";
import type { Plugin } from "unified";
import {
  decodeStaticLiteral,
  type StaticLiteral,
  type StaticLiteralResult,
  StaticLiteralSchema,
} from "#compiler/ast/literal";
import {
  AuthoredMetadataDuplicateError,
  AuthoredMetadataMissingError,
  AuthoredMetadataSyntaxError,
  AuthoredMetadataSyntaxReasonSchema,
} from "#compiler/errors";

export type AuthoredMetadataValue = StaticLiteral;

/** Plain static object extracted from one reviewed MDX metadata export. */
export const AuthoredMetadataSchema = Schema.Record(
  Schema.String,
  StaticLiteralSchema
);
export type AuthoredMetadata = typeof AuthoredMetadataSchema.Type;

/** Mutable metadata state scoped to one official MDX compilation. */
const MetadataCollectorSchema = Schema.Struct({
  candidates: Schema.mutable(Schema.Array(StaticLiteralSchema)),
  syntaxReasons: Schema.mutable(
    Schema.Array(AuthoredMetadataSyntaxReasonSchema)
  ),
});
export type MetadataCollector = typeof MetadataCollectorSchema.Type;

/** Exact source and UTF-16 offsets occupied by one validated metadata export. */
const MetadataSourceRangeSchema = Schema.Struct({
  end: Schema.Int,
  source: Schema.String,
  start: Schema.Int,
});
export type MetadataSourceRange = typeof MetadataSourceRangeSchema.Type;

/** Detects and statically decodes a metadata export statement, or none for any other statement. */
function inspectStatement(
  statement: Program["body"][number]
): Option.Option<
  | StaticLiteralResult
  | { readonly reason: "invalid-declaration"; readonly success: false }
> {
  if (statement.type !== "ExportNamedDeclaration") {
    return Option.none();
  }
  const { declaration } = statement;
  if (declaration?.type !== "VariableDeclaration") {
    return Option.none();
  }
  const metadata = declaration.declarations.filter(
    ({ id }) => id.type === "Identifier" && id.name === "metadata"
  );
  if (metadata.length === 0) {
    return Option.none();
  }
  if (
    declaration.kind !== "const" ||
    declaration.declarations.length !== 1 ||
    metadata.length !== 1
  ) {
    return Option.some({ reason: "invalid-declaration", success: false });
  }
  const initializer = metadata[0]?.init;
  if (!initializer) {
    return Option.some({ reason: "invalid-declaration", success: false });
  }
  return Option.some(decodeStaticLiteral(initializer));
}

/** Collects metadata candidates and removes matched exports from the body. */
function collectMetadata(
  node: RootContent | MdxjsEsm,
  collector: MetadataCollector
) {
  if (node.type !== "mdxjsEsm") {
    return true;
  }
  const program = node.data?.estree;
  if (!program) {
    return true;
  }
  const results = program.body.map(inspectStatement);
  const metadata = Arr.getSomes(results);
  if (metadata.length === 0) {
    return true;
  }
  if (metadata.length !== results.length) {
    collector.syntaxReasons.push("mixed-metadata-module");
    return false;
  }
  for (const result of metadata) {
    if (result.success) {
      collector.candidates.push(result.value);
    } else {
      collector.syntaxReasons.push(
        "reason" in result ? result.reason : result.failure.reason
      );
    }
  }
  return false;
}

/** Removes one static metadata export without claiming a family schema. */
export function extractMetadata(
  collector: MetadataCollector
): Plugin<[], Root> {
  return () => (tree) => {
    tree.children = tree.children.filter((node) =>
      collectMetadata(node, collector)
    );
  };
}

/** Requires exactly one static metadata object before body compilation. */
export const validateMetadata = Effect.fn("AksaraCompiler.validateMetadata")(
  function* (contentKey: ContentKey, collector: MetadataCollector) {
    if (collector.syntaxReasons.length > 0) {
      return yield* new AuthoredMetadataSyntaxError({
        contentKey,
        reasons: collector.syntaxReasons,
      });
    }
    const [metadata] = collector.candidates;
    if (metadata === undefined) {
      return yield* new AuthoredMetadataMissingError({ contentKey });
    }
    if (collector.candidates.length > 1) {
      return yield* new AuthoredMetadataDuplicateError({
        contentKey,
        count: collector.candidates.length,
      });
    }
    if (!Predicate.isObject(metadata)) {
      return yield* new AuthoredMetadataSyntaxError({
        contentKey,
        reasons: ["metadata-not-object"],
      });
    }
    return metadata;
  }
);

/** Reads static metadata from an already parsed MDX tree without code generation. */
export const readMetadataDocument = Effect.fn(
  "AksaraCompiler.readMetadataDocument"
)(function* (contentKey: ContentKey, tree: Root) {
  const collector: MetadataCollector = {
    candidates: [],
    syntaxReasons: [],
  };
  const bodyChildren: RootContent[] = [];
  let sourceRange: MetadataSourceRange | undefined;
  for (const node of tree.children) {
    if (node.type !== "mdxjsEsm") {
      bodyChildren.push(node);
      continue;
    }
    if (collectMetadata(node, collector)) {
      bodyChildren.push(node);
      continue;
    }
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (start !== undefined && end !== undefined) {
      sourceRange = { end, source: node.value, start };
    }
  }
  const metadata = yield* validateMetadata(contentKey, collector);
  const bodyTree: Root = { ...tree, children: bodyChildren };
  return { bodyTree, metadata, sourceRange };
});
