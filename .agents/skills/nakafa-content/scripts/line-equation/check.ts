import {
  inspectExactPointExpression,
  pointExpressionBindings,
} from "#nakafa-content/line-equation/exact";
import {
  asEstreeNode,
  type EstreeNode,
  type MdxAttribute,
  type MdxNode,
  parseLessonMdx,
  staticFieldName,
  visitMdxNodes,
} from "#nakafa-content/voice-mdx";
import type { LessonVoiceIssue } from "#nakafa-content/voice-types";

export interface LineEquationSeriesInspection {
  exactSegment: boolean;
  excerpt: string;
  line: number;
  pointCount?: number;
  pointsKind: string;
  smooth?: boolean;
}

interface SourceEdit {
  end: number;
  start: number;
  text: string;
}

const WHITESPACE_ONLY = /^\s*$/u;

/** Visits every ESTree child reachable from one node exactly once. */
function visitEstree(
  node: EstreeNode,
  visit: (current: EstreeNode) => void
): void {
  visit(node);
  for (const value of Object.values(node)) {
    const children = Array.isArray(value) ? value : [value];
    for (const child of children) {
      const childNode = asEstreeNode(child);
      if (childNode) {
        visitEstree(childNode, visit);
      }
    }
  }
}

/** Reads the ESTree program attached to one expression-valued MDX attribute. */
function attributeEstree(attribute: MdxAttribute): EstreeNode | undefined {
  if (
    !attribute.value ||
    typeof attribute.value !== "object" ||
    !("data" in attribute.value) ||
    !attribute.value.data ||
    typeof attribute.value.data !== "object" ||
    !("estree" in attribute.value.data)
  ) {
    return;
  }
  return asEstreeNode(attribute.value.data.estree);
}

/** Returns one statically named property from an object expression. */
function objectProperty(
  object: EstreeNode,
  name: string
): EstreeNode | undefined {
  if (object.type !== "ObjectExpression" || !Array.isArray(object.properties)) {
    return;
  }
  let match: EstreeNode | undefined;
  for (const property of object.properties) {
    const propertyNode = asEstreeNode(property);
    if (
      propertyNode?.type === "Property" &&
      staticFieldName(asEstreeNode(propertyNode.key)) === name
    ) {
      match = propertyNode;
    }
  }
  return match;
}

/** Reads a static boolean property value when present. */
function staticBoolean(property: EstreeNode | undefined): boolean | undefined {
  const value = asEstreeNode(property?.value);
  return value?.type === "Literal" && typeof value.value === "boolean"
    ? value.value
    : undefined;
}

/** Converts an absolute source offset into a stable line inspection. */
function sourceLocation(
  source: string,
  offset: number
): Pick<LineEquationSeriesInspection, "excerpt" | "line"> {
  const lineStart = source.lastIndexOf("\n", offset - 1) + 1;
  const lineEndIndex = source.indexOf("\n", offset);
  const lineEnd = lineEndIndex === -1 ? source.length : lineEndIndex;
  let line = 1;
  for (let index = 0; index < lineStart; index += 1) {
    if (source.charCodeAt(index) === 10) {
      line += 1;
    }
  }
  return {
    excerpt: source.slice(lineStart, lineEnd).trim(),
    line,
  };
}

/** Inspects every series object inside one LineEquation data expression. */
function inspectDataProgram(
  program: EstreeNode,
  source: string
): LineEquationSeriesInspection[] {
  const bindings = pointExpressionBindings(program);
  const inspections: LineEquationSeriesInspection[] = [];
  visitEstree(program, (node) => {
    if (node.type !== "ObjectExpression") {
      return;
    }
    const pointsProperty = objectProperty(node, "points");
    const pointsValue = asEstreeNode(pointsProperty?.value);
    if (!(pointsProperty && pointsValue)) {
      return;
    }
    const pointInspection = inspectExactPointExpression(pointsValue, bindings);
    const offset = pointsProperty.start ?? node.start;
    if (offset === undefined) {
      return;
    }
    const smooth = staticBoolean(objectProperty(node, "smooth"));
    inspections.push({
      exactSegment: pointInspection.exactSegment,
      ...sourceLocation(source, offset),
      ...(pointInspection.pointCount === undefined
        ? {}
        : { pointCount: pointInspection.pointCount }),
      pointsKind: pointsValue.type,
      ...(smooth === undefined ? {} : { smooth }),
    });
  });
  return inspections;
}

