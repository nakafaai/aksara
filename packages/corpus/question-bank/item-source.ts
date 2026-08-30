import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { QuestionItemSchema } from "@nakafa/aksara-contracts/question/item";
import { hasTypeScriptSyntaxError } from "@nakafa/aksara-utilities/typescript/syntax";
import { Effect, Schema } from "effect";
import ts from "typescript";

/** An item module contains executable or structurally invalid TypeScript. */
export class QuestionItemError extends Schema.TaggedError<QuestionItemError>()(
  "QuestionItemError",
  { sourcePath: CorpusSourcePathSchema }
) {}

/** Reads one non-computed property name from a reviewed literal. */
function readPropertyName(name: ts.PropertyName) {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) {
    return name.text;
  }
}

/** Reads one static authoring value without evaluating its module. */
function readStaticValue(expression: ts.Expression): unknown {
  if (ts.isStringLiteralLike(expression)) {
    return expression.text;
  }
  if (expression.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }
  if (expression.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }
  if (ts.isNumericLiteral(expression)) {
    return Number(expression.text);
  }
  if (ts.isArrayLiteralExpression(expression)) {
    const values: unknown[] = [];
    for (const element of expression.elements) {
      const value = readStaticValue(element);
      if (value === undefined) {
        return;
      }
      values.push(value);
    }
    return values;
  }
  if (!ts.isObjectLiteralExpression(expression)) {
    return;
  }

  const values = new Map<string, unknown>();
  for (const property of expression.properties) {
    if (!ts.isPropertyAssignment(property)) {
      return;
    }
    const name = readPropertyName(property.name);
    const value = readStaticValue(property.initializer);
    if (name === undefined || value === undefined || values.has(name)) {
      return;
    }
    values.set(name, value);
  }
  return Object.fromEntries(values);
}

/** Confirms the module's sole import is the authoring-only item type. */
function isItemTypeImport(statement: ts.Statement) {
  if (
    !ts.isImportDeclaration(statement) ||
    statement.attributes !== undefined
  ) {
    return false;
  }

  const clause = statement.importClause;
  if (
    clause === undefined ||
    clause.phaseModifier !== ts.SyntaxKind.TypeKeyword ||
    clause.name !== undefined
  ) {
    return false;
  }

  const bindings = clause.namedBindings;
  if (
    bindings === undefined ||
    !ts.isNamedImports(bindings) ||
    bindings.elements.length !== 1
  ) {
    return false;
  }

  const [binding] = bindings.elements;
  return (
    binding?.propertyName === undefined &&
    binding?.name.text === "QuestionItem" &&
    ts.isStringLiteral(statement.moduleSpecifier) &&
    statement.moduleSpecifier.text === "@nakafa/aksara-contracts/question/item"
  );
}

/** Reads the sole typed `item` constant from the module. */
function readItemDeclaration(statement: ts.Statement) {
  if (
    !ts.isVariableStatement(statement) ||
    statement.declarationList.flags !== ts.NodeFlags.Const ||
    statement.declarationList.declarations.length !== 1
  ) {
    return;
  }
  const [declaration] = statement.declarationList.declarations;
  if (
    declaration === undefined ||
    !ts.isIdentifier(declaration.name) ||
    declaration.name.text !== "item" ||
    declaration.initializer === undefined ||
    declaration.type === undefined ||
    !ts.isTypeReferenceNode(declaration.type) ||
    !ts.isIdentifier(declaration.type.typeName) ||
    declaration.type.typeName.text !== "QuestionItem"
  ) {
    return;
  }
  return readStaticValue(declaration.initializer);
}

/** Confirms the module exports only the reviewed `item` constant. */
function isItemExport(statement: ts.Statement) {
  return (
    ts.isExportAssignment(statement) &&
    !statement.isExportEquals &&
    ts.isIdentifier(statement.expression) &&
    statement.expression.text === "item"
  );
}

/** Parses one item module through the TypeScript AST without evaluating code. */
export const decodeQuestionItemSource = Effect.fn(
  "AksaraCorpus.decodeQuestionItemSource"
)(function* (source: string, sourcePath: typeof CorpusSourcePathSchema.Type) {
  if (hasTypeScriptSyntaxError(source, sourcePath)) {
    return yield* new QuestionItemError({ sourcePath });
  }
  const file = ts.createSourceFile(
    sourcePath,
    source,
    ts.ScriptTarget.ES2022,
    false,
    ts.ScriptKind.TS
  );
  const [typeImport, declaration, exportAssignment] = file.statements;
  if (
    file.statements.length !== 3 ||
    typeImport === undefined ||
    declaration === undefined ||
    exportAssignment === undefined ||
    !isItemTypeImport(typeImport) ||
    !isItemExport(exportAssignment)
  ) {
    return yield* new QuestionItemError({ sourcePath });
  }

  const input = readItemDeclaration(declaration);
  if (input === undefined) {
    return yield* new QuestionItemError({ sourcePath });
  }

  return yield* Schema.decodeUnknownEffect(QuestionItemSchema)(input, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => new QuestionItemError({ sourcePath })));
});
