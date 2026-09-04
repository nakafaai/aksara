import {
  asEstreeNode,
  type EstreeNode,
  staticFieldName,
} from "#nakafa-content/mdx/parse";

export interface PointCoordinates {
  x: number;
  y: number;
  z: number;
}

const STATIC_MATH_METHODS = new Set([
  "abs",
  "acos",
  "acosh",
  "asin",
  "asinh",
  "atan",
  "atan2",
  "atanh",
  "cbrt",
  "ceil",
  "cos",
  "cosh",
  "exp",
  "floor",
  "fround",
  "hypot",
  "log",
  "log10",
  "log1p",
  "log2",
  "max",
  "min",
  "pow",
  "round",
  "sign",
  "sin",
  "sinh",
  "sqrt",
  "tan",
  "tanh",
  "trunc",
]);

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

/** Evaluates one unary numeric expression. */
function staticUnaryNumber(node: EstreeNode): number | undefined {
  const argument = staticNumber(asEstreeNode(node.argument));
  if (argument === undefined) {
    return;
  }
  if (node.operator === "-") {
    return -argument;
  }
  return node.operator === "+" ? argument : undefined;
}

/** Reads one numeric Math constant. */
function staticMathConstant(node: EstreeNode): number | undefined {
  const owner = staticFieldName(asEstreeNode(node.object));
  const field = staticFieldName(asEstreeNode(node.property));
  const value =
    owner === "Math" && field ? Reflect.get(Math, field) : undefined;
  return typeof value === "number" ? value : undefined;
}

/** Evaluates one allowlisted pure Math call. */
function staticMathCall(node: EstreeNode): number | undefined {
  const callee = asEstreeNode(node.callee);
  const owner = staticFieldName(asEstreeNode(callee?.object));
  const method = staticFieldName(asEstreeNode(callee?.property));
  if (
    callee?.type !== "MemberExpression" ||
    owner !== "Math" ||
    !method ||
    !STATIC_MATH_METHODS.has(method) ||
    !Array.isArray(node.arguments)
  ) {
    return;
  }
  const values = node.arguments.map((argument) =>
    staticNumber(asEstreeNode(argument))
  );
  if (values.some((value) => value === undefined)) {
    return;
  }
  const operation = Reflect.get(Math, method);
  if (typeof operation !== "function") {
    return;
  }
  const result = Reflect.apply(operation, Math, values);
  return typeof result === "number" && Number.isFinite(result)
    ? result
    : undefined;
}

/** Evaluates one binary numeric expression. */
function staticBinaryNumber(node: EstreeNode): number | undefined {
  const left = staticNumber(asEstreeNode(node.left));
  const right = staticNumber(asEstreeNode(node.right));
  if (left === undefined || right === undefined) {
    return;
  }
  switch (node.operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return right === 0 ? undefined : left / right;
    case "%":
      return right === 0 ? undefined : left % right;
    case "**":
      return left ** right;
    default:
      return;
  }
}

/** Evaluates the pure numeric expression subset used by authored graph points. */
export function staticNumber(node: EstreeNode | undefined): number | undefined {
  if (node?.type === "Literal") {
    return typeof node.value === "number" ? node.value : undefined;
  }
  if (node?.type === "UnaryExpression") {
    return staticUnaryNumber(node);
  }
  if (node?.type === "MemberExpression") {
    return staticMathConstant(node);
  }
  if (node?.type === "CallExpression") {
    return staticMathCall(node);
  }
  return node?.type === "BinaryExpression"
    ? staticBinaryNumber(node)
    : undefined;
}

/** Reads one static three-dimensional point object. */
export function staticPoint(
  node: EstreeNode | undefined
): PointCoordinates | undefined {
  if (node?.type !== "ObjectExpression") {
    return;
  }
  const x = staticNumber(asEstreeNode(objectProperty(node, "x")?.value));
  const y = staticNumber(asEstreeNode(objectProperty(node, "y")?.value));
  const zProperty = objectProperty(node, "z");
  const z = zProperty ? staticNumber(asEstreeNode(zProperty.value)) : 0;
  return x === undefined || y === undefined || z === undefined
    ? undefined
    : { x, y, z };
}

/** Proves that three or more static points lie on one straight line. */
export function areCollinear(points: readonly PointCoordinates[]): boolean {
  const [first, second] = points;
  if (!(first && second)) {
    return false;
  }
  const direction = {
    x: second.x - first.x,
    y: second.y - first.y,
    z: second.z - first.z,
  };
  const tolerance = 1e-10;
  return points.slice(2).every((point) => {
    const offset = {
      x: point.x - first.x,
      y: point.y - first.y,
      z: point.z - first.z,
    };
    const cross = {
      x: direction.y * offset.z - direction.z * offset.y,
      y: direction.z * offset.x - direction.x * offset.z,
      z: direction.x * offset.y - direction.y * offset.x,
    };
    return (
      Math.abs(cross.x) <= tolerance &&
      Math.abs(cross.y) <= tolerance &&
      Math.abs(cross.z) <= tolerance
    );
  });
}

/** Removes source-location metadata before comparing two point expressions. */
function expressionFingerprint(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(expressionFingerprint);
  }
  if (!value || typeof value !== "object") {
    return value;
  }
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !["end", "loc", "range", "raw", "start"].includes(key))
      .map(([key, child]) => [key, expressionFingerprint(child)])
  );
}

/** Rejects two identical point encodings used only to render one marker. */
export function distinctPointPair(points: readonly EstreeNode[]): boolean {
  const [first, second] = points;
  if (!(first && second)) {
    return false;
  }
  const firstCoordinates = staticPoint(first);
  const secondCoordinates = staticPoint(second);
  if (firstCoordinates && secondCoordinates) {
    return (
      firstCoordinates.x !== secondCoordinates.x ||
      firstCoordinates.y !== secondCoordinates.y ||
      firstCoordinates.z !== secondCoordinates.z
    );
  }
  return (
    JSON.stringify(expressionFingerprint(first)) !==
    JSON.stringify(expressionFingerprint(second))
  );
}
