import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { decodeMaterialRegistry } from "#corpus/material/registry";

describe("material registry", () => {
  it("decodes the exact localized Function Concept identities", async () => {
    const entries = await Effect.runPromise(decodeMaterialRegistry());
    expect(
      entries.map(({ delivery, rendererDomain, route, sourcePath }) => ({
        contentKey: route.contentKey,
        delivery,
        locale: route.locale,
        order: route.order,
        publicPath: route.publicPath,
        rendererDomain,
        sourcePath,
      }))
    ).toEqual([
      {
        contentKey:
          "material/lesson/mathematics/function-composition-inverse-function/function-concept",
        delivery: "public",
        locale: "en",
        order: 5,
        publicPath:
          "subjects/mathematics/function-composition-inverse-function/function-concept",
        rendererDomain: "mathematics",
        sourcePath:
          "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/en.mdx",
      },
      {
        contentKey:
          "material/lesson/mathematics/function-composition-inverse-function/function-concept",
        delivery: "public",
        locale: "id",
        order: 5,
        publicPath:
          "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
        rendererDomain: "mathematics",
        sourcePath:
          "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/id.mdx",
      },
    ]);
  });

  it("rejects malformed rows and duplicate content-head identities", async () => {
    const [malformed, entries] = await Promise.all([
      Effect.runPromise(
        decodeMaterialRegistry([{ invented: true }]).pipe(Effect.flip)
      ),
      Effect.runPromise(decodeMaterialRegistry()),
    ]);
    const duplicate = await Effect.runPromise(
      decodeMaterialRegistry([entries[0], entries[0]]).pipe(Effect.flip)
    );
    const mismatchedPath = await Effect.runPromise(
      decodeMaterialRegistry([
        {
          ...entries[0],
          sourcePath:
            "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/id.mdx",
        },
      ]).pipe(Effect.flip)
    );
    expect(malformed._tag).toBe("MaterialRegistryError");
    expect(duplicate).toMatchObject({
      _tag: "MaterialIdentityError",
      locale: "en",
    });
    expect(mismatchedPath._tag).toBe("MaterialPathError");
  });
});
