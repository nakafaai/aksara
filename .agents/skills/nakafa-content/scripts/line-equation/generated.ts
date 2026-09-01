import { staticNumber } from "#nakafa-content/line-equation/numeric";
import {
  asEstreeNode,
  type EstreeNode,
  staticFieldName,
} from "#nakafa-content/voice-mdx";

export interface GeneratedLineInspection {
  exactSegment: boolean;
  pointCount: number;
}

type ExpressionKind = "affine" | "constant" | "unknown";

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

/** Combines two additive expression classifications. */
function additiveKind(
  left: ExpressionKind,
  right: ExpressionKind
): ExpressionKind {
  if (left === "unknown" || right === "unknown") {
    return "unknown";
  }
  return left === "affine" || right === "affine" ? "affine" : "constant";
}

/** Combines two multiplicative expression classifications. */
function productKind(
  left: ExpressionKind,
  right: ExpressionKind
): ExpressionKind {
  if (left === "unknown" || right === "unknown") {
    return "unknown";
  }
  if (left === "affine" && right === "affine") {
    return "unknown";
  }
  return left === "affine" || right === "affine" ? "affine" : "constant";
}

/** Classifies one binary expression. */
function binaryKind(
  node: EstreeNode,
  environment: ReadonlyMap<string, ExpressionKind>
): ExpressionKind {
  const left = expressionKind(asEstreeNode(node.left), environment);
  const right = expressionKind(asEstreeNode(node.right), environment);
  if (["+", "-"].includes(String(node.operator))) {
    return additiveKind(left, right);
  }
  if (node.operator === "*") {
    return productKind(left, right);
  }
  return node.operator === "/" && right === "constant" ? left : "unknown";
}

/** Classifies one property access. */
function memberKind(
  node: EstreeNode,
  environment: ReadonlyMap<string, ExpressionKind>
): ExpressionKind {
  const object = expressionKind(asEstreeNode(node.object), environment);
  const property = node.computed
    ? expressionKind(asEstreeNode(node.property), environment)
    : "constant";
  return object === "constant" && property === "constant"
    ? "constant"
    : "unknown";
}

/** Classifies one object expression used as a constant container. */
function objectKind(
  node: EstreeNode,
  environment: ReadonlyMap<string, ExpressionKind>
): ExpressionKind {
  if (!Array.isArray(node.properties)) {
    return "unknown";
  }
  const constant = node.properties.every((property) => {
    const propertyNode = asEstreeNode(property);
    return (
      propertyNode?.type === "Property" &&
      expressionKind(asEstreeNode(propertyNode.value), environment) ===
        "constant"
    );
  });
  return constant ? "constant" : "unknown";
}

/** Classifies one expression by its dependence on the generated point index. */
function expressionKind(
  node: EstreeNode | undefined,
  environment: ReadonlyMap<string, ExpressionKind>
): ExpressionKind {
  if (!node) {
    return "unknown";
  }
  if (staticNumber(node) !== undefined || node.type === "Literal") {
    return "constant";
  }
  if (node.type === "Identifier") {
    return environment.get(staticFieldName(node) ?? "") ?? "unknown";
  }
  if (node.type === "UnaryExpression") {
    const argument = expressionKind(asEstreeNode(node.argument), environment);
    if (["+", "-"].includes(String(node.operator))) {
      return argument;
    }
    return argument === "constant" ? "constant" : "unknown";
  }
  if (node.type === "BinaryExpression") {
    return binaryKind(node, environment);
  }
  if (node.type === "MemberExpression") {
    return memberKind(node, environment);
  }
  if (node.type === "CallExpression") {
    return "unknown";
  }
  return node.type === "ObjectExpression"
    ? objectKind(node, environment)
    : "unknown";
}

/** Seeds generator parameters with their index dependence. */
function callbackEnvironment(
  callback: EstreeNode
): Map<string, ExpressionKind> {
  const environment = new Map<string, ExpressionKind>();
  if (Array.isArray(callback.params)) {
    const [valueParameter, indexParameter] = callback.params.map(asEstreeNode);
    const valueName = staticFieldName(valueParameter);
    const indexName = staticFieldName(indexParameter);
    if (valueName) {
      environment.set(valueName, "constant");
    }
    if (indexName) {
      environment.set(indexName, "affine");
    }
  }
  return environment;
}

