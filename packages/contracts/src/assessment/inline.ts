import { Array as Arr, Equal, Order, Schema } from "effect";

import { LocalIdSchema } from "#contracts/assessment/identity";
import { LatexSchema } from "#contracts/assessment/scalar";
import { canonicalOrder, hasCanonicalOrder } from "#contracts/canonical";
import { isHttpsUrl } from "#contracts/text/syntax";

/** A mark that carries no attribute: it only changes how its text looks. */
const PlainMarkSchema = Schema.Struct({
  type: Schema.Literals([
    "bold",
    "italic",
    "underline",
    "code",
    "subscript",
    "superscript",
  ]),
});

/**
 * A path on the site that shows the document, such as a lesson: one slash and
 * no whitespace, never two slashes that would name another host.
 */
const SITE_PATH_PATTERN = /^\/(?![/\\])\S*$/u;

/** Checks that a link names an absolute HTTPS address or a path on the site. */
function isLinkTarget(href: string) {
  return isHttpsUrl(href) || SITE_PATH_PATTERN.test(href);
}

/**
 * A link mark: an absolute HTTPS address, or a path on the site, which the
 * renderer resolves on the host that shows the document, so a School host keeps
 * its learners.
 */
const LinkMarkSchema = Schema.Struct({
  attrs: Schema.Struct({
    href: Schema.String.check(
      Schema.makeFilter(isLinkTarget, {
        message:
          "Expected an absolute HTTPS address or a site path, without whitespace.",
      })
    ),
  }),
  type: Schema.Literal("link"),
});

/** One text mark, as ProseMirror writes it: `{ type }` plus `attrs` when it has any. */
export const MarkSchema = Schema.Union([PlainMarkSchema, LinkMarkSchema]);
export type Mark = typeof MarkSchema.Type;

/**
 * The one order of marks on a text node. ProseMirror keeps a mark set in the
 * order of its schema, so an equal set always has one encoding: the plain marks
 * in their written order, then the link.
 */
const MARK_ORDER = Arr.append(
  PlainMarkSchema.fields.type.literals,
  LinkMarkSchema.fields.type.literal
);

/** Orders marks as a text node keeps them. */
export const MarkOrder: Order.Order<Mark> = Order.mapInput(
  canonicalOrder(MARK_ORDER),
  (mark: Mark) => mark.type
);

/** Checks that marks appear once each, in the one canonical order. */
function hasCanonicalMarks(marks: readonly Mark[]) {
  return hasCanonicalOrder(
    MARK_ORDER,
    Arr.map(marks, ({ type }) => type)
  );
}

const MarkSetSchema = Schema.NonEmptyArray(MarkSchema).check(
  Schema.makeFilter(hasCanonicalMarks, {
    message: "Expected each mark once, in the canonical order.",
  })
);

/** A run of text with the same marks. Text is never empty, as in ProseMirror. */
export const TextNodeSchema = Schema.Struct({
  marks: Schema.optionalKey(MarkSetSchema),
  text: Schema.String.check(Schema.isNonEmpty()),
  type: Schema.Literal("text"),
});
export type TextNode = typeof TextNodeSchema.Type;

/** Inline math. The attribute is the LaTeX source, never MathML. */
export const MathInlineNodeSchema = Schema.Struct({
  attrs: Schema.Struct({ latex: LatexSchema }),
  type: Schema.Literal("mathInline"),
});

/** A forced line break inside one paragraph. */
export const HardBreakNodeSchema = Schema.Struct({
  type: Schema.Literal("hardBreak"),
});

/**
 * An interaction that sits inside a line of text: an inline choice, a text
 * entry, a numeric or math entry, or one gap of a gap match. `gap` names the
 * gap of a gap match and is null for every other interaction.
 */
export const InlineInteractionNodeSchema = Schema.Struct({
  attrs: Schema.Struct({
    gap: Schema.NullOr(LocalIdSchema),
    interaction: LocalIdSchema,
  }),
  type: Schema.Literal("inlineInteraction"),
});
export type InlineInteractionNode = typeof InlineInteractionNodeSchema.Type;

/** Every node that can sit inside a paragraph or a heading. */
export const InlineNodeSchema = Schema.Union([
  TextNodeSchema,
  MathInlineNodeSchema,
  HardBreakNodeSchema,
  InlineInteractionNodeSchema,
]);
export type InlineNode = typeof InlineNodeSchema.Type;

/**
 * Checks that two text nodes with the same marks never touch. ProseMirror
 * merges them into one node, so a document that keeps them apart is not the
 * canonical encoding of its text.
 */
function hasMergedRuns(nodes: readonly InlineNode[]) {
  return Arr.every(
    Arr.zip(nodes, Arr.drop(nodes, 1)),
    ([left, right]) =>
      !(
        left.type === "text" &&
        right.type === "text" &&
        Equal.equals(left.marks, right.marks)
      )
  );
}

const MERGED_RUNS_MESSAGE =
  "Expected neighboring text nodes to differ in their marks.";

/** The inline content of one paragraph or heading, in reading order. */
export const InlineContentSchema = Schema.NonEmptyArray(InlineNodeSchema).check(
  Schema.makeFilter(hasMergedRuns, { message: MERGED_RUNS_MESSAGE })
);

/**
 * Short rich text for a label inside a figure or an option: text and inline
 * math only, with no break and no interaction.
 */
export const RichTextSchema = Schema.NonEmptyArray(
  Schema.Union([TextNodeSchema, MathInlineNodeSchema])
).check(Schema.makeFilter(hasMergedRuns, { message: MERGED_RUNS_MESSAGE }));
export type RichText = typeof RichTextSchema.Type;
