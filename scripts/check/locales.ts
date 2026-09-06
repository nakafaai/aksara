import { readFileSync } from "node:fs";

import { AppLocaleCodeSchema } from "@nakafa/aksara-contracts/locale";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";
import {
  type CallExpression,
  isArrayLiteralExpression,
  isCallExpression,
  isIdentifier,
  isLiteralTypeNode,
  isObjectLiteralExpression,
  isPropertyAccessExpression,
  isSpreadAssignment,
  isStringLiteralLikeNode,
  isTupleTypeNode,
  isUnionTypeNode,
  type Node,
  type NodeArray,
} from "typescript/unstable/ast";

import { enforceViolations, typescriptFiles } from "#scripts/check/files";

const LOCALE_CONTRACT_MODULE = "packages/contracts/src/locale.ts";
const LOCALE_POLICY_SCRIPT = "scripts/check/locales.ts";
const LOCALE_VOCABULARY_MODULES = new Set([
  LOCALE_CONTRACT_MODULE,
  LOCALE_POLICY_SCRIPT,
]);
const TEST_SOURCE_PATTERN = /(?:^|\/)(?:test|tests)(?:\/|$)|\.test\.[^.]+$/u;

const localeCodes: ReadonlySet<string> = new Set(AppLocaleCodeSchema.literals);

/** Returns a statically declared locale code from one syntax node. */
function localeCode(node: Node): string | undefined {
  const value = isLiteralTypeNode(node) ? node.literal : node;
  if (!(isStringLiteralLikeNode(value) && localeCodes.has(value.text))) {
    return;
  }
  return value.text;
}

/** Checks whether a call names one Effect Schema constructor. */
function isSchemaCall(node: Node, name: string): node is CallExpression {
  return (
    isCallExpression(node) &&
    isPropertyAccessExpression(node.expression) &&
    isIdentifier(node.expression.expression) &&
    node.expression.expression.text === "Schema" &&
    node.expression.name.text === name
  );
}

/** Returns literal value nodes from v4 singular and plural Schema APIs. */
function schemaLiteralNodes(node: Node): readonly Node[] {
  if (isSchemaCall(node, "Literal")) {
    return [...node.arguments];
  }
  if (!isSchemaCall(node, "Literals")) {
    return [];
  }
  const [values] = node.arguments;
  return values && isArrayLiteralExpression(values) ? [...values.elements] : [];
}

/** Returns distinct locale codes declared directly by syntax nodes. */
function declaredLocaleCodes(nodes: readonly Node[]) {
  return new Set(nodes.map(localeCode).filter((value) => value !== undefined));
}

/** Detects a Schema.keyof object that declares a second locale vocabulary. */
function duplicatedLocaleKeyof(node: Node) {
  if (!isSchemaCall(node, "keyof")) {
    return false;
  }
  const [schema] = node.arguments;
  if (!(schema && isSchemaCall(schema, "Struct"))) {
    return false;
  }
  const [fields] = schema.arguments;
  if (!(fields && isObjectLiteralExpression(fields))) {
    return false;
  }
  const names = fields.properties.flatMap((property) => {
    if (isSpreadAssignment(property)) {
      return [];
    }
    const { name } = property;
    if (isIdentifier(name) || isStringLiteralLikeNode(name)) {
      return localeCodes.has(name.text) ? [name.text] : [];
    }
    return [];
  });
  return new Set(names).size >= 2;
}

/** Detects one duplicated schema or type-level locale vocabulary. */
function duplicatedLocaleVocabulary(node: Node) {
  if (isUnionTypeNode(node)) {
    return declaredLocaleCodes(node.types).size >= 2;
  }
  const literalNodes = schemaLiteralNodes(node);
  if (literalNodes.length > 0) {
    return declaredLocaleCodes(literalNodes).size >= 2;
  }
  if (duplicatedLocaleKeyof(node)) {
    return true;
  }
  if (!isSchemaCall(node, "Union")) {
    return false;
  }
  const [members] = node.arguments;
  if (!(members && isArrayLiteralExpression(members))) {
    return false;
  }
  const literals = members.elements.flatMap((member) =>
    schemaLiteralNodes(member)
  );
  return declaredLocaleCodes(literals).size >= 2;
}

/** Detects a duplicated multi-locale policy array or tuple. */
function duplicatedLocaleList(node: Node) {
  if (isArrayLiteralExpression(node) && isSchemaCall(node.parent, "Literals")) {
    return false;
  }
  let values: NodeArray<Node> | undefined;
  if (isArrayLiteralExpression(node)) {
    values = node.elements;
  } else if (isTupleTypeNode(node)) {
    values = node.elements;
  }
  if (values === undefined) {
    return false;
  }
  return declaredLocaleCodes(values).size >= 2;
}

/** Reports locale vocabularies that bypass the canonical contract module. */
export const localePolicyViolations = Effect.fn(
  "AksaraPolicy.localeVocabulary"
)(function* (file: string, sourceText: string) {
  const parser = yield* TypeScriptParser;
  return yield* parser.inspect(
    { fileName: file, source: sourceText },
    ({ sourceFile }) => {
      const violations: Array<{
        readonly offset: number;
        readonly reason: string;
      }> = [];
      const nodes: Node[] = [sourceFile];
      const ownsLocaleVocabulary = LOCALE_VOCABULARY_MODULES.has(file);
      const allowsConcreteLists = TEST_SOURCE_PATTERN.test(file);

      for (const node of nodes) {
        const duplicatedVocabulary =
          !ownsLocaleVocabulary && duplicatedLocaleVocabulary(node);
        const hardcodedList =
          !(ownsLocaleVocabulary || allowsConcreteLists) &&
          duplicatedLocaleList(node);
        if (duplicatedVocabulary || hardcodedList) {
          const reason = duplicatedVocabulary
            ? "locale vocabulary must derive from the locale contract"
            : "locale lists must derive from the locale contract";
          violations.push({ offset: node.getStart(sourceFile), reason });
        }
        node.forEachChild((child) => {
          nodes.push(child);
        });
      }

      return violations
        .sort((left, right) => left.offset - right.offset)
        .map(({ offset, reason }) => {
          const line =
            sourceFile.getLineAndCharacterOfPosition(offset).line + 1;
          return `${file}:${line}: ${reason}`;
        });
    }
  );
});

const violations = await Effect.runPromise(
  Effect.forEach(typescriptFiles(), (file) =>
    Effect.try({
      catch: (cause) => new TypeScriptSourceError({ cause, fileName: file }),
      try: () => readFileSync(file, "utf8"),
    }).pipe(Effect.flatMap((source) => localePolicyViolations(file, source)))
  ).pipe(
    Effect.map((results) => results.flat()),
    Effect.provide(TypeScriptParser.layer)
  )
);
enforceViolations(
  "Locale vocabularies must have one contract source",
  violations
);
