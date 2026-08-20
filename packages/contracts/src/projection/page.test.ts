import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  canonicalizePublicPageProjection,
  makePublicPageProjection,
  PageMetadataSchema,
  PublicPageProjectionSchema,
  PublicPageRouteSchema,
} from "#contracts/projection/page";

const route = Schema.decodeSync(PublicPageRouteSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: "pages/privacy-policy",
  pageKey: "privacy-policy",
  publicPath: "privacy-policy",
});
const metadata = Schema.decodeSync(PageMetadataSchema)({
  description: "How Nakafa processes personal data.",
  lastModified: "2026-08-20",
  title: "Privacy Policy",
});

/** Strictly checks one page contract without allowing extra wire fields. */
function accepts(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

describe("public page projection", () => {
  it("builds and canonically serializes one reviewed page", () => {
    const projection = makePublicPageProjection({ metadata, route });

    expect(projection).toEqual({
      ...route,
      kind: "public-page",
      metadata,
      sitemap: true,
    });
    expect(JSON.parse(canonicalizePublicPageProjection(projection))).toEqual(
      projection
    );
  });

  it("rejects incoherent locale and stable content identity", () => {
    expect(
      [
        { ...route, artifactLocale: "id" },
        { ...route, contentKey: "pages/security-policy" },
      ].every((candidate) => !accepts(PublicPageRouteSchema, candidate))
    ).toBe(true);
  });

  it("requires narrow page keys and complete metadata", () => {
    const projection = makePublicPageProjection({ metadata, route });
    expect(
      [
        { ...projection, pageKey: "Privacy Policy" },
        { ...projection, metadata: { ...metadata, description: " " } },
        {
          ...projection,
          metadata: { ...metadata, lastModified: "2026-20-08" },
        },
        { ...projection, metadata: { ...metadata, title: " " } },
        { ...projection, layout: "legal" },
      ].every((candidate) => !accepts(PublicPageProjectionSchema, candidate))
    ).toBe(true);
  });
});
