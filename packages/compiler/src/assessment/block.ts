import type {
  BlockNode,
  ListItemNode,
  ParagraphNode,
  TableCellNode,
  TableRowNode,
} from "@nakafa/aksara-contracts/assessment/document";
import type {
  ContentTreeChild,
  ContentTreeElement,
} from "@nakafa/aksara-contracts/tree";
import { Array as Arr, Effect, Option, Predicate } from "effect";
import {
  type AssessmentSite,
  sourceError,
} from "#compiler/assessment/error";
import { figureNode, isFigure } from "#compiler/assessment/figure";
import { inlineContent } from "#compiler/assessment/inline";

type BlockError = ReturnType<typeof sourceError>;

/** Elements that sit inside a line of text; any other element is a block. */
const INLINE_ELEMENTS = [
  "InlineMath",
  "a",
  "br",
  "code",
  "em",
  "strong",
  "sub",
  "sup",
];

/** Authored heading elements and the document level each one is. */
const HEADING_LEVELS = { h1: 1, h2: 2, h3: 3 } as const;

/** Checks whether a child belongs inside a line of text. */
function isInline(child: ContentTreeChild) {
  return Predicate.isString(child) || Arr.contains(INLINE_ELEMENTS, child.name);
}

/** Checks whether a child is text that holds nothing but space. */
function isBlank(child: ContentTreeChild) {
  return Predicate.isString(child) && child.trim().length === 0;
}

/** Builds one paragraph, leaving out the content of an empty one. */
function paragraph(content: Effect.Success<ReturnType<typeof inlineContent>>) {
  return Arr.isReadonlyArrayNonEmpty(content)
    ? ({ content, type: "paragraph" } satisfies ParagraphNode)
    : ({ type: "paragraph" } satisfies ParagraphNode);
}

/**
 * Splits children into runs: each run of inline children is one paragraph,
 * and each other child stands alone. Space between blocks is left out.
 */
function runsOf(children: readonly ContentTreeChild[]) {
  return Arr.reduce(
    children,
    Arr.empty<readonly ContentTreeChild[]>(),
    (runs, child) => {
      const last = Arr.last(runs);
      if (
        isInline(child) &&
        Option.isSome(last) &&
        Arr.every(last.value, isInline)
      ) {
        return Arr.append(Arr.dropRight(runs, 1), Arr.append(last.value, child));
      }
      return Arr.append(runs, [child]);
    }
  );
}

/** Converts one run: a paragraph of inline children, or one block element. */
function blocksOfRun(
  run: readonly ContentTreeChild[],
  site: AssessmentSite
): Effect.Effect<readonly BlockNode[], BlockError> {
  const [first] = run;
  if (first === undefined || Arr.every(run, isBlank)) {
    return Effect.succeed([]);
  }
  if (Predicate.isString(first) || Arr.every(run, isInline)) {
    return Effect.map(inlineContent(run, site), (content) =>
      Arr.isReadonlyArrayNonEmpty(content) ? [paragraph(content)] : []
    );
  }
  return blockElement(first, site);
}

/** Converts the children of an element into the blocks of a document. */
export function blockChildren(
  children: readonly ContentTreeChild[],
  site: AssessmentSite
): Effect.Effect<readonly BlockNode[], BlockError> {
  return Effect.map(
    Effect.forEach(runsOf(children), (run) => blocksOfRun(run, site)),
    Arr.flatten
  );
}

/** Returns the element children of one element, leaving out the space between them. */
function elementChildren(element: ContentTreeElement) {
  return Arr.filter(
    element.children,
    (child): child is ContentTreeElement => !Predicate.isString(child)
  );
}

/** Converts one list item: it opens with a paragraph, then holds any blocks. */
function listItem(
  element: ContentTreeElement,
  site: AssessmentSite
): Effect.Effect<ListItemNode, BlockError> {
  return Effect.map(blockChildren(element.children, site), (blocks) => {
    const [first, ...rest] = blocks;
    if (first?.type === "paragraph") {
      return { content: [first, ...rest], type: "listItem" };
    }
    return { content: [{ type: "paragraph" }, ...blocks], type: "listItem" };
  });
}

/** Converts the items of one list, refusing a list without one. */
function listItems(element: ContentTreeElement, site: AssessmentSite) {
  return Effect.flatMap(
    Effect.forEach(elementChildren(element), (item) =>
      item.name === "li"
        ? listItem(item, site)
        : Effect.fail(sourceError(site, item.name, "placement"))
    ),
    (items) =>
      Arr.isReadonlyArrayNonEmpty(items)
        ? Effect.succeed(items)
        : Effect.fail(sourceError(site, element.name, "document"))
  );
}

