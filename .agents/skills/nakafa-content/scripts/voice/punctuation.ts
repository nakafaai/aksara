import {
  asEstreeNode,
  type EstreeNode,
  type MdxAttribute,
  type MdxNode,
  parseLessonMdx,
  staticFieldName,
} from "#nakafa-content/mdx/parse";
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
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

type JsxMdxNode = MdxNode & {
  attributes: MdxAttribute[];
};

type EsmMdxNode = MdxNode & {
  data: { estree: ProgramNode };
  type: "mdxjsEsm";
};

type ObjectExpressionNode = EstreeNode & {
  properties: EstreeNode[];
  type: "ObjectExpression";
};

type ProgramNode = EstreeNode & {
  body: EstreeNode[];
  type: "Program";
};

type PropertyNode = EstreeNode & {
  type: "Property";
  value: EstreeNode;
};

type VariableDeclarationNode = EstreeNode & {
  declarations: EstreeNode[];
  type: "VariableDeclaration";
};

/** Narrows one parser-owned JSX node. */
function isJsxMdxNode(node: MdxNode): node is JsxMdxNode {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}

/** Narrows one parser-owned ESM node. */
function isEsmMdxNode(node: MdxNode): node is EsmMdxNode {
  return node.type === "mdxjsEsm";
}

/** Narrows one parser-owned object expression. */
function isObjectExpressionNode(
  node: EstreeNode | undefined
): node is ObjectExpressionNode {
  return node?.type === "ObjectExpression";
}

/** Narrows one parser-owned program. */
function isProgramNode(node: EstreeNode | undefined): node is ProgramNode {
  return node?.type === "Program";
}

/** Narrows one parser-owned object property. */
function isPropertyNode(node: EstreeNode): node is PropertyNode {
  return node.type === "Property";
}

/** Narrows one parser-owned variable declaration. */
function isVariableDeclarationNode(
  node: EstreeNode | undefined
): node is VariableDeclarationNode {
  return node?.type === "VariableDeclaration";
}

/** Scans the expression returned directly by an MDX expression container. */
function collectMdxExpressionSemicolons(
  estree: EstreeNode | undefined,
  offsets: Set<number>,
  source: string
): void {
  if (!isProgramNode(estree)) {
    return;
  }
  collectStructuredExpressionSemicolons(estree, offsets, source);
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
function metadataObject(estree: ProgramNode): EstreeNode | undefined {
  for (const statement of estree.body) {
    const declaration =
      statement.type === "ExportNamedDeclaration"
        ? asEstreeNode(statement.declaration)
        : statement;
    if (!isVariableDeclarationNode(declaration)) {
      continue;
    }
    for (const declarator of declaration.declarations) {
      if (
        declarator.type === "VariableDeclarator" &&
        staticFieldName(asEstreeNode(declarator.id)) === "metadata"
      ) {
        const initializer = asEstreeNode(declarator.init);
        return isObjectExpressionNode(initializer) ? initializer : undefined;
      }
    }
  }
}

/** Records semicolons in the static authored metadata description. */
function collectMetadataDescriptionSemicolons(
  estree: ProgramNode,
  offsets: Set<number>,
  source: string
): void {
  const metadata = metadataObject(estree);
  if (!isObjectExpressionNode(metadata)) {
    return;
  }
  for (const property of metadata.properties) {
    if (
      !isPropertyNode(property) ||
      staticFieldName(asEstreeNode(property.key)) !== "description"
    ) {
      continue;
    }
    collectStaticStringSemicolons(property.value, offsets, source);
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
  if (isJsxMdxNode(node)) {
    for (const attribute of node.attributes) {
      collectMdxAttributeSemicolons(attribute, offsets, source);
    }
  }
  if (
    (node.type === "mdxFlowExpression" || node.type === "mdxTextExpression") &&
    node.data?.estree
  ) {
    collectMdxExpressionSemicolons(node.data.estree, offsets, source);
  }
  if (isEsmMdxNode(node)) {
    collectMetadataDescriptionSemicolons(node.data.estree, offsets, source);
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
