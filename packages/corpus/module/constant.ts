import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import {
  Effect,
  MutableHashMap,
  MutableList,
  Record as Rec,
  Schema,
} from "effect";
import {
  type Expression,
  isArrayLiteralExpression,
  isExportAssignment,
  isIdentifier,
  isImportDeclaration,
  isNamedImports,
  isNumericLiteral,
  isObjectLiteralExpression,
  isPropertyAssignment,
  isStringLiteral,
  isStringLiteralLikeNode,
  isTypeReferenceNode,
  isVariableStatement,
  NodeFlags,
  type PropertyName,
  type SourceFile,
  type Statement,
  SyntaxKind,
} from "tsrs/ast";

/**
 * The shape of one typed data module: it imports only `typeName` from
 * `typeModule`, declares one `const binding: typeName = { ... }` of literals,
 * and default-exports that constant. The compiler checks the literal against
 * its type as it is written, and the corpus reads it without evaluating code.
 */
export const ConstantModuleSchema = Schema.Struct({
  binding: Schema.String,
  typeModule: Schema.String,
  typeName: Schema.String,
});
export type ConstantModule = typeof ConstantModuleSchema.Type;

/** Reads one non-computed property name from a reviewed literal. */
function readPropertyName(name: PropertyName) {
  if (isIdentifier(name) || isStringLiteralLikeNode(name)) {
    return name.text;
  }
}

/** Reads one static authoring value without evaluating its module. */
function readStaticValue(expression: Expression): unknown {
  if (isStringLiteralLikeNode(expression)) {
    return expression.text;
  }
  if (expression.kind === SyntaxKind.TrueKeyword) {
    return true;
  }
  if (expression.kind === SyntaxKind.FalseKeyword) {
    return false;
  }
  if (isNumericLiteral(expression)) {
    return Number(expression.text);
  }
  if (isArrayLiteralExpression(expression)) {
    const values = MutableList.make<unknown>();
    for (const element of expression.elements) {
      const value = readStaticValue(element);
      if (value === undefined) {
        return;
      }
      MutableList.append(values, value);
    }
    return MutableList.toArray(values);
  }
  if (!isObjectLiteralExpression(expression)) {
    return;
  }

  const values = MutableHashMap.empty<string, unknown>();
  for (const property of expression.properties) {
    if (!isPropertyAssignment(property)) {
      return;
    }
    const name = readPropertyName(property.name);
    const value = readStaticValue(property.initializer);
    if (
      name === undefined ||
      value === undefined ||
      MutableHashMap.has(values, name)
    ) {
      return;
    }
    MutableHashMap.set(values, name, value);
  }
  return Rec.fromEntries(values);
}

/** Confirms the module's sole import is its authoring-only type. */
function isTypeImport(statement: Statement, shape: ConstantModule) {
  if (!isImportDeclaration(statement) || statement.attributes !== undefined) {
    return false;
  }

  const clause = statement.importClause;
  if (
    clause === undefined ||
    clause.phaseModifier !== SyntaxKind.TypeKeyword ||
    clause.name !== undefined
  ) {
    return false;
  }

  const bindings = clause.namedBindings;
  if (
    bindings === undefined ||
    !isNamedImports(bindings) ||
    bindings.elements.length !== 1
  ) {
    return false;
  }

  const [binding] = bindings.elements;
  return (
    binding?.propertyName === undefined &&
    binding?.name.text === shape.typeName &&
    isStringLiteral(statement.moduleSpecifier) &&
    statement.moduleSpecifier.text === shape.typeModule
  );
}

/** Reads the sole typed constant from the module. */
function readDeclaration(statement: Statement, shape: ConstantModule) {
  if (
    !isVariableStatement(statement) ||
    statement.declarationList.flags !== NodeFlags.Const ||
    statement.declarationList.declarations.length !== 1
  ) {
    return;
  }
  const [declaration] = statement.declarationList.declarations;
  if (
    declaration === undefined ||
    !isIdentifier(declaration.name) ||
    declaration.name.text !== shape.binding ||
    declaration.initializer === undefined ||
    declaration.type === undefined ||
    !isTypeReferenceNode(declaration.type) ||
    !isIdentifier(declaration.type.typeName) ||
    declaration.type.typeName.text !== shape.typeName
  ) {
    return;
  }
  return readStaticValue(declaration.initializer);
}

/** Confirms the module exports only its typed constant. */
function isConstantExport(statement: Statement, shape: ConstantModule) {
  return (
    isExportAssignment(statement) &&
    !statement.isExportEquals &&
    isIdentifier(statement.expression) &&
    statement.expression.text === shape.binding
  );
}

/** Reads the exact authoring module shape without evaluating its source. */
function readModule(file: SourceFile, shape: ConstantModule) {
  const [typeImport, declaration, exportAssignment] = file.statements;
  if (
    file.statements.length !== 3 ||
    typeImport === undefined ||
    declaration === undefined ||
    exportAssignment === undefined ||
    !isTypeImport(typeImport, shape) ||
    !isConstantExport(exportAssignment, shape)
  ) {
    return;
  }
  return readDeclaration(declaration, shape);
}

/**
 * Reads the literal value of one typed data module through the native AST,
 * without evaluating it, or `undefined` when the module does not have exactly
 * that shape or holds anything but literals. The caller decodes the value with
 * the Schema that owns it.
 */
export const readConstantModule = Effect.fn("AksaraCorpus.readConstantModule")(
  function* (
    shape: ConstantModule,
    input: { readonly fileName: string; readonly source: string }
  ) {
    const parser = yield* TypeScriptParser;
    return yield* parser.inspect(input, ({ diagnostics, sourceFile }) =>
      diagnostics.length === 0 ? readModule(sourceFile, shape) : undefined
    );
  }
);
