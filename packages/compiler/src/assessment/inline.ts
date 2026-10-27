import {
  type InlineNode,
  type Mark,
  MarkOrder,
  MarkSchema,
  type RichText,
  RichTextSchema,
} from "@nakafa/aksara-contracts/assessment/inline";
import type {
  ContentTreeChild,
  ContentTreeElement,
  ContentTreeValue,
} from "@nakafa/aksara-contracts/tree";
import {
  Array as Arr,
  Effect,
  Equal,
  Option,
  Predicate,
  Record as Rec,
  Schema,
} from "effect";
import { type AssessmentSite, sourceError } from "#compiler/assessment/error";

/** The mark each authored element adds to its text. */
const ELEMENT_MARKS: Readonly<Record<string, Exclude<Mark["type"], "link">>> = {
  code: "code",
  em: "italic",
  strong: "bold",
  sub: "subscript",
  sup: "superscript",
};

/** A soft line break and the indentation around it, which read as one space. */
const SOFT_BREAK = /[ \t]*\n[ \t]*/gu;

/** Adds one mark to a set, once, in the canonical order. */
function withMark(marks: readonly Mark[], mark: Mark) {
  if (Arr.some(marks, ({ type }) => type === mark.type)) {
    return marks;
  }
  return Arr.sort(Arr.append(marks, mark), MarkOrder);
}

/** Builds one text node with its marks, leaving out an empty mark set. */
function textNode(text: string, marks: readonly Mark[]): InlineNode {
  return Arr.isReadonlyArrayNonEmpty(marks)
    ? { marks, text, type: "text" }
    : { text, type: "text" };
}

/** Reads the LaTeX of one math component, which must be a formula. */
function latexOf(element: ContentTreeElement, site: AssessmentSite) {
  const { math } = element.props;
  if (!Predicate.isString(math) || math.trim().length === 0) {
    return Effect.fail(sourceError(site, element.name, "math"));
  }
  return Effect.succeed(math.trim());
}

/** Reads the link mark of one anchor, which must point to an absolute HTTPS address or a site path. */
function linkMark(element: ContentTreeElement, site: AssessmentSite) {
  const mark = { attrs: { href: element.props.href }, type: "link" };
  if (!Schema.is(MarkSchema)(mark)) {
    return Effect.fail(sourceError(site, element.name, "link"));
  }
  return Effect.succeed(mark);
}

/** Converts the inline children of one element under the marks around them. */
function inlineChildren(
  children: readonly ContentTreeChild[],
  marks: readonly Mark[],
  site: AssessmentSite
): Effect.Effect<readonly InlineNode[], ReturnType<typeof sourceError>> {
  return Effect.map(
    Effect.forEach(children, (child) => inlineChild(child, marks, site)),
    Arr.flatten
  );
}

/** Converts one inline child: text, a formula, a break, a link, or a marked run. */
function inlineChild(
  child: ContentTreeChild,
  marks: readonly Mark[],
  site: AssessmentSite
): Effect.Effect<readonly InlineNode[], ReturnType<typeof sourceError>> {
  if (Predicate.isString(child)) {
    return Effect.succeed([textNode(child.replace(SOFT_BREAK, " "), marks)]);
  }
  if (child.name === "InlineMath") {
    return Effect.map(latexOf(child, site), (latex) => [
      { attrs: { latex }, type: "mathInline" },
    ]);
  }
  if (child.name === "br") {
    return Effect.succeed([{ type: "hardBreak" }]);
  }
  if (child.name === "fragment") {
    return inlineChildren(child.children, marks, site);
  }
  if (child.name === "a") {
    return Effect.flatMap(linkMark(child, site), (link) =>
      inlineChildren(child.children, withMark(marks, link), site)
    );
  }
  return Option.match(Rec.get(ELEMENT_MARKS, child.name), {
    onNone: () => Effect.fail(sourceError(site, child.name, "placement")),
    onSome: (type) =>
      inlineChildren(child.children, withMark(marks, { type }), site),
  });
}

/** Checks whether a prop value is an element of the tree rather than JSON data. */
export function isTreeElement(
  value: ContentTreeValue
): value is ContentTreeElement {
  return (
    Predicate.isObject(value) &&
    !Arr.isArray(value) &&
    Predicate.hasProperty(value, "$node")
  );
}

/** Checks whether two neighboring nodes are text runs with the same marks. */
function isSameRun(left: InlineNode, right: InlineNode) {
  return (
    left.type === "text" &&
    right.type === "text" &&
    Equal.equals(left.marks, right.marks)
  );
}

/** Joins neighboring runs with the same marks, as ProseMirror keeps them. */
function mergeRuns(nodes: readonly InlineNode[]) {
  return Arr.reduce(nodes, Arr.empty<InlineNode>(), (merged, node) => {
    const last = Arr.last(merged);
    if (
      Option.isSome(last) &&
      last.value.type === "text" &&
      node.type === "text" &&
      isSameRun(last.value, node)
    ) {
      return Arr.append(
        Arr.dropRight(merged, 1),
        textNode(`${last.value.text}${node.text}`, last.value.marks ?? [])
      );
    }
    return Arr.append(merged, node);
  });
}

/** Checks whether a line starts or ends beside this neighbor: an edge or a break. */
function isLineEdge(neighbor: Option.Option<InlineNode>) {
  return Option.match(neighbor, {
    onNone: () => true,
    onSome: ({ type }) => type === "hardBreak",
  });
}

/** Trims the space a line starts or ends with: at the edges and around each break. */
function trimLines(nodes: readonly InlineNode[]) {
  return Arr.map(nodes, (node, index) => {
    if (node.type !== "text") {
      return node;
    }
    const start = isLineEdge(Arr.get(nodes, index - 1));
    const end = isLineEdge(Arr.get(nodes, index + 1));
    const trimmedStart = start ? node.text.trimStart() : node.text;
    return textNode(
      end ? trimmedStart.trimEnd() : trimmedStart,
      node.marks ?? []
    );
  });
}

/** Leaves out text runs that hold nothing. */
function withoutEmptyRuns(nodes: readonly InlineNode[]) {
  return Arr.filter(nodes, (node) => node.type !== "text" || node.text !== "");
}

/**
 * Converts the children of a paragraph, a heading, or a cell into the inline
 * content of a document: merged runs, trimmed lines, and no empty text.
 */
export const inlineContent = Effect.fn("AksaraCompiler.inlineContent")(
  function* (children: readonly ContentTreeChild[], site: AssessmentSite) {
    const nodes = yield* inlineChildren(children, [], site);
    return mergeRuns(withoutEmptyRuns(trimLines(mergeRuns(nodes))));
  }
);

/**
 * Converts one prop that holds rich text, such as a figure title or a label: a
 * string, or an element of text and formulas.
 */
export const richText = Effect.fn("AksaraCompiler.richText")(function* (
  value: ContentTreeValue,
  element: string,
  site: AssessmentSite
) {
  const children = Predicate.isString(value)
    ? [value]
    : Arr.filter([value], isTreeElement);
  const content = yield* inlineContent(children, site);
  if (!Schema.is(RichTextSchema)(content)) {
    return yield* sourceError(site, element, "props");
  }
  return content satisfies RichText;
});

/** Writes rich text as plain text, each formula as its LaTeX. */
export function plainText(nodes: RichText) {
  return Arr.join(
    Arr.map(nodes, (node) =>
      node.type === "text" ? node.text : node.attrs.latex
    ),
    ""
  ).trim();
}
