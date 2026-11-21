import { NodeServices } from "@effect/platform-node";
import { assert, describe, it, layer } from "@effect/vitest";
import { Effect, HashSet, Option } from "effect";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { runMain } from "#nakafa-content/points/check";
import { inspectDocument } from "#nakafa-content/points/document";
import {
  isSceneVisual,
  lessonOf,
  lessonScenes,
  sceneShortfalls,
  unknownStandardVisuals,
} from "#nakafa-content/points/scene";
import { capture } from "#nakafa-content/points/test/console";
import {
  COMPUTED_CURVE,
  lesson,
  lineFigure,
} from "#nakafa-content/points/test/lesson";
import {
  commitAll,
  createRepository,
  git,
  writeFiles,
} from "#nakafa-content/points/test/repository";

/** Parses and inspects one lesson section that holds the given blocks. */
function parse(...blocks: readonly string[]) {
  return inspectDocument(parseLessonMdx(lesson(...blocks)));
}

/** Writes one self-closing catalog element, with an optional footer prop. */
const element = (name: string, withFooter = true) =>
  withFooter
    ? `<${name} title="${name}" description="A ${name}." footer={<>Notice the main detail in ${name}.</>} />`
    : `<${name} title="${name}" description="A ${name}." />`;

const ROOT = "packages/corpus/material/lesson/biology/cells";
const SECTION = `${ROOT}/membrane`;
const SECTION_FILE = `${SECTION}/en.mdx`;
const SIBLING_FILE = `${ROOT}/organelle/en.mdx`;
const ARTICLE_FILE = "packages/corpus/articles/politics/parabola/en.mdx";

/** Real Git repositories take longer than a pure unit test on a busy runner. */
const GIT_TIMEOUT = 30_000;

const BELOW_SUMMARY =
  /^Points check found 1 lesson\(s\) below the custom scene bar, compared with [0-9a-f]{7}\.$/u;

/** Commits the given files as the base of a new repository and returns it. */
const commitBase = Effect.fn("SceneTest.commitBase")(function* (
  files: Readonly<Record<string, string>>
) {
  const root = yield* createRepository();
  yield* writeFiles(root, files);
  yield* commitAll(root, "base");
  return root;
});

describe("custom scene names", () => {
  it("counts the catalog's custom 3D, p5, and animated figures", () => {
    for (const name of ["VirusStructureLab", "FunctionMachine"]) {
      assert.isTrue(isSceneVisual(name), name);
    }
  });

  it("never counts MathVisual, charts, Mermaid, video, layout, or tables", () => {
    for (const name of [
      "BarChart",
      "Chart",
      "ContentStack",
      "FunctionChart",
      "HistogramChart",
      "InlineMath",
      "MathVisual",
      "Mermaid",
      "ScatterDiagram",
      "Youtube",
      "table",
      "UnknownLab",
    ]) {
      assert.isFalse(isSceneVisual(name), name);
    }
  });

  it("names only standard visuals that the Visual Catalog holds", () => {
    assert.deepStrictEqual(unknownStandardVisuals(), []);
  });
});

describe("lesson of a section file", () => {
  it("names the lesson folder and the locale of a section file", () => {
    assert.deepStrictEqual(
      lessonOf(`${ROOT}/membrane/id.mdx`),
      Option.some({ lesson: ROOT, locale: "id" })
    );
    assert.deepStrictEqual(
      lessonOf(`/repo/${ROOT}/membrane/de.mdx`),
      Option.some({ lesson: ROOT, locale: "de" })
    );
  });

  it("names nothing for an article, a lesson module, or a shallow file", () => {
    for (const file of [
      "packages/corpus/articles/politics/a/en.mdx",
      `${ROOT}/membrane/section.ts`,
      `${ROOT}/en.mdx`,
    ]) {
      assert.isTrue(Option.isNone(lessonOf(file)), file);
    }
  });
});

describe("lesson scenes", () => {
  it("counts distinct scenes across sections in the weakest locale", () => {
    const lessons = lessonScenes([
      [
        `${ROOT}/membrane/en.mdx`,
        parse(element("VirusStructureLab"), element("MathVisual")),
      ],
      [
        `${ROOT}/organelle/en.mdx`,
        parse(element("VirusStructureLab"), element("FunctionMachine")),
      ],
      [`${ROOT}/membrane/id.mdx`, parse(element("VirusStructureLab"))],
      [`${ROOT}/organelle/id.mdx`, parse(element("Mermaid"))],
      ["packages/corpus/articles/politics/x/en.mdx", parse()],
      [
        "packages/corpus/material/lesson/biology/atoms/shell/en.mdx",
        parse(element("BarChart")),
      ],
    ]);

    assert.deepStrictEqual(lessons, [
      {
        lesson: "packages/corpus/material/lesson/biology/atoms",
        locale: "en",
        scenes: [],
      },
      { lesson: ROOT, locale: "id", scenes: ["VirusStructureLab"] },
    ]);
  });

  it("holds a changed lesson to the bar and notes it below the target", () => {
    /** Names the first given number of distinct scenes. */
    const scenes = (count: number) =>
      ["A", "B", "C", "D", "E"].slice(0, count).map((name) => `${name}Lab`);
    const lessons = [
      { lesson: "l/two", locale: "en", scenes: scenes(2) },
      { lesson: "l/three", locale: "en", scenes: scenes(3) },
      { lesson: "l/five", locale: "en", scenes: scenes(5) },
      { lesson: "l/untouched", locale: "en", scenes: [] },
    ];

    assert.deepStrictEqual(
      sceneShortfalls(lessons, HashSet.make("l/two", "l/three", "l/five")),
      [
        { blocking: true, lesson: "l/two", locale: "en", scenes: scenes(2) },
        { blocking: false, lesson: "l/three", locale: "en", scenes: scenes(3) },
      ]
    );
  });
});

