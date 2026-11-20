import type {
  InlineNode,
  Mark,
  RichText,
} from "@nakafa/aksara-contracts/assessment/inline";
import {
  MarkOrder,
  MarkSchema,
  RichTextSchema,
} from "@nakafa/aksara-contracts/assessment/inline";
import type {
  ContentTreeChild,
  ContentTreeElement,
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
import type { BlockSite, Field } from "#compiler/assessment/error";
import { InlineError, sourceError } from "#compiler/assessment/error";
import { FIELD_COMPONENT, inlineField } from "#compiler/assessment/field";

/** The mark each authored element adds to its text. */
const ELEMENT_MARKS: Readonly<
  Record<string, Exclude<Mark["type"], "highlight" | "link">>
> = {
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
function latexOf(element: ContentTreeElement) {
  const { math } = element.props;
  if (!Predicate.isString(math) || math.trim().length === 0) {
    return Effect.fail(
      new InlineError({ element: element.name, reason: "math" })
    );
  }
  return Effect.succeed(math.trim());
}

/** Reads the mark of one element whose props become its attributes: a link or a highlight. */
function attributeMark(
  element: ContentTreeElement,
  mark: unknown,
  reason: "link" | "props"
) {
  if (!Schema.is(MarkSchema)(mark)) {
    return Effect.fail(new InlineError({ element: element.name, reason }));
  }
  return Effect.succeed(mark);
}

/** Reads the link mark of one anchor, which must point to an absolute HTTPS address or a site path. */
function linkMark(element: ContentTreeElement) {
  const mark = { attrs: { href: element.props.href }, type: "link" };
  return attributeMark(element, mark, "link");
}

/** Reads the highlight mark of one `Highlight`, in the tone its author set or none. */
function highlightMark(element: ContentTreeElement) {
  const { variant = null, ...rest } = element.props;
  const mark = Rec.isEmptyRecord(rest)
    ? { attrs: { variant }, type: "highlight" }
    : undefined;
  return attributeMark(element, mark, "props");
}

/**
 * Converts the inline children of one element under the marks around them,
 * with the fields their line may place.
 */
function inlineChildren(
  children: readonly ContentTreeChild[],
  marks: readonly Mark[],
  fields: readonly Field[]
): Effect.Effect<readonly InlineNode[], InlineError> {
  return Effect.map(
    Effect.forEach(children, (child) => inlineChild(child, marks, fields)),
    Arr.flatten
  );
}

/** Converts the children of one element under the mark it adds. */
function markedChildren(
  element: ContentTreeElement,
  marks: readonly Mark[],
  mark: Effect.Effect<Mark, InlineError>,
  fields: readonly Field[]
) {
  return Effect.flatMap(mark, (added) =>
    inlineChildren(element.children, withMark(marks, added), fields)
  );
}

/**
 * Converts one inline child: text, a formula, a break, a field, a link, or a
 * marked run.
 */
function inlineChild(
  child: ContentTreeChild,
  marks: readonly Mark[],
  fields: readonly Field[]
): Effect.Effect<readonly InlineNode[], InlineError> {
  if (Predicate.isString(child)) {
    return Effect.succeed([textNode(child.replace(SOFT_BREAK, " "), marks)]);
  }
  if (child.name === "InlineMath") {
    return Effect.map(latexOf(child), (latex) => [
      { attrs: { latex }, type: "mathInline" },
    ]);
  }
  if (child.name === "br") {
    return Effect.succeed([{ type: "hardBreak" }]);
  }
  if (child.name === FIELD_COMPONENT) {
    return Effect.map(inlineField(child, fields), (node) => [node]);
  }
  if (child.name === "fragment") {
    return inlineChildren(child.children, marks, fields);
  }
  if (child.name === "a") {
    return markedChildren(child, marks, linkMark(child), fields);
  }
  if (child.name === "Highlight") {
    return markedChildren(child, marks, highlightMark(child), fields);
  }
  return Option.match(Rec.get(ELEMENT_MARKS, child.name), {
    onNone: () =>
      Effect.fail(
        new InlineError({ element: child.name, reason: "placement" })
      ),
    onSome: (type) =>
      inlineChildren(child.children, withMark(marks, { type }), fields),
  });
}

/** Checks whether a prop value is an element of the tree rather than JSON data. */
export function isTreeElement(value: unknown): value is ContentTreeElement {
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
 * Converts inline children into merged runs, trimmed lines, and no empty
 * text, placing the given fields.
 */
function inlineNodes(
  children: readonly ContentTreeChild[],
  fields: readonly Field[]
) {
  return Effect.map(inlineChildren(children, [], fields), (nodes) =>
    mergeRuns(withoutEmptyRuns(trimLines(mergeRuns(nodes))))
  );
}

/**
 * Converts the children of a paragraph, a heading, or a cell into the inline
 * content of a document: merged runs, trimmed lines, no empty text, and the
 * fields its site may place.
 */
export const inlineContent = Effect.fn("AksaraCompiler.inlineContent")(
  (children: readonly ContentTreeChild[], site: BlockSite) =>
    inlineNodes(children, site.fields).pipe(
      Effect.mapError(({ element, reason }) =>
        sourceError(site, element, reason)
      )
    )
);

/**
 * Converts one prop that holds rich text, such as a figure title or a label: a
 * string, or an element of text and formulas. Rich text holds no break and no
 * interaction, so a prop that needs one is refused.
 */
export const treeRichText = Effect.fn("AksaraCompiler.treeRichText")(function* (
  value: unknown
) {
  const children = Predicate.isString(value)
    ? [value]
    : Arr.filter([value], isTreeElement);
  const content = yield* inlineNodes(children, []);
  if (!Schema.is(RichTextSchema)(content)) {
    return yield* new InlineError({ element: "rich text", reason: "props" });
  }
  const rich: RichText = content;
  return rich;
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
