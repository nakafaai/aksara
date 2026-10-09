import {
  type MaterialHead,
  MaterialHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import {
  Array as Arr,
  Context,
  Effect,
  HashMap,
  Layer,
  MutableHashMap,
  Option,
  Schema,
} from "effect";
import {
  functionContentKey,
  type MaterialTestFixtures,
  materialTestLayer,
  publishedMaterialHeads,
} from "#test/material/spec";

export const materialPlanFingerprintCases = [
  [
    "delivery",
    (head: MaterialHead) => ({ ...head, delivery: "authenticated" }),
  ],
  [
    "public path",
    (head: MaterialHead) => ({
      ...head,
      publicPath: "subjects/mathematics/old-function-concept",
    }),
  ],
  [
    "renderer domain",
    (head: MaterialHead) => ({ ...head, rendererDomain: "chemistry" }),
  ],
  [
    "source path",
    (head: MaterialHead) => ({
      ...head,
      sourcePath: head.sourcePath.replace("/en.mdx", "/old/en.mdx"),
    }),
  ],
] as const;

/** Decodes a modified published head without bypassing the wire contract. */
export const modifyMaterialPlanHead = Effect.fn("MaterialPlanTest.modifyHead")(
  (input: unknown) =>
    Schema.decodeUnknownEffect(MaterialHeadSchema)(input, {
      onExcessProperty: "error",
    })
);

/** Replaces one canonical head while preserving the complete sorted catalog. */
export function replaceMaterialPlanHead(
  publishedHeads: readonly MaterialHead[],
  replacement: MaterialHead
) {
  return Arr.map(publishedHeads, (head) =>
    head.contentKey === replacement.contentKey &&
    head.artifactLocale === replacement.artifactLocale
      ? replacement
      : head
  );
}

/** Loads the representative real heads once for the complete plan suite. */
const makeMaterialPlanTestFixtures = Effect.fn("MaterialPlanTest.makeFixtures")(
  function* () {
    const publishedHeads = yield* publishedMaterialHeads();
    const englishHead = yield* Effect.fromOption(
      Arr.findFirst(
        publishedHeads,
        ({ contentKey, artifactLocale }) =>
          contentKey === functionContentKey && artifactLocale === "en"
      )
    );

    return { englishHead, publishedHeads };
  }
);

/** Shared real material heads for the native Effect plan suite. */
export class MaterialPlanTestFixtures extends Context.Service<
  MaterialPlanTestFixtures,
  Effect.Success<ReturnType<typeof makeMaterialPlanTestFixtures>>
>()("@nakafa/aksara-publisher/test/material/plan/MaterialPlanTestFixtures") {}

const materialPlanFixtureLayer = Layer.effect(
  MaterialPlanTestFixtures,
  makeMaterialPlanTestFixtures()
).pipe(Layer.provide(materialTestLayer));

export const materialPlanTestLayer = Layer.merge(
  materialTestLayer,
  materialPlanFixtureLayer
);

/** Returns the source entries, in fixture order, with one reviewed body changed. */
export const changedMaterialSources = Effect.fn(
  "MaterialPlanTest.changedSources"
)((fixture: MaterialTestFixtures["Service"], sourcePath: string) =>
  Effect.gen(function* () {
    const sources = MutableHashMap.fromIterable(fixture.sources);
    const absolutePath = yield* Effect.fromNullishOr(
      Option.getOrUndefined(HashMap.get(fixture.absolutePaths, sourcePath))
    );
    const body = yield* Effect.fromNullishOr(
      Option.getOrUndefined(MutableHashMap.get(sources, absolutePath))
    );
    MutableHashMap.set(sources, absolutePath, `${body}\n`);
    return Arr.fromIterable(sources);
  })
);
