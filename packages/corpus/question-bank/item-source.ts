import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { QuestionItemSchema } from "@nakafa/aksara-contracts/question/item";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect, Schema } from "effect";
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
} from "typescript/unstable/ast";

/** An item module contains executable or structurally invalid TypeScript. */
export class QuestionItemError extends Schema.TaggedError<QuestionItemError>()(
  "QuestionItemError",
  { sourcePath: CorpusSourcePathSchema }
) {}

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
  if (!isObjectLiteralExpression(expression)) {
    return;
  }

  const values = new Map<string, unknown>();
  for (const property of expression.properties) {
    if (!isPropertyAssignment(property)) {
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
function isItemTypeImport(statement: Statement) {
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
    binding?.name.text === "QuestionItem" &&
    isStringLiteral(statement.moduleSpecifier) &&
    statement.moduleSpecifier.text === "@nakafa/aksara-contracts/question/item"
  );
}

/** Reads the sole typed `item` constant from the module. */
function readItemDeclaration(statement: Statement) {
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
    declaration.name.text !== "item" ||
    declaration.initializer === undefined ||
    declaration.type === undefined ||
    !isTypeReferenceNode(declaration.type) ||
    !isIdentifier(declaration.type.typeName) ||
    declaration.type.typeName.text !== "QuestionItem"
  ) {
    return;
  }
  return readStaticValue(declaration.initializer);
}

/** Confirms the module exports only the reviewed `item` constant. */
function isItemExport(statement: Statement) {
  return (
    isExportAssignment(statement) &&
    !statement.isExportEquals &&
    isIdentifier(statement.expression) &&
    statement.expression.text === "item"
  );
}

/** Reads the exact authoring module shape without evaluating its source. */
function readItemModule(file: SourceFile) {
  const [typeImport, declaration, exportAssignment] = file.statements;
  if (
    file.statements.length !== 3 ||
    typeImport === undefined ||
    declaration === undefined ||
    exportAssignment === undefined ||
    !isItemTypeImport(typeImport) ||
    !isItemExport(exportAssignment)
  ) {
    return;
  }
  return readItemDeclaration(declaration);
}

/** Parses one item module through the native AST without evaluating code. */
export const decodeQuestionItemSource = Effect.fn(
  "AksaraCorpus.decodeQuestionItemSource"
)(function* (source: string, sourcePath: typeof CorpusSourcePathSchema.Type) {
  const parser = yield* TypeScriptParser;
  const input = yield* parser.inspect(
    { fileName: sourcePath, source },
    ({ diagnostics, sourceFile }) =>
      diagnostics.length === 0 ? readItemModule(sourceFile) : undefined
  );
  if (input === undefined) {
    return yield* new QuestionItemError({ sourcePath });
  }

  return yield* Schema.decodeUnknownEffect(QuestionItemSchema)(input, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => new QuestionItemError({ sourcePath })));
});
