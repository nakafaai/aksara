import { Schema } from "effect";

/** One non-empty Markdown label rendered by the product-owned content surface. */
export const QuestionResponseLabelSchema = Schema.String.check(
  Schema.isNonEmpty()
);
