import { expect, layer } from "@effect/vitest";
import { DeliveryLanguageSchema } from "@nakafa/aksara-contracts/locale";
import { Effect, MutableHashMap, Path } from "effect";
import { questionSourceFiles } from "#corpus/question-bank/path";
import { validateQuestionUniqueness } from "#corpus/question-bank/uniqueness";
import {
  absoluteQuestionTestSourceRoot,
  corpusRoot,
  discoverSyntheticQuestionSources,
  generalQuestionSourceFiles,
  itemForQuestion,
  makeQuestionSourceLayer,
  questionEntries,
  questionTestSourceRoot,
  realQuestionCorpusLayer,
} from "#corpus/test/question";

const generalSet = "indonesia/snbt/general-reasoning/set-1";
const englishRoot = "indonesia/snbt/literacy-in-english/set-1/question-1";
const englishItemSource = `import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: { kind: "single-choice", options: [{ isCorrect: true, label: "A" }, { isCorrect: false, label: "B" }] },
  },
};

export default item;`;
const englishFiles = questionSourceFiles({
  kind: "fixed",
  language: DeliveryLanguageSchema.make("en"),
});

/** Names one synthetic general-reasoning question by its number. */
function generalRoot(questionNumber: number) {
  return `${generalSet}/question-${questionNumber}`;
}

/** Returns the repository path of one synthetic Indonesian prompt. */
function promptPath(root: string) {
  return `${questionTestSourceRoot}/${root}/question.id.mdx`;
}

/** Wraps one prompt body in the metadata every authored prompt carries. */
function prompt(body: string, title = "Soal") {
  return `export const metadata = {\n  title: "${title}",\n};\n\n${body}\n`;
}

/** Discovers synthetic sources, then validates the given prompt bodies. */
function validate(
  prompts: readonly (readonly [root: string, body: string])[],
  english?: string
) {
  return Effect.gen(function* () {
    const path = yield* Path.Path;
    const repositoryRoot = yield* corpusRoot;
    const questionRoot = yield* absoluteQuestionTestSourceRoot;
    const entries: string[] = [];
    const items = MutableHashMap.empty<string, string>();
    const files = MutableHashMap.empty<string, string>();
    for (const [root, body] of prompts) {
      entries.push(...questionEntries(root, generalQuestionSourceFiles));
      const itemSources = yield* itemForQuestion(root);
      for (const [itemPath, source] of itemSources) {
        MutableHashMap.set(items, itemPath, source);
      }
      MutableHashMap.set(
        files,
        path.resolve(questionRoot, root, "question.id.mdx"),
        body
      );
    }
    if (english !== undefined) {
      entries.push(...questionEntries(englishRoot, englishFiles));
      const englishSources = yield* itemForQuestion(
        englishRoot,
        englishItemSource
      );
      for (const [itemPath, source] of englishSources) {
        MutableHashMap.set(items, itemPath, source);
      }
      MutableHashMap.set(
        files,
        path.resolve(questionRoot, englishRoot, "question.en.mdx"),
        english
      );
    }
    return yield* discoverSyntheticQuestionSources(entries, items).pipe(
      Effect.flatMap((sources) =>
        validateQuestionUniqueness(repositoryRoot, sources)
      ),
      Effect.provide([makeQuestionSourceLayer([], files), Path.layer])
    );
  }).pipe(Effect.provide(Path.layer));
}

layer(realQuestionCorpusLayer)("question uniqueness", (it) => {
  it.effect(
    "accepts distinct prompts and the same words in another locale",
    () =>
      validate(
        [
          [generalRoot(1), prompt("Berapa suara yang didapat calon A?")],
          [generalRoot(2), prompt("Siapa calon dengan suara terbanyak?")],
        ],
        prompt("Berapa suara yang didapat calon A?")
      )
  );

  it.effect("rejects prompts that repeat after formatting is removed", () =>
    Effect.gen(function* () {
      const error = yield* validate([
        [generalRoot(1), prompt("Berapa nilai **x** jika  x + 1 = y?", "A")],
        [generalRoot(2), prompt("berapa nilai “x” jika x + 1 = y?", "B")],
      ]).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "QuestionDuplicateError",
        repeats: [
          {
            match: "text",
            paths: [promptPath(generalRoot(1)), promptPath(generalRoot(2))],
          },
        ],
      });
    })
  );

  it.effect("rejects prompts that differ only in numbers", () =>
    Effect.gen(function* () {
      const error = yield* validate([
        [generalRoot(1), prompt("Hitung $$2,5 + 3$$ dari $$10{.}000$$ suara.")],
        [
          generalRoot(2),
          prompt("Hitung $$4 + 7,25$$ dari $$20{.}000$$ suara."),
        ],
      ]).pipe(Effect.flip);

      expect(error).toMatchObject({
        repeats: [
          {
            match: "numbers",
            paths: [promptPath(generalRoot(1)), promptPath(generalRoot(2))],
          },
        ],
      });
    })
  );

  it.effect(
    "reports an exact repeat once and still names its number clone",
    () =>
      Effect.gen(function* () {
        const error = yield* validate([
          [generalRoot(1), prompt("Ada 3 bola merah.")],
          [generalRoot(2), prompt("Ada 3 bola merah.")],
          [generalRoot(3), prompt("Ada 5 bola merah.")],
          [generalRoot(4), prompt("Bola biru berapa?")],
          [generalRoot(5), prompt("Bola biru berapa?")],
        ]).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "QuestionDuplicateError",
          repeats: [
            {
              match: "text",
              paths: [promptPath(generalRoot(1)), promptPath(generalRoot(2))],
            },
            {
              match: "text",
              paths: [promptPath(generalRoot(4)), promptPath(generalRoot(5))],
            },
            {
              match: "numbers",
              paths: [
                promptPath(generalRoot(1)),
                promptPath(generalRoot(2)),
                promptPath(generalRoot(3)),
              ],
            },
          ],
        });
      })
  );

  it.effect("types an unreadable prompt", () =>
    Effect.gen(function* () {
      const repositoryRoot = yield* corpusRoot;
      const error = yield* discoverSyntheticQuestionSources(
        questionEntries(generalRoot(1), generalQuestionSourceFiles),
        yield* itemForQuestion(generalRoot(1))
      ).pipe(
        Effect.flatMap((sources) =>
          validateQuestionUniqueness(repositoryRoot, sources)
        ),
        Effect.provide([makeQuestionSourceLayer([], []), Path.layer]),
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "QuestionReadError",
        path: promptPath(generalRoot(1)),
      });
    })
  );
});
