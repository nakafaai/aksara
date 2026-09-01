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

/** Returns bindings that expose one exact module export. */
export function exposedImports(
  sourceFile: ts.SourceFile,
  moduleName: string,
  importName: string
): readonly (ts.ImportSpecifier | ts.NamespaceImport)[] {
  const imports: (ts.ImportSpecifier | ts.NamespaceImport)[] = [];

  for (const statement of sourceFile.statements) {
    if (
      !(
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier)
      ) ||
      statement.moduleSpecifier.text !== moduleName
    ) {
      continue;
    }
    const bindings = statement.importClause?.namedBindings;
    if (!bindings) {
      continue;
    }
    if (ts.isNamespaceImport(bindings)) {
      imports.push(bindings);
      continue;
    }
    for (const specifier of bindings.elements) {
      if ((specifier.propertyName ?? specifier.name).text === importName) {
        imports.push(specifier);
      }
    }
  }

  return imports;
}
