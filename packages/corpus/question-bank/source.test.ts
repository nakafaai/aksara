import { resolve } from "node:path";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Path } from "effect";
import { decodeQuestionPath } from "#corpus/question-bank/path";
import {
  indexQuestionChoices,
  readQuestionChoices,
  readQuestionSource,
} from "#corpus/question-bank/source";
import {
  candidateQuestionChoicesSource,
  choicesForQuestion,
  corpusRoot,
  generalQuestionSourceFiles,
  indonesianChoiceFixture,
  invalidQuestionChoiceSources,
  makeQuestionSourceLayer,
  questionEntries,
  questionRendererCounts,
  questionTestSourceRoot,
  realQuestionBanks,
  realQuestionChoices,
  realQuestionEntries,
  rejectQuestionSources,
  runQuestionSources,
  validQuestionChoicesSource,
} from "#corpus/test/question-layer";

describe("question source", () => {
  it("discovers and validates all 840 real question directories", {
    timeout: 30_000,
  }, async () => {
    const sources = await runQuestionSources(
      realQuestionBanks,
      realQuestionEntries,
      realQuestionChoices
    );
    expect(sources).toHaveLength(840);
    const choicesByRoot = indexQuestionChoices(sources);
    const [first] = sources;
    if (first === undefined) {
      throw new Error("Expected the first discovered question source.");
    }
    expect(choicesByRoot.size).toBe(840);
    expect(choicesByRoot.get(first.sourceRoot)).toBe(first.choices);
    expect(new Set(sources.map(({ setKey }) => setKey)).size).toBe(38);
    for (const { count, rendererDomain } of questionRendererCounts) {
      expect(
        sources.filter((source) => source.rendererDomain === rendererDomain)
      ).toHaveLength(count);
    }
    expect(
      sources.find(({ questionKey }) =>
        questionKey.endsWith("snbt/reading-and-writing-skills/set-1/question-1")
      )
    ).toMatchObject({
      questionKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1",
      setKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1",
      sourceRoot:
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1",
    });
  });

  it("allows an empty checkout without inventing question sources", async () => {
    await expect(
      runQuestionSources(realQuestionBanks, [], new Map())
    ).resolves.toEqual([]);
  });
  it("rejects files outside the canonical question hierarchy", async () => {
    const error = await rejectQuestionSources(
      realQuestionBanks,
      ["notes.ts"],
      new Map()
    );

    expect(error).toMatchObject({
      _tag: "QuestionPathError",
      reason: "grammar",
    });
  });
  it("maps directory and choice reads to typed failures", async () => {
    const root = "indonesia/snbt/general-reasoning/set-1/question-1";
    const directoryError = await rejectQuestionSources(
      realQuestionBanks,
      [],
      new Map(),
      true
    );
    const location = await Effect.runPromise(
      decodeQuestionPath(realQuestionBanks, root)
    );
    const selectedDirectoryError = await Effect.runPromise(
      readQuestionSource(corpusRoot, location).pipe(
        Effect.provide([
          makeQuestionSourceLayer([], new Map(), true),
          Path.layer,
        ]),
        Effect.flip
      )
    );
    const choiceError = await rejectQuestionSources(
      realQuestionBanks,
      questionEntries(root, generalQuestionSourceFiles),
      new Map()
    );

    expect(directoryError).toMatchObject({
      _tag: "QuestionReadError",
      path: questionTestSourceRoot,
    });
    expect(selectedDirectoryError).toMatchObject({
      _tag: "QuestionReadError",
      path: `${questionTestSourceRoot}/${root}`,
    });
    expect(choiceError).toMatchObject({
      _tag: "QuestionReadError",
      path: `${questionTestSourceRoot}/${root}/choices.ts`,
    });
  });
  it("rejects missing, replaced, and nested companion files", async () => {
    const root = "indonesia/snbt/general-reasoning/set-1/question-1";
    const missing = await rejectQuestionSources(
      realQuestionBanks,
      questionEntries(root, generalQuestionSourceFiles.slice(1)),
      new Map()
    );
    const replaced = await rejectQuestionSources(
      realQuestionBanks,
      questionEntries(root, [
        ...generalQuestionSourceFiles.slice(0, 4),
        "wrong.mdx",
      ]),
      new Map()
    );
    const nested = await rejectQuestionSources(
      realQuestionBanks,
      questionEntries(root, [
        ...generalQuestionSourceFiles,
        "nested/extra.mdx",
      ]),
      new Map()
    );
    const orphanChoice = await rejectQuestionSources(
      realQuestionBanks,
      questionEntries(root, [...generalQuestionSourceFiles, "choices.de.ts"]),
      new Map()
    );
    const orphanPrompt = await rejectQuestionSources(
      realQuestionBanks,
      questionEntries(root, [...generalQuestionSourceFiles, "question.de.mdx"]),
      new Map()
    );
    expect(missing._tag).toBe("QuestionFileSetError");
    expect(replaced._tag).toBe("QuestionFileSetError");
    expect(nested).toMatchObject({
      _tag: "QuestionFileSetError",
      sourcePath: `${questionTestSourceRoot}/${root}`,
    });
    expect(orphanChoice._tag).toBe("QuestionFileSetError");
    expect(orphanPrompt._tag).toBe("QuestionFileSetError");
  });
  it("rejects unevaluable and invalid localized choice catalogs", async () => {
    const errors = await Promise.all(
      invalidQuestionChoiceSources.map((source, index) => {
        const root = `indonesia/snbt/general-reasoning/set-1/question-${index + 1}`;
        return rejectQuestionSources(
          realQuestionBanks,
          questionEntries(root, generalQuestionSourceFiles),
          choicesForQuestion(root, source)
        );
      })
    );
    expect(errors.every(({ _tag }) => _tag === "QuestionChoiceError")).toBe(
      true
    );
  });

  it("requires exactly the section-derived choice locales", async () => {
    const location = await Effect.runPromise(
      decodeQuestionPath(
        realQuestionBanks,
        "indonesia/snbt/english-language/set-1/question-1"
      )
    );
    const sourcePath = resolve(corpusRoot, location.sourceRoot, "choices.ts");
    const englishOnly = validQuestionChoicesSource.replace(
      indonesianChoiceFixture,
      ""
    );
    const indonesianOnly = validQuestionChoicesSource.replace(
      '\n  en: [{ label: "A", value: true }, { label: "B", value: false }],',
      ""
    );
    /** Reads the language-section choices through the synthetic source Adapter. */
    const read = (source: string) =>
      readQuestionChoices(corpusRoot, location).pipe(
        Effect.provide([
          makeQuestionSourceLayer([], new Map([[sourcePath, source]])),
          Path.layer,
        ])
      );

    await expect(Effect.runPromise(read(englishOnly))).resolves.toEqual({
      en: [
        { label: "A", value: true },
        { label: "B", value: false },
      ],
    });
    await expect(
      Effect.runPromise(read(validQuestionChoicesSource).pipe(Effect.flip))
    ).resolves.toMatchObject({
      _tag: "QuestionChoiceLocaleError",
      actualLocales: ["en", "id"],
      expectedLocales: ["en"],
    });
    await expect(
      Effect.runPromise(read(indonesianOnly).pipe(Effect.flip))
    ).resolves.toMatchObject({
      _tag: "QuestionChoiceLocaleError",
      actualLocales: ["id"],
      expectedLocales: ["en"],
    });
  });

  it("loads an ordinary German choice overlay from the requested shell locale", async () => {
    const root = "indonesia/snbt/general-reasoning/set-1/question-1";
    const location = await Effect.runPromise(
      decodeQuestionPath(realQuestionBanks, root)
    );
    const basePath = resolve(corpusRoot, location.sourceRoot, "choices.ts");
    const overlayPath = resolve(
      corpusRoot,
      location.sourceRoot,
      "choices.de.ts"
    );
    /** Reads the exact source closure with or without its required overlay. */
    const read = (includeOverlay: boolean) =>
      readQuestionChoices(corpusRoot, {
        ...location,
        appLocale: AppLocaleSchema.make("de"),
      }).pipe(
        Effect.provide([
          makeQuestionSourceLayer(
            [],
            new Map([
              [basePath, validQuestionChoicesSource],
              ...(includeOverlay
                ? [[overlayPath, candidateQuestionChoicesSource] as const]
                : []),
            ])
          ),
          Path.layer,
        ])
      );

    await expect(Effect.runPromise(read(true))).resolves.toMatchObject({
      de: [
        { label: "A", value: true },
        { label: "B", value: false },
      ],
    });
    await expect(
      Effect.runPromise(read(false).pipe(Effect.flip))
    ).resolves.toMatchObject({
      _tag: "QuestionReadError",
      path: `${location.sourceRoot}/choices.de.ts`,
    });
  });

  it("rejects non-contiguous numbering within each logical set", async () => {
    const first = "indonesia/snbt/general-reasoning/set-1/question-1";
    const third = "indonesia/snbt/general-reasoning/set-1/question-3";
    const entries = [
      ...questionEntries(first, generalQuestionSourceFiles),
      ...questionEntries(third, generalQuestionSourceFiles),
    ];
    const choices = new Map([
      ...choicesForQuestion(first),
      ...choicesForQuestion(third),
    ]);
    const error = await rejectQuestionSources(
      realQuestionBanks,
      entries,
      choices
    );

    expect(error).toMatchObject({
      _tag: "QuestionSequenceError",
      questionNumbers: [1, 3],
      setPath: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
    });
  });
});
