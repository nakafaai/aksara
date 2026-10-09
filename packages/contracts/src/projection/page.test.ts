import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";
import { CorpusSourcePathSchema } from "#contracts/ids";
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
    expect(
      Schema.decodeSync(Schema.fromJsonString(PublicPageProjectionSchema))(
        canonicalizePublicPageProjection(projection)
      )
    ).toEqual(projection);
    expect(canonicalizePublicPageProjection(projection)).toContain(
      '"metadata":{"dateModified":"2026-08-21","datePublished":"2026-08-20","description":"How Nakafa processes personal data.","title":"Privacy Policy"}'
    );
  });

  it("rejects incoherent locale and stable content identity", () => {
    expect(
      Arr.every(
        [
          { ...route, artifactLocale: "id" },
          { ...route, contentKey: "pages/security-policy" },
        ],
        (candidate) => !accepts(PublicPageRouteSchema, candidate)
      )
    ).toBe(true);
  });

  it("requires narrow page keys and complete metadata", () => {
    const projection = makePublicPageProjection({
      metadata,
      route,
      sourcePath,
    });
    expect(
      Arr.every(
        [
          { ...projection, pageKey: "Privacy Policy" },
          { ...projection, metadata: { ...metadata, description: " " } },
          {
            ...projection,
            metadata: { ...metadata, datePublished: "2026-20-08" },
          },
          { ...projection, metadata: { ...metadata, title: " " } },
          { ...projection, layout: "legal" },
        ],
        (candidate) => !accepts(PublicPageProjectionSchema, candidate)
      )
    ).toBe(true);
  });

  it("rejects non-chronological page dates", () => {
    const projection = makePublicPageProjection({
      metadata,
      route,
      sourcePath,
    });
    const invalidMetadata = [
      { ...metadata, dateModified: metadata.datePublished },
      { ...metadata, dateModified: "2026-08-19" },
    ];

    expect(
      Arr.every(
        invalidMetadata,
        (candidate) =>
          !accepts(PublicPageProjectionSchema, {
            ...projection,
            metadata: candidate,
          })
      )
    ).toBe(true);
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

describe("pinned public page canonical bytes", () => {
  const pinnedRoute = {
    appLocale: "id",
    artifactLocale: "id",
    contentKey: "pages/tentang-kami",
    kind: "public-page",
    pageKey: "tentang-kami",
    publicPath: "tentang-kami",
    sitemap: true,
    sourcePath: "packages/corpus/pages/tentang-kami/id.mdx",
  } as const;

  it("pins canonical bytes with the modification date present", () => {
    const pinnedProjection = Schema.decodeSync(PublicPageProjectionSchema)({
      ...pinnedRoute,
      metadata: {
        dateModified: "2026-08-21",
        datePublished: "2026-08-20",
        description: "Halaman tentang café 😀",
        title: "Tentang Nakafa Ñandú",
      },
    });

    expect(canonicalizePublicPageProjection(pinnedProjection)).toBe(
      '{"appLocale":"id","artifactLocale":"id","contentKey":"pages/tentang-kami","kind":"public-page","metadata":{"dateModified":"2026-08-21","datePublished":"2026-08-20","description":"Halaman tentang café 😀","title":"Tentang Nakafa Ñandú"},"pageKey":"tentang-kami","publicPath":"tentang-kami","sitemap":true,"sourcePath":"packages/corpus/pages/tentang-kami/id.mdx"}'
    );
  });

  it("pins canonical bytes with the modification date absent", () => {
    const pinnedProjection = Schema.decodeSync(PublicPageProjectionSchema)({
      ...pinnedRoute,
      metadata: {
        datePublished: "2026-08-20",
        description: "Halaman tentang café 😀",
        title: "Tentang Nakafa Ñandú",
      },
    });

    expect(canonicalizePublicPageProjection(pinnedProjection)).toBe(
      '{"appLocale":"id","artifactLocale":"id","contentKey":"pages/tentang-kami","kind":"public-page","metadata":{"datePublished":"2026-08-20","description":"Halaman tentang café 😀","title":"Tentang Nakafa Ñandú"},"pageKey":"tentang-kami","publicPath":"tentang-kami","sitemap":true,"sourcePath":"packages/corpus/pages/tentang-kami/id.mdx"}'
    );
  });
});
