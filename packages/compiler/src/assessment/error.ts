import { LocalIdSchema } from "@nakafa/aksara-contracts/assessment/identity";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Schema } from "effect";

/**
 * Why an authored element cannot become part of an Assessment Document:
 * `element` names an element the document has no node for, `heading` a heading
 * deeper than the three levels a document holds, `link` a link that is not an
 * absolute HTTPS address, `math` an empty formula, `props` the props of a
 * figure that its catalog schema refuses, `answer` a figure that shows answer
 * state where a learner reads before answering, `placement` a block where only
 * text may sit or text where only blocks may sit, and `document` a document
 * that its contract refuses as a whole.
 */
export const AssessmentSourceReasonSchema = Schema.Literals([
  "answer",
  "document",
  "element",
  "heading",
  "link",
  "math",
  "placement",
  "props",
]);
export type AssessmentSourceReason = typeof AssessmentSourceReasonSchema.Type;

/** One authored element cannot become part of an Assessment Document. */
export class AssessmentSourceError extends Schema.TaggedError<
  AssessmentSourceError,
  { readonly brand: unique symbol }
>()("AssessmentSourceError", {
  cause: Schema.optional(Schema.Unknown),
  contentKey: ContentKeySchema,
  element: Schema.String.check(Schema.isNonEmpty()),
  reason: AssessmentSourceReasonSchema,
  sourcePath: CorpusSourcePathSchema,
}) {}

/** The document whose conversion an error names. */
export const AssessmentSiteSchema = Schema.Struct({
  contentKey: ContentKeySchema,
  sourcePath: CorpusSourcePathSchema,
});
export type AssessmentSite = typeof AssessmentSiteSchema.Type;

/**
 * One field that a prompt places with `<Field part="a" />`: the label of the
 * part it answers, the interaction it places, and whether that interaction
 * may sit inside a line of text, as a text, number, or math entry may. Every
 * field may also sit as a block of its own.
 */
export const FieldSchema = Schema.Struct({
  inline: Schema.Boolean,
  interaction: LocalIdSchema,
  part: Schema.String.check(Schema.isNonEmpty()),
});
export type Field = typeof FieldSchema.Type;

/**
 * A document being converted, whether its figures may show answer state, and
 * the fields it may place. Figures show answer state in an explanation
 * (`shown`) and never in a prompt, a reading, or an option label (`hidden`),
 * which a learner reads before answering. Only the prompt of an item with
 * parts places fields.
 */
export const BlockSiteSchema = Schema.Struct({
  ...AssessmentSiteSchema.fields,
  answers: Schema.Literals(["hidden", "shown"]),
  fields: Schema.Array(FieldSchema),
});
export type BlockSite = typeof BlockSiteSchema.Type;

/** Builds the error for one element of one document. */
export function sourceError(
  site: AssessmentSite,
  element: string,
  reason: AssessmentSourceReason,
  cause?: unknown
) {
  return new AssessmentSourceError({
    cause,
    contentKey: site.contentKey,
    element,
    reason,
    sourcePath: site.sourcePath,
  });
}

/**
 * One inline element that cannot become rich text, before it is known which
 * document holds it: the rich text of a figure prop is read by its catalog
 * schema, which names the document only when the whole figure fails.
 */
export class InlineError extends Schema.TaggedError<
  InlineError,
  { readonly brand: unique symbol }
>()("InlineError", {
  element: Schema.String.check(Schema.isNonEmpty()),
  reason: AssessmentSourceReasonSchema,
}) {}
