import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  collectMaterialRoutes,
  publishedMaterialHeads,
  rejectMaterialPublication,
} from "#test/material";

vi.mock("@nakafa/aksara-corpus/material/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/material/registry")
    >();
  const { materialSlicePaths } = await import("#test/material-slice");
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

const publishedHeads = await publishedMaterialHeads();
const functionContentKey =
  "material/lesson/mathematics/function-composition-inverse-function/function-concept";
const [englishHead, indonesianHead] = await Effect.runPromise(
  Effect.gen(function* () {
    const english = publishedHeads.find(
      ({ contentKey, locale }) =>
        contentKey === functionContentKey && locale === "en"
    );
    const indonesian = publishedHeads.find(
      ({ contentKey, locale }) =>
        contentKey === functionContentKey && locale === "id"
    );
    if (!(english && indonesian)) {
      return yield* Effect.dieMessage("Expected both real material locales.");
    }
    return [english, indonesian] as const;
  })
);
const { publicPath: _publicPath, ...withoutPublicPath } = englishHead;
const familyCases = [
  ["content key", { ...englishHead, contentKey: "article:test" }],
  ["public path", withoutPublicPath],
  [
    "source path",
    { ...englishHead, sourcePath: "packages/corpus/article/test/en.mdx" },
  ],
  [
    "locale",
    {
      ...englishHead,
      sourcePath: "packages/corpus/material/lesson/test/id.mdx",
    },
  ],
] as const;

/** Decodes a modified published head without bypassing the wire contract. */
function modifyHead(input: unknown) {
  return Schema.decodeUnknownSync(MaterialHeadSchema)(input, {
    onExcessProperty: "error",
  });
}

describe("material publication", () => {
  it("removes the route owned by one deleted published material", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey: "material/lesson/mathematics/removed/route",
      publicPath: "subjects/mathematics/removed/route",
      sourcePath:
        "packages/corpus/material/lesson/mathematics/removed/route/en.mdx",
    });
    const routes = await collectMaterialRoutes({
      heads: [...publishedHeads, stale],
    });

    expect(routes).toHaveLength(1);
    expect(routes[0]).toEqual({
      current: stale,
      next: {
        contentKey: stale.contentKey,
        locale: stale.locale,
      },
    });
  });

  it("rejects duplicate and noncanonical published heads as typed failures", async () => {
    await expect(
      rejectMaterialPublication([englishHead, englishHead])
    ).resolves.toMatchObject({
      _tag: "MaterialHeadDuplicateError",
    });
    await expect(
      rejectMaterialPublication([indonesianHead, englishHead])
    ).resolves.toMatchObject({ _tag: "MaterialHeadOrderError" });
  });

  it.each(familyCases)(
    "rejects a cross-family %s contradiction",
    async (_field, head) => {
      await expect(
        rejectMaterialPublication([modifyHead(head)])
      ).resolves.toMatchObject({
        _tag: "MaterialHeadFamilyError",
      });
    }
  );
});
