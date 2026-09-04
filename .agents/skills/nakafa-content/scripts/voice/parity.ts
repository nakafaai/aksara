import { basename, dirname, relative } from "node:path";

import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import {
  isLessonVoiceLocale,
  type LessonVoiceFileIssue,
  type LessonVoiceLocale,
} from "#nakafa-content/voice/types";

interface LessonSiblingDocument {
  file: string;
  locale: LessonVoiceLocale;
  source: string;
  tree?: MdxNode;
}

interface RepresentationToken {
  line: number;
  value: string;
}

interface LessonSiblingInventory extends LessonSiblingDocument {
  signature: string;
  tokens: RepresentationToken[];
}

type HeadingNode = Omit<MdxNode, "position" | "type"> & {
  depth: number;
  position: { start: { line: number } };
  type: "heading";
};

type ListNode = Omit<MdxNode, "children" | "position" | "type"> & {
  children: MdxNode[];
  ordered?: boolean;
  position: { start: { line: number } };
  type: "list";
};

type TableNode = Omit<MdxNode, "children" | "position" | "type"> & {
  children: TableRowNode[];
  position: { start: { line: number } };
  type: "table";
};

type TableRowNode = Omit<MdxNode, "children" | "type"> & {
  children: MdxNode[];
  type: "tableRow";
};

type BlockNode = Omit<MdxNode, "position" | "type"> & {
  position: { start: { line: number } };
  type: "blockquote" | "code";
};

type ComponentNode = Omit<MdxNode, "name" | "position" | "type"> & {
  name: string;
  position: { start: { line: number } };
  type: "mdxJsxFlowElement";
};

/** Narrows one parser-owned heading. */
function isHeadingNode(node: MdxNode): node is HeadingNode {
  return node.type === "heading";
}

/** Narrows one parser-owned list. */
function isListNode(node: MdxNode): node is ListNode {
  return node.type === "list";
}

/** Narrows one parser-owned table. */
function isTableNode(node: MdxNode): node is TableNode {
  return node.type === "table";
}

/** Narrows one parser-owned block representation. */
function isBlockNode(node: MdxNode): node is BlockNode {
  return node.type === "blockquote" || node.type === "code";
}

/** Narrows one parser-owned flow component. */
function isComponentNode(node: MdxNode): node is ComponentNode {
  return node.type === "mdxJsxFlowElement" && typeof node.name === "string";
}

/** Groups values by a stable string key without requiring a newer JS lib. */
function groupByKey<Value>(
  values: readonly Value[],
  keyOf: (value: Value) => string
): Map<string, Value[]> {
  const groups = new Map<string, Value[]>();
  for (const value of values) {
    const key = keyOf(value);
    const group = groups.get(key);
    if (group) {
      group.push(value);
    } else {
      groups.set(key, [value]);
    }
  }
  return groups;
}

/** Converts one structural MDX node into its locale-parity token. */
function representationToken(node: MdxNode): RepresentationToken | undefined {
  if (isHeadingNode(node)) {
    return {
      line: node.position.start.line,
      value: `heading:${node.depth}`,
    };
  }
  if (isListNode(node)) {
    return {
      line: node.position.start.line,
      value: `list:${node.ordered === true ? "ordered" : "unordered"}:${node.children.length}`,
    };
  }
  if (isTableNode(node)) {
    const columns = Math.max(
      0,
      ...node.children.map((row) => row.children.length)
    );
    return {
      line: node.position.start.line,
      value: `table:${node.children.length}:${columns}`,
    };
  }
  if (isBlockNode(node)) {
    return {
      line: node.position.start.line,
      value: node.type,
    };
  }
  if (isComponentNode(node) && node.name !== "InlineMath") {
    return {
      line: node.position.start.line,
      value: `component:${node.name}`,
    };
  }
}

/** Returns the learner-facing structural tokens that must match across siblings. */
export function lessonRepresentationTokens(
  tree: MdxNode
): RepresentationToken[] {
  const tokens: RepresentationToken[] = [];

  visitMdxNodes(tree, (node) => {
    const token = representationToken(node);
    if (token) {
      tokens.push(token);
    }
  });

  return tokens;
}

