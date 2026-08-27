import { expect, layer } from "@effect/vitest";
import {
  type MaterialHead,
  MaterialHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Context, Effect, Layer, Schema } from "effect";
import { vi } from "vitest";
import {
  collectMaterialRoutes,
  publishedMaterialHeads,
  rejectMaterialPublication,
} from "#test/material/spec";

vi.mock("@nakafa/aksara-corpus/material/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/material/registry")
    >();
  const { materialSlicePaths } = await import("#test/material/slice");
  const sourcePaths = new Set<string>(materialSlicePaths);
  return {
    ...original,
    decodeMaterialRegistry: (input?: unknown) =>
      original
        .decodeMaterialRegistry(input)
        .pipe(
          Effect.map((entries) =>
            entries.filter(({ sourcePath }) => sourcePaths.has(sourcePath))
          )
        ),
  };
});

const functionContentKey =
  "material/lesson/mathematics/function-composition-inverse-function/function-concept";
const familyCases = [
  [
    "content key",
    (head: MaterialHead) => ({ ...head, contentKey: "article:test" }),
  ],
  ["public path", ({ publicPath: _publicPath, ...head }: MaterialHead) => head],
  [
    "source path",
    (head: MaterialHead) => ({
      ...head,
      sourcePath: "packages/corpus/article/test/en.mdx",
    }),
  ],
  [
    "artifactLocale",
    (head: MaterialHead) => ({
      ...head,
      sourcePath: "packages/corpus/material/lesson/test/id.mdx",
    }),
  ],
] as const;

/** Decodes a modified published head without bypassing the wire contract. */
const modifyHead = Effect.fn("MaterialPublicationTest.modifyHead")(
  (input: unknown) =>
    Schema.decodeUnknownEffect(MaterialHeadSchema)(input, {
      onExcessProperty: "error",
    })
);

/** Loads both real locale heads once for the complete publication suite. */
const makePublicationTestFixtures = Effect.fn(
  "MaterialPublicationTest.makeFixtures"
)(() =>
  Effect.gen(function* () {
    const publishedHeads = yield* publishedMaterialHeads();
    const englishHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        (head) =>
          head.contentKey === functionContentKey && head.artifactLocale === "en"
      )
    );
    const indonesianHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        (head) =>
          head.contentKey === functionContentKey && head.artifactLocale === "id"
      )
    );

    return { englishHead, indonesianHead, publishedHeads };
  })
);

class MaterialPublicationTestFixtures extends Context.Service<
  MaterialPublicationTestFixtures,
  Effect.Success<ReturnType<typeof makePublicationTestFixtures>>
>()("AksaraPublisherMaterialPublicationTestFixtures") {}

const publicationTestLayer = Layer.effect(
  MaterialPublicationTestFixtures,
  makePublicationTestFixtures()
);

layer(publicationTestLayer)("material publication", (it) => {
  it.effect("removes the route owned by one deleted published material", () =>
    Effect.gen(function* () {
      const fixture = yield* MaterialPublicationTestFixtures;
      const stale = yield* modifyHead({
        ...fixture.englishHead,
        contentKey: "material/lesson/mathematics/removed/route",
        publicPath: "subjects/mathematics/removed/route",
        sourcePath:
          "packages/corpus/material/lesson/mathematics/removed/route/en.mdx",
      });
      const routes = yield* collectMaterialRoutes({
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
          yield* MaterialPublicationTestFixtures;
        const duplicate = yield* rejectMaterialPublication([
          englishHead,
          englishHead,
        ]);
        const noncanonical = yield* rejectMaterialPublication([
          indonesianHead,
          englishHead,
        ]);

        expect(duplicate).toMatchObject({
          _tag: "MaterialHeadDuplicateError",
        });
        expect(noncanonical).toMatchObject({
          _tag: "MaterialHeadOrderError",
        });
      })
  );

  it.effect.each(familyCases)(
    "rejects a cross-family %s contradiction",
    ([, change]) =>
      Effect.gen(function* () {
        const { englishHead } = yield* MaterialPublicationTestFixtures;
        const head = yield* modifyHead(change(englishHead));
        const error = yield* rejectMaterialPublication([head]);

        expect(error).toMatchObject({
          _tag: "MaterialHeadFamilyError",
        });
      })
  );
});
