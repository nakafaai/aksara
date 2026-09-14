import { readFileSync } from "node:fs";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";
import {
  isBinaryExpression,
  isStringLiteralLikeNode,
  isTryStatement,
  isTypeOfExpression,
  type Node,
  type SourceFile,
  SyntaxKind,
} from "typescript/unstable/ast";

import { enforceViolations, typescriptFiles } from "#scripts/check/files";

const PRODUCT_PATH_PATTERN = /^(?:apps|packages|scripts)\//u;
const EQUALITY_OPERATORS: ReadonlySet<SyntaxKind> = new Set([
  SyntaxKind.EqualsEqualsEqualsToken,
  SyntaxKind.EqualsEqualsToken,
  SyntaxKind.ExclamationEqualsEqualsToken,
  SyntaxKind.ExclamationEqualsToken,
]);

/** Returns whether one node compares a typeof result against the object tag. */
function isTypeofObjectComparison(node: Node) {
  if (
    !(
      isBinaryExpression(node) &&
      EQUALITY_OPERATORS.has(node.operatorToken.kind)
    )
  ) {
    return false;
  }
  for (const side of [node.left, node.right]) {
    if (!isTypeOfExpression(side)) {
      continue;
    }
    const other = side === node.left ? node.right : node.left;
    if (isStringLiteralLikeNode(other) && other.text === "object") {
      return true;
    }
  }
  return false;
}

/** Reports raw failure handling and hand-rolled narrowing in one module. */
function effectPolicyViolations(file: string, sourceFile: SourceFile) {
  const violations: string[] = [];
  const nodes: Node[] = [sourceFile];

  for (const node of nodes) {
    node.forEachChild((child) => {
      nodes.push(child);
    });
  }

  for (const node of nodes) {
    if (isTryStatement(node) && node.catchClause !== undefined) {
      violations.push(
        `${file}: model failure with Effect instead of a raw try/catch statement.`
      );
    }
    if (isTypeofObjectComparison(node)) {
      violations.push(
        `${file}: narrow unknown input with Predicate or Schema instead of a typeof-object check.`
      );
    }
  }

  return violations;
}

/** Reports every native Effect policy violation across the supplied modules. */
export const effectViolations = Effect.fn("AksaraPolicy.effectViolations")(
  function* (files: readonly string[], readSource: (file: string) => string) {
    const parser = yield* TypeScriptParser;
    return (yield* Effect.forEach(files, (file) =>
      Effect.try({
        catch: (cause) => new TypeScriptSourceError({ cause, fileName: file }),
        try: () => readSource(file),
      }).pipe(
        Effect.flatMap((source) =>
          parser.inspect({ fileName: file, source }, ({ sourceFile }) =>
            effectPolicyViolations(file, sourceFile)
          )
        )
      )
    )).flat();
  }
);

const violations = await Effect.runPromise(
  effectViolations(
    // Agent skill tooling under `.agents/` keeps its own conventions and is
    // deliberately outside the product Effect-native policy.
    typescriptFiles().filter((file) => PRODUCT_PATH_PATTERN.test(file)),
    (file) => readFileSync(file, "utf8")
  ).pipe(Effect.provide(TypeScriptParser.layer))
);
enforceViolations(
  "Authored modules must model failure and unknown input natively",
  violations
);