/** Parses one locale sibling and records its teaching-structure signature. */
function lessonSiblingInventory(
  document: LessonSiblingDocument
): LessonSiblingInventory {
  const tree = document.tree ?? parseLessonMdx(document.source, document.file);
  const tokens = lessonRepresentationTokens(tree);
  return {
    ...document,
    signature: JSON.stringify(tokens.map(({ value }) => value)),
    tokens,
  };
}

/** Selects the majority structure when more than half of the siblings agree. */
function majorityInventory(
  inventories: readonly LessonSiblingInventory[]
): LessonSiblingInventory | undefined {
  const signatureGroups = groupByKey(
    inventories,
    (inventory) => inventory.signature
  );
  const expectedGroup = [...signatureGroups.values()].reduce(
    (largest, group) => (group.length > largest.length ? group : largest),
    []
  );
  if (expectedGroup.length <= inventories.length / 2) {
    return;
  }
  return expectedGroup.at(0);
}

/** Finds the first teaching step whose structural tokens differ. */
function firstMismatchIndex(
  inventory: LessonSiblingInventory,
  comparison: LessonSiblingInventory
): number {
  const mismatchIndex = inventory.tokens.findIndex(
    ({ value }, tokenIndex) => value !== comparison.tokens[tokenIndex]?.value
  );
  return mismatchIndex === -1
    ? Math.min(inventory.tokens.length, comparison.tokens.length)
    : mismatchIndex;
}

/** Builds one actionable locale-parity issue at the first mismatch. */
function representationIssue(
  root: string,
  inventory: LessonSiblingInventory,
  comparison: LessonSiblingInventory
): LessonVoiceFileIssue {
  const tokenIndex = firstMismatchIndex(inventory, comparison);
  const found = inventory.tokens[tokenIndex]?.value ?? "end of document";
  const siblingValue =
    comparison.tokens[tokenIndex]?.value ?? "end of document";
  const siblingLocale = basename(comparison.file, ".mdx");
  return {
    column: 1,
    excerpt: `Found ${found}. The ${siblingLocale} sibling has ${siblingValue} at the same teaching step.`,
    file: relative(root, inventory.file),
    line: inventory.tokens[tokenIndex]?.line ?? 1,
    locale: inventory.locale,
    rule: "locale-representation-parity",
  };
}

/** Compares one lesson directory without forcing a winner in a tied pair. */
function siblingGroupIssues(
  root: string,
  siblings: readonly LessonSiblingDocument[]
): LessonVoiceFileIssue[] {
  if (siblings.length < 2) {
    return [];
  }
  const inventories = siblings.map(lessonSiblingInventory);
  const signatureCount = new Set(inventories.map(({ signature }) => signature))
    .size;
  if (signatureCount === 1) {
    return [];
  }
  const expected = majorityInventory(inventories);
  return inventories.flatMap((inventory) => {
    if (expected?.signature === inventory.signature) {
      return [];
    }
    const comparison =
      expected ??
      inventories.reduce(
        (candidate, sibling) =>
          candidate.signature === inventory.signature &&
          sibling.signature !== inventory.signature
            ? sibling
            : candidate,
        inventory
      );
    return [representationIssue(root, inventory, comparison)];
  });
}

/** Finds structural drift inside English, Indonesian, and German sibling sets. */
export function findSiblingRepresentationIssues(
  root: string,
  documents: readonly LessonSiblingDocument[]
): LessonVoiceFileIssue[] {
  const groups = groupByKey(documents, (document) => dirname(document.file));
  const issues: LessonVoiceFileIssue[] = [];

  for (const siblings of groups.values()) {
    issues.push(...siblingGroupIssues(root, siblings));
  }

  return issues.sort((left, right) =>
    `${left.file}\0${left.line.toString().padStart(10, "0")}`.localeCompare(
      `${right.file}\0${right.line.toString().padStart(10, "0")}`
    )
  );
}

/** Creates one parsed document only for supported lesson locale filenames. */
export function lessonSiblingDocument(
  file: string,
  source: string,
  tree?: MdxNode
): LessonSiblingDocument | undefined {
  const locale = basename(file, ".mdx");
  if (!isLessonVoiceLocale(locale)) {
    return;
  }
  if (tree) {
    return { file, locale, source, tree };
  }
  return { file, locale, source };
}
