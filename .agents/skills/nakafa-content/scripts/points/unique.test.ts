import { NodeServices } from "@effect/platform-node";
import { assert, describe, it, layer } from "@effect/vitest";
import { Effect, HashSet } from "effect";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { runMain } from "#nakafa-content/points/check";
import { inspectDocument } from "#nakafa-content/points/document";
import { capture } from "#nakafa-content/points/test/console";
import { lesson } from "#nakafa-content/points/test/lesson";
import {
  commitAll,
  createRepository,
  writeFiles,
} from "#nakafa-content/points/test/repository";
import { sceneUniquenessFindings } from "#nakafa-content/points/unique";

/** Parses and inspects one lesson section that holds the given blocks. */
function parse(...blocks: readonly string[]) {
  return inspectDocument(parseLessonMdx(lesson(...blocks)));
}

/** Writes one self-closing catalog element, with an optional banned footer prop. */
const element = (name: string, withFooter = false) =>
  withFooter
    ? `<${name} title="${name}" description="A ${name}." footer={<>Notice the main detail in ${name}.</>} />`
    : `<${name} title="${name}" description="A ${name}." />`;

const ROOT = "packages/corpus/material/lesson/biology/cells";
const OTHER_ROOT = "packages/corpus/material/lesson/biology/viruses";
const SECTION_FILE = `${ROOT}/membrane/en.mdx`;
const OTHER_FILE = `${OTHER_ROOT}/capsid/en.mdx`;
const ARTICLE_FILE = "packages/corpus/articles/politics/parabola/en.mdx";
const GIT_TIMEOUT = 30_000;

/** Commits the given files as the base of a new repository and returns it. */
const commitBase = Effect.fn("UniqueTest.commitBase")(function* (
  files: Readonly<Record<string, string>>
) {
  const root = yield* createRepository();
  yield* writeFiles(root, files);
  yield* commitAll(root, "base");
  return root;
});

describe("sceneUniquenessFindings", () => {
  it("blocks cross-lesson custom visual reuse and within-lesson filler repetition", () => {
    const documents = [
      [
        `${ROOT}/membrane/en.mdx`,
        parse(
          element("VirusStructureLab"),
          element("CellCutawayLab"),
          element("MathVisual"),
          element("MathVisual")
        ),
      ],
      [`${ROOT}/organelle/en.mdx`, parse(element("CellCutawayLab"))],
      [`${OTHER_ROOT}/capsid/en.mdx`, parse(element("VirusStructureLab"))],
      [
        "packages/corpus/material/lesson/biology/a/s/en.mdx",
        parse(element("VirusStructureLab")),
      ],
      [
        "packages/corpus/material/lesson/biology/b/s/en.mdx",
        parse(element("VirusStructureLab")),
      ],
      [
        "packages/corpus/material/lesson/biology/c/s/en.mdx",
        parse(element("VirusStructureLab")),
      ],
      [
        "packages/corpus/material/lesson/biology/empty/s/en.mdx",
        parse(element("MathVisual")),
      ],
      [ARTICLE_FILE, parse(element("VirusStructureLab"))],
    ] as const;

    const findings = sceneUniquenessFindings(documents, HashSet.make(ROOT));
    assert.deepStrictEqual(
      findings.map(({ lesson: lessonPath, rule, scene }) => [
        lessonPath,
        rule,
        scene,
      ]),
      [
        [ROOT, "duplicate-scene-across-lessons", "VirusStructureLab"],
        [ROOT, "repeated-scene-in-lesson", "CellCutawayLab"],
      ]
    );
    assert.include(findings[0]?.message, "and 1 more");
  });

  it("passes when every custom scene belongs to one lesson and appears once per locale", () => {
    const documents = [
      [
        `${ROOT}/membrane/en.mdx`,
        parse(element("CellCutawayLab"), element("MathVisual")),
      ],
      [`${ROOT}/membrane/id.mdx`, parse(element("CellCutawayLab"))],
      [`${OTHER_ROOT}/capsid/en.mdx`, parse(element("VirusStructureLab"))],
    ] as const;

    assert.deepStrictEqual(
      sceneUniquenessFindings(documents, HashSet.make(ROOT, OTHER_ROOT)),
      []
    );
  });
});

vi.setConfig({ testTimeout: GIT_TIMEOUT });

layer(NodeServices.layer, { excludeTestServices: true })(
  "custom visual uniqueness and footer gate",
  (gate) => {
    gate.effect(
      "blocks cross-lesson reuse, within-lesson repetition, and banned footers on changed lessons and --all audits",
      () =>
        Effect.gen(function* () {
          const root = yield* commitBase({
            [OTHER_FILE]: lesson(
              element("VirusStructureLab", true),
              element("HeartCycleLab", false),
              element("SynapseLab")
            ),
          });
          yield* writeFiles(root, {
            [SECTION_FILE]: lesson(
              element("VirusStructureLab"),
              element("CellCutawayLab"),
              element("VirusReplicationLab"),
              element("CellCutawayLab", true)
            ),
          });
          const focused = yield* capture(
            runMain([ROOT, "--base", "HEAD"], root)
          );
          assert.strictEqual(focused.code, 1);
          assert.isTrue(
            focused.error.some((line) =>
              line.includes("[banned-visual-footer]")
            )
          );
          assert.isTrue(
            focused.error.some((line) =>
              line.includes("[duplicate-scene-across-lessons]")
            )
          );
          assert.isTrue(
            focused.error.some((line) =>
              line.includes("[repeated-scene-in-lesson]")
            )
          );

          const auditAll = yield* capture(
            runMain([OTHER_ROOT, "--base", "HEAD", "--all"], root)
          );
          assert.strictEqual(auditAll.code, 1);
          assert.isTrue(
            auditAll.error.some(
              (line) =>
                line.includes(`${OTHER_FILE}:`) &&
                line.includes("[banned-visual-footer]")
            )
          );
        })
    );
  }
);
