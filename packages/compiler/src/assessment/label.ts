import { ContentDocumentSchema } from "@nakafa/aksara-contracts/assessment/document";
import type {
  ContentTreeChild,
  ContentTreeElement,
} from "@nakafa/aksara-contracts/tree";
import { Array as Arr, Effect, Schema } from "effect";
import type { Nodes, Parents } from "mdast";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { blockChildren } from "#compiler/assessment/block";
import { type AssessmentSite, sourceError } from "#compiler/assessment/error";

const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath, { singleDollarTextMath: false })
  .freeze();

/** The element each Markdown parent is, holding its converted children. */
const ELEMENT_NAMES = {
  blockquote: "blockquote",
  emphasis: "em",
  listItem: "li",
  paragraph: "p",
  strong: "strong",
} as const;

/** Builds one element of the tree. */
function element(
  name: string,
  props: ContentTreeElement["props"],
  children: readonly ContentTreeChild[]
): ContentTreeElement {
  return { $node: "element", children, name, props };
}

/** Converts the children of one Markdown parent. */
function childrenOf(node: Parents): readonly ContentTreeChild[] {
  return Arr.flatMap(node.children, treeChild);
}

/** Converts one table row, whose cells are header cells in the first row. */
function tableRows(node: Extract<Nodes, { type: "table" }>) {
  return Arr.map(node.children, (row, index) =>
    element(
      "tr",
      {},
      Arr.map(row.children, (cell) =>
        element(index === 0 ? "th" : "td", {}, childrenOf(cell))
      )
    )
  );
}

/**
 * Converts one Markdown node into the element tree that an evaluated MDX
 * document would hold, so labels and documents share one converter.
 */
function treeChild(node: Nodes): readonly ContentTreeChild[] {
  if (node.type === "text") {
    return [node.value];
  }
  if (node.type === "inlineMath") {
    return [element("InlineMath", { math: node.value }, [])];
  }
  if (node.type === "math") {
    return [element("BlockMath", { math: node.value }, [])];
  }
  if (node.type === "inlineCode") {
    return [element("code", {}, [node.value])];
  }
  if (node.type === "break") {
    return [element("br", {}, [])];
  }
  if (node.type === "link") {
    return [element("a", { href: node.url }, childrenOf(node))];
  }
  if (node.type === "list") {
    const name = node.ordered === true ? "ol" : "ul";
    return [element(name, { start: node.start ?? 1 }, childrenOf(node))];
  }
  if (node.type === "table") {
    return [element("table", {}, tableRows(node))];
  }
  if (
    node.type === "blockquote" ||
    node.type === "emphasis" ||
    node.type === "listItem" ||
    node.type === "paragraph" ||
    node.type === "strong"
  ) {
    return [element(ELEMENT_NAMES[node.type], {}, childrenOf(node))];
  }
  return [element(node.type, {}, [])];
}

/**
 * Converts one authored Markdown label, such as the text of an option, into a
 * document that places no interaction. Inline math is written `$$x$$`.
 */
export const labelDocument = Effect.fn("AksaraCompiler.labelDocument")(
  function* (label: string, site: AssessmentSite) {
    const root = markdown.parse(label);
    const content = yield* blockChildren(childrenOf(root), site);
    return yield* Schema.decodeEffect(ContentDocumentSchema)(
      { content, type: "doc" },
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError((cause) => sourceError(site, "label", "document", cause))
    );
  }
);
