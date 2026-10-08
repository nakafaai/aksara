import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect, FileSystem, HashSet } from "effect";
import {
  isBinaryExpression,
  isStringLiteralLikeNode,
  isTryStatement,
  isTypeOfExpression,
  type Node,
  type SourceFile,
  SyntaxKind,
} from "typescript/unstable/ast";

import {
  enforceViolations,
  trackedFiles,
  typescriptFiles,
} from "#scripts/check/files";
import { syntaxNodes } from "#scripts/check/syntax";
import { runEntry } from "#scripts/entry";

const PRODUCT_PATH_PATTERN = /^(?:apps|packages|scripts)\//u;
const EQUALITY_OPERATORS = HashSet.make(
  SyntaxKind.EqualsEqualsEqualsToken,
  SyntaxKind.EqualsEqualsToken,
  SyntaxKind.ExclamationEqualsEqualsToken,
  SyntaxKind.ExclamationEqualsToken
);

/** Returns whether one node compares a typeof result against the object tag. */
function isTypeofObjectComparison(node: Node) {
  if (
    !(
      isBinaryExpression(node) &&
      HashSet.has(EQUALITY_OPERATORS, node.operatorToken.kind)
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

/** Returns the policy message that one syntax node breaks, if it breaks one. */
function nodeViolations(file: string, node: Node): readonly string[] {
  if (isTryStatement(node) && node.catchClause !== undefined) {
    return [
      `${file}: model failure with Effect instead of a raw try/catch statement.`,
    ];
  }
  if (isTypeofObjectComparison(node)) {
    return [
      `${file}: narrow unknown input with Predicate or Schema instead of a typeof-object check.`,
    ];
  }
  return [];
}

/** Reports raw failure handling and hand-rolled narrowing in one module. */
function effectPolicyViolations(file: string, sourceFile: SourceFile) {
  return Arr.flatMap(syntaxNodes(sourceFile), (node) =>
    nodeViolations(file, node)
  );
}

/** Reports every native Effect policy violation across the supplied modules. */
export const effectViolations = Effect.fn("AksaraPolicy.effectViolations")(
  function* (
    files: readonly string[],
    readSource: (file: string) => Effect.Effect<string, unknown>
  ) {
    const parser = yield* TypeScriptParser;
    const violations = yield* Effect.forEach(files, (file) =>
      readSource(file).pipe(
        Effect.mapError(
          (cause) => new TypeScriptSourceError({ cause, fileName: file })
        ),
        Effect.flatMap((source) =>
          parser.inspect({ fileName: file, source }, ({ sourceFile }) =>
            effectPolicyViolations(file, sourceFile)
          )
        )
      )
    );
    return Arr.flatten(violations);
  }
);

/** Reports native Effect policy violations in the product modules among the files. */
export const effectReport = Effect.fn("AksaraPolicy.effectReport")(function* (
  files: readonly string[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  // Agent skill tooling under `.agents/` keeps its own conventions and is
  // deliberately outside the product Effect-native policy.
  const violations = yield* effectViolations(
    Arr.filter(files, (file) => PRODUCT_PATH_PATTERN.test(file)),
    (file) => fileSystem.readFileString(file)
  );
  enforceViolations(
    "Authored modules must model failure and unknown input natively",
    violations
  );
});

runEntry(
  import.meta.main,
  trackedFiles().pipe(
    Effect.map(typescriptFiles),
    Effect.flatMap(effectReport),
    Effect.provide(TypeScriptParser.layer)
  )
);
