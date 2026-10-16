import { Schema } from "effect";

import { ContentDocumentSchema } from "#contracts/assessment/document";
import { LocalIdSchema } from "#contracts/assessment/identity";
import { RichTextSchema } from "#contracts/assessment/inline";
import { PlainTextSchema } from "#contracts/assessment/scalar";

/**
 * What every interaction has: an identifier inside its item version, and a
 * label for screen readers. No interaction carries a color or any other cue
 * that a reader without sight or color vision would miss.
 */
export const InteractionFields = {
  id: LocalIdSchema,
  label: PlainTextSchema,
};

/** One option, statement, column, or item that is labeled by a document. */
export const DocumentPartSchema = Schema.Struct({
  id: LocalIdSchema,
  label: ContentDocumentSchema,
});

/** One short option that is labeled by rich text, such as an inline choice. */
export const TextPartSchema = Schema.Struct({
  id: LocalIdSchema,
  label: RichTextSchema,
});

/**
 * Checks that the fewest and most selections fit the parts to select from:
 * the fewest is at most the most, and the most is at most the part count.
 */
export function hasSelectionBounds(
  selection: { readonly maxChoices: number; readonly minChoices: number },
  partCount: number
) {
  return (
    selection.minChoices <= selection.maxChoices &&
    selection.maxChoices <= partCount
  );
}
