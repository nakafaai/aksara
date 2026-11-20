import { assert, describe, it } from "@effect/vitest";
import { HashSet } from "effect";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { keptScenes, withoutSceneData } from "#nakafa-content/points/figure";
import { lesson, lineFigure } from "#nakafa-content/points/test/lesson";

/** Reads one lesson as the gate compares it, scene data left out. */
function read(...blocks: readonly string[]) {
  const source = lesson(...blocks);
  return withoutSceneData(source, parseLessonMdx(source));
}

describe("figure corrections", () => {
  it("reads two versions that differ only in a figure's scene data as the same", () => {
    assert.strictEqual(read(lineFigure(1)), read(lineFigure(2)));
    assert.notInclude(read(lineFigure(1)), "objects");
  });

  it("keeps every word the learner reads around and inside a figure", () => {
    assert.notStrictEqual(read(lineFigure(1)), read(lineFigure(1, "A ramp")));
    assert.notStrictEqual(
      read(lineFigure(1)),
      read(lineFigure(1), "One more line.")
    );
  });

  it("keeps a lesson out of the bar only when it keeps every custom scene", () => {
    /** One lesson's count in English, naming the first `count` scenes. */
    const scenes = (name: string, count: number) => ({
      lesson: name,
      locale: "en",
      scenes: ["ALab", "BLab", "CLab"].slice(0, count),
    });
    const corrected = HashSet.make("l/kept", "l/grown", "l/dropped");

    assert.deepStrictEqual(
      [
        ...keptScenes(
          corrected,
          [scenes("l/kept", 1), scenes("l/grown", 2), scenes("l/dropped", 0)],
          [scenes("l/kept", 1), scenes("l/grown", 1), scenes("l/dropped", 1)]
        ),
      ].sort(),
      ["l/grown", "l/kept"]
    );
  });
});
