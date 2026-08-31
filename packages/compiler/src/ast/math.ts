import type { ObjectExpression } from "estree-jsx";
import type {
  MdxJsxAttribute,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from "mdast-util-mdx";
import {
  decodeStaticLiteral,
  type StaticLiteral,
  type StaticLiteralSyntaxReason,
  staticPropertyName,
} from "#compiler/ast/literal";
import { readNodeProgram } from "#compiler/ast/program";
import type {
  MathVisualPolicyViolation,
  MathVisualSourceReason,
} from "#compiler/errors";

type StaticResult<Value> =
  | { readonly success: false; readonly violation: MathVisualPolicyViolation }
  | { readonly success: true; readonly value: Value };

export type MathVisualElement = MdxJsxFlowElement | MdxJsxTextElement;

export interface SourceLocation {
  readonly column: number;
  readonly line: number;
}

interface EstreeLocation {
  readonly loc?:
    | {
        readonly start: { readonly column: number; readonly line: number };
      }
    | null
    | undefined;
}

/** Static MathVisual data retained for contract-level validation. */
export interface MathVisualCandidate {
  readonly labelKeys: readonly string[];
  readonly labelLocation: SourceLocation;
  readonly scene: StaticLiteral;
  readonly sceneLocation: SourceLocation;
  readonly sceneNode: ObjectExpression;
}

/** Syntax findings and optional static data from one MathVisual node. */
export interface MathVisualInspection {
  readonly candidate?: MathVisualCandidate;
  readonly violations: readonly MathVisualPolicyViolation[];
}

const ALLOWED_ATTRIBUTES = new Set(["description", "labels", "scene", "title"]);

/** Reads a one-based MDX source location with a deterministic fallback. */
export function mdxLocation(node: {
  readonly position?: MathVisualElement["position"];
}) {
  return {
    column: node.position?.start.column ?? 1,
    line: node.position?.start.line ?? 1,
  };
}

/** Reads a one-based ESTree source location with an MDX fallback. */
export function estreeLocation(node: EstreeLocation, fallback: SourceLocation) {
  return node.loc
    ? { column: node.loc.start.column + 1, line: node.loc.start.line }
    : fallback;
}

/** Creates one failed rich-label extraction result at a known location. */
function failedLabel<Value>(
  reason: MathVisualSourceReason,
  location: SourceLocation
): StaticResult<Value> {
  return { success: false, violation: { ...location, reason } };
}

/** Maps a generic literal finding into the MathVisual scene vocabulary. */
function sceneReason(
  reason: StaticLiteralSyntaxReason
): MathVisualSourceReason {
  switch (reason) {
    case "array-hole":
      return "scene-array-hole";
    case "computed-property":
      return "scene-computed-property";
    case "duplicate-property":
      return "scene-duplicate-property";
    case "spread":
      return "scene-spread";
    case "unsupported-property":
      return "scene-property";
    default:
      return "scene-dynamic-value";
  }
}

/** Reads the sole expression attached to one MDX JSX attribute. */
function attributeExpression(attribute: MdxJsxAttribute) {
  const { value } = attribute;
  if (!(value && typeof value === "object")) {
    return;
  }
  const program = readNodeProgram(value);
  const [statement] = program?.body ?? [];
  return program?.body.length === 1 && statement?.type === "ExpressionStatement"
    ? statement.expression
    : undefined;
}

/** Enumerates rich-label keys without interpreting their React values. */
function readRichLabelKeys(
  attribute: MdxJsxAttribute,
  fallback: SourceLocation
): StaticResult<readonly string[]> {
  const expression = attributeExpression(attribute);
  if (!expression) {
    return failedLabel("labels-expression", fallback);
  }
  if (expression.type !== "ObjectExpression") {
    return failedLabel("labels-object", estreeLocation(expression, fallback));
  }
  const keys: string[] = [];
  const names = new Set<string>();
  for (const property of expression.properties) {
    if (property.type === "SpreadElement") {
      return failedLabel("labels-spread", estreeLocation(property, fallback));
    }
    if (property.computed) {
      return failedLabel(
        "labels-computed-property",
        estreeLocation(property, fallback)
      );
    }
    if (property.kind !== "init" || property.method || property.shorthand) {
      return failedLabel("labels-property", estreeLocation(property, fallback));
    }
    const name = staticPropertyName(property);
    if (name === undefined) {
      return failedLabel("labels-property", estreeLocation(property, fallback));
    }
    if (names.has(name)) {
      return failedLabel(
        "labels-duplicate-property",
        estreeLocation(property, fallback)
      );
    }
    names.add(name);
    keys.push(name);
  }
  return { success: true, value: keys };
}

/** Records duplicate values of one allowed named attribute. */
function recordDuplicates(
  attributes: readonly MdxJsxAttribute[],
  name: string,
  reason: MathVisualSourceReason,
  violations: MathVisualPolicyViolation[]
) {
  const duplicates = attributes
    .filter((attribute) => attribute.name === name)
    .slice(1);
  for (const duplicate of duplicates) {
    violations.push({ ...mdxLocation(duplicate), reason });
  }
}

/** Inspects the exact authored JSX surface of one MathVisual node. */
export function inspectMathVisual(
  node: MathVisualElement
): MathVisualInspection {
  const fallback = mdxLocation(node);
  if (node.type === "mdxJsxTextElement") {
    return {
      violations: [{ ...fallback, reason: "placement-inline" }],
    };
  }
  const violations: MathVisualPolicyViolation[] = node.children.map(
    (child) => ({
      ...mdxLocation(child),
      reason: "children-unexpected" as const,
    })
  );
  for (const attribute of node.attributes) {
    if (attribute.type === "mdxJsxExpressionAttribute") {
      violations.push({
        ...mdxLocation(attribute),
        reason: "attribute-spread",
      });
    }
  }
  const named = node.attributes.filter(
    (attribute): attribute is MdxJsxAttribute =>
      attribute.type === "mdxJsxAttribute"
  );
  for (const attribute of named) {
    if (!ALLOWED_ATTRIBUTES.has(attribute.name)) {
      violations.push({
        ...mdxLocation(attribute),
        reason: "attribute-unexpected",
      });
    }
  }
  recordDuplicates(named, "title", "attribute-duplicate", violations);
  recordDuplicates(named, "description", "attribute-duplicate", violations);
  recordDuplicates(named, "scene", "scene-duplicate", violations);
  recordDuplicates(named, "labels", "labels-duplicate", violations);

  const sceneAttribute = named.find(({ name }) => name === "scene");
  const labelAttribute = named.find(({ name }) => name === "labels");
  if (!sceneAttribute) {
    violations.push({ ...fallback, reason: "scene-missing" });
    return { violations };
  }
  if (named.filter(({ name }) => name === "scene").length > 1) {
    return { violations };
  }
  if (named.filter(({ name }) => name === "labels").length > 1) {
    return { violations };
  }
  const sceneExpression = attributeExpression(sceneAttribute);
  if (sceneExpression?.type !== "ObjectExpression") {
    violations.push({
      ...mdxLocation(sceneAttribute),
      reason: "scene-expression",
    });
    return { violations };
  }
  const sceneLocation = mdxLocation(sceneAttribute);
  const scene = decodeStaticLiteral(sceneExpression);
  if (!scene.success) {
    violations.push({
      ...estreeLocation(scene.failure.node, sceneLocation),
      reason: sceneReason(scene.failure.reason),
    });
    return { violations };
  }
  const labelLocation = labelAttribute
    ? mdxLocation(labelAttribute)
    : sceneLocation;
  const labelKeys: StaticResult<readonly string[]> = labelAttribute
    ? readRichLabelKeys(labelAttribute, labelLocation)
    : { success: true, value: [] };
  if (!labelKeys.success) {
    violations.push(labelKeys.violation);
    return { violations };
  }
  return {
    candidate: {
      labelKeys: labelKeys.value,
      labelLocation,
      scene: scene.value,
      sceneLocation,
      sceneNode: sceneExpression,
    },
    violations,
  };
}