/** Adds one callback variable declaration to the affine environment. */
function addDeclaration(
  statement: EstreeNode,
  environment: Map<string, ExpressionKind>
): boolean {
  if (!Array.isArray(statement.declarations)) {
    return false;
  }
  for (const declarationValue of statement.declarations) {
    const declaration = asEstreeNode(declarationValue);
    const name = staticFieldName(asEstreeNode(declaration?.id));
    if (declaration?.type !== "VariableDeclarator" || !name) {
      return false;
    }
    environment.set(
      name,
      expressionKind(asEstreeNode(declaration.init), environment)
    );
  }
  return true;
}

/** Finds the point object returned by one generator callback. */
function returnedPoint(
  callback: EstreeNode,
  environment: Map<string, ExpressionKind>
): EstreeNode | undefined {
  const body = asEstreeNode(callback.body);
  if (body?.type === "ObjectExpression") {
    return body;
  }
  if (body?.type !== "BlockStatement" || !Array.isArray(body.body)) {
    return;
  }
  for (const statementValue of body.body) {
    const statement = asEstreeNode(statementValue);
    if (statement?.type === "VariableDeclaration") {
      if (addDeclaration(statement, environment)) {
        continue;
      }
      return;
    }
    return statement?.type === "ReturnStatement"
      ? asEstreeNode(statement.argument)
      : undefined;
  }
}

/** Classifies whether a generator callback varies affinely with its index. */
function pointCallbackKind(callback: EstreeNode | undefined): ExpressionKind {
  if (
    !(
      callback &&
      ["ArrowFunctionExpression", "FunctionExpression"].includes(callback.type)
    )
  ) {
    return "unknown";
  }
  const environment = callbackEnvironment(callback);
  const point = returnedPoint(callback, environment);
  if (point?.type !== "ObjectExpression") {
    return "unknown";
  }
  const coordinateKinds = ["x", "y", "z"].map((coordinate) => {
    const property = objectProperty(point, coordinate);
    return coordinate === "z" && !property
      ? "constant"
      : expressionKind(asEstreeNode(property?.value), environment);
  });
  if (coordinateKinds.some((kind) => kind === "unknown")) {
    return "unknown";
  }
  return coordinateKinds.includes("affine") ? "affine" : "constant";
}

/** Reads the static size and optional mapper of Array.from({ length }). */
function arrayFromDetails(
  call: EstreeNode | undefined
): { callback?: EstreeNode; length: number } | undefined {
  const callee = asEstreeNode(call?.callee);
  if (
    call?.type !== "CallExpression" ||
    callee?.type !== "MemberExpression" ||
    staticFieldName(asEstreeNode(callee.object)) !== "Array" ||
    staticFieldName(asEstreeNode(callee.property)) !== "from" ||
    !Array.isArray(call.arguments)
  ) {
    return;
  }
  const [source, callback] = call.arguments.map(asEstreeNode);
  const length = source
    ? staticNumber(asEstreeNode(objectProperty(source, "length")?.value))
    : undefined;
  if (length === undefined || !Number.isInteger(length) || length < 0) {
    return;
  }
  return callback ? { callback, length } : { length };
}

/** Proves exactness for a direct Array.from or Array.from(...).map generator. */
export function inspectGeneratedLine(
  call: EstreeNode
): GeneratedLineInspection | undefined {
  const direct = arrayFromDetails(call);
  if (direct?.callback) {
    const callbackKind = pointCallbackKind(direct.callback);
    return {
      exactSegment:
        (direct.length === 2 && callbackKind !== "constant") ||
        (direct.length > 2 && callbackKind === "affine"),
      pointCount: direct.length,
    };
  }
  const callee = asEstreeNode(call.callee);
  const sourceCall = asEstreeNode(callee?.object);
  const source = arrayFromDetails(sourceCall);
  const callback = Array.isArray(call.arguments)
    ? asEstreeNode(call.arguments[0])
    : undefined;
  if (
    callee?.type !== "MemberExpression" ||
    staticFieldName(asEstreeNode(callee.property)) !== "map" ||
    !source ||
    !callback
  ) {
    return;
  }
  const callbackKind = pointCallbackKind(callback);
  return {
    exactSegment:
      (source.length === 2 && callbackKind !== "constant") ||
      (source.length > 2 && callbackKind === "affine"),
    pointCount: source.length,
  };
}
