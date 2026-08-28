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

/** Extracts a statically named property or element access. */
function staticMember(node: ts.Expression) {
  const expression = transparentExpression(node);
  if (ts.isPropertyAccessExpression(expression)) {
    return { name: expression.name.text, receiver: expression.expression };
  }
  if (
    !ts.isElementAccessExpression(expression) ||
    expression.argumentExpression === undefined ||
    !(
      ts.isStringLiteral(expression.argumentExpression) ||
      ts.isNoSubstitutionTemplateLiteral(expression.argumentExpression)
    )
  ) {
    return;
  }
  return {
    name: expression.argumentExpression.text,
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
    [bindings.pipes, "pipe"],
    [bindings.runners, "runner"],
  ] as const;
  for (const [runtimeBindings, kind] of candidates) {
    const binding = runtimeBindings.get(identifier.text);
    if (binding !== undefined && symbols.matchesBinding(identifier, binding)) {
      return kind;
    }
  }
}

/** Maps a statically named member from its Effect runtime source. */
function runtimeMemberKind(
  sourceKind: RuntimeKind | undefined,
  memberName: string
): RuntimeKind | undefined {
  if (sourceKind === "module") {
    if (memberName === "Effect") {
      return "namespace";
    }
    if (memberName === "pipe") {
      return "pipe";
    }
  }
  return sourceKind === "namespace" && EFFECT_RUNNERS.has(memberName)
    ? "runner"
    : undefined;
}

/** Reads a statically named binding property without guessing dynamic keys. */
function staticBindingProperty(binding: ts.BindingElement) {
  const property = binding.propertyName ?? binding.name;
  if (!ts.isComputedPropertyName(property)) {
    return ts.isIdentifier(property) || ts.isStringLiteral(property)
      ? property.text
      : undefined;
  }
  const expression = transparentExpression(property.expression);
  return ts.isStringLiteral(expression) ||
    ts.isNoSubstitutionTemplateLiteral(expression)
    ? expression.text
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
  return ts.isBindingElement(owner)
    ? destructuredRuntimeKind(owner, bindings, symbols, seenSymbols)
    : undefined;
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
  const property = staticBindingProperty(binding);
  return property === undefined
    ? undefined
    : runtimeMemberKind(sourceKind, property);
}

/** Traces each local runtime origin at most once per reference. */
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
    const member = staticMember(reference);
    if (member === undefined) {
      return;
    }
    const receiverKind = runtimeReferenceKind(
      member.receiver,
      bindings,
      symbols,
      seenSymbols
    );
    return runtimeMemberKind(receiverKind, member.name);
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
  }
  seenSymbols.delete(symbol);
  return resolvedKind;
}

/** Checks whether one call executes an imported Effect runtime runner. */
function isEffectRunner(
  node: ts.Node,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols
) {
  if (!ts.isCallExpression(node)) {
    return false;
  }
  const calleeKind = runtimeReferenceKind(node.expression, bindings, symbols);
  if (calleeKind === "runner") {
    return true;
  }
  const callee = staticMember(node.expression);
  return (
    (calleeKind === "pipe" || callee?.name === "pipe") &&
    node.arguments.some(
      (argument) =>
        runtimeReferenceKind(argument, bindings, symbols) === "runner"
    )
  );
}

/** Reports whether authored test code executes an Effect runtime runner. */
export function hasExecutedEffectRunner(sourceFile: ts.SourceFile) {
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
    runtimeBindings.pipes.size === 0 &&
    runtimeBindings.runners.size === 0 &&
    !nodes.some((node) => dynamicRuntimeKind(node) !== undefined)
  ) {
    return false;
  }
  const symbols = sourceSymbols(sourceFile);
  for (const node of nodes) {
    if (isEffectRunner(node, runtimeBindings, symbols)) {
      return true;
    }
  }
  return false;
}
