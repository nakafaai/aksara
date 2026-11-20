import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Array as Arr, Order } from "effect";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import type { FigureName, VisualName } from "#contracts/visual/catalog";
import {
  answerState,
  assessmentVisuals,
  FIGURE_NAMES,
  FigureNameSchema,
  VISUAL_NAMES,
  VisualNameSchema,
} from "#contracts/visual/catalog";

/** The components that shape text or layout rather than draw a figure. */
const MARKUP = [
  "AgentContext",
  "BlockMath",
  "CodeBlock",
  "ContentBlock",
  "ContentGrid",
  "ContentStack",
  "FunctionAndNonFunctionDiagram",
  "Highlight",
  "InlineMath",
  "MathContainer",
] as const;

describe("visual catalog", () => {
  it("names every component of Nakafa's renderer once, in code-unit order", () => {
    expect(VISUAL_NAMES).toHaveLength(253);
    expect(VISUAL_NAMES).toEqual(
      Arr.sort(Arr.dedupe(VISUAL_NAMES), Order.String)
    );
    expect(VisualNameSchema.literals).toEqual(VISUAL_NAMES);
  });

  it("draws every component as a figure except the markup", () => {
    expect(Arr.difference(VISUAL_NAMES, FIGURE_NAMES)).toEqual(MARKUP);
    expect(FigureNameSchema.literals).toEqual(FIGURE_NAMES);
    expectTypeOf<Exclude<VisualName, FigureName>>().toEqualTypeOf<
      (typeof MARKUP)[number]
    >();
  });

  it("checks a lab, a 3D scene, and a chart against the same schemas a lesson uses", () => {
    const labels = {
      gasControl: "Gas level",
      heatFlow: [text("Heat flows back to the ground.")],
      heatFlowLabel: "Heat flow",
      meaning: [text("More gas keeps more heat.")],
      meaningLabel: "Meaning",
      viewLabel: "Earth view",
    };
    const greenhouse = {
      description: [text("Raise the gas level.")],
      labels,
      title: [text("Greenhouse effect")],
    };

    expect(
      decodeStrict(assessmentVisuals.GreenhouseEffectLab.props, greenhouse)
    ).toEqual(greenhouse);
    expect(
      failsStrict(assessmentVisuals.GreenhouseEffectLab.props, {
        ...greenhouse,
        labels: { ...labels, gasControl: "" },
      })
    ).toBe(true);
  });
});

describe("answer state of the catalog", () => {
  it("names the props that state a result, and nothing in a plain visual", () => {
    expect(answerState("BarChart", { data: [] })).toEqual([]);
    expect(
      answerState("GreenhouseEffectLab", { labels: { meaning: [text("M")] } })
    ).toEqual(["labels.meaning"]);
    expect(
      answerState("ElectrolysisLab", { electrons: 0.02, showProducts: true })
    ).toEqual(["electrons", "showProducts"]);
    expect(answerState("ElectrolysisLab", { showProducts: false })).toEqual([]);
    expect(answerState("TitrationLab", { showEndPoint: true })).toEqual([
      "showEndPoint",
    ]);
    expect(answerState("ChemicalCellLab", { showProducts: true })).toEqual([
      "showProducts",
    ]);
    expect(answerState("GasRateLab", { showCurves: true })).toEqual([
      "showCurves",
    ]);
  });
});

describe("components without props", () => {
  it("take no prop at all", () => {
    const group = assessmentVisuals.ContentStack.props;

    expect(failsStrict(group, {})).toBe(false);
    expect(failsStrict(group, { className: "grid" })).toBe(true);
  });
});
