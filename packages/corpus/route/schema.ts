import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { Schema } from "effect";

const PUBLIC_ROUTE_SEGMENT_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

/** One lowercase public URL segment authored without locale or slashes. */
export const PublicRouteSegmentSchema = Schema.String.pipe(
  Schema.pattern(PUBLIC_ROUTE_SEGMENT_PATTERN, {
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
