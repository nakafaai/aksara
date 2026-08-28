import { expect, layer } from "@effect/vitest";
import {
  type PageHead,
  PageHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Effect, Schema } from "effect";
import {
  collectPageRoutes,
  PublishedPageTestFixtures,
  publishedPageTestLayer,
  rejectPagePublication,
} from "#test/page/publication";

const familyCases = [
  ["content key", (head: PageHead) => ({ ...head, contentKey: "page:test" })],
  [
    "renderer domain",
    (head: PageHead) => ({ ...head, rendererDomain: "mathematics" }),
  ],
  [
    "source path",
    (head: PageHead) => ({
      ...head,
      sourcePath: "packages/corpus/article/test/en.mdx",
    }),
  ],
  [
    "artifact locale",
    (head: PageHead) => ({
      ...head,
      sourcePath: "packages/corpus/pages/privacy-policy/id.mdx",
    }),
  ],
] as const;

/** Decodes a modified published head without bypassing the wire contract. */
const modifyHead = Effect.fn("PagePublicationTest.modifyHead")(
  (input: unknown) =>
    Schema.decodeUnknownEffect(PageHeadSchema)(input, {
      onExcessProperty: "error",
    })
);

layer(publishedPageTestLayer)("page publication", (it) => {
  it.effect("removes the route owned by one deleted published page", () =>
    Effect.gen(function* () {
      const fixture = yield* PublishedPageTestFixtures;
      const stale = yield* modifyHead({
        ...fixture.englishHead,
        contentKey: "pages/zz-removed-page",
        publicPath: "zz-removed-page",
        sourcePath: "packages/corpus/pages/zz-removed-page/en.mdx",
      });
      const routes = yield* collectPageRoutes({
        heads: [...fixture.publishedHeads, stale],
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
    })
  );

  it.effect(
    "rejects duplicate and noncanonical published heads as typed failures",
    () =>
      Effect.gen(function* () {
        const { englishHead, indonesianHead } =
          yield* PublishedPageTestFixtures;
        const duplicate = yield* rejectPagePublication([
          englishHead,
          englishHead,
        ]);
        const noncanonical = yield* rejectPagePublication([
          indonesianHead,
          englishHead,
        ]);

        expect(duplicate).toMatchObject({ _tag: "PageHeadDuplicateError" });
        expect(noncanonical).toMatchObject({ _tag: "PageHeadOrderError" });
      })
  );

  it.effect.each(familyCases)(
    "rejects a cross-family %s contradiction",
    ([, change]) =>
      Effect.gen(function* () {
        const { englishHead } = yield* PublishedPageTestFixtures;
        const head = yield* modifyHead(change(englishHead));
        const error = yield* rejectPagePublication([head]);

        expect(error).toMatchObject({ _tag: "PageHeadFamilyError" });
      })
  );
});