/** Reads the first number of an ordered list, one unless the author set it. */
function listStart(element: ContentTreeElement) {
  const { start } = element.props;
  return Predicate.isNumber(start) && Number.isInteger(start) && start > 0
    ? start
    : 1;
}

/** Converts one table cell: its inline content is one paragraph. */
function tableCell(
  element: ContentTreeElement,
  site: AssessmentSite
): Effect.Effect<TableCellNode, BlockError> {
  if (element.name !== "td" && element.name !== "th") {
    return Effect.fail(sourceError(site, element.name, "placement"));
  }
  const type = element.name === "th" ? "tableHeader" : "tableCell";
  return Effect.map(inlineContent(element.children, site), (content) => ({
    attrs: { colspan: 1, rowspan: 1 },
    content: [paragraph(content)],
    type,
  }));
}

/** Converts one table row, refusing a row without a cell. */
function tableRow(
  element: ContentTreeElement,
  site: AssessmentSite
): Effect.Effect<TableRowNode, BlockError> {
  return Effect.flatMap(
    Effect.forEach(elementChildren(element), (cell) => tableCell(cell, site)),
    (cells) =>
      Arr.isReadonlyArrayNonEmpty(cells)
        ? Effect.succeed({ content: cells, type: "tableRow" })
        : Effect.fail(sourceError(site, element.name, "document"))
  );
}

/** Converts a table: the rows of its head and its body, in order. */
function table(element: ContentTreeElement, site: AssessmentSite) {
  const rows = Arr.flatMap(elementChildren(element), (section) =>
    section.name === "tr" ? [section] : elementChildren(section)
  );
  return Effect.flatMap(
    Effect.forEach(rows, (row) =>
      row.name === "tr"
        ? tableRow(row, site)
        : Effect.fail(sourceError(site, row.name, "placement"))
    ),
    (converted) =>
      Arr.isReadonlyArrayNonEmpty(converted)
        ? Effect.succeed<BlockNode>({ content: converted, type: "table" })
        : Effect.fail(sourceError(site, element.name, "document"))
  );
}

/** Converts one block element into the blocks it stands for. */
function blockElement(
  element: ContentTreeElement,
  site: AssessmentSite
): Effect.Effect<readonly BlockNode[], BlockError> {
  if (element.name === "fragment") {
    return blockChildren(element.children, site);
  }
  if (isFigure(element)) {
    return Effect.map(figureNode(element, site), (figure) => [figure]);
  }
  if (element.name === "p") {
    return Effect.map(inlineContent(element.children, site), (content) =>
      Arr.isReadonlyArrayNonEmpty(content) ? [paragraph(content)] : []
    );
  }
  if (element.name === "h1" || element.name === "h2" || element.name === "h3") {
    const level = HEADING_LEVELS[element.name];
    return Effect.map(inlineContent(element.children, site), (content) => [
      Arr.isReadonlyArrayNonEmpty(content)
        ? { attrs: { level }, content, type: "heading" }
        : { attrs: { level }, type: "heading" },
    ]);
  }
  if (/^h[4-6]$/u.test(element.name)) {
    return Effect.fail(sourceError(site, element.name, "heading"));
  }
  if (element.name === "BlockMath") {
    const { math } = element.props;
    if (!Predicate.isString(math) || math.trim().length === 0) {
      return Effect.fail(sourceError(site, element.name, "math"));
    }
    return Effect.succeed([{ attrs: { latex: math.trim() }, type: "mathBlock" }]);
  }
  if (element.name === "ul") {
    return Effect.map(listItems(element, site), (content) => [
      { content, type: "bulletList" },
    ]);
  }
  if (element.name === "ol") {
    return Effect.map(listItems(element, site), (content) => [
      { attrs: { start: listStart(element) }, content, type: "orderedList" },
    ]);
  }
  if (element.name === "blockquote") {
    return Effect.flatMap(blockChildren(element.children, site), (content) =>
      Arr.isReadonlyArrayNonEmpty(content)
        ? Effect.succeed([{ content, type: "blockquote" }])
        : Effect.fail(sourceError(site, element.name, "document"))
    );
  }
  if (element.name === "table") {
    return Effect.map(table(element, site), (node) => [node]);
  }
  return Effect.fail(sourceError(site, element.name, "element"));
}
