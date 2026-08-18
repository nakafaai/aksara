import { NodeContext } from "@effect/platform-node";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

import {
  CandidateContentValidationError,
  CandidateQuranProvenanceError,
  validateCandidateContent,
} from "#publisher/catalog/candidate";
import { checkoutRoot, rendererManifest } from "#test/article";

const quranDigest = Sha256HashSchema.make(`sha256:${"9".repeat(64)}`);
const control = vi.hoisted(() => ({
  empty: false,
  failure: null as
    | null
    | "compile"
    | "glossary"
    | "inventory"
    | "program"
    | "tryout",
  quranStatus: "approved" as "approved" | "blocked",
}));

vi.mock("@nakafa/aksara-compiler/compile", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@nakafa/aksara-compiler/compile")>();
  const { Effect: TestEffect } = await import("effect");
  return {
    ...original,
    compileContent: (input: Parameters<typeof original.compileContent>[0]) =>
      control.failure === "compile"
        ? TestEffect.fail("compile")
        : original.compileContent(input),
  };
});

vi.mock("@nakafa/aksara-contracts/quran/provenance", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    makeQuranProvenanceManifest: () =>
      TestEffect.succeed({
        digest: `sha256:${"9".repeat(64)}`,
        status: control.quranStatus,
      }),
  };
});

vi.mock("@nakafa/aksara-corpus/locale/german/glossary", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    decodeGermanGlossary: () =>
      control.failure === "glossary"
        ? TestEffect.fail("glossary")
        : TestEffect.succeed(["one", "two"]),
  };
});

vi.mock("@nakafa/aksara-corpus/program/candidate", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    validateCandidateProgram: () =>
      control.failure === "program"
        ? TestEffect.fail("program")
        : TestEffect.succeed({
            curriculumLocaleCount: 3,
            curriculumRouteCount: 4,
            programLocaleCount: 5,
            readyLocaleCount: 1,
          }),
  };
});

vi.mock("@nakafa/aksara-corpus/quran/projection", async () => {
  const { Stream: TestStream } = await import("effect");
  return { streamQuranRows: () => TestStream.make(1, 2, 3) };
});

vi.mock("@nakafa/aksara-corpus/quran/provenance", async () => {
  const { Effect: TestEffect } = await import("effect");
  return { quranProvenanceRecordsFor: () => TestEffect.succeed([]) };
});

vi.mock("@nakafa/aksara-corpus/quran/source/integrity", async () => {
  const { Effect: TestEffect } = await import("effect");
  return { loadVerifiedQuranSource: () => TestEffect.succeed({ source: [] }) };
});

vi.mock("@nakafa/aksara-corpus/tryout/catalog", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    projectCandidateTryoutCatalog: () =>
      control.failure === "tryout"
        ? TestEffect.fail("tryout")
        : TestEffect.succeed([1, 2]),
  };
});

vi.mock("@nakafa/aksara-corpus/tryout/locale-registry", async () => {
  const { Effect: TestEffect } = await import("effect");
  return { decodeTryoutLocaleRegistry: () => TestEffect.succeed([]) };
});

vi.mock("@nakafa/aksara-corpus/preview/inventory", async () => {
  const { Effect: TestEffect } = await import("effect");
  const { selectPreviewDocument } = await import(
    "@nakafa/aksara-corpus/preview/selection"
  );
  const fixtures = await import("#test/article");
  return {
    validateCandidatePreviewInventory: () =>
      TestEffect.gen(function* () {
        if (control.failure === "inventory") {
          return yield* TestEffect.fail("inventory");
        }
        if (control.empty) {
          return {
            articleCount: 0,
            materialCount: 0,
            questionCount: 0,
            sources: [],
            totalCount: 0,
          };
        }
        const article = fixtures.articleEntries.find(
          ({ route }) => route.appLocale === "en"
        );
        if (article === undefined) {
          return yield* TestEffect.die("Expected one real article fixture.");
        }
        const selection = yield* selectPreviewDocument(
          fixtures.checkoutRoot,
          article.sourcePath
        );
        return {
          articleCount: 1,
          materialCount: 0,
          questionCount: 0,
          sources: selection.sources,
          totalCount: 1,
        };
      }),
  };
});

/** Runs candidate validation with the real compiler and renderer contract. */
function runValidation() {
  return Effect.runPromise(
    validateCandidateContent({
      checkoutRoot,
      rendererManifest,
    }).pipe(Effect.provide(NodeContext.layer))
  );
}

describe("candidate content validation", () => {
  it.each([
    [false, 1],
    [true, 0],
  ])(
    "projects the exact present body inventory",
    async (empty, articleCount) => {
      control.empty = empty;
      control.failure = null;
      control.quranStatus = "approved";

      await expect(runValidation()).resolves.toEqual({
        articleCount,
        compiledBodyCount: articleCount,
        glossaryCount: 2,
        materialCount: 0,
        programCurriculumLocaleCount: 3,
        programCurriculumRouteCount: 4,
        programLocaleCount: 5,
        programReadyLocaleCount: 1,
        questionCount: 0,
        quranProvenanceDigest: quranDigest,
        quranProvenanceStatus: "approved",
        quranRowCount: 3,
        totalCount: articleCount,
        tryoutCatalogCount: 2,
      });
    }
  );

  it("rejects candidate Quran provenance that is not approved", async () => {
    control.empty = true;
    control.failure = null;
    control.quranStatus = "blocked";

    const error = await Effect.runPromise(
      validateCandidateContent({
        checkoutRoot,
        rendererManifest,
      }).pipe(Effect.flip, Effect.provide(NodeContext.layer))
    );
    expect(error).toBeInstanceOf(CandidateContentValidationError);
    expect(error).toMatchObject({
      cause: expect.any(CandidateQuranProvenanceError),
      stage: "quran",
    });
  });

  it.each([
    ["inventory", "inventory", true],
    ["compile", "compile", false],
    ["glossary", "glossary", true],
    ["tryout", "tryout", true],
    ["program", "program", true],
  ] as const)(
    "preserves the %s stage failure",
    async (failure, stage, empty) => {
      control.empty = empty;
      control.failure = failure;
      control.quranStatus = "approved";

      const error = await Effect.runPromise(
        validateCandidateContent({
          checkoutRoot,
          rendererManifest,
        }).pipe(Effect.flip, Effect.provide(NodeContext.layer))
      );

      expect(error).toBeInstanceOf(CandidateContentValidationError);
      expect(error).toMatchObject({ stage });
    }
  );
});
