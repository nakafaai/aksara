import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { CorpusSourcePathSchema } from "#contracts/ids";
import {
  canonicalizePublicPageProjection,
  HistoricalPublicPageProjectionSchema,
  makePublicPageProjection,
  PageMetadataSchema,
  PublicPageProjectionSchema,
  PublicPageRouteSchema,
  ReadablePublicPageProjectionSchema,
} from "#contracts/projection/page";

const route = Schema.decodeSync(PublicPageRouteSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: "pages/privacy-policy",
  pageKey: "privacy-policy",
  publicPath: "privacy-policy",
});
const metadata = Schema.decodeSync(PageMetadataSchema)({
  dateModified: "2026-08-21",
  datePublished: "2026-08-20",
  description: "How Nakafa processes personal data.",
  title: "Privacy Policy",
});
const sourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/pages/privacy-policy/en.mdx"
);

/** Strictly checks one page contract without allowing extra wire fields. */
function accepts(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

describe("public page projection", () => {
  it("builds and canonically serializes one reviewed page", () => {
    const projection = makePublicPageProjection({
      metadata,
      route,
      sourcePath,
    });

    expect(projection).toEqual({
      ...route,
      kind: "public-page",
      metadata,
      sitemap: true,
      sourcePath,
    });
    expect(JSON.parse(canonicalizePublicPageProjection(projection))).toEqual(
      projection
    );
    expect(canonicalizePublicPageProjection(projection)).toContain(
      '"metadata":{"dateModified":"2026-08-21","datePublished":"2026-08-20","description":"How Nakafa processes personal data.","title":"Privacy Policy"}'
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
    const projection = makePublicPageProjection({
      metadata,
      route,
      sourcePath,
    });
    expect(
      [
        { ...projection, pageKey: "Privacy Policy" },
        { ...projection, metadata: { ...metadata, description: " " } },
        {
          ...projection,
          metadata: { ...metadata, datePublished: "2026-20-08" },
        },
        { ...projection, metadata: { ...metadata, title: " " } },
        { ...projection, layout: "legal" },
      ].every((candidate) => !accepts(PublicPageProjectionSchema, candidate))
    ).toBe(true);
  });

  it("rejects legacy or non-chronological page dates", () => {
    const projection = makePublicPageProjection({
      metadata,
      route,
      sourcePath,
    });
    const invalidMetadata = [
      {
        description: metadata.description,
        lastModified: "2026-08-20",
        title: metadata.title,
      },
      { ...metadata, dateModified: metadata.datePublished },
      { ...metadata, dateModified: "2026-08-19" },
    ];

    expect(
      invalidMetadata.every(
        (candidate) =>
          !accepts(PublicPageProjectionSchema, {
            ...projection,
            metadata: candidate,
          })
      )
    ).toBe(true);
  });

  it("retains exact predecessor Page bytes only at the readable boundary", () => {
    const historical = {
      ...makePublicPageProjection({ metadata, route, sourcePath }),
      metadata: {
        description: metadata.description,
        lastModified: "2026-08-21",
        title: metadata.title,
      },
    };

    expect(accepts(PublicPageProjectionSchema, historical)).toBe(false);
    expect(accepts(HistoricalPublicPageProjectionSchema, historical)).toBe(
      true
    );
    expect(
      accepts(HistoricalPublicPageProjectionSchema, {
        ...historical,
        metadata: { ...historical.metadata, lastModified: "not-a-date" },
      })
    ).toBe(false);
    expect(accepts(ReadablePublicPageProjectionSchema, historical)).toBe(true);
    expect(canonicalizePublicPageProjection(historical)).toContain(
      '"metadata":{"description":"How Nakafa processes personal data.","lastModified":"2026-08-21","title":"Privacy Policy"}'
    );
  });

  it("omits an absent modification date from canonical metadata", () => {
    const projection = makePublicPageProjection({
      metadata: Schema.decodeSync(PageMetadataSchema)({
        datePublished: "2026-08-20",
        description: metadata.description,
        title: metadata.title,
      }),
      route,
      sourcePath,
    });

    expect(canonicalizePublicPageProjection(projection)).not.toContain(
      "dateModified"
    );
  });
});
