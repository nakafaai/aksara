import { Schema } from "effect";

import { isLowerKebab } from "#contracts/text/syntax";

/** Stable language-neutral identity for one authored material domain. */
export const MaterialDomainSchema = Schema.String.pipe(
  Schema.filter(isLowerKebab, {
    description: "Lowercase kebab-case material domain key.",
    identifier: "MaterialDomain",
    message: () => "Invalid material domain. Expected lowercase kebab-case.",
  }),
  Schema.maxLength(128),
  Schema.brand("@NakafaAI/AksaraMaterialDomain")
);
export type MaterialDomain = typeof MaterialDomainSchema.Type;