vi.setConfig({ testTimeout: GIT_TIMEOUT });

layer(NodeServices.layer, { excludeTestServices: true })(
  "custom scene gate",
  (gate) => {
    gate.effect("fails a new lesson below the custom scene bar", () =>
      Effect.gen(function* () {
        const root = yield* commitBase({ [ARTICLE_FILE]: lesson() });
        yield* writeFiles(root, {
          [SECTION_FILE]: lesson(COMPUTED_CURVE, element("VirusStructureLab")),
        });
        const result = yield* capture(runMain([ROOT, "--base", "HEAD"], root));

        assert.strictEqual(result.code, 1);
        assert.include(
          result.error[0],
          `${ROOT} [custom-scenes] 1 distinct custom scene(s) in en (VirusStructureLab)`
        );
        assert.match(result.error[1] ?? "", BELOW_SUMMARY);
      })
    );

    gate.effect(
      "counts a changed lesson's scenes across every section, even outside the targets",
      () =>
        Effect.gen(function* () {
          const root = yield* commitBase({
            [SECTION_FILE]: lesson(element("VirusStructureLab")),
            [SIBLING_FILE]: lesson(
              element("VirusReplicationLab"),
              element("CellCutawayLab")
            ),
          });
          yield* writeFiles(root, {
            [SECTION_FILE]: lesson(
              element("VirusStructureLab"),
              "One more line."
            ),
          });
          const result = yield* capture(
            runMain([SECTION, "--base", "HEAD"], root)
          );

          assert.strictEqual(result.code, 0);
          assert.deepStrictEqual(result.error, []);
          assert.include(
            result.log[0],
            `${ROOT} [review: custom-scenes] 3 distinct custom scenes in en (CellCutawayLab, VirusReplicationLab, VirusStructureLab); aim for 5.`
          );
        })
    );

    gate.effect(
      "passes a lesson below the bar whose change only corrects a figure's scene data",
      () =>
        Effect.gen(function* () {
          const root = yield* commitBase({
            [SECTION_FILE]: lesson(
              element("VirusStructureLab", false),
              lineFigure(1)
            ),
            [SIBLING_FILE]: lesson(element("CellCutawayLab")),
          });
          yield* writeFiles(root, {
            [SECTION_FILE]: lesson(
              element("VirusStructureLab", false),
              lineFigure(2)
            ),
          });
          const result = yield* capture(
            runMain([ROOT, "--base", "HEAD"], root)
          );

          assert.strictEqual(result.code, 0);
          assert.deepStrictEqual(result.error, []);
        })
    );

    gate.effect(
      "holds a lesson to the bar when its change also revises its text",
      () =>
        Effect.gen(function* () {
          const root = yield* commitBase({
            [SECTION_FILE]: lesson(element("VirusStructureLab"), lineFigure(1)),
            [SIBLING_FILE]: lesson(element("CellCutawayLab")),
          });
          yield* writeFiles(root, {
            [SECTION_FILE]: lesson(
              element("VirusStructureLab"),
              lineFigure(2),
              "One more line."
            ),
          });
          const result = yield* capture(
            runMain([ROOT, "--base", "HEAD"], root)
          );

          assert.strictEqual(result.code, 1);
          assert.include(
            result.error[0],
            `${ROOT} [custom-scenes] 2 distinct custom scene(s) in en (CellCutawayLab, VirusStructureLab)`
          );
        })
    );

    gate.effect("passes when a change removes a whole lesson", () =>
      Effect.gen(function* () {
        const root = yield* commitBase({
          [ARTICLE_FILE]: lesson(),
          [SECTION_FILE]: lesson(element("CellCutawayLab")),
        });
        yield* git(root, "rm", "-q", "-r", ROOT);
        const result = yield* capture(
          runMain(["packages/corpus", "--base", "HEAD"], root)
        );

        assert.strictEqual(result.code, 0);
        assert.deepStrictEqual(result.error, []);
      })
    );
  }
);
