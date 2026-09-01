import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import { Effect, Predicate } from "effect";
import type { Program } from "estree-jsx";
import type { Root, RootContent } from "mdast";
import type { MdxjsEsm } from "mdast-util-mdx";
import type { Plugin } from "unified";
import {
  decodeStaticLiteral,
  type StaticLiteral,
  type StaticLiteralResult,
} from "#compiler/ast/literal";
import {
  AuthoredMetadataDuplicateError,
  AuthoredMetadataMissingError,
  AuthoredMetadataSyntaxError,
  type AuthoredMetadataSyntaxReason,
} from "#compiler/errors";

export type AuthoredMetadataValue = StaticLiteral;

/** Plain static object extracted from one reviewed MDX metadata export. */
export interface AuthoredMetadata {
  readonly [key: string]: AuthoredMetadataValue;
}

type StatementResult =
  | { readonly matched: false }
  | {
      readonly matched: true;
      readonly result:
        | StaticLiteralResult
        | { readonly reason: "invalid-declaration"; readonly success: false };
    };

/** Mutable metadata state scoped to one official MDX compilation. */
export interface MetadataCollector {
  readonly candidates: AuthoredMetadataValue[];
  readonly syntaxReasons: AuthoredMetadataSyntaxReason[];
}

/** Exact source and UTF-16 offsets occupied by one validated metadata export. */
export interface MetadataSourceRange {
  readonly end: number;
  readonly source: string;
  readonly start: number;
}

/** Detects and statically decodes a metadata export statement. */
function inspectStatement(statement: Program["body"][number]): StatementResult {
  if (statement.type !== "ExportNamedDeclaration") {
    return { matched: false };
  }
  const { declaration } = statement;
  if (declaration?.type !== "VariableDeclaration") {
    return { matched: false };
  }
  const metadata = declaration.declarations.filter(
    ({ id }) => id.type === "Identifier" && id.name === "metadata"
  );
  if (metadata.length === 0) {
    return { matched: false };
  }
  if (
    declaration.kind !== "const" ||
    declaration.declarations.length !== 1 ||
    metadata.length !== 1
  ) {
    return {
      matched: true,
      result: { reason: "invalid-declaration", success: false },
    };
  }
  const initializer = metadata[0]?.init;
  if (!initializer) {
    return {
      matched: true,
      result: { reason: "invalid-declaration", success: false },
    };
  }
  return { matched: true, result: decodeStaticLiteral(initializer) };
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
  const metadata = results.filter((result) => result.matched);
  if (metadata.length === 0) {
    return true;
  }
  if (metadata.length !== results.length) {
    collector.syntaxReasons.push("mixed-metadata-module");
    return false;
  }
  for (const result of metadata) {
    if (result.result.success) {
      collector.candidates.push(result.result.value);
    } else {
      collector.syntaxReasons.push(
        "reason" in result.result
          ? result.result.reason
          : result.result.failure.reason
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
