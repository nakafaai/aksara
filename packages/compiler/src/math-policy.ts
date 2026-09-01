import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import {
  MathVisualSchema,
  mathVisualLabelKeys,
} from "@nakafa/aksara-contracts/math/visual";
import { Effect, Result, Schema, SchemaIssue } from "effect";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import {
  type StaticLiteralPathSegment,
  staticLiteralNodeAtPath,
} from "#compiler/ast/literal";
import {
  estreeLocation,
  inspectMathVisual,
  type MathVisualCandidate,
} from "#compiler/ast/math";
import {
  MathVisualPolicyError,
  type MathVisualPolicyViolation,
} from "#compiler/errors";

interface StandardPathSegment {
  readonly key: PropertyKey;
}

/** Normalizes Standard Schema path values into the compiler contract. */
export function normalizeSchemaPath(
  path: readonly (PropertyKey | StandardPathSegment)[] | undefined
): readonly StaticLiteralPathSegment[] {
  return (path ?? []).map((segment) => {
    const key = typeof segment === "object" ? segment.key : segment;
    return typeof key === "symbol" ? String(key) : key;
  });
}

/** Compares two label-key collections as exact unordered sets. */
function hasSameKeys(left: readonly string[], right: readonly string[]) {
  return (
    left.length === right.length && left.every((key) => right.includes(key))
  );
}

/** Converts one typed scene-schema failure into source-aware diagnostics. */
function sceneSchemaViolations(
  candidate: MathVisualCandidate,
  error: Schema.SchemaError
): readonly MathVisualPolicyViolation[] {
  const formatted = SchemaIssue.makeFormatterStandardSchemaV1()(error.issue);
  return formatted.issues.map((issue) => {
    const path = normalizeSchemaPath(issue.path);
    const node = staticLiteralNodeAtPath(candidate.sceneNode, path);
    return {
      ...estreeLocation(node, candidate.sceneLocation),
      message: issue.message,
      path,
      reason: "scene-schema" as const,
    };
  });
}

/** Creates compiler-owned static validation for exact MathVisual MDX nodes. */
export function createMathVisualPolicy(contentKey: ContentKey) {
  const candidates: MathVisualCandidate[] = [];
  const violations: MathVisualPolicyViolation[] = [];
  /** Records exact MathVisual nodes during the remark traversal. */
  const remarkPlugin: Plugin<[], Root> = () => (tree) => {
    visit(tree, (node) => {
      if (
        !(
          (node.type === "mdxJsxFlowElement" ||
            node.type === "mdxJsxTextElement") &&
          node.name === "MathVisual"
        )
      ) {
        return;
      }
      const inspection = inspectMathVisual(node);
      violations.push(...inspection.violations);
      if (inspection.candidate) {
        candidates.push(inspection.candidate);
      }
    });
  };

  /** Decodes every static scene and checks its rich-label key contract. */
  const validate = Effect.fn("AksaraCompiler.validateMathVisualPolicy")(
    function* () {
      const semanticViolations: MathVisualPolicyViolation[] = [];
      for (const candidate of candidates) {
        const decoded = yield* Effect.result(
          Schema.decodeUnknownEffect(MathVisualSchema)(candidate.scene, {
            onExcessProperty: "error",
          })
        );
        if (Result.isFailure(decoded)) {
          semanticViolations.push(
            ...sceneSchemaViolations(candidate, decoded.failure)
          );
          continue;
        }
        if (
          !hasSameKeys(
            mathVisualLabelKeys(decoded.success),
            candidate.labelKeys
          )
        ) {
          semanticViolations.push({
            ...candidate.labelLocation,
            reason: "label-keys-mismatch",
          });
        }
      }
      const findings = [...violations, ...semanticViolations];
      if (findings.length > 0) {
        return yield* new MathVisualPolicyError({
          contentKey,
          violations: findings,
        });
      }
    }
  );

  return { remarkPlugin, validate };
}
