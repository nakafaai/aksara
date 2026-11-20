import { assert, describe, it } from "@effect/vitest";
import {
  correctsFiguresOnly,
  withoutSceneData,
} from "#nakafa-content/mdx/figure";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { lesson, lineFigure } from "#nakafa-content/points/test/lesson";

/** One version of a lesson made of the given blocks. */
function version(...blocks: readonly string[]) {
  const source = lesson(...blocks);
  return { source, tree: parseLessonMdx(source) };
}

describe("figure corrections", () => {
  it("cuts a figure's scene data and keeps every word around it", () => {
    const cut = withoutSceneData(version(lineFigure(1)));

    assert.notInclude(cut, "objects");
    assert.include(cut, 'title="A line"');
    assert.include(cut, "The graph of");
  });

  it("calls a change that only moves a figure's scene data a correction", () => {
    assert.isTrue(
      correctsFiguresOnly(version(lineFigure(1)), version(lineFigure(2)))
    );
  });

  it("calls a change to a figure's words or to the text a revision", () => {
    assert.isFalse(
      correctsFiguresOnly(
        version(lineFigure(1)),
        version(lineFigure(1, "A ramp"))
      )
    );
    assert.isFalse(
      correctsFiguresOnly(
        version(lineFigure(1)),
        version(lineFigure(2), "One more line.")
      )
    );
  });
});