/** Plans a replacement for an existing smooth property. */
function smoothReplacement(
  property: EstreeNode | undefined
): SourceEdit | undefined {
  const value = asEstreeNode(property?.value);
  return value?.start !== undefined && value.end !== undefined
    ? { end: value.end, start: value.start, text: "false" }
    : undefined;
}

/** Plans an inserted smooth property beside one points property. */
function smoothInsertion(
  pointsProperty: EstreeNode,
  source: string
): SourceEdit | undefined {
  if (pointsProperty.start === undefined || pointsProperty.end === undefined) {
    return;
  }
  let offset = pointsProperty.end;
  while (source[offset] === " " || source[offset] === "\t") {
    offset += 1;
  }
  const hasComma = source[offset] === ",";
  if (hasComma) {
    offset += 1;
  }
  const lineStart = source.lastIndexOf("\n", pointsProperty.start - 1) + 1;
  const prefix = source.slice(lineStart, pointsProperty.start);
  const text = WHITESPACE_ONLY.test(prefix)
    ? `${hasComma ? "" : ","}\n${prefix}smooth: false,`
    : `${hasComma ? "" : ","} smooth: false,`;
  return { end: offset, start: offset, text };
}

/** Plans one edit when a series is a proven exact straight line. */
function exactLineEdit(
  node: EstreeNode,
  bindings: ReadonlyMap<string, EstreeNode | null>,
  source: string
): SourceEdit | undefined {
  if (node.type !== "ObjectExpression") {
    return;
  }
  const pointsProperty = objectProperty(node, "points");
  const pointsValue = asEstreeNode(pointsProperty?.value);
  const smoothProperty = objectProperty(node, "smooth");
  if (
    !(
      pointsProperty &&
      inspectExactPointExpression(pointsValue, bindings).exactSegment
    ) ||
    staticBoolean(smoothProperty) === false
  ) {
    return;
  }
  return (
    smoothReplacement(smoothProperty) ?? smoothInsertion(pointsProperty, source)
  );
}

/** Plans source edits for proven exact series in one data program. */
function exactLineInsertions(
  program: EstreeNode,
  source: string
): SourceEdit[] {
  const bindings = pointExpressionBindings(program);
  const edits: SourceEdit[] = [];
  visitEstree(program, (node) => {
    const edit = exactLineEdit(node, bindings, source);
    if (edit) {
      edits.push(edit);
    }
  });
  return edits;
}

/** Inspects graph series in every authored LineEquation component. */
export function inspectLineEquationSeries(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LineEquationSeriesInspection[] {
  const inspections: LineEquationSeriesInspection[] = [];
  visitMdxNodes(tree, (node) => {
    if (
      (node.type !== "mdxJsxFlowElement" &&
        node.type !== "mdxJsxTextElement") ||
      node.name !== "LineEquation"
    ) {
      return;
    }
    for (const attribute of node.attributes ?? []) {
      if (attribute.name !== "data") {
        continue;
      }
      const program = attributeEstree(attribute);
      if (program) {
        inspections.push(...inspectDataProgram(program, source));
      }
    }
  });
  return inspections;
}

/** Finds exact straight datasets whose interpolation is not explicitly disabled. */
export function findExactLineSmoothingIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  return inspectLineEquationSeries(source, tree)
    .filter(({ exactSegment, smooth }) => exactSegment && smooth !== false)
    .map(({ excerpt, line }) => ({
      column: Math.max(1, excerpt.indexOf("points") + 1),
      excerpt,
      line,
      rule: "exact-line-smoothing",
    }));
}

/** Adds explicit disabled smoothing to every statically proven exact segment. */
export function addExactLineSmoothing(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): { changeCount: number; source: string } {
  const edits: SourceEdit[] = [];
  visitMdxNodes(tree, (node) => {
    if (
      (node.type !== "mdxJsxFlowElement" &&
        node.type !== "mdxJsxTextElement") ||
      node.name !== "LineEquation"
    ) {
      return;
    }
    for (const attribute of node.attributes ?? []) {
      if (attribute.name !== "data") {
        continue;
      }
      const program = attributeEstree(attribute);
      if (program) {
        edits.push(...exactLineInsertions(program, source));
      }
    }
  });
  let updatedSource = source;
  for (const edit of edits.sort((left, right) => right.start - left.start)) {
    updatedSource =
      updatedSource.slice(0, edit.start) +
      edit.text +
      updatedSource.slice(edit.end);
  }
  return { changeCount: edits.length, source: updatedSource };
}
