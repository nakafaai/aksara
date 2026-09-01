import ts from "typescript";

/** Returns the statically knowable module specifier owned by one syntax node. */
function staticModuleSpecifier(
  node: ts.Node
): ts.StringLiteralLike | undefined {
  if (
    (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
    node.moduleSpecifier &&
    ts.isStringLiteral(node.moduleSpecifier)
  ) {
    return node.moduleSpecifier;
  }
  if (
    ts.isImportTypeNode(node) &&
    ts.isLiteralTypeNode(node.argument) &&
    ts.isStringLiteral(node.argument.literal)
  ) {
    return node.argument.literal;
  }
  if (
    ts.isImportEqualsDeclaration(node) &&
    ts.isExternalModuleReference(node.moduleReference) &&
    node.moduleReference.expression &&
    ts.isStringLiteralLike(node.moduleReference.expression)
  ) {
    return node.moduleReference.expression;
  }
  if (!ts.isCallExpression(node)) {
    return;
  }
  const isImportCall = node.expression.kind === ts.SyntaxKind.ImportKeyword;
  const isRequireCall =
    ts.isIdentifier(node.expression) && node.expression.text === "require";
  if (
    !(isImportCall || isRequireCall) ||
    (isImportCall &&
      (node.arguments.length < 1 || node.arguments.length > 2)) ||
    (isRequireCall && node.arguments.length !== 1)
  ) {
    return;
  }
  const [specifier] = node.arguments;
  return specifier && ts.isStringLiteralLike(specifier) ? specifier : undefined;
}

/** Returns every static or dynamic module specifier in one source module. */
export function moduleSpecifiers(
  sourceFile: ts.SourceFile
): readonly ts.StringLiteralLike[] {
  const specifiers: ts.StringLiteralLike[] = [];
  const nodes: ts.Node[] = [sourceFile];

  for (const node of nodes) {
    const specifier = staticModuleSpecifier(node);
    if (specifier) {
      specifiers.push(specifier);
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }

  return specifiers;
}

/** Returns exposed bindings from one static import declaration. */
function importBindings(
  node: ts.ImportDeclaration,
  moduleName: string,
  exportName: string
): readonly ts.Node[] {
  if (
    !ts.isStringLiteral(node.moduleSpecifier) ||
    node.moduleSpecifier.text !== moduleName
  ) {
    return [];
  }
  const namedBindings = node.importClause?.namedBindings;
  if (!namedBindings) {
    return [];
  }
  if (ts.isNamespaceImport(namedBindings)) {
    return [namedBindings];
  }
  return namedBindings.elements.filter(
    (specifier) =>
      (specifier.propertyName ?? specifier.name).text === exportName
  );
}

/** Returns exposed bindings from one static re-export declaration. */
function exportBindings(
  node: ts.ExportDeclaration,
  moduleName: string,
  exportName: string
): readonly ts.Node[] {
  if (
    !(node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) ||
    node.moduleSpecifier.text !== moduleName
  ) {
    return [];
  }
  if (!node.exportClause || ts.isNamespaceExport(node.exportClause)) {
    return [node.exportClause ?? node];
  }
  return node.exportClause.elements.filter(
    (specifier) =>
      (specifier.propertyName ?? specifier.name).text === exportName
  );
}

/** Returns exposed bindings from one remaining supported module syntax. */
function nonStaticBindings(
  node: ts.Node,
  moduleName: string,
  exportName: string
): readonly ts.Node[] {
  if (ts.isImportEqualsDeclaration(node) || ts.isCallExpression(node)) {
    return staticModuleSpecifier(node)?.text === moduleName ? [node] : [];
  }
  if (
    ts.isImportTypeNode(node) &&
    staticModuleSpecifier(node)?.text === moduleName &&
    node.qualifier &&
    ts.isIdentifier(node.qualifier) &&
    node.qualifier.text === exportName
  ) {
    return [node.qualifier];
  }
  return [];
}

/** Returns syntax nodes that expose one exact module export. */
export function exposedModuleBindings(
  sourceFile: ts.SourceFile,
  moduleName: string,
  exportName: string
): readonly ts.Node[] {
  const bindings: ts.Node[] = [];
  const nodes: ts.Node[] = [sourceFile];

  for (const node of nodes) {
    bindings.push(
      ...(ts.isImportDeclaration(node)
        ? importBindings(node, moduleName, exportName)
        : []),
      ...(ts.isExportDeclaration(node)
        ? exportBindings(node, moduleName, exportName)
        : []),
      ...nonStaticBindings(node, moduleName, exportName)
    );

    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }

  return bindings;
}
