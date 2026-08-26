import { describe, expect, it } from "@effect/vitest";
import { PageHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Schema } from "effect";
import {
  collectPageRoutes,
  publishedPageHeads,
  rejectPagePublication,
} from "#test/page";

const publishedHeads = await publishedPageHeads();
const englishHead = publishedHeads.find(
  ({ contentKey, artifactLocale }) =>
    contentKey === "pages/privacy-policy" && artifactLocale === "en"
);
const indonesianHead = publishedHeads.find(
  ({ contentKey, artifactLocale }) =>
    contentKey === "pages/privacy-policy" && artifactLocale === "id"
);
if (!(englishHead && indonesianHead)) {
  throw new Error("Expected both active privacy page locales.");
}
const familyCases = [
  ["content key", { ...englishHead, contentKey: "page:test" }],
  ["renderer domain", { ...englishHead, rendererDomain: "mathematics" }],
  [
    "source path",
    { ...englishHead, sourcePath: "packages/corpus/article/test/en.mdx" },
  ],
  [
    "artifact locale",
    {
      ...englishHead,
      sourcePath: "packages/corpus/pages/privacy-policy/id.mdx",
    },
  ],
] as const;

/** Decodes a modified published head without bypassing the wire contract. */
function modifyHead(input: unknown) {
  return Schema.decodeUnknownSync(PageHeadSchema)(input, {
    onExcessProperty: "error",
  });
}

describe("page publication", () => {
  it("removes the route owned by one deleted published page", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey: "pages/zz-removed-page",
      publicPath: "zz-removed-page",
      sourcePath: "packages/corpus/pages/zz-removed-page/en.mdx",
    });
    const routes = await collectPageRoutes({
      heads: [...publishedHeads, stale],
    });

    expect(routes).toHaveLength(1);
    expect(routes[0]).toEqual({
      current: {
        appLocale: stale.artifactLocale,
        contentKey: stale.contentKey,
        publicPath: stale.publicPath,
      },
      next: {
        appLocale: stale.artifactLocale,
        contentKey: stale.contentKey,
      },
    });
  });

  it("rejects duplicate and noncanonical published heads as typed failures", async () => {
    await expect(
      rejectPagePublication([englishHead, englishHead])
    ).resolves.toMatchObject({ _tag: "PageHeadDuplicateError" });
    await expect(
      rejectPagePublication([indonesianHead, englishHead])
    ).resolves.toMatchObject({ _tag: "PageHeadOrderError" });
  });

  it.each(familyCases)(
    "rejects a cross-family %s contradiction",
    async (_field, head) => {
      await expect(
        rejectPagePublication([modifyHead(head)])
      ).resolves.toMatchObject({ _tag: "PageHeadFamilyError" });
    }
  );
});
