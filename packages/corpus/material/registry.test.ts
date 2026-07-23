import { globSync } from "node:fs";
import { resolve } from "node:path";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { decodeMaterialRegistry } from "#corpus/material/registry";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");

/** Builds one exact lesson source so failure tests change one identity at a time. */
function lessonSource() {
  return {
    assetRoot:
      "material/lesson/mathematics/function-composition-inverse-function",
    domain: "mathematics",
    key: "lesson.mathematics.function-composition-inverse-function",
    kind: "lesson",
    routeSlugs: {
      en: "function-composition-inverse-function",
      id: "fungsi-komposisi-dan-fungsi-invers",
    },
    sections: [
      {
        routeSlugs: { en: "function-concept", id: "konsep-fungsi" },
        slug: "function-concept",
        translations: {
          en: { title: "Function Concept" },
          id: { title: "Konsep Fungsi" },
        },
      },
    ],
    slug: "function-composition-inverse-function",
    translations: {
      en: {
        description: "Operate on functions while tracking shared domains.",
        title: "Function Composition and Inverse Function",
      },
      id: {
        description: "Operasikan fungsi sambil menjaga domain bersama.",
        title: "Fungsi Komposisi dan Fungsi Invers",
      },
    },
  };
}

/** Returns one typed registry failure at the Vitest runner boundary. */
function rejectRegistry(input: unknown) {
  return Effect.runPromise(decodeMaterialRegistry(input).pipe(Effect.flip));
}

describe("material registry", () => {
  it("projects every authored locale body onto its checked-in source path", async () => {
    const entries = await Effect.runPromise(decodeMaterialRegistry());
    const authoredPaths = globSync("packages/corpus/material/lesson/**/*.mdx", {
      cwd: corpusRoot,
    }).sort();
    const projectedPaths = entries.map(({ sourcePath }) => sourcePath).sort();

    expect(entries).toHaveLength(766);
    expect(new Set(entries.map(({ route }) => route.materialKey)).size).toBe(
      36
    );
    expect(entries.filter(({ route }) => route.locale === "en")).toHaveLength(
      383
    );
    expect(entries.filter(({ route }) => route.locale === "id")).toHaveLength(
      383
    );
    expect(new Set(projectedPaths).size).toBe(766);
    expect(projectedPaths).toEqual(authoredPaths);

    const representativeKeys = new Set([
      "material/lesson/ai-ds/ai-programming/arithmetic-operator",
      "material/lesson/biology/biodiversity/bacteria",
      "material/lesson/chemistry/structure-matter/atom-shell",
      "material/lesson/mathematics/function-composition-inverse-function/function-concept",
      "material/lesson/physics/kinematics/acceleration",
    ]);
    expect(
      entries
        .filter(({ route }) => representativeKeys.has(route.contentKey))
        .map(({ route }) => route.publicPath)
    ).toEqual([
      "subjects/ai-ds/ai-programming/arithmetic-operator",
      "materi/ai-ds/pemrograman-ai/operator-aritmatika",
      "subjects/biology/biodiversity/bacteria",
      "materi/biologi/keanekaragaman-makhluk-hidup/bakteri",
      "subjects/chemistry/structure-matter/atom-shell",
      "materi/kimia/struktur-atom/kulit-atom",
      "subjects/mathematics/function-composition-inverse-function/function-concept",
      "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
      "subjects/physics/kinematics/acceleration",
      "materi/fisika/kinematika/percepatan",
    ]);
  });

  it("derives exact localized routes from one material source", async () => {
    const entries = await Effect.runPromise(
      decodeMaterialRegistry([lessonSource()])
    );

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
          order: 1,
          publicPath:
            "subjects/mathematics/function-composition-inverse-function/function-concept",
          sectionKey: "function-concept",
        },
        sourcePath:
          "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx",
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
          order: 1,
          publicPath:
            "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
          sectionKey: "function-concept",
        },
        sourcePath:
          "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/id.mdx",
      },
    ]);
  });

  it("maps malformed catalogs and invalid projections to typed failures", async () => {
    const malformed = await rejectRegistry(null);
    const overlong = await rejectRegistry([
      {
        ...lessonSource(),
        assetRoot: `material/lesson/mathematics/${"a".repeat(490)}`,
      },
    ]);

    expect(malformed._tag).toBe("MaterialCatalogError");
    expect(overlong._tag).toBe("MaterialRegistryError");
  });

  it("rejects duplicate material keys and asset roots", async () => {
    const duplicateKey = await rejectRegistry([
      lessonSource(),
      {
        ...lessonSource(),
        assetRoot: "material/lesson/mathematics/alternate-functions",
        slug: "alternate-functions",
      },
    ]);
    const duplicateRoot = await rejectRegistry([
      lessonSource(),
      {
        ...lessonSource(),
        key: "lesson.mathematics.alternate-functions",
        slug: "alternate-functions",
      },
    ]);

    expect(duplicateKey).toMatchObject({
      _tag: "MaterialKeyError",
      materialKey: "lesson.mathematics.function-composition-inverse-function",
    });
    expect(duplicateRoot).toMatchObject({
      _tag: "MaterialRootError",
      assetRoot:
        "material/lesson/mathematics/function-composition-inverse-function",
    });
  });

  it("rejects duplicate locale heads and public routes", async () => {
    const source = lessonSource();
    const [section] = source.sections;
    const duplicateHead = await rejectRegistry([
      { ...source, sections: [section, section] },
    ]);
    const duplicateRoute = await rejectRegistry([
      source,
      {
        ...source,
        assetRoot: "material/lesson/mathematics/alternate-functions",
        key: "lesson.mathematics.alternate-functions",
        sections: [{ ...section, slug: "alternate-section" }],
        slug: "alternate-functions",
      },
    ]);

    expect(duplicateHead).toMatchObject({
      _tag: "MaterialIdentityError",
      locale: "en",
    });
    expect(duplicateRoute).toMatchObject({
      _tag: "MaterialRouteError",
      locale: "en",
      publicPath:
        "subjects/mathematics/function-composition-inverse-function/function-concept",
    });
  });

  it("allows an empty source catalog without inventing entries", async () => {
    await expect(
      Effect.runPromise(decodeMaterialRegistry([]))
    ).resolves.toEqual([]);
  });
});
