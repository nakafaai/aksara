import {
  collectStaticStringSemicolons,
  collectStructuredExpressionSemicolons,
  isCodeComponentName,
  isNonProseFieldName,
} from "#nakafa-content/semicolon/expression";
import {
  addSemicolonsInRange,
  addStaticMarkdownFieldSemicolons,
  semicolonIssueAtOffset,
} from "#nakafa-content/semicolon/source";
import {
  asEstreeNode,
  type EstreeNode,
  type MdxAttribute,
  type MdxNode,
  parseLessonMdx,
  staticFieldName,
} from "#nakafa-content/voice-mdx";
import type { LessonVoiceIssue } from "#nakafa-content/voice-types";

/** Scans the expression returned directly by an MDX expression container. */
function collectMdxExpressionSemicolons(
  estree: EstreeNode | undefined,
  offsets: Set<number>,
  source: string
): void {
  if (estree?.type !== "Program" || !Array.isArray(estree.body)) {
    return;
  }
  for (const statement of estree.body) {
    const statementNode = asEstreeNode(statement);
    if (statementNode?.type !== "ExpressionStatement") {
      continue;
    }
    const expression = asEstreeNode(statementNode.expression);
    if (expression) {
      collectStructuredExpressionSemicolons(expression, offsets, source);
    }
  }
}

/** Reads the ESTree program stored by an MDX expression attribute. */
function attributeExpression(attribute: MdxAttribute): EstreeNode | undefined {
  const { value } = attribute;
  if (
    !value ||
    typeof value !== "object" ||
    !("data" in value) ||
    !value.data ||
    typeof value.data !== "object" ||
    !("estree" in value.data)
  ) {
    return;
  }
  return asEstreeNode(value.data.estree);
}

/** Scans one authored MDX attribute using its exact source range. */
function collectMdxAttributeSemicolons(
  attribute: MdxAttribute,
  offsets: Set<number>,
  source: string
): void {
  const { name } = attribute;
  if (isNonProseFieldName(name)) {
    return;
  }
  if (typeof attribute.value === "string") {
    addSemicolonsInRange(offsets, source, attribute.position, {
      allowLatexSpacing: name === "math",
    });
    return;
  }
  const expression = attributeExpression(attribute);
  if (name === "math" && expression) {
    collectStaticStringSemicolons(expression, offsets, source, {
      allowLatexSpacing: true,
    });
  } else {
    collectMdxExpressionSemicolons(expression, offsets, source);
  }
}

/** Finds the exported metadata object in one ESM program. */
function metadataObject(
  estree: EstreeNode | undefined
): EstreeNode | undefined {
  if (estree?.type !== "Program" || !Array.isArray(estree.body)) {
    return;
  }
  for (const statement of estree.body) {
    const statementNode = asEstreeNode(statement);
    const declaration =
      statementNode?.type === "ExportNamedDeclaration"
        ? asEstreeNode(statementNode.declaration)
        : statementNode;
    if (declaration?.type !== "VariableDeclaration") {
      continue;
    }
    for (const declarator of Array.isArray(declaration.declarations)
      ? declaration.declarations
      : []) {
      const declaratorNode = asEstreeNode(declarator);
      if (
        declaratorNode?.type === "VariableDeclarator" &&
        staticFieldName(asEstreeNode(declaratorNode.id)) === "metadata"
      ) {
        const initializer = asEstreeNode(declaratorNode.init);
        return initializer?.type === "ObjectExpression"
          ? initializer
          : undefined;
      }
    }
  }
}

/** Records semicolons in the static authored metadata description. */
function collectMetadataDescriptionSemicolons(
  estree: EstreeNode | undefined,
  offsets: Set<number>,
  source: string
): void {
  const metadata = metadataObject(estree);
  if (!(metadata && Array.isArray(metadata.properties))) {
    return;
  }
  for (const property of metadata.properties) {
    const propertyNode = asEstreeNode(property);
    if (
      propertyNode?.type !== "Property" ||
      staticFieldName(asEstreeNode(propertyNode.key)) !== "description"
    ) {
      continue;
    }
    const value = asEstreeNode(propertyNode.value);
    if (value) {
      collectStaticStringSemicolons(value, offsets, source);
    }
  }
}

/** Scans learner-visible Markdown link and image fields. */
function collectMarkdownFieldSemicolons(
  node: MdxNode,
  offsets: Set<number>,
  source: string
): void {
  if (node.type === "image") {
    addStaticMarkdownFieldSemicolons(offsets, source, node.position, node.alt);
    addStaticMarkdownFieldSemicolons(
      offsets,
      source,
      node.position,
      node.title
    );
  } else if (node.type === "link") {
    addStaticMarkdownFieldSemicolons(
      offsets,
      source,
      node.position,
      node.title
    );
  }
}

/** Traverses parsed MDX and records every learner-visible semicolon. */
function collectNodeSemicolons(
  node: MdxNode,
  offsets: Set<number>,
  source: string
): void {
  if (
    node.type === "blockquote" ||
    node.type === "code" ||
    node.type === "inlineCode" ||
    ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
      isCodeComponentName(node.name))
  ) {
    return;
  }
  if (node.type === "text" && typeof node.value === "string") {
    addSemicolonsInRange(offsets, source, node.position);
  }
  collectMarkdownFieldSemicolons(node, offsets, source);
  if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
    for (const attribute of node.attributes ?? []) {
      collectMdxAttributeSemicolons(attribute, offsets, source);
    }
  }
  if (
    (node.type === "mdxFlowExpression" || node.type === "mdxTextExpression") &&
    node.data?.estree
  ) {
    collectMdxExpressionSemicolons(node.data.estree, offsets, source);
  }
  if (node.type === "mdxjsEsm") {
    collectMetadataDescriptionSemicolons(node.data?.estree, offsets, source);
  }
  for (const child of node.children ?? []) {
    collectNodeSemicolons(child, offsets, source);
  }
}

/** Finds learner-visible semicolons while preserving code and LaTeX spacing. */
export function findLearnerFacingSemicolonIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const offsets = new Set<number>();
  collectNodeSemicolons(tree, offsets, source);
  return [...offsets]
    .sort((left, right) => left - right)
    .map((offset) => semicolonIssueAtOffset(source, offset));
}
