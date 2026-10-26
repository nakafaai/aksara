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
 * figure that its contract refuses, `placement` a block where only text may sit
 * or text where only blocks may sit, and `document` a document that its
 * contract refuses as a whole.
 */
export const AssessmentSourceReasonSchema = Schema.Literals([
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
