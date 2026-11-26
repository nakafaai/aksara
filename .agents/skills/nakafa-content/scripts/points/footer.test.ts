import { assert, describe, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  findBannedFooters,
  isCatalogVisual,
} from "#nakafa-content/points/footer";

describe("isCatalogVisual", () => {
  it("recognises Visual Catalog figures and ignores layout and prose elements", () => {
    for (const name of [
      "MathVisual",
      "YogurtLab",
      "BarChart",
      "Mermaid",
      "VirusStructureLab",
    ]) {
      assert.isTrue(isCatalogVisual(name), name);
    }
    for (const name of ["ContentBlock", "InlineMath", "BlockMath", "div"]) {
      assert.isFalse(isCatalogVisual(name), name);
    }
  });
});

describe("findBannedFooters", () => {
  it("passes catalog figures without a footer prop and ignores non-visual elements", () => {
    const source = [
      "<MathVisual title={<>Line</>} description={<>Slope.</>} scene={{}} />",
      "<YogurtLab title={<>Yogurt</>} description={<>Fermentation.</>} />",
      "<VirusStructureLab title={<>Virus</>} description={<>Coat.</>} />",
      '<Youtube videoId="abc123" />',
      '<ContentBlock footer="ok">',
      "<Mermaid title={<>Flow</>} description={<>Steps.</>} chart={`graph LR; A-->B`} />",
      "</ContentBlock>",
    ].join("\n");
    assert.deepStrictEqual(findBannedFooters(parseLessonMdx(source)), []);
  });

  it("rejects plain-text footer props on direct and expression-wrapped catalog visuals", () => {
    const source = [
      "<MathVisual title={<>Line</>} description={<>Slope.</>} footer={<>Watch the steepness rise.</>} scene={{}} />",
      '<YogurtLab title={<>Yogurt</>} description={<>Fermentation.</>} footer="Slide temperature." />',
      '<BarChart title={<>Bars</>} description={<>Counts.</>} footer="" />',
      "{<CellCutawayLab title={<>Cell</>} description={<>Parts.</>} />}",
      "{<HeartCycleLab title={<>Heart</>} description={<>Beat.</>} footer={<>Watch valves.</>} />}",
      '{<FunctionMachine {...props} title={<>Map</>} description={<>Input.</>} footer="Each input maps once." />}',
      "{<UnknownWidget footer={<>Allowed</>} />}",
      "{<ContentBlock />}",
    ].join("\n");
    assert.deepStrictEqual(
      findBannedFooters(parseLessonMdx(source)).map(({ line, rule }) => [
        line,
        rule,
      ]),
      [
        [1, "banned-visual-footer"],
        [2, "banned-visual-footer"],
        [3, "banned-visual-footer"],
        [5, "banned-visual-footer"],
        [6, "banned-visual-footer"],
      ]
    );
  });

  it("handles synthetic MDX nodes without source position or attributes", () => {
    assert.deepStrictEqual(
      findBannedFooters({
        children: [
          { name: "YogurtLab", type: "mdxJsxFlowElement" },
          {
            attributes: [{ name: "footer", type: "mdxJsxAttribute" }],
            name: "YogurtLab",
            type: "mdxJsxFlowElement",
          },
        ],
        type: "root",
      }).map(({ column, line, rule }) => [line, column, rule]),
      [[1, 1, "banned-visual-footer"]]
    );
  });
});
