import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, HashMap, Option, Record as Rec } from "effect";
import {
  answerSection,
  checkExplanations,
  explanationKinds,
  explanationReport,
  holdsFigure,
  meetsKind,
} from "#scripts/check/explanations";
import {
  inDirectory,
  makeRepository,
  writeFiles,
} from "#scripts/check/fixture";
import { runGit } from "#scripts/git";

/** A physics answer folder, a figure section of the real registry. */
const PHYSICS = "packages/corpus/question-bank/tryout/malaysia/spm/physics";

/** A reading answer folder, an evidence section of the real registry. */
const READING =
  "packages/corpus/question-bank/tryout/indonesia/snbt/literacy-in-english";

const CHART = Arr.join(
  [
    "# Given",
    "",
    'The object starts at rest with speed <InlineMath math="0" />.',
    "",
    "# Asked",
    "",
    "Read the speed at one second.",
    "",
    "# Solution",
    "",
    "Trace the line on the speed chart below.",
    "",
    '<Chart title="Speed" description="Speed over time." categories={["0", "1"]} series={[{ label: "v", mark: "line", values: [0, 2] }]} />',
    "",
    "At one second the line reaches two.",
    "",
    "> The height of a speed graph gives the speed directly at that moment.",
    "",
    "# Answer",
    "",
    'The speed is <InlineMath math="2" />.',
  ],
  "\n"
);
const TEXT_ONLY = '# Work it out\n\nThe speed is <InlineMath math="2" />.\n';
const TABLE =
  "# Compare\n\n| Option | Verdict |\n| --- | --- |\n| A | wrong |\n";
const HIGHLIGHT =
  "# Find the line\n\nThe text says <Highlight>never</Highlight>.\n";

/** Runs Git in the fixture repository as a fixed author. */
const gitIn = (root: string, args: readonly string[]) =>
  runGit(
    ["-c", "user.name=Test", "-c", "user.email=test@example.com", ...args],
    { cwd: root }
  );

/** An explanations check over a fixture: the report alone or the whole gate. */
type Check =
  | ReturnType<typeof explanationReport>
  | ReturnType<typeof checkExplanations>;

/** The files an explanations check failed, or none when it passed. */
const failedFiles = (check: Check) =>
  check.pipe(
    Effect.as(Arr.empty<string>()),
    Effect.catchTag("ExplanationVisualError", (error) =>
      Effect.succeed(Arr.map(error.findings, ({ file }) => file))
    )
  );

describe("answerSection", () => {
  it("names the section of a worked answer and nothing else", () => {
    expect(answerSection(`${PHYSICS}/set-1/question-1/answer.ms.mdx`)).toEqual(
      Option.some("malaysia/spm/physics")
    );
    expect(
      Option.isNone(
        answerSection(`${PHYSICS}/set-1/question-1/question.ms.mdx`)
      )
    ).toBe(true);
  });
});

describe("holdsFigure", () => {
  it("finds a catalog figure and ignores math, marks, and unknown names", () => {
    expect(holdsFigure(CHART)).toBe(true);
    expect(holdsFigure(TEXT_ONLY)).toBe(false);
    expect(holdsFigure(HIGHLIGHT)).toBe(false);
    expect(holdsFigure("<Widget />")).toBe(false);
  });
});

describe("meetsKind", () => {
  it("asks a figure section for a figure and lets an evidence section point at a table or a quotation", () => {
    expect(meetsKind("figure", CHART)).toBe(true);
    expect(meetsKind("figure", TABLE)).toBe(false);
    expect(meetsKind("evidence", CHART)).toBe(true);
    expect(meetsKind("evidence", TABLE)).toBe(true);
    expect(meetsKind("evidence", HIGHLIGHT)).toBe(true);
    expect(meetsKind("evidence", TEXT_ONLY)).toBe(false);
  });
});

describe("explanationKinds", () => {
  it.effect("reads each section's kind from the try-out registry", () =>
    Effect.gen(function* () {
      const kinds = yield* explanationKinds();

      expect(HashMap.get(kinds, "malaysia/spm/physics")).toEqual(
        Option.some("figure")
      );
      expect(HashMap.get(kinds, "indonesia/snbt/literacy-in-english")).toEqual(
        Option.some("evidence")
      );
    })
  );
});

describe("explanationReport", () => {
  const kinds = HashMap.fromIterable([
    ["malaysia/spm/physics", "figure" as const],
    ["indonesia/snbt/literacy-in-english", "evidence" as const],
  ]);

  it.effect(
    "fails a changed answer that shows too little and only counts an untouched one",
    () =>
      Effect.gen(function* () {
        const root = yield* makeRepository();
        const files = {
          [`${PHYSICS}/set-1/question-1/answer.en.mdx`]: CHART,
          [`${PHYSICS}/set-1/question-2/answer.en.mdx`]: TEXT_ONLY,
          [`${PHYSICS}/set-1/question-3/answer.en.mdx`]: TEXT_ONLY,
          [`${PHYSICS}/set-1/question-3/question.en.mdx`]: TEXT_ONLY,
          [`${READING}/set-1/question-1/answer.en.mdx`]: TABLE,
          [`${READING}/set-1/question-2/answer.en.mdx`]: TEXT_ONLY,
        };
        yield* writeFiles(root, files);
        const listed = Rec.keys(files);

        expect(
          yield* inDirectory(
            root,
            failedFiles(explanationReport(listed, [listed[0] ?? ""], kinds))
          )
        ).toEqual([]);
        expect(
          yield* inDirectory(
            root,
            failedFiles(explanationReport(listed, listed, kinds))
          )
        ).toEqual([
          `${PHYSICS}/set-1/question-2/answer.en.mdx`,
          `${PHYSICS}/set-1/question-3/answer.en.mdx`,
          `${READING}/set-1/question-2/answer.en.mdx`,
        ]);
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );

  it.effect("refuses an answer in a section no try-out declares", () =>
    Effect.gen(function* () {
      const root = yield* makeRepository();
      const file =
        "packages/corpus/question-bank/tryout/nowhere/exam/subject/set-1/question-1/answer.en.mdx";
      yield* writeFiles(root, { [file]: CHART });

      const error = yield* inDirectory(
        root,
        explanationReport([file], [], kinds)
      ).pipe(Effect.flip);
      expect(error).toMatchObject({ _tag: "ExplanationSectionError", file });
    }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});

describe("checkExplanations", () => {
  it.effect("holds the answers a change adds to their section's kind", () =>
    Effect.gen(function* () {
      const root = yield* makeRepository();
      yield* writeFiles(root, {
        [`${PHYSICS}/set-1/question-1/answer.en.mdx`]: TEXT_ONLY,
      });
      yield* gitIn(root, ["add", "--", "."]);
      yield* gitIn(root, ["commit", "--quiet", "-m", "base"]);
      yield* gitIn(root, ["branch", "base"]);
      yield* writeFiles(root, {
        [`${PHYSICS}/set-1/question-2/answer.en.mdx`]: CHART,
      });

      expect(
        yield* inDirectory(root, failedFiles(checkExplanations("base")))
      ).toEqual([]);

      yield* writeFiles(root, {
        [`${PHYSICS}/set-1/question-3/answer.en.mdx`]: TEXT_ONLY,
      });
      expect(
        yield* inDirectory(root, failedFiles(checkExplanations("base")))
      ).toEqual([`${PHYSICS}/set-1/question-3/answer.en.mdx`]);
    }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});
