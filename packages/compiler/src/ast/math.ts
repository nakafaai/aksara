import {
  Array as Arr,
  HashSet,
  Match,
  MutableHashSet,
  MutableList,
  Option,
  Schema,
} from "effect";
import type { ObjectExpression } from "estree-jsx";
import type {
  MdxJsxAttribute,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from "mdast-util-mdx";
import {
  attributeExpression,
  inspectRichAttribute,
} from "#compiler/ast/attribute";
import {
  decodeConstantLiteral,
  type StaticLiteral,
  type StaticLiteralSyntaxReason,
  staticPropertyName,
} from "#compiler/ast/literal";
import type {
  MathVisualPolicyViolation,
  MathVisualSourceReason,
} from "#compiler/errors";

type StaticResult<Value> =
  | { readonly success: false; readonly violation: MathVisualPolicyViolation }
  | { readonly success: true; readonly value: Value };

export type MathVisualElement = MdxJsxFlowElement | MdxJsxTextElement;

/** One-based line and column of an authored source location. */
const SourceLocationSchema = Schema.Struct({
  column: Schema.Int,
  line: Schema.Int,
});
export type SourceLocation = typeof SourceLocationSchema.Type;

/** Constant MathVisual data retained for contract-level validation. */
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

const ALLOWED_ATTRIBUTES = HashSet.make(
  "description",
  "labels",
  "scene",
  "title"
);

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
export function estreeLocation(
  node: {
    readonly loc?: { readonly start: SourceLocation } | null | undefined;
  },
  fallback: SourceLocation
) {
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
  return Match.value(reason).pipe(
    Match.withReturnType<MathVisualSourceReason>(),
    Match.when("array-hole", () => "scene-array-hole"),
    Match.when("computed-property", () => "scene-computed-property"),
    Match.when("duplicate-property", () => "scene-duplicate-property"),
    Match.when("dynamic-value", () => "scene-dynamic-value"),
    Match.when("spread", () => "scene-spread"),
    Match.when("unsupported-property", () => "scene-property"),
    Match.exhaustive
  );
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
  const keys = MutableList.make<string>();
  const names = MutableHashSet.empty<string>();
  for (const property of expression.properties) {
    const location = estreeLocation(property, fallback);
    if (property.type === "SpreadElement") {
      return failedLabel("labels-spread", location);
    }
    if (property.computed) {
      return failedLabel("labels-computed-property", location);
    }
    if (property.kind !== "init" || property.method || property.shorthand) {
      return failedLabel("labels-property", location);
    }
    const name = staticPropertyName(property);
    if (name === undefined) {
      return failedLabel("labels-property", location);
    }
    if (MutableHashSet.has(names, name)) {
      return failedLabel("labels-duplicate-property", location);
    }
    MutableHashSet.add(names, name);
    MutableList.append(keys, name);
  }
  return { success: true, value: MutableList.toArray(keys) };
}

/** Records duplicate values of one allowed named attribute. */
function recordDuplicates(
  attributes: readonly MdxJsxAttribute[],
  name: string,
  reason: MathVisualSourceReason,
  violations: MutableList.MutableList<MathVisualPolicyViolation>
) {
  const duplicates = Arr.drop(
    Arr.filter(attributes, (attribute) => attribute.name === name),
    1
  );
  for (const duplicate of duplicates) {
    MutableList.append(violations, { ...mdxLocation(duplicate), reason });
  }
}

/** Finds absent visible metadata required to describe one visual. */
function requiredMetadataViolations(
  attributes: readonly MdxJsxAttribute[],
  location: SourceLocation
): MathVisualPolicyViolation[] {
  const violations = MutableList.make<MathVisualPolicyViolation>();
  const title = Arr.findFirst(attributes, ({ name }) => name === "title");
  if (Option.isSome(title)) {
    const state = inspectRichAttribute(title.value);
    if (state !== "meaningful") {
      MutableList.append(violations, {
        ...mdxLocation(title.value),
        reason: state === "empty" ? "title-empty" : "title-dynamic",
      });
    }
  } else {
    MutableList.append(violations, { ...location, reason: "title-missing" });
  }
  const description = Arr.findFirst(
    attributes,
    ({ name }) => name === "description"
  );
  if (Option.isSome(description)) {
    const state = inspectRichAttribute(description.value);
    if (state !== "meaningful") {
      MutableList.append(violations, {
        ...mdxLocation(description.value),
        reason: state === "empty" ? "description-empty" : "description-dynamic",
      });
    }
  } else {
    MutableList.append(violations, {
      ...location,
      reason: "description-missing",
    });
  }
  return MutableList.toArray(violations);
}

/** Inspects the exact authored JSX surface of one MathVisual node. */
export function inspectMathVisual(
  node: MathVisualElement
): MathVisualInspection {
  const fallback = mdxLocation(node);
  if (node.type === "mdxJsxTextElement") {
    return { violations: [{ ...fallback, reason: "placement-inline" }] };
  }
  const violations = MutableList.make<MathVisualPolicyViolation>();
  MutableList.appendAll(
    violations,
    Arr.map(node.children, (child) => ({
      ...mdxLocation(child),
      reason: "children-unexpected" as const,
    }))
  );
  for (const attribute of node.attributes) {
    if (attribute.type === "mdxJsxExpressionAttribute") {
      MutableList.append(violations, {
        ...mdxLocation(attribute),
        reason: "attribute-spread",
      });
    }
  }
  const named = Arr.filter(
    node.attributes,
    (attribute): attribute is MdxJsxAttribute =>
      attribute.type === "mdxJsxAttribute"
  );
  for (const attribute of named) {
    if (!HashSet.has(ALLOWED_ATTRIBUTES, attribute.name)) {
      MutableList.append(violations, {
        ...mdxLocation(attribute),
        reason: "attribute-unexpected",
      });
    }
  }
  recordDuplicates(named, "title", "attribute-duplicate", violations);
  recordDuplicates(named, "description", "attribute-duplicate", violations);
  recordDuplicates(named, "scene", "scene-duplicate", violations);
  recordDuplicates(named, "labels", "labels-duplicate", violations);
  const metadataViolations = requiredMetadataViolations(named, fallback);

  const sceneAttribute = Arr.findFirst(named, ({ name }) => name === "scene");
  const labelAttribute = Arr.findFirst(named, ({ name }) => name === "labels");
  if (Option.isNone(sceneAttribute)) {
    MutableList.append(violations, { ...fallback, reason: "scene-missing" });
    MutableList.appendAll(violations, metadataViolations);
    return { violations: MutableList.toArray(violations) };
  }
  if (Arr.filter(named, ({ name }) => name === "scene").length > 1) {
    MutableList.appendAll(violations, metadataViolations);
    return { violations: MutableList.toArray(violations) };
  }
  if (Arr.filter(named, ({ name }) => name === "labels").length > 1) {
    MutableList.appendAll(violations, metadataViolations);
    return { violations: MutableList.toArray(violations) };
  }
  const sceneExpression = attributeExpression(sceneAttribute.value);
  if (sceneExpression?.type !== "ObjectExpression") {
    MutableList.append(violations, {
      ...mdxLocation(sceneAttribute.value),
      reason: "scene-expression",
    });
    MutableList.appendAll(violations, metadataViolations);
    return { violations: MutableList.toArray(violations) };
  }
  const sceneLocation = mdxLocation(sceneAttribute.value);
  const scene = decodeConstantLiteral(sceneExpression);
  if (!scene.success) {
    MutableList.append(violations, {
      ...estreeLocation(scene.failure.node, sceneLocation),
      reason: sceneReason(scene.failure.reason),
    });
    MutableList.appendAll(violations, metadataViolations);
    return { violations: MutableList.toArray(violations) };
  }
  const labelLocation = Option.isSome(labelAttribute)
    ? mdxLocation(labelAttribute.value)
    : sceneLocation;
  const labelKeys: StaticResult<readonly string[]> = Option.isSome(
    labelAttribute
  )
    ? readRichLabelKeys(labelAttribute.value, labelLocation)
    : { success: true, value: [] };
  if (!labelKeys.success) {
    MutableList.append(violations, labelKeys.violation);
    MutableList.appendAll(violations, metadataViolations);
    return { violations: MutableList.toArray(violations) };
  }
  MutableList.appendAll(violations, metadataViolations);
  return {
    candidate: {
      labelKeys: labelKeys.value,
      labelLocation,
      scene: scene.value,
      sceneLocation,
      sceneNode: sceneExpression,
    },
    violations: MutableList.toArray(violations),
  };
}
