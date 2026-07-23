import {
  type QuestionChoices,
  QuestionChoicesSchema,
} from "@nakafa/aksara-contracts/projection/question";
import { Effect, Schema } from "effect";
import ts from "typescript";

/** A choices module contains executable or structurally invalid TypeScript. */
export class QuestionChoiceError extends Schema.TaggedError<QuestionChoiceError>()(
  "QuestionChoiceError",
  {
    sourcePath: Schema.String,
  }
) {}

/** Reads one non-computed property name from a reviewed literal. */
function readPropertyName(name: ts.PropertyName) {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) {
    return name.text;
  }
}

/** Reads a string literal without accepting interpolation or expressions. */
function readStringLiteral(expression: ts.Expression) {
  if (ts.isStringLiteralLike(expression)) {
    return expression.text;
  }
}

/** Reads a boolean keyword without coercing any other expression. */
function readBooleanLiteral(expression: ts.Expression) {
  if (expression.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }
  if (expression.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }
}

/** Reads one exact `{ label, value }` object literal. */
function readChoiceItem(expression: ts.Expression) {
  if (!ts.isObjectLiteralExpression(expression)) {
    return;
  }

  let label: string | undefined;
  let value: boolean | undefined;
  for (const property of expression.properties) {
    if (!ts.isPropertyAssignment(property)) {
      return;
    }
    const name = readPropertyName(property.name);
    if (name === "label" && label === undefined) {
      label = readStringLiteral(property.initializer);
      continue;
    }
    if (name === "value" && value === undefined) {
      value = readBooleanLiteral(property.initializer);
      continue;
    }
    return;
  }

  if (label === undefined || value === undefined) {
    return;
  }
  return { label, value };
}

/** Reads one localized array while rejecting spreads and computed values. */
function readChoiceList(expression: ts.Expression) {
  if (!ts.isArrayLiteralExpression(expression)) {
    return;
  }

  const choices: QuestionChoices["en"] = [];
  for (const element of expression.elements) {
    const choice = readChoiceItem(element);
    if (choice === undefined) {
      return;
    }
    choices.push(choice);
  }
  return choices;
}

/** Reads the exact English and Indonesian choice properties. */
function readChoicesObject(expression: ts.Expression) {
  if (!ts.isObjectLiteralExpression(expression)) {
    return;
  }

  let en: ReturnType<typeof readChoiceList>;
  let id: ReturnType<typeof readChoiceList>;
  for (const property of expression.properties) {
    if (!ts.isPropertyAssignment(property)) {
      return;
    }
    const name = readPropertyName(property.name);
    if (name === "en" && en === undefined) {
      en = readChoiceList(property.initializer);
      continue;
    }
    if (name === "id" && id === undefined) {
      id = readChoiceList(property.initializer);
      continue;
    }
    return;
  }

  if (en === undefined || id === undefined) {
    return;
  }
  return { en, id };
}

/** Confirms the module's sole import is the authoring-only choice type. */
function isChoiceTypeImport(statement: ts.Statement) {
  if (!ts.isImportDeclaration(statement)) {
    return false;
  }
  const clause = statement.importClause;
  const bindings = clause?.namedBindings;
  return (
    clause?.isTypeOnly === true &&
    clause.name === undefined &&
    bindings !== undefined &&
    ts.isNamedImports(bindings) &&
    bindings.elements.length === 1 &&
    bindings.elements[0]?.name.text === "QuestionChoices" &&
    ts.isStringLiteral(statement.moduleSpecifier) &&
    statement.moduleSpecifier.text ===
      "@nakafa/aksara-contracts/projection/question"
  );
}

/** Reads the sole typed `choices` constant from the module. */
function readChoiceDeclaration(statement: ts.Statement) {
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
    declaration.name.text !== "choices" ||
    declaration.initializer === undefined ||
    declaration.type === undefined ||
    !ts.isTypeReferenceNode(declaration.type) ||
    !ts.isIdentifier(declaration.type.typeName) ||
    declaration.type.typeName.text !== "QuestionChoices"
  ) {
    return;
  }
  return readChoicesObject(declaration.initializer);
}

/** Confirms the module exports only the reviewed `choices` constant. */
function isChoiceExport(statement: ts.Statement) {
  return (
    ts.isExportAssignment(statement) &&
    !statement.isExportEquals &&
    ts.isIdentifier(statement.expression) &&
    statement.expression.text === "choices"
  );
}

/**
 * Parses one choices module through the TypeScript AST without evaluating code.
 */
export function decodeQuestionChoiceSource(source: string, sourcePath: string) {
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
    !isChoiceTypeImport(typeImport) ||
    !isChoiceExport(exportAssignment)
  ) {
    return Effect.fail(new QuestionChoiceError({ sourcePath }));
  }

  const input = readChoiceDeclaration(declaration);
  if (input === undefined) {
    return Effect.fail(new QuestionChoiceError({ sourcePath }));
  }

  return Schema.decodeUnknown(QuestionChoicesSchema)(input, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => new QuestionChoiceError({ sourcePath })));
}
