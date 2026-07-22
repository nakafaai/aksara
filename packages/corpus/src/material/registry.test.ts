import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { decodeMaterialRegistry } from "#corpus/material/registry";

const realFamily = {
  delivery: "public",
  identity: {
    materialPath: ["function-composition", "inverse-function"],
    sectionKey: "function-concept",
    subject: "mathematics",
  },
  order: 5,
  publicPaths: {
    en: "subjects/mathematics/function-composition-inverse-function/function-concept",
    id: "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
  },
  rendererDomain: "mathematics",
} as const;

/** Returns one typed registry failure at the Vitest runner boundary. */
function rejectRegistry(input: unknown) {
  return Effect.runPromise(decodeMaterialRegistry(input).pipe(Effect.flip));
}

describe("material registry", () => {
  it("derives exact locale entries from one real family identity", async () => {
    const entries = await Effect.runPromise(decodeMaterialRegistry());
    expect(entries).toEqual([
      {
        delivery: "public",
        rendererDomain: "mathematics",
        route: {
          contentKey:
            "material/lesson/mathematics/function-composition-inverse-function/function-concept",
          locale: "en",
          materialKey:
            "lesson.mathematics.function-composition-inverse-function",
          order: 5,
          publicPath:
            "subjects/mathematics/function-composition-inverse-function/function-concept",
          sectionKey: "function-concept",
        },
        sourcePath:
          "packages/corpus/material/lesson/mathematics/function-composition/inverse-function/function-concept/en.mdx",
      },
      {
        delivery: "public",
        rendererDomain: "mathematics",
        route: {
          contentKey:
            "material/lesson/mathematics/function-composition-inverse-function/function-concept",
          locale: "id",
          materialKey:
            "lesson.mathematics.function-composition-inverse-function",
          order: 5,
          publicPath:
            "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
          sectionKey: "function-concept",
        },
        sourcePath:
          "packages/corpus/material/lesson/mathematics/function-composition/inverse-function/function-concept/id.mdx",
      },
    ]);
  });

  it("rejects malformed, incomplete, and overlong family sources", async () => {
    const malformed = await rejectRegistry(null);
    const incomplete = await rejectRegistry([
      { ...realFamily, publicPaths: { en: realFamily.publicPaths.en } },
    ]);
    const overlong = await rejectRegistry([
      {
        ...realFamily,
        identity: {
          ...realFamily.identity,
          materialPath: ["a".repeat(600)],
        },
      },
    ]);

    expect(malformed).toMatchObject({
      _tag: "MaterialRegistryError",
      message: "Material family registry decoding failed.",
    });
    expect(incomplete._tag).toBe("MaterialRegistryError");
    expect(overlong).toMatchObject({
      _tag: "MaterialRegistryError",
      message: "Expanded material registry decoding failed.",
    });
  });

  it("rejects duplicate heads and locale-specific public routes", async () => {
    const duplicateHead = await rejectRegistry([realFamily, realFamily]);
    const duplicateRoute = await rejectRegistry([
      realFamily,
      {
        ...realFamily,
        identity: {
          materialPath: ["test-material"],
          sectionKey: "test-section",
          subject: "test-subject",
        },
        publicPaths: {
          en: realFamily.publicPaths.en,
          id: "test/material/id",
        },
      },
    ]);

    expect(duplicateHead).toMatchObject({
      _tag: "MaterialIdentityError",
      locale: "en",
    });
    expect(duplicateRoute).toMatchObject({
      _tag: "MaterialRouteError",
      locale: "en",
      publicPath: realFamily.publicPaths.en,
    });
  });

  it("allows an empty family registry without inventing entries", async () => {
    await expect(
      Effect.runPromise(decodeMaterialRegistry([]))
    ).resolves.toEqual([]);
  });
});
