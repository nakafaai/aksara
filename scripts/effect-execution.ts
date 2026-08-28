import ts from "typescript";

import {
  dynamicRuntimeKind,
  EFFECT_RUNNERS,
  type EffectRuntimeBindings,
  effectRuntimeBindings,
  type RuntimeKind,
  type SourceSymbols,
  sourceSymbols,
} from "#scripts/effect-imports";

/** Removes syntax wrappers that preserve the referenced runtime value. */
function transparentExpression(node: ts.Expression): ts.Expression {
  let expression = node;
  while (
    ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isTypeAssertionExpression(expression) ||
    ts.isSatisfiesExpression(expression) ||
    ts.isNonNullExpression(expression) ||
    ts.isAwaitExpression(expression) ||
    ts.isPartiallyEmittedExpression(expression) ||
    ts.isExpressionWithTypeArguments(expression)
  ) {
    const { expression: unwrapped } = expression;
    expression = unwrapped;
  }
  return expression;
}

/** Reads a statically known property without guessing computed identifiers. */
function staticProperty(node: ts.Node, computed = false) {
  const isComputed = computed || ts.isComputedPropertyName(node);
  const property = ts.isComputedPropertyName(node)
    ? transparentExpression(node.expression)
    : node;
  return (!isComputed && ts.isIdentifier(property)) ||
    ts.isStringLiteral(property) ||
    ts.isNoSubstitutionTemplateLiteral(property) ||
    ts.isNumericLiteral(property)
    ? property.text
    : undefined;
}

/** Extracts a property access and its receiver. */
function memberAccess(node: ts.Expression) {
  const expression = transparentExpression(node);
  if (ts.isPropertyAccessExpression(expression)) {
    return { name: expression.name.text, receiver: expression.expression };
  }
  if (!ts.isElementAccessExpression(expression)) {
    return;
  }
  return {
    name: staticProperty(expression.argumentExpression, true),
    receiver: expression.expression,
  };
}

/** Resolves one identifier when it is an imported Effect runtime binding. */
function importedRuntimeKind(
  identifier: ts.Identifier,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols
): RuntimeKind | undefined {
  const candidates = [
    [bindings.modules, "module"],
    [bindings.namespaces, "namespace"],
    [bindings.runners, "runner"],
  ] as const;
  for (const [runtimeBindings, kind] of candidates) {
    const binding = runtimeBindings.get(identifier.text);
    if (binding !== undefined && symbols.matchesBinding(identifier, binding)) {
      return kind;
    }
  }
}

/** Maps a property selected from an Effect runtime source. */
function runtimeMemberKind(
  sourceKind: RuntimeKind | undefined,
  memberName: string | undefined
): RuntimeKind | undefined {
  if (sourceKind === "module") {
    if (memberName === "Effect") {
      return "namespace";
    }
    return memberName === undefined ? "runner" : undefined;
  }
  if (sourceKind !== "namespace") {
    return;
  }
  return memberName === undefined || EFFECT_RUNNERS.has(memberName)
    ? "runner"
    : undefined;
}

/** Resolves the runtime value supplying one object binding pattern. */
function bindingSourceKind(
  binding: ts.BindingElement,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols,
  seenSymbols: Set<ts.Symbol>
) {
  const owner = binding.parent.parent;
  if (ts.isVariableDeclaration(owner) && owner.initializer !== undefined) {
    return runtimeReferenceKind(
      owner.initializer,
      bindings,
      symbols,
      seenSymbols
    );
  }
  if (ts.isParameter(owner)) {
    return callbackParameterKind(owner, bindings, symbols, seenSymbols);
  }
  return ts.isBindingElement(owner)
    ? destructuredRuntimeKind(owner, bindings, symbols, seenSymbols)
    : undefined;
}

