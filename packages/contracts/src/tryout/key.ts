import { Schema } from "effect";
import { isLowerKebab } from "#contracts/text/syntax";

/** Stable lowercase identity for one try-out hierarchy node. */
export const TryoutKeySchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isLowerKebab, {
      description: "Lowercase kebab-case try-out source key.",
      identifier: "TryoutKey",
      message: "Invalid try-out key.",
    })
  ),
  Schema.check(Schema.isMaxLength(128))
);
export type TryoutKey = typeof TryoutKeySchema.Type;
