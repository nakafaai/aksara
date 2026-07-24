import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { decodeQuestionRegistry } from "#corpus/question-bank/registry";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const sourceRoot = "packages/corpus/question-bank/tryout/indonesia";
const absoluteSourceRoot = resolve(corpusRoot, sourceRoot);
const realEntries = globSync("**/*", { cwd: absoluteSourceRoot });
const realChoices = new Map(
  globSync("**/choices.ts", { cwd: absoluteSourceRoot }).map((sourcePath) => {
    const absolutePath = resolve(absoluteSourceRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);
const requiredFiles = [
  "answer.en.mdx",
  "answer.id.mdx",
  "choices.ts",
  "question.en.mdx",
  "question.id.mdx",
];
const validChoices = `import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [{ label: "A", value: true }],
  id: [{ label: "A", value: true }],
};

export default choices;`;

/** Creates recursive directory output for synthetic question directories. */
function questionEntries(...roots: readonly string[]) {
  return roots.flatMap((root) => [
    root,
    ...requiredFiles.map((file) => `${root}/${file}`),
  ]);
}

/** Creates strict source reads for synthetic or real question trees. */
function fileLayer(
  entries: readonly string[],
  choices: ReadonlyMap<string, string>
) {
  return FileSystem.layerNoop({
    readDirectory: () => Effect.succeed([...entries]),
    readFileString: (path) => {
      const source = choices.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        new PlatformError.SystemError({
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
          reason: "NotFound",
        })
      );
    },
  });
}

/** Creates localized choice sources for synthetic question directories. */
function choicesFor(...roots: readonly string[]) {
  return new Map(
    roots.map((root) => [
      resolve(absoluteSourceRoot, root, "choices.ts"),
      validChoices,
    ])
  );
}

/** Provides discovery services at the Vitest runner boundary. */
function runRegistry(
  entries: readonly string[],
  choices: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    decodeQuestionRegistry(corpusRoot).pipe(
      Effect.provide(fileLayer(entries, choices)),
      Effect.provide(Path.layer)
    )
  );
}

/** Returns one typed registry rejection at the Vitest runner boundary. */
function rejectRegistry(
  entries: readonly string[],
  choices: ReadonlyMap<string, string>
) {
  return Effect.runPromise(
    decodeQuestionRegistry(corpusRoot).pipe(
      Effect.provide(fileLayer(entries, choices)),
      Effect.provide(Path.layer),
      Effect.flip
    )
  );
}

describe("question registry", () => {
  it("projects every real question and answer body onto its exact path", {
    timeout: 30_000,
  }, async () => {
    const entries = await runRegistry(realEntries, realChoices);
    const authoredPaths = globSync(
      "packages/corpus/question-bank/tryout/indonesia/**/*.mdx",
      { cwd: corpusRoot }
    ).sort();
    const projectedPaths = entries.map(({ sourcePath }) => sourcePath).sort();

    expect(entries).toHaveLength(3360);
    expect(
      new Set(
        entries.map(({ contentKey, locale }) => `${contentKey}\0${locale}`)
      ).size
    ).toBe(3360);
    expect(projectedPaths).toEqual(authoredPaths);
    expect(
      entries.filter(({ delivery }) => delivery === "authenticated")
    ).toHaveLength(1680);
    expect(
      entries.filter(({ delivery }) => delivery === "entitled")
    ).toHaveLength(1680);
    expect(entries.filter(({ locale }) => locale === "en")).toHaveLength(1680);
    expect(entries.filter(({ locale }) => locale === "id")).toHaveLength(1680);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "snbt-general")
    ).toHaveLength(800);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "snbt-math")
    ).toHaveLength(560);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "snbt-plain")
    ).toHaveLength(720);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "snbt-quant")
    ).toHaveLength(800);
    expect(
      entries.filter(({ rendererDomain }) => rendererDomain === "tka-math")
    ).toHaveLength(480);
    expect(
      entries.some(({ contentKey }) =>
        contentKey.includes("snbt/general-reasoning/set-10/")
      )
    ).toBe(true);
  });

  it("preserves one exact source-owned section directory", async () => {
    const entries = await runRegistry(realEntries, realChoices);
    const question = entries.find(
      ({ contentKey, locale }) =>
        contentKey ===
          "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question" &&
        locale === "en"
    );
    const answer = entries.find(
      ({ contentKey, locale }) =>
        contentKey ===
          "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/answer" &&
        locale === "id"
    );

    expect(question).toEqual({
      bodyKind: "question",
      choices: expect.any(Object),
      contentKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question",
      delivery: "authenticated",
      locale: "en",
      peerContentKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/answer",
      questionKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1",
      questionNumber: 1,
      rendererDomain: "snbt-plain",
      setKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1",
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question.en.mdx",
    });
    expect(answer).toMatchObject({
      bodyKind: "answer",
      delivery: "entitled",
      peerContentKey:
        "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/question",
      sourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1/answer.id.mdx",
    });
  });

  it("rejects a fake split section hierarchy", async () => {
    const root = "snbt/reading-and/writing-skills/set-1/question-1";
    const error = await rejectRegistry(questionEntries(root), choicesFor(root));

    expect(error).toMatchObject({
      _tag: "QuestionPathError",
      reason: "grammar",
    });
  });

  it("maps invalid projected body identities to a registry failure", async () => {
    const root = `snbt/general-reasoning/set-${"9".repeat(440)}/question-1`;
    const error = await rejectRegistry(questionEntries(root), choicesFor(root));

    expect(error._tag).toBe("QuestionRegistryError");
  });

  it("allows an empty checkout without inventing entries", async () => {
    await expect(runRegistry([], new Map())).resolves.toEqual([]);
  });
});
