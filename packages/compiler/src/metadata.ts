import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import { Effect, Predicate } from "effect";
import type {
  ArrayExpression,
  Expression,
  ObjectExpression,
  Pattern,
  Program,
} from "estree-jsx";
import type { Root, RootContent } from "mdast";
import type { MdxjsEsm } from "mdast-util-mdx";
import type { Plugin } from "unified";
import {
  AuthoredMetadataDuplicateError,
  AuthoredMetadataMissingError,
  AuthoredMetadataSyntaxError,
  type AuthoredMetadataSyntaxReason,
} from "#compiler/errors";

export type AuthoredMetadataValue =
  | boolean
  | null
  | number
  | string
  | readonly AuthoredMetadataValue[]
  | { readonly [key: string]: AuthoredMetadataValue };

/** Plain static object extracted from one reviewed MDX metadata export. */
export interface AuthoredMetadata {
  readonly [key: string]: AuthoredMetadataValue;
}

/** Distinguishes a plain metadata object from recursive metadata arrays. */
function isAuthoredMetadata(
  value: AuthoredMetadataValue
): value is AuthoredMetadata {
  return Predicate.isRecord(value);
}

type DecodeResult =
  | { readonly reason: AuthoredMetadataSyntaxReason; readonly success: false }
  | { readonly success: true; readonly value: AuthoredMetadataValue };

type StatementResult =
  | { readonly matched: false }
  | { readonly matched: true; readonly result: DecodeResult };

/** Mutable metadata state scoped to one official MDX compilation. */
export interface MetadataCollector {
  readonly candidates: AuthoredMetadataValue[];
  readonly syntaxReasons: AuthoredMetadataSyntaxReason[];
}

/** Creates a failed static-metadata decode result for one syntax reason. */
function failed(reason: AuthoredMetadataSyntaxReason): DecodeResult {
  return { reason, success: false };
}

/** Resolves a supported static object-property name. */
function propertyName(expression: Expression) {
  if (expression.type === "Identifier") {
    return expression.name;
  }
  if (expression.type === "Literal" && typeof expression.value === "string") {
    return expression.value;
  }
}

/** Decodes a metadata array containing only supported static values. */
function decodeArray(node: ArrayExpression): DecodeResult {
  const values: AuthoredMetadataValue[] = [];
  for (const element of node.elements) {
    if (element === null) {
      return failed("array-hole");
    }
    if (element.type === "SpreadElement") {
      return failed("spread");
    }
    const decoded = decodeValue(element);
    if (!decoded.success) {
      return decoded;
    }
    values.push(decoded.value);
  }
  return { success: true, value: values };
}

/** Decodes a metadata object while rejecting ambiguous property forms. */
function decodeObject(node: ObjectExpression): DecodeResult {
  const entries: [string, AuthoredMetadataValue][] = [];
  const names = new Set<string>();
  for (const property of node.properties) {
    if (property.type === "SpreadElement") {
      return failed("spread");
    }
    if (property.computed) {
      return failed("computed-property");
    }
    if (property.kind !== "init" || property.method || property.shorthand) {
      return failed("unsupported-property");
    }
    const name = propertyName(property.key);
    if (!name) {
      return failed("unsupported-property");
    }
    if (names.has(name)) {
      return failed("duplicate-property");
    }
    const decoded = decodeValue(property.value);
    if (!decoded.success) {
      return decoded;
    }
    names.add(name);
    entries.push([name, decoded.value]);
  }
  return { success: true, value: Object.fromEntries(entries) };
}

/** Decodes the supported recursive subset of authored metadata values. */
function decodeValue(node: Expression | Pattern): DecodeResult {
  if (node.type === "Literal") {
    if (
      node.value === null ||
      typeof node.value === "boolean" ||
      typeof node.value === "number" ||
      typeof node.value === "string"
    ) {
      return { success: true, value: node.value };
    }
    return failed("dynamic-value");
  }
  if (node.type === "ArrayExpression") {
    return decodeArray(node);
  }
  if (node.type === "ObjectExpression") {
    return decodeObject(node);
  }
  return failed("dynamic-value");
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
    return { matched: true, result: failed("invalid-declaration") };
  }
  const initializer = metadata[0]?.init;
  if (!initializer) {
    return { matched: true, result: failed("invalid-declaration") };
  }
  return { matched: true, result: decodeValue(initializer) };
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
      collector.syntaxReasons.push(result.result.reason);
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
  (contentKey: ContentKey, collector: MetadataCollector) => {
    if (collector.syntaxReasons.length > 0) {
      return Effect.fail(
        new AuthoredMetadataSyntaxError({
          contentKey,
          reasons: collector.syntaxReasons,
        })
      );
    }
    const [metadata] = collector.candidates;
    if (metadata === undefined) {
      return Effect.fail(new AuthoredMetadataMissingError({ contentKey }));
    }
    if (collector.candidates.length > 1) {
      return Effect.fail(
        new AuthoredMetadataDuplicateError({
          contentKey,
          count: collector.candidates.length,
        })
      );
    }
    if (!isAuthoredMetadata(metadata)) {
      return Effect.fail(
        new AuthoredMetadataSyntaxError({
          contentKey,
          reasons: ["metadata-not-object"],
        })
      );
    }
    return Effect.succeed(metadata);
  }
);

/** Reads static metadata from an already parsed MDX tree without code generation. */
export const readMetadataTree = Effect.fn("AksaraCompiler.readMetadataTree")(
  function* (contentKey: ContentKey, tree: Root) {
    const collector: MetadataCollector = {
      candidates: [],
      syntaxReasons: [],
    };
    for (const node of tree.children) {
      collectMetadata(node, collector);
    }
    return yield* validateMetadata(contentKey, collector);
  }
);
