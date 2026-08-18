import { isLowerKebab } from "@nakafa/aksara-contracts/text/syntax";
import { Schema } from "effect";
import { EmbeddedAppLocaleCodeSchema } from "#corpus/locale/source";

/** One lowercase public URL segment authored without locale or slashes. */
export const PublicRouteSegmentSchema = Schema.String.pipe(
  Schema.filter(isLowerKebab, {
    description: "Lowercase kebab-case public URL segment.",
    identifier: "PublicRouteSegment",
    message: () => "Invalid public route segment.",
  }),
  Schema.brand("@NakafaAI/AksaraPublicRouteSegment")
);

/** Required public route segment for every embedded source locale. */
export const PublicRouteSlugMapSchema = Schema.Record({
  key: EmbeddedAppLocaleCodeSchema,
  value: PublicRouteSegmentSchema,
});
