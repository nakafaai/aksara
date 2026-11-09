import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Path, String as Str } from "effect";
import { corpusRoot } from "#corpus/test/root";
import { loadTryoutContent } from "#corpus/tryout/content";

/**
 * Counts the try-out bank on disk, apart from the loader: its set folders,
 * and in every set its question folders and its reading folders. A file of
 * the bank sits at `country/exam/section/set/folder/file`.
 */
const countBank = Effect.fn("test.countBank")(function* (root: string) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const listed = yield* fileSystem.readDirectory(
    path.join(root, "packages", "corpus", "question-bank", "tryout"),
    { recursive: true }
  );
  const files = Arr.filter(
    Arr.map(listed, (entry) => Str.split(entry, path.sep)),
    (segments) => Arr.length(segments) === 6
  );
  const folders = Arr.dedupe(
    Arr.map(files, (segments) => Arr.join(Arr.take(segments, 5), "/"))
  );
  const questions = Arr.filter(folders, (folder) =>
    Str.startsWith("question-")(Arr.lastNonEmpty(Str.split(folder, "/")))
  );
  return {
    questions: Arr.length(questions),
    readings: Arr.length(folders) - Arr.length(questions),
    sets: Arr.length(
      Arr.dedupe(
        Arr.map(files, (segments) => Arr.join(Arr.take(segments, 4), "/"))
      )
    ),
  };
});

describe("loadTryoutContent", () => {
  it.effect(
    "reads, checks, and plans every question of every active exam",
    () =>
      Effect.gen(function* () {
        const root = yield* corpusRoot;
        const { exams, papers, sets } = yield* loadTryoutContent(root);
        const bank = yield* countBank(root);
        const questions = Arr.flatMap(sets, (set) => set.questions);

        expect(Arr.map(exams, ({ examKey }) => examKey)).toEqual([
          "snbt",
          "tka",
          "entrance-examination",
        ]);
        expect(sets).toHaveLength(bank.sets);
        expect(questions).toHaveLength(bank.questions);
        expect(Arr.flatMap(sets, ({ stimuli }) => stimuli)).toHaveLength(
          bank.readings
        );
        expect(papers).toHaveLength(
          Arr.length(
            Arr.flatMap(exams, (exam) =>
              Arr.flatMap(exam.tracks, (track) => track.sets)
            )
          )
        );
        expect(
          Arr.reduce(papers, 0, (total, { sections }) =>
            Arr.reduce(
              sections,
              total,
              (sum, { set }) => sum + set.questions.length
            )
          )
        ).toBe(Arr.length(questions));
      }).pipe(Effect.provide(NodeServices.layer)),
    120_000
  );
});
