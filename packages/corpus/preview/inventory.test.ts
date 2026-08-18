import { resolve } from "node:path";
import { FileSystem, Path } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { CANDIDATE_APP_LOCALE_CODES } from "#corpus/locale/lifecycle";
import {
  bindQuestionInputs,
  validateCandidatePreviewInventory,
} from "#corpus/preview/inventory";

/** Counts candidate bodies directly from their physical family roots. */
const readPhysicalCounts = Effect.fn("AksaraCorpusTest.readPhysicalCounts")(
  function* (checkoutRoot: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    /** Counts physical candidate bodies for one content family. */
    const countFamily = (family: "articles" | "material" | "question-bank") =>
      fileSystem
        .readDirectory(path.join(checkoutRoot, "packages", "corpus", family), {
          recursive: true,
        })
        .pipe(
          Effect.map(
            (entries) =>
              entries.filter((entry) =>
                CANDIDATE_APP_LOCALE_CODES.some((appLocale) => {
                  const normalized = entry.split(path.sep).join("/");
                  if (family === "question-bank") {
                    return (
                      normalized.endsWith(`/answer.${appLocale}.mdx`) ||
                      normalized.endsWith(`/question.${appLocale}.mdx`)
                    );
                  }
                  return normalized.endsWith(`/${appLocale}.mdx`);
                })
              ).length
          )
        );
    const counts = yield* Effect.all(
      {
        articleCount: countFamily("articles"),
        materialCount: countFamily("material"),
        questionCount: countFamily("question-bank"),
      },
      { concurrency: 3 }
    );
    return {
      ...counts,
      totalCount:
        counts.articleCount + counts.materialCount + counts.questionCount,
    };
  }
);

