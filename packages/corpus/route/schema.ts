import { isLowerKebab } from "@nakafa/aksara-contracts/text/syntax";
import { Schema } from "effect";
import { localizedSourceMapSchema } from "#corpus/locale/source";

/** One lowercase public URL segment authored without locale or slashes. */
export const PublicRouteSegmentSchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isLowerKebab, {
      description: "Lowercase kebab-case public URL segment.",
      identifier: "PublicRouteSegment",
      message: "Invalid public route segment.",
    })
  ),
  Schema.brand("@NakafaAI/AksaraPublicRouteSegment")
);

/** Reviewed public route segments keyed by contract-supported app locale. */
export const PublicRouteSlugMapSchema = localizedSourceMapSchema(
  PublicRouteSegmentSchema
);
