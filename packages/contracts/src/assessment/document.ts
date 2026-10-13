import { Array as Arr, Schema } from "effect";

import { FigureNodeSchema, ImageSchema } from "#contracts/assessment/figure";
import { LocalIdSchema } from "#contracts/assessment/identity";
import {
  InlineContentSchema,
  type InlineInteractionNode,
  type InlineNode,
} from "#contracts/assessment/inline";
import {
  LatexSchema,
  PlainTextSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";
import { encodeJsonText } from "#contracts/text/json";

/**
 * Deepest nesting a document may have, counting `doc` as level 1 and a text
 * node as a level. Sixteen is the nesting that Convex allows in one stored
 * document (https://docs.convex.dev/production/state/limits, read 13 October
 * 2026), and this contract applies the same number to levels of nodes. A node
 * is an object that holds an array, so Convex counts about two of its levels
 * for each level here: a document this deep is stored as encoded JSON text and
 * not as a Convex object.
 */
export const MAX_DOCUMENT_DEPTH = 16;

/**
 * Largest encoded document in UTF-8 bytes: 1 MiB, the size that Convex allows
 * for one stored document (same page, read 13 October 2026). That limit covers
 * the whole stored document, so a store that adds fields around the text keeps
 * its own, lower ceiling.
 */
export const MAX_DOCUMENT_BYTES = 1024 * 1024;

const ParagraphSchema = Schema.Struct({
  content: Schema.optionalKey(InlineContentSchema),
  type: Schema.Literal("paragraph"),
});
export type ParagraphNode = typeof ParagraphSchema.Type;

const HeadingSchema = Schema.Struct({
  attrs: Schema.Struct({ level: Schema.Literals([1, 2, 3]) }),
  content: Schema.optionalKey(InlineContentSchema),
  type: Schema.Literal("heading"),
});

/** Code is one run of plain text: a code block allows no marks. */
const CodeBlockSchema = Schema.Struct({
  attrs: Schema.Struct({ language: Schema.NullOr(PlainTextSchema) }),
  content: Schema.optionalKey(
    Schema.Tuple([
      Schema.Struct({
        text: Schema.String.check(Schema.isNonEmpty()),
        type: Schema.Literal("text"),
      }),
    ])
  ),
  type: Schema.Literal("codeBlock"),
});

const MathBlockSchema = Schema.Struct({
  attrs: Schema.Struct({ latex: LatexSchema }),
  type: Schema.Literal("mathBlock"),
});

const ImageNodeSchema = Schema.Struct({
  attrs: ImageSchema,
  type: Schema.Literal("image"),
});

/**
 * The place of an interaction as a block of its own. The attribute names an
 * interaction of the same item version.
 */
const InteractionNodeSchema = Schema.Struct({
  attrs: Schema.Struct({ interaction: LocalIdSchema }),
  type: Schema.Literal("interaction"),
});
export type InteractionNode = typeof InteractionNodeSchema.Type;

/**
 * Every block a document can hold. The blocks that hold blocks are written
 * out here, because a recursive schema needs its type named in its own
 * definition; every other node type is derived from its schema.
 */
export type BlockNode =
  | ParagraphNode
  | typeof HeadingSchema.Type
  | typeof CodeBlockSchema.Type
  | typeof MathBlockSchema.Type
  | typeof FigureNodeSchema.Type
  | typeof ImageNodeSchema.Type
  | InteractionNode
  | {
      readonly content: readonly [ListItemNode, ...ListItemNode[]];
      readonly type: "bulletList";
    }
  | {
      readonly attrs: { readonly start: number };
      readonly content: readonly [ListItemNode, ...ListItemNode[]];
      readonly type: "orderedList";
    }
  | {
      readonly content: readonly [BlockNode, ...BlockNode[]];
      readonly type: "blockquote";
    }
  | {
      readonly content: readonly [TableRowNode, ...TableRowNode[]];
      readonly type: "table";
    };
export type BulletListNode = Extract<
  BlockNode,
  { readonly type: "bulletList" }
>;
export type OrderedListNode = Extract<
  BlockNode,
  { readonly type: "orderedList" }
>;
export type BlockquoteNode = Extract<
  BlockNode,
  { readonly type: "blockquote" }
>;
export type TableNode = Extract<BlockNode, { readonly type: "table" }>;
export type ListItemNode = typeof ListItemSchema.Type;
export type TableRowNode = typeof TableRowSchema.Type;
export type TableCellNode = typeof TableCellSchema.Type;

const BlockRef = Schema.suspend((): Schema.Codec<BlockNode> => BlockSchema);

/** A list item opens with a paragraph, then holds any blocks, as in Tiptap. */
const ListItemSchema = Schema.Struct({
  content: Schema.TupleWithRest(Schema.Tuple([ParagraphSchema]), [BlockRef]),
  type: Schema.Literal("listItem"),
});

const BulletListSchema = Schema.Struct({
  content: Schema.NonEmptyArray(ListItemSchema),
  type: Schema.Literal("bulletList"),
});

const OrderedListSchema = Schema.Struct({
  attrs: Schema.Struct({ start: PositiveIntSchema }),
  content: Schema.NonEmptyArray(ListItemSchema),
  type: Schema.Literal("orderedList"),
});

const BlockquoteSchema = Schema.Struct({
  content: Schema.NonEmptyArray(BlockRef),
  type: Schema.Literal("blockquote"),
});

/** A header cell and a body cell differ only in their type. */
const TableCellSchema = Schema.Struct({
  attrs: Schema.Struct({
    colspan: PositiveIntSchema,
    rowspan: PositiveIntSchema,
  }),
  content: Schema.NonEmptyArray(BlockRef),
  type: Schema.Literals(["tableCell", "tableHeader"]),
});

const TableRowSchema = Schema.Struct({
  content: Schema.NonEmptyArray(TableCellSchema),
  type: Schema.Literal("tableRow"),
});

const TableSchema = Schema.Struct({
  content: Schema.NonEmptyArray(TableRowSchema),
  type: Schema.Literal("table"),
});

/** One block of a document. */
export const BlockSchema: Schema.Codec<BlockNode> = Schema.Union([
  ParagraphSchema,
  HeadingSchema,
  CodeBlockSchema,
  MathBlockSchema,
  FigureNodeSchema,
  ImageNodeSchema,
  InteractionNodeSchema,
  BulletListSchema,
  OrderedListSchema,
  BlockquoteSchema,
  TableSchema,
]);

/** Every node of a document, whatever its level. */
export type DocumentNode =
  | typeof DocumentRootSchema.Type
  | BlockNode
  | ListItemNode
  | TableRowNode
  | TableCellNode
  | InlineNode;

const DocumentRootSchema = Schema.Struct({
  content: Schema.NonEmptyArray(BlockSchema),
  type: Schema.Literal("doc"),
});

/** Returns the child nodes of one node, in reading order. */
function childrenOf(node: DocumentNode): readonly DocumentNode[] {
  return "content" in node && node.content !== undefined ? node.content : [];
}

/** Counts the levels from one node down to its deepest descendant. */
function levelsOf(node: DocumentNode): number {
  return (
    1 +
    Arr.reduce(childrenOf(node), 0, (deepest, child) =>
      Math.max(deepest, levelsOf(child))
    )
  );
}

/** Checks that a document is no deeper than `MAX_DOCUMENT_DEPTH`. */
function hasLimitedDepth(document: DocumentNode) {
  return levelsOf(document) <= MAX_DOCUMENT_DEPTH;
}

/** Checks that the encoded JSON text of a document fits `MAX_DOCUMENT_BYTES`. */
function fitsEncodedLimit(document: DocumentNode) {
  return (
    new TextEncoder().encode(encodeJsonText(document)).byteLength <=
    MAX_DOCUMENT_BYTES
  );
}

/**
 * The Assessment Document: a ProseMirror JSON tree that Tiptap edits as it is.
 * Its nodes and marks are the ones of this module, each with typed attributes.
 * It holds the prompt of an item, so it may place interactions. A document is
 * at most `MAX_DOCUMENT_DEPTH` levels deep and `MAX_DOCUMENT_BYTES` bytes long.
 */
export const AssessmentDocumentSchema = DocumentRootSchema.check(
  Schema.makeFilter(hasLimitedDepth, {
    message: `Expected a document at most ${MAX_DOCUMENT_DEPTH} levels deep.`,
  }),
  Schema.makeFilter(fitsEncodedLimit, {
    message: `Expected a document of at most ${MAX_DOCUMENT_BYTES} encoded bytes.`,
  })
);
export type AssessmentDocument = typeof AssessmentDocumentSchema.Type;

/** Returns every place where a document puts an interaction, in reading order. */
export function documentPlacements(
  node: DocumentNode
): readonly (InteractionNode | InlineInteractionNode)[] {
  const own =
    node.type === "interaction" || node.type === "inlineInteraction"
      ? [node]
      : [];
  return Arr.appendAll(own, Arr.flatMap(childrenOf(node), documentPlacements));
}

/** Checks that a document places no interaction. */
function hasNoPlacements(document: DocumentNode) {
  return Arr.isReadonlyArrayEmpty(documentPlacements(document));
}

/**
 * A document that places no interaction: an option label, an explanation, or a
 * shared reading. Only the prompt of an item places interactions.
 */
export const ContentDocumentSchema = AssessmentDocumentSchema.check(
  Schema.makeFilter(hasNoPlacements, {
    message: "Expected a document without interaction places.",
  })
);
export type ContentDocument = typeof ContentDocumentSchema.Type;
