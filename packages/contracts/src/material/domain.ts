import { Schema } from "effect";

import { isLowerKebab } from "#contracts/text/syntax";

/** Stable language-neutral identity for one authored material domain. */
export const MaterialDomainSchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isLowerKebab, {
      description: "Lowercase kebab-case material domain key.",
      identifier: "MaterialDomain",
      message: "Invalid material domain. Expected lowercase kebab-case.",
    })
  ),
  Schema.check(Schema.isMaxLength(128)),
  Schema.brand("@NakafaAI/AksaraMaterialDomain")
);
export type MaterialDomain = typeof MaterialDomainSchema.Type;