/** Resolves the value supplied to the first callback of a Promise `then`. */
function callbackParameterKind(
  parameter: ts.ParameterDeclaration,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols,
  seenSymbols: Set<ts.Symbol>
) {
  const callback = parameter.parent;
  if (
    !(
      (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) &&
      callback.parameters[0] === parameter &&
      ts.isCallExpression(callback.parent) &&
      callback.parent.arguments[0] === callback
    )
  ) {
    return;
  }
  const then = memberAccess(callback.parent.expression);
  if (then?.name !== "then") {
    return;
  }
  return runtimeReferenceKind(then.receiver, bindings, symbols, seenSymbols);
}

/** Resolves a destructured Effect runtime binding to its source. */
function destructuredRuntimeKind(
  binding: ts.BindingElement,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols,
  seenSymbols: Set<ts.Symbol>
): RuntimeKind | undefined {
  if (!ts.isObjectBindingPattern(binding.parent)) {
    return;
  }
  const sourceKind = bindingSourceKind(binding, bindings, symbols, seenSymbols);
  if (binding.dotDotDotToken !== undefined) {
    return sourceKind;
  }
  return runtimeMemberKind(
    sourceKind,
    staticProperty(binding.propertyName ?? binding.name)
  );
}

/** Traces local aliases back to their imported Effect runtime origin. */
function runtimeReferenceKind(
  node: ts.Expression,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols,
  seenSymbols = new Set<ts.Symbol>()
): RuntimeKind | undefined {
  const reference = transparentExpression(node);
  const dynamicKind = dynamicRuntimeKind(reference);
  if (dynamicKind !== undefined) {
    return dynamicKind;
  }
  if (!ts.isIdentifier(reference)) {
    const member = memberAccess(reference);
    if (member === undefined) {
      return;
    }
    return runtimeMemberKind(
      runtimeReferenceKind(member.receiver, bindings, symbols, seenSymbols),
      member.name
    );
  }
  const importedKind = importedRuntimeKind(reference, bindings, symbols);
  if (importedKind !== undefined) {
    return importedKind;
  }
  const symbol = symbols.symbolAt(reference);
  if (symbol === undefined || seenSymbols.has(symbol)) {
    return;
  }
  seenSymbols.add(symbol);
  const declaration = symbol.valueDeclaration;
  let resolvedKind: RuntimeKind | undefined;
  if (
    declaration !== undefined &&
    ts.isVariableDeclaration(declaration) &&
    declaration.initializer !== undefined
  ) {
    resolvedKind = runtimeReferenceKind(
      declaration.initializer,
      bindings,
      symbols,
      seenSymbols
    );
  } else if (declaration !== undefined && ts.isBindingElement(declaration)) {
    resolvedKind = destructuredRuntimeKind(
      declaration,
      bindings,
      symbols,
      seenSymbols
    );
  } else if (declaration !== undefined && ts.isParameter(declaration)) {
    resolvedKind = callbackParameterKind(
      declaration,
      bindings,
      symbols,
      seenSymbols
    );
  }
  seenSymbols.delete(symbol);
  return resolvedKind;
}

/** Reports whether authored test code references an Effect runtime runner. */
export function hasEffectRunnerReference(sourceFile: ts.SourceFile) {
  const runtimeBindings = effectRuntimeBindings(sourceFile);
  const nodes: ts.Node[] = [sourceFile];
  for (const node of nodes) {
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }
  if (
    runtimeBindings.modules.size === 0 &&
    runtimeBindings.namespaces.size === 0 &&
    runtimeBindings.runners.size === 0 &&
    !nodes.some((node) => dynamicRuntimeKind(node) !== undefined)
  ) {
    return false;
  }
  const symbols = sourceSymbols(sourceFile);
  for (const node of nodes) {
    if (
      ts.isIdentifier(node) &&
      runtimeReferenceKind(node, runtimeBindings, symbols) === "runner"
    ) {
      return true;
    }
    if (
      (ts.isPropertyAccessExpression(node) ||
        ts.isElementAccessExpression(node)) &&
      runtimeReferenceKind(node, runtimeBindings, symbols) === "runner"
    ) {
      return true;
    }
  }
  return false;
}
