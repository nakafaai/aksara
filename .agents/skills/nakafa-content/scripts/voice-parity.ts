import { basename, dirname, relative } from "node:path";

import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/voice-mdx";
import {
  isLessonVoiceLocale,
  type LessonVoiceFileIssue,
  type LessonVoiceLocale,
} from "#nakafa-content/voice-types";

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
  const line = node.position?.start?.line ?? 1;
  if (node.type === "heading") {
    const depth =
      "depth" in node && typeof node.depth === "number" ? node.depth : 0;
    return { line, value: `heading:${depth}` };
  }
  if (node.type === "list") {
    const ordered = "ordered" in node && node.ordered === true;
    const itemCount = (node.children ?? []).filter(
      (child) => child.type === "listItem"
    ).length;
    return {
      line,
      value: `list:${ordered ? "ordered" : "unordered"}:${itemCount}`,
    };
  }
  if (node.type === "table") {
    const rows = (node.children ?? []).filter(
      (child) => child.type === "tableRow"
    );
    const columns = Math.max(
      0,
      ...rows.map(
        (row) =>
          (row.children ?? []).filter((child) => child.type === "tableCell")
            .length
      )
    );
    return { line, value: `table:${rows.length}:${columns}` };
  }
  if (node.type === "blockquote" || node.type === "code") {
    return { line, value: node.type };
  }
  if (
    node.type === "mdxJsxFlowElement" &&
    typeof node.name === "string" &&
    node.name !== "InlineMath"
  ) {
    return { line, value: `component:${node.name}` };
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
  const [expectedGroup] = [...signatureGroups.values()].sort(
    (left, right) => right.length - left.length
  );
  if (!expectedGroup || expectedGroup.length <= inventories.length / 2) {
    return;
  }
  const [expected] = expectedGroup;
  return expected;
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
      inventories.find(({ signature }) => signature !== inventory.signature);
    return comparison ? [representationIssue(root, inventory, comparison)] : [];
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

  return issues.sort(
    (left, right) =>
      left.file.localeCompare(right.file) || left.line - right.line
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
