import type { ContentKey } from "@nakafaai/aksara-contracts/ids";
import {
  type AuthoredContentMetadata,
  AuthoredContentMetadataSchema,
} from "@nakafaai/aksara-contracts/metadata";
import { Effect, Schema } from "effect";
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
  AuthoredMetadataContractError,
  AuthoredMetadataDuplicateError,
  AuthoredMetadataMissingError,
  AuthoredMetadataSyntaxError,
  type AuthoredMetadataSyntaxReason,
} from "./errors.js";

type StaticMetadataValue =
  | boolean
  | null
  | number
  | string
  | readonly StaticMetadataValue[]
  | { readonly [key: string]: StaticMetadataValue };

type StaticDecodeResult =
  | { readonly reason: AuthoredMetadataSyntaxReason; readonly success: false }
  | { readonly success: true; readonly value: StaticMetadataValue };

type MetadataStatementResult =
  | { readonly matched: false }
  | {
      readonly matched: true;
      readonly result: StaticDecodeResult;
    };

/** Mutable state scoped to one official MDX compilation. */
export interface AuthoredMetadataCollector {
  readonly candidates: StaticMetadataValue[];
  readonly syntaxReasons: AuthoredMetadataSyntaxReason[];
}

function failed(reason: AuthoredMetadataSyntaxReason): StaticDecodeResult {
  return { reason, success: false };
}

function propertyName(expression: Expression) {
  if (expression.type === "Identifier") {
    return expression.name;
  }
  if (expression.type === "Literal" && typeof expression.value === "string") {
    return expression.value;
  }
}

function decodeStaticArray(node: ArrayExpression): StaticDecodeResult {
  const values: StaticMetadataValue[] = [];
  for (const element of node.elements) {
    if (element === null) {
      return failed("array-hole");
    }
    if (element.type === "SpreadElement") {
      return failed("spread");
    }
    const decoded = decodeStaticValue(element);
    if (!decoded.success) {
      return decoded;
    }
    values.push(decoded.value);
  }
  return { success: true, value: values };
}

function decodeStaticObject(node: ObjectExpression): StaticDecodeResult {
  const entries: [string, StaticMetadataValue][] = [];
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
    const decoded = decodeStaticValue(property.value);
    if (!decoded.success) {
      return decoded;
    }
    names.add(name);
    entries.push([name, decoded.value]);
  }
  return { success: true, value: Object.fromEntries(entries) };
}

function decodeStaticValue(node: Expression | Pattern): StaticDecodeResult {
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
    return decodeStaticArray(node);
  }
  if (node.type === "ObjectExpression") {
    return decodeStaticObject(node);
  }
  return failed("dynamic-value");
}

function inspectMetadataStatement(
  statement: Program["body"][number]
): MetadataStatementResult {
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
  return { matched: true, result: decodeStaticValue(initializer) };
}

function isMdxjsEsm(node: RootContent): node is MdxjsEsm {
  return node.type === "mdxjsEsm";
}

function collectMetadataNode(
  node: RootContent,
  collector: AuthoredMetadataCollector
) {
  if (!isMdxjsEsm(node)) {
    return true;
  }
  const program = node.data?.estree;
  if (!program) {
    return true;
  }
  const results: StaticDecodeResult[] = [];
  for (const statement of program.body) {
    const inspected = inspectMetadataStatement(statement);
    if (!inspected.matched) {
      continue;
    }
    results.push(inspected.result);
  }
  if (results.length === 0) {
    return true;
  }
  if (results.length !== program.body.length) {
    collector.syntaxReasons.push("mixed-metadata-module");
    return false;
  }
  for (const result of results) {
    if (result.success) {
      collector.candidates.push(result.value);
    } else {
      collector.syntaxReasons.push(result.reason);
    }
  }
  return false;
}

/** Removes metadata ESM nodes after collecting their static ESTree values. */
export function extractAuthoredMetadata(
  collector: AuthoredMetadataCollector
): Plugin<[], Root> {
  return () => (tree) => {
    tree.children = tree.children.filter((node) =>
      collectMetadataNode(node, collector)
    );
  };
}

/** Decodes exactly one collected static metadata value through its schema. */
export const decodeAuthoredMetadata = Effect.fn(
  "AksaraCompiler.decodeAuthoredMetadata"
)(
  (
    contentKey: ContentKey,
    collector: AuthoredMetadataCollector
  ): Effect.Effect<
    AuthoredContentMetadata,
    | AuthoredMetadataContractError
    | AuthoredMetadataDuplicateError
    | AuthoredMetadataMissingError
    | AuthoredMetadataSyntaxError
  > => {
    if (collector.syntaxReasons.length > 0) {
      return Effect.fail(
        new AuthoredMetadataSyntaxError({
          contentKey,
          reasons: collector.syntaxReasons,
        })
      );
    }
    if (collector.candidates.length === 0) {
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
    return Schema.decodeUnknown(AuthoredContentMetadataSchema)(
      collector.candidates[0],
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        (cause) => new AuthoredMetadataContractError({ cause, contentKey })
      )
    );
  }
);
