import { Schema } from "effect";
import { isLowerKebab } from "#contracts/text/syntax";

/** Stable lowercase identity for one try-out hierarchy node. */
export const TryoutKeySchema = Schema.String.pipe(
  Schema.filter(isLowerKebab, {
    description: "Lowercase kebab-case try-out source key.",
    identifier: "TryoutKey",
    message: () => "Invalid try-out key.",
  }),
  Schema.maxLength(128)
);
export type TryoutKey = typeof TryoutKeySchema.Type;
