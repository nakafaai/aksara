import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { isLowerKebab } from "@nakafa/aksara-contracts/text/syntax";
import { Schema } from "effect";

/** One lowercase public URL segment authored without locale or slashes. */
export const PublicRouteSegmentSchema = Schema.String.pipe(
  Schema.filter(isLowerKebab, {
    description: "Lowercase kebab-case public URL segment.",
    identifier: "PublicRouteSegment",
    message: () => "Invalid public route segment.",
  }),
  Schema.brand("@NakafaAI/AksaraPublicRouteSegment")
);

/** Required public route segment for every supported content locale. */
export const PublicRouteSlugMapSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: PublicRouteSegmentSchema,
});