describe("candidate preview inventory", () => {
  it("owns every present German body through its exact compile source", {
    timeout: 30_000,
  }, async () => {
    const checkoutRoot = resolve(import.meta.dirname, "..", "..", "..");
    const [inventory, physicalCounts] = await Effect.runPromise(
      Effect.all(
        [
          validateCandidatePreviewInventory(checkoutRoot),
          readPhysicalCounts(checkoutRoot),
        ],
        { concurrency: 2 }
      ).pipe(Effect.provide(NodeContext.layer))
    );

    expect(inventory).toMatchObject(physicalCounts);
    expect(inventory.sources).toHaveLength(physicalCounts.totalCount);
    expect(
      inventory.sources.find(
        ({ entry, family }) =>
          family === "question" &&
          entry.sourcePath.endsWith(
            "/snbt/quantitative-knowledge/set-10/question-1/answer.de.mdx"
          )
      )
    ).toMatchObject({
      appLocale: "de",
      entry: {
        artifactLocale: "de",
        bodyKind: "answer",
      },
      family: "question",
    });
  });

  it("rejects a German body without one exact source owner", async () => {
    const error = await Effect.runPromise(
      Effect.scoped(
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const root = yield* fileSystem.makeTempDirectoryScoped({
            prefix: "aksara-candidate-inventory-",
          });
          const paths = [
            "packages/corpus/articles/unowned",
            "packages/corpus/material",
            "packages/corpus/question-bank",
          ];
          yield* Effect.forEach(
            paths,
            (path) =>
              fileSystem.makeDirectory(`${root}/${path}`, { recursive: true }),
            { discard: true }
          );
          yield* fileSystem.writeFileString(
            `${root}/${paths[0]}/de.mdx`,
            "export const metadata = {}"
          );
          yield* fileSystem.makeDirectory(`${root}/${paths[0]}/second`, {
            recursive: true,
          });
          yield* fileSystem.writeFileString(
            `${root}/${paths[0]}/second/de.mdx`,
            "export const metadata = {}"
          );
          return yield* validateCandidatePreviewInventory(root).pipe(
            Effect.flip
          );
        })
      ).pipe(Effect.provide(NodeContext.layer))
    );

    expect(error).toMatchObject({
      _tag: "CandidatePreviewInventoryError",
      family: "article",
      phase: "ownership",
    });
  });

  it("returns an exact empty inventory for a checkout without candidate bodies", async () => {
    const inventory = await Effect.runPromise(
      Effect.scoped(
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const root = yield* fileSystem.makeTempDirectoryScoped({
            prefix: "aksara-empty-candidate-inventory-",
          });
          yield* Effect.forEach(
            ["articles", "material", "question-bank"],
            (family) =>
              fileSystem.makeDirectory(`${root}/packages/corpus/${family}`, {
                recursive: true,
              }),
            { discard: true }
          );
          return yield* validateCandidatePreviewInventory(root);
        })
      ).pipe(Effect.provide(NodeContext.layer))
    );

    expect(inventory).toEqual({
      articleCount: 0,
      materialCount: 0,
      questionCount: 0,
      sources: [],
      totalCount: 0,
    });
  });

  it("keeps missing family roots inside the typed file error channel", async () => {
    const error = await Effect.runPromise(
      validateCandidatePreviewInventory("/missing-candidate-checkout").pipe(
        Effect.flip,
        Effect.provide(NodeContext.layer)
      )
    );

    expect(error).toMatchObject({
      _tag: "CandidatePreviewInventoryError",
      phase: "files",
    });
  });

  it("rejects mismatched and surplus question ownership", async () => {
    const expectedQuestion = {
      appLocale: AppLocaleSchema.make("de"),
      sourcePath: CorpusSourcePathSchema.make(
        "packages/corpus/question-bank/example/answer.de.mdx"
      ),
    };
    const expected = [expectedQuestion];
    const entry = {
      sourcePath: CorpusSourcePathSchema.make(
        "packages/corpus/question-bank/example/question.de.mdx"
      ),
    };
    const matching = { sourcePath: expectedQuestion.sourcePath };
    const [mismatch, surplus] = await Promise.all([
      Effect.runPromise(
        bindQuestionInputs(expected, [entry]).pipe(Effect.flip)
      ),
      Effect.runPromise(
        bindQuestionInputs(expected, [matching, entry]).pipe(Effect.flip)
      ),
    ]);

    expect(mismatch).toMatchObject({ family: "question", phase: "ownership" });
    expect(surplus).toMatchObject({ family: "question", phase: "ownership" });
  });

  it("covers an empty article lane before material ownership fails", async () => {
    const error = await Effect.runPromise(
      Effect.scoped(
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const root = yield* fileSystem.makeTempDirectoryScoped({
            prefix: "aksara-material-only-candidate-",
          });
          yield* Effect.forEach(
            [
              "packages/corpus/articles",
              "packages/corpus/material/unowned",
              "packages/corpus/question-bank",
            ],
            (path) =>
              fileSystem.makeDirectory(`${root}/${path}`, { recursive: true }),
            { discard: true }
          );
          yield* fileSystem.writeFileString(
            `${root}/packages/corpus/material/unowned/de.mdx`,
            "export const metadata = {}"
          );
          return yield* validateCandidatePreviewInventory(root).pipe(
            Effect.flip
          );
        })
      ).pipe(Effect.provide(NodeContext.layer))
    );

    expect(error).toMatchObject({ family: "material", phase: "ownership" });
  });

  it("keeps malformed candidate paths inside the typed file error channel", async () => {
    const error = await Effect.runPromise(
      Effect.scoped(
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const root = yield* fileSystem.makeTempDirectoryScoped({
            prefix: "aksara-candidate-path-",
          });
          yield* Effect.forEach(
            [
              "packages/corpus/articles/invalid path",
              "packages/corpus/material",
              "packages/corpus/question-bank",
            ],
            (path) =>
              fileSystem.makeDirectory(`${root}/${path}`, { recursive: true }),
            { discard: true }
          );
          yield* fileSystem.writeFileString(
            `${root}/packages/corpus/articles/invalid path/de.mdx`,
            "export const metadata = {}"
          );
          return yield* validateCandidatePreviewInventory(root).pipe(
            Effect.flip
          );
        })
      ).pipe(Effect.provide(NodeContext.layer))
    );

    expect(error).toMatchObject({
      _tag: "CandidatePreviewInventoryError",
      family: "article",
      phase: "files",
    });
  });
});
