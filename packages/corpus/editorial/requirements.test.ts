import { resolve } from "node:path";
import { NodeContext } from "@effect/platform-node";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
} from "@nakafa/aksara-contracts/locale";
import type { ContentSnapshotKind } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { StructuredReviewSourceError } from "#corpus/editorial/model";
import {
  loadArticleReviewRequirements,
  loadStructuredReviewRequirements,
} from "#corpus/editorial/requirements";

const checkoutRoot = resolve(import.meta.dirname, "../../..");

/** Loads structured requirements through the real Node platform boundary. */
function load(
  families: readonly ContentSnapshotKind[],
  activeAppLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES,
  root = checkoutRoot
) {
  return Effect.runPromise(
    loadStructuredReviewRequirements({
      activeAppLocales,
      checkoutRoot: root,
      families,
    }).pipe(Effect.provide(NodeContext.layer))
  );
}

/** Returns one typed source failure without a FiberFailure wrapper. */
function reject(
  families: readonly ContentSnapshotKind[],
  activeAppLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES,
  root = checkoutRoot
) {
  return Effect.runPromise(
    loadStructuredReviewRequirements({
      activeAppLocales,
      checkoutRoot: root,
      families,
    }).pipe(Effect.flip, Effect.provide(NodeContext.layer))
  );
}

/** Returns stable review-record identity for duplicate detection. */
function identity(requirement: Awaited<ReturnType<typeof load>>[number]) {
  return `${requirement.targetPath}\0${requirement.appLocale}\0${requirement.deliveryLanguage}`;
}

describe("structured editorial requirements", () => {
  it("returns no policy surface when no snapshot family is selected", async () => {
    await expect(load([])).resolves.toEqual([]);
  });

  it("derives every Program source from the active authored registries", async () => {
    const requirements = await load(["program"]);
    const targetPaths = new Set(
      requirements.map(({ targetPath }) => targetPath)
    );

    expect(requirements).toHaveLength(134);
    expect(targetPaths.size).toBe(67);
    expect(targetPaths).toContain("packages/corpus/program/exam.ts");
    expect(targetPaths).toContain("packages/corpus/program/school.ts");
    expect(targetPaths).toContain("packages/corpus/material/domain.ts");
    expect(targetPaths).toContain(
      "packages/corpus/curriculum/merdeka/topics/class-12/mathematics.ts"
    );
    expect(targetPaths).toContain(
      "packages/corpus/material/lesson/mathematics/circle/source.ts"
    );
    expect(targetPaths).toContain(
      "packages/corpus/material/lesson/ai-ds/ai-programming/data.ts"
    );
    expect(targetPaths).toContain(
      "packages/corpus/material/lesson/ai-ds/linear-methods/matrix.ts"
    );
    expect(
      requirements.every(
        ({ expectedTargetHash, requiredSourcePaths, reviewMode }) =>
          expectedTargetHash === null &&
          requiredSourcePaths.length === 0 &&
          reviewMode === "authored-humanizer-review"
      )
    ).toBe(true);
  });

  it("binds article routes, references, categories, and author authority", async () => {
    const requirements = await Effect.runPromise(
      loadArticleReviewRequirements(ACTIVE_APP_LOCALES)
    );
    const article = requirements.find(
      ({ appLocale, targetPath }) =>
        appLocale === "en" &&
        targetPath.endsWith("dynastic-politics/asian-values/source.ts")
    );

    expect(requirements).toHaveLength(16);
    expect(article?.requiredSourcePaths).toEqual([
      "packages/corpus/articles/politics/category.ts",
      "packages/corpus/articles/politics/dynastic-politics/asian-values/ref.ts",
      "packages/corpus/team/source.ts",
    ]);
  });

  it("derives the active Try-out source registry without implementation files", async () => {
    const requirements = await load(["tryout"]);

    expect(requirements).toHaveLength(6);
    expect(new Set(requirements.map(({ targetPath }) => targetPath))).toEqual(
      new Set([
        "packages/corpus/tryout/indonesia/country.ts",
        "packages/corpus/tryout/indonesia/snbt/source.ts",
        "packages/corpus/tryout/indonesia/tka/source.ts",
      ])
    );
  });

  it("binds every pinned Quran byte and authored provenance source", async () => {
    const requirements = await load(["quran"]);
    const immutable = requirements.filter(
      ({ reviewMode }) => reviewMode === "immutable-official-source"
    );
    const provenance = requirements.filter(
      ({ targetPath }) => targetPath === "packages/corpus/quran/provenance.ts"
    );

    expect(requirements).toHaveLength(122);
    expect(immutable).toHaveLength(120);
    expect(
      immutable.filter(({ targetPath }) => targetPath.includes("/tafsir/"))
    ).toHaveLength(114);
    expect(provenance).toHaveLength(2);
    expect(
      provenance.find(({ appLocale }) => appLocale === "en")
        ?.requiredSourcePaths
    ).toHaveLength(5);
    expect(
      provenance.find(({ appLocale }) => appLocale === "id")
        ?.requiredSourcePaths
    ).toHaveLength(119);
    expect(
      immutable.every(({ requiredSourcePaths }) =>
        requiredSourcePaths[0]?.endsWith("terms.html")
      )
    ).toBe(true);
  });

  it("keeps the combined six-scope inventory canonical and unique", async () => {
    const requirements = await load(["program", "quran", "tryout"]);
    const identities = requirements.map(identity);

    expect(requirements).toHaveLength(262);
    expect(new Set(identities).size).toBe(identities.length);
    expect(identities).toEqual([...identities].sort());
  });

  it("fails closed before German Quran source policy is pinned", async () => {
    const locales = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)([
      "en",
      "id",
      "de",
    ]);
    const error = await reject(["quran"], locales);

    expect(error).toBeInstanceOf(StructuredReviewSourceError);
    expect(error).toMatchObject({
      family: "quran",
      sourcePath: "packages/corpus/quran/sources/quranenc/de.xml",
    });
  });

  it("preserves exact source discovery failures", async () => {
    const error = await reject(["program"], ACTIVE_APP_LOCALES, "/missing");

    expect(error).toBeInstanceOf(StructuredReviewSourceError);
    expect(error).toMatchObject({ family: "program" });
  });
});
