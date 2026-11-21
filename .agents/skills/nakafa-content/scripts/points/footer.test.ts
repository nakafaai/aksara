import { assert, describe, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  findMissingFooters,
  requiresVisualFooter,
} from "#nakafa-content/points/footer";

describe("requiresVisualFooter", () => {
  it("requires a footer on every catalog figure card except Youtube", () => {
    for (const name of [
      "MathVisual",
      "VirusStructureLab",
      "BarChart",
      "Mermaid",
    ]) {
      assert.isTrue(requiresVisualFooter(name), name);
    }
    for (const name of [
      "Youtube",
      "ContentBlock",
      "InlineMath",
      "BlockMath",
      "div",
    ]) {
      assert.isFalse(requiresVisualFooter(name), name);
    }
  });
});

describe("findMissingFooters", () => {
  it("passes figures with a non-empty authored footer and ignores Youtube and layout", () => {
    const source = [
      "<MathVisual title={<>Line</>} description={<>Slope.</>} footer={<>Watch the steepness rise.</>} scene={{}} />",
      '<VirusStructureLab title={<>Virus</>} description={<>Coat.</>} footer="Rotate the capsid to see its symmetry." />',
      '<Youtube videoId="abc123" />',
      "<ContentBlock>",
      "<Mermaid title={<>Flow</>} description={<>Steps.</>} footer={<>Follow each arrow left to right.</>} chart={`graph LR; A-->B`} />",
      "</ContentBlock>",
    ].join("\n");
    assert.deepStrictEqual(findMissingFooters(parseLessonMdx(source)), []);
  });

  it("reports missing or blank footers on direct and expression-wrapped visual cards", () => {
    const source = [
      "<MathVisual title={<>Line</>} description={<>Slope.</>} scene={{}} />",
      "<VirusStructureLab title={<>Virus</>} description={<>Coat.</>} footer={<>   </>} />",
      '<BarChart title={<>Bars</>} description={<>Counts.</>} footer="" />',
      "{<CellCutawayLab title={<>Cell</>} description={<>Parts.</>} />}",
      "{<HeartCycleLab title={<>Heart</>} description={<>Beat.</>} footer={<>Watch the valves snap shut.</>} />}",
      '{<FunctionMachine title={<>Map</>} description={<>Input.</>} footer="Each input maps once." />}',
      '{<Mermaid title={<>Flow</>} description={<>Steps.</>} footer="" chart="graph LR; A-->B" />}',
      "{<ContentBlock />}",
    ].join("\n");
    assert.deepStrictEqual(
      findMissingFooters(parseLessonMdx(source)).map(({ line, rule }) => [
        line,
        rule,
      ]),
      [
        [1, "missing-visual-footer"],
        [2, "missing-visual-footer"],
        [3, "missing-visual-footer"],
        [4, "missing-visual-footer"],
        [7, "missing-visual-footer"],
      ]
    );
  });

  it("rejects dynamic empty footer expressions and preserves non-figure expressions", () => {
    const source = [
      "<VirusStructureLab footer={undefined} />",
      "<VirusStructureLab footer />",
      "<VirusStructureLab footer={<>First <b>second</b></>} />",
      "{<VirusStructureLab {...props} footer /> }",
      "{<VirusStructureLab {...props} footer={<>Shown <b>here</b></>} /> }",
      "{<UnknownWidget />}",
    ].join("\n");
    assert.deepStrictEqual(
      findMissingFooters(parseLessonMdx(source)).map(({ line, rule }) => [
        line,
        rule,
      ]),
      [
        [1, "missing-visual-footer"],
        [2, "missing-visual-footer"],
        [4, "missing-visual-footer"],
      ]
    );
    // Synthetic MDX node without source position or attributes still reports line 1.
    assert.deepStrictEqual(
      findMissingFooters({
        children: [{ name: "VirusStructureLab", type: "mdxJsxFlowElement" }],
        type: "root",
      }).map(({ column, line, rule }) => [line, column, rule]),
      [[1, 1, "missing-visual-footer"]]
    );
  });
});
