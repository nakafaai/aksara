import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { loadQuestionContent } from "#corpus/question-bank/content";
import {
  decodeQuestionPath,
  indexQuestionBanks,
  questionSourceFiles,
} from "#corpus/question-bank/path";
import {
  discoverQuestionSources,
  indexQuestionChoices,
  readQuestionChoices,
  readQuestionDocument,
  readQuestionSource,
} from "#corpus/question-bank/source";
import { makeQuestionSourceLayer } from "#corpus/test/question-layer";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const sourceRoot = "packages/corpus/question-bank/tryout";
const absoluteSourceRoot = resolve(corpusRoot, sourceRoot);
const tryoutSources = await Effect.runPromise(decodeTryoutRegistry());
const questionBanks = await Effect.runPromise(
  indexQuestionBanks(tryoutSources)
);
const realEntries = globSync("**/*", { cwd: absoluteSourceRoot });
const realChoices = new Map(
  globSync("**/choices.ts", { cwd: absoluteSourceRoot }).map((sourcePath) => {
    const absolutePath = resolve(absoluteSourceRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);
const validChoices = `import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [{ label: "A", value: true }, { label: "B", value: false }],
  id: [{ label: "A", value: false }, { label: "B", value: true }],
};

export default choices;`;
const sourceFiles = questionSourceFiles(
  TryoutKeySchema.make("general-reasoning")
);
const INDONESIAN_CHOICE_FIXTURE =
  /\n {2}id: \[\{ label: "A", value: false \}, \{ label: "B", value: true \}\],/u;
/** Creates recursive directory output for one synthetic question directory. */
function questionEntries(root: string, files = sourceFiles) {
  return [root, ...files.map((file) => `${root}/${file}`)];
}
/** Provides the filesystem and path services at the Vitest boundary. */
function runSources(
  entries: readonly string[],
  sources: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    discoverQuestionSources(corpusRoot, questionBanks).pipe(
      Effect.provide([makeQuestionSourceLayer(entries, sources), Path.layer])
    )
  );
}
/** Returns one typed discovery failure at the Vitest boundary. */
function rejectSources(
  entries: readonly string[],
  sources: ReadonlyMap<string, string>,
  failDirectory = false
) {
  return Effect.runPromise(
    discoverQuestionSources(corpusRoot, questionBanks).pipe(
      Effect.provide([
        makeQuestionSourceLayer(entries, sources, failDirectory),
        Path.layer,
      ]),
      Effect.flip
    )
  );
}
/** Maps a physical synthetic question root to its absolute choices source. */
function choicesFor(root: string, source = validChoices) {
  return new Map([[resolve(absoluteSourceRoot, root, "choices.ts"), source]]);
}
describe("question source", () => {
  it("discovers and validates all 840 real question directories", {
    timeout: 30_000,
  }, async () => {
    const sources = await runSources(realEntries, realChoices);
    const choicesByRoot = indexQuestionChoices(sources);
    const [firstSource] = sources;
    if (firstSource === undefined) {
      throw new Error("Expected the canonical question sources.");
    }
    expect(sources).toHaveLength(840);
    expect(choicesByRoot.size).toBe(840);
    expect(choicesByRoot.get(firstSource.sourceRoot)).toBe(firstSource.choices);
    expect(new Set(sources.map(({ setKey }) => setKey)).size).toBe(38);
    for (const [rendererDomain, count] of [
      ["snbt-general", 200],
      ["snbt-math", 140],
      ["snbt-plain", 180],
      ["snbt-quant", 200],
      ["tka-math", 120],
    ] as const) {
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
    await expect(runSources([], new Map())).resolves.toEqual([]);
  });
  it("rejects files outside the canonical question hierarchy", async () => {
    const error = await rejectSources(["notes.ts"], new Map());

    expect(error).toMatchObject({
      _tag: "QuestionPathError",
      reason: "grammar",
    });
  });
  it("maps directory and choice reads to typed failures", async () => {
    const root = "indonesia/snbt/general-reasoning/set-1/question-1";
    const directoryError = await rejectSources([], new Map(), true);
    const location = await Effect.runPromise(
      decodeQuestionPath(questionBanks, root)
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
    const choiceError = await rejectSources(questionEntries(root), new Map());

    expect(directoryError).toMatchObject({
      _tag: "QuestionReadError",
      path: sourceRoot,
    });
    expect(selectedDirectoryError).toMatchObject({
      _tag: "QuestionReadError",
      path: `${sourceRoot}/${root}`,
    });
    expect(choiceError).toMatchObject({
      _tag: "QuestionReadError",
      path: `${sourceRoot}/${root}/choices.ts`,
    });
  });
  it("rejects missing, replaced, and nested companion files", async () => {
    const root = "indonesia/snbt/general-reasoning/set-1/question-1";
    const missing = await rejectSources(
      questionEntries(root, sourceFiles.slice(1)),
      new Map()
    );
    const replaced = await rejectSources(
      questionEntries(root, [...sourceFiles.slice(0, 4), "wrong.mdx"]),
      new Map()
    );
    const nested = await rejectSources(
      questionEntries(root, [...sourceFiles, "nested/extra.mdx"]),
      new Map()
    );
    expect(missing._tag).toBe("QuestionFileSetError");
    expect(replaced._tag).toBe("QuestionFileSetError");
    expect(nested).toMatchObject({
      _tag: "QuestionFileSetError",
      sourcePath: `${sourceRoot}/${root}`,
    });
  });
  it("rejects unevaluable and invalid localized choice catalogs", async () => {
    const roots = [
      "indonesia/snbt/general-reasoning/set-1/question-1",
      "indonesia/snbt/general-reasoning/set-1/question-2",
      "indonesia/snbt/general-reasoning/set-1/question-3",
    ];
    const invalidSources = [
      "export default choices;",
      "const choices = { broken: };",
      `const choices = {
        en: [{ label: "A", value: false }],
        id: [{ label: "A", value: true }],
      };`,
    ];
    const errors = await Promise.all(
      roots.map((root, index) =>
        rejectSources(
          questionEntries(root),
          choicesFor(root, invalidSources[index])
        )
      )
    );
    expect(errors.every(({ _tag }) => _tag === "QuestionChoiceError")).toBe(
      true
    );
  });

  it("requires exactly the section-derived choice locales", async () => {
    const location = await Effect.runPromise(
      decodeQuestionPath(
        questionBanks,
        "indonesia/snbt/english-language/set-1/question-1"
      )
    );
    const sourcePath = resolve(corpusRoot, location.sourceRoot, "choices.ts");
    const englishOnly = validChoices.replace(INDONESIAN_CHOICE_FIXTURE, "");
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
      Effect.runPromise(read(validChoices).pipe(Effect.flip))
    ).resolves.toMatchObject({
      _tag: "QuestionChoiceLocaleError",
      actualLocales: ["en", "id"],
      expectedLocales: ["en"],
    });
  });

  it("rejects non-contiguous numbering within each logical set", async () => {
    const first = "indonesia/snbt/general-reasoning/set-1/question-1";
    const third = "indonesia/snbt/general-reasoning/set-1/question-3";
    const entries = [...questionEntries(first), ...questionEntries(third)];
    const choices = new Map([...choicesFor(first), ...choicesFor(third)]);
    const error = await rejectSources(entries, choices);

    expect(error).toMatchObject({
      _tag: "QuestionSequenceError",
      questionNumbers: [1, 3],
      setPath: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
    });
  });

  it("reads a registry-owned body byte-exactly and types missing reads", {
    timeout: 30_000,
  }, async () => {
    const physicalRoot = "indonesia/snbt/general-reasoning/set-1/question-1";
    const sourcePath = `${sourceRoot}/${physicalRoot}/question.en.mdx`;
    const content = await Effect.runPromise(
      loadQuestionContent(corpusRoot, tryoutSources).pipe(
        Effect.provide([
          makeQuestionSourceLayer(realEntries, realChoices),
          Path.layer,
        ])
      )
    );
    const entry = content.entries.find(
      (candidate) =>
        candidate.sourcePath === sourcePath && candidate.bodyKind === "question"
    );
    const source = content.sources.find(
      (candidate) => candidate.sourceRoot === `${sourceRoot}/${physicalRoot}`
    );
    if (!(entry && source)) {
      throw new Error("Expected the real question source and body.");
    }
    const rawMdx = readFileSync(resolve(corpusRoot, sourcePath), "utf8");
    /** Reads the same registry row through a supplied source map. */
    const read = (sources: ReadonlyMap<string, string>) =>
      readQuestionDocument(corpusRoot, entry, source.choices).pipe(
        Effect.provide([makeQuestionSourceLayer([], sources), Path.layer])
      );
    const document = await Effect.runPromise(
      read(new Map([[resolve(corpusRoot, sourcePath), rawMdx]]))
    );
    const error = await Effect.runPromise(read(new Map()).pipe(Effect.flip));
    const { sourceRoot: entryRoot, ...documentEntry } = entry;

    expect(document).toEqual({
      ...documentEntry,
      choices: source.choices,
      rawMdx,
    });
    expect(entryRoot).toBe(`${sourceRoot}/${physicalRoot}`);
    expect(error).toMatchObject({
      _tag: "QuestionReadError",
      path: sourcePath,
    });
  });
});
