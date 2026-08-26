import {
  type ContentKey,
  ContentKeySchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Predicate, Schema } from "effect";
import type { Node as EstreeNode, Program } from "estree-jsx";
import { visit as visitEstree } from "estree-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { Node as UnistNode } from "unist";
import { visit as visitUnist } from "unist-util-visit";
import { readNodeProgram } from "#compiler/ast/program";

const COORDINATE_NUMBER = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)`;
const COORDINATE_LABEL = new RegExp(
  String.raw`^(?:[A-Za-z][A-Za-z0-9']*\s*)?\(\s*${COORDINATE_NUMBER}\s*,\s*${COORDINATE_NUMBER}(?:\s*,\s*${COORDINATE_NUMBER})?\s*\)$`,
  "u"
);

/** Source location and exact coordinate string rejected from label text. */
const AuthoredCoordinateLabelOccurrenceSchema = Schema.Struct({
  column: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  line: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  text: Schema.Trimmed.check(Schema.isNonEmpty()),
});
type AuthoredCoordinateLabelOccurrence =
  typeof AuthoredCoordinateLabelOccurrenceSchema.Type;

/** Coordinate notation in a 3D label must remain semantic React content. */
export class AuthoredCoordinateLabelError extends Schema.TaggedError<AuthoredCoordinateLabelError>()(
  "AuthoredCoordinateLabelError",
  {
    contentKey: ContentKeySchema,
    occurrences: Schema.Array(AuthoredCoordinateLabelOccurrenceSchema).pipe(
      Schema.check(Schema.isMinLength(1))
    ),
  }
) {}

/** Narrows unknown JSX attribute values to unified syntax nodes. */
function isUnistNode(value: unknown): value is UnistNode {
  return (
    Predicate.isObject(value) &&
    "type" in value &&
    typeof value.type === "string"
  );
}

/** Returns a string only when one ESTree expression is fully static. */
function staticString(node: EstreeNode) {
  if (node.type === "Literal") {
    return typeof node.value === "string" ? node.value : undefined;
  }
  if (node.type !== "TemplateLiteral" || node.expressions.length > 0) {
    return;
  }
  return node.quasis.map(({ value }) => value.raw).join("");
}

/** Resolves a static, non-computed object property name. */
function propertyName(node: EstreeNode) {
  if (node.type !== "Property" || node.computed) {
    return;
  }
  if (node.key.type === "Identifier") {
    return node.key.name;
  }
  return node.key.type === "Literal" && typeof node.key.value === "string"
    ? node.key.value
    : undefined;
}

/** Adds one coordinate occurrence with a normalized one-based location. */
function appendOccurrence(
  value: string,
  line: number | undefined,
  column: number | undefined,
  occurrences: AuthoredCoordinateLabelOccurrence[]
) {
  const text = value.trim();
  if (!COORDINATE_LABEL.test(text)) {
    return;
  }
  occurrences.push({ column: column ?? 1, line: line ?? 1, text });
}

/** Records coordinate literals assigned to object properties named text. */
function inspectTextProperties(
  program: Program,
  occurrences: AuthoredCoordinateLabelOccurrence[]
) {
  visitEstree(program, (node) => {
    if (propertyName(node) !== "text" || node.type !== "Property") {
      return;
    }
    const value = staticString(node.value);
    if (value === undefined) {
      return;
    }
    appendOccurrence(
      value,
      node.loc?.start.line,
      node.loc === null || node.loc === undefined
        ? undefined
        : node.loc.start.column + 1,
      occurrences
    );
  });
}

/** Records a direct static expression assigned to a JSX text attribute. */
function inspectTextAttributeProgram(
  program: Program,
  occurrences: AuthoredCoordinateLabelOccurrence[]
) {
  const [statement] = program.body;
  if (program.body.length !== 1 || statement?.type !== "ExpressionStatement") {
    return;
  }
  const value = staticString(statement.expression);
  if (value === undefined) {
    return;
  }
  appendOccurrence(
    value,
    statement.expression.loc?.start.line,
    statement.expression.loc === null || statement.expression.loc === undefined
      ? undefined
      : statement.expression.loc.start.column + 1,
    occurrences
  );
}

/** Resolves a simple MDX JSX attribute name. */
function attributeName(attribute: UnistNode) {
  if (!(attribute.type === "mdxJsxAttribute" && "name" in attribute)) {
    return;
  }
  return typeof attribute.name === "string" ? attribute.name : undefined;
}

/** Inspects all static label text reachable from one JSX attribute. */
function inspectAttribute(
  attribute: UnistNode,
  occurrences: AuthoredCoordinateLabelOccurrence[]
) {
  const name = attributeName(attribute);
  if (
    name === "text" &&
    "value" in attribute &&
    typeof attribute.value === "string"
  ) {
    appendOccurrence(
      attribute.value,
      attribute.position?.start.line,
      attribute.position?.start.column,
      occurrences
    );
  }

  const programs = new Set<Program>();
  const program = readNodeProgram(attribute);
  if (program) {
    programs.add(program);
  }
  if ("value" in attribute && isUnistNode(attribute.value)) {
    const valueProgram = readNodeProgram(attribute.value);
    if (valueProgram) {
      programs.add(valueProgram);
    }
  }
  for (const candidate of programs) {
    inspectTextProperties(candidate, occurrences);
    if (name === "text") {
      inspectTextAttributeProgram(candidate, occurrences);
    }
  }
}

/** Records coordinate string literals from renderer-component attributes. */
function inspectMdxJsxNode(
  node: UnistNode,
  occurrences: AuthoredCoordinateLabelOccurrence[]
) {
  if (
    !(node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement")
  ) {
    return;
  }
  if (!("attributes" in node && Array.isArray(node.attributes))) {
    return;
  }
  for (const attribute of node.attributes) {
    if (isUnistNode(attribute)) {
      inspectAttribute(attribute, occurrences);
    }
  }
}

/** Creates the canonical authoring policy for semantic 3D label content. */
export function createCoordinateLabelPolicy(contentKey: ContentKey) {
  const occurrences: AuthoredCoordinateLabelOccurrence[] = [];
  /** Records coordinate label literals during the shared remark pass. */
  const remarkPlugin: Plugin<[], Root> = () => (tree) => {
    visitUnist(tree, (node) => inspectMdxJsxNode(node, occurrences));
  };

  /** Rejects every coordinate string recorded by the completed remark pass. */
  const validate = Effect.fn("AksaraCompiler.validateCoordinateLabelPolicy")(
    function* () {
      if (occurrences.length === 0) {
        return;
      }
      return yield* new AuthoredCoordinateLabelError({
        contentKey,
        occurrences: [...occurrences],
      });
    }
  );

  return { remarkPlugin, validate };
}
