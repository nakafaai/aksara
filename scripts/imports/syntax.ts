import {
  type ExportDeclaration,
  type ImportDeclaration,
  isCallExpression,
  isExportDeclaration,
  isExternalModuleReference,
  isIdentifier,
  isImportDeclaration,
  isImportEqualsDeclaration,
  isImportTypeNode,
  isLiteralTypeNode,
  isNamespaceExport,
  isNamespaceImport,
  isStringLiteral,
  isStringLiteralLikeNode,
  type Node,
  type SourceFile,
  type StringLiteralLikeNode,
  SyntaxKind,
} from "typescript/unstable/ast";

/** Returns the statically knowable module specifier owned by one syntax node. */
function staticModuleSpecifier(node: Node): StringLiteralLikeNode | undefined {
  if (
    (isImportDeclaration(node) || isExportDeclaration(node)) &&
    node.moduleSpecifier &&
    isStringLiteral(node.moduleSpecifier)
  ) {
    return node.moduleSpecifier;
  }
  if (
    isImportTypeNode(node) &&
    isLiteralTypeNode(node.argument) &&
    isStringLiteral(node.argument.literal)
  ) {
    return node.argument.literal;
  }
  if (
    isImportEqualsDeclaration(node) &&
    isExternalModuleReference(node.moduleReference) &&
    node.moduleReference.expression &&
    isStringLiteralLikeNode(node.moduleReference.expression)
  ) {
    return node.moduleReference.expression;
  }
  if (!isCallExpression(node)) {
    return;
  }
  const isImportCall = node.expression.kind === SyntaxKind.ImportKeyword;
  const isRequireCall =
    isIdentifier(node.expression) && node.expression.text === "require";
  if (
    !(isImportCall || isRequireCall) ||
    (isImportCall &&
      (node.arguments.length < 1 || node.arguments.length > 2)) ||
    (isRequireCall && node.arguments.length !== 1)
  ) {
    return;
  }
  const [specifier] = node.arguments;
  return specifier && isStringLiteralLikeNode(specifier)
    ? specifier
    : undefined;
}

/** Returns every static or dynamic module specifier in one source module. */
export function moduleSpecifiers(
  sourceFile: SourceFile
): readonly StringLiteralLikeNode[] {
  const specifiers: StringLiteralLikeNode[] = [];
  const nodes: Node[] = [sourceFile];

  for (const node of nodes) {
    const specifier = staticModuleSpecifier(node);
    if (specifier) {
      specifiers.push(specifier);
    }
    node.forEachChild((child) => {
      nodes.push(child);
    });
  }

  return specifiers;
}

/** Returns exposed bindings from one static import declaration. */
function importBindings(
  node: ImportDeclaration,
  moduleName: string,
  exportName: string
): readonly Node[] {
  if (
    !isStringLiteral(node.moduleSpecifier) ||
    node.moduleSpecifier.text !== moduleName
  ) {
    return [];
  }
  const namedBindings = node.importClause?.namedBindings;
  if (!namedBindings) {
    return [];
  }
  if (isNamespaceImport(namedBindings)) {
    return [namedBindings];
  }
  return namedBindings.elements.filter(
    (specifier) =>
      (specifier.propertyName ?? specifier.name).text === exportName
  );
}

/** Returns exposed bindings from one static re-export declaration. */
function exportBindings(
  node: ExportDeclaration,
  moduleName: string,
  exportName: string
): readonly Node[] {
  if (
    !(node.moduleSpecifier && isStringLiteral(node.moduleSpecifier)) ||
    node.moduleSpecifier.text !== moduleName
  ) {
    return [];
  }
  if (!node.exportClause || isNamespaceExport(node.exportClause)) {
    return [node.exportClause ?? node];
  }
  return node.exportClause.elements.filter(
    (specifier) =>
      (specifier.propertyName ?? specifier.name).text === exportName
  );
}

/** Returns exposed bindings from one remaining supported module syntax. */
function nonStaticBindings(
  node: Node,
  moduleName: string,
  exportName: string
): readonly Node[] {
  if (isImportEqualsDeclaration(node) || isCallExpression(node)) {
    return staticModuleSpecifier(node)?.text === moduleName ? [node] : [];
  }
  if (
    isImportTypeNode(node) &&
    staticModuleSpecifier(node)?.text === moduleName &&
    node.qualifier &&
    isIdentifier(node.qualifier) &&
    node.qualifier.text === exportName
  ) {
    return [node.qualifier];
  }
  return [];
}

/** Returns syntax nodes that expose one exact module export. */
export function exposedModuleBindings(
  sourceFile: SourceFile,
  moduleName: string,
  exportName: string
): readonly Node[] {
  const bindings: Node[] = [];
  const nodes: Node[] = [sourceFile];

  for (const node of nodes) {
    bindings.push(
      ...(isImportDeclaration(node)
        ? importBindings(node, moduleName, exportName)
        : []),
      ...(isExportDeclaration(node)
        ? exportBindings(node, moduleName, exportName)
        : []),
      ...nonStaticBindings(node, moduleName, exportName)
    );

    node.forEachChild((child) => {
      nodes.push(child);
    });
  }

  return bindings;
}
