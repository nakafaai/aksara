import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import {
  FigureNodeSchema,
  ImageSchema,
  LineEquationPropsSchema,
  MathVisualPropsSchema,
  NumberLinePropsSchema,
} from "#contracts/assessment/figure";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import {
  circleFigure,
  diagramFigure,
  lineFigure,
  lineProps,
  numberLineFigure,
  numberLineProps,
  tankFigure,
  tankProps,
} from "#contracts/test/assessment/figure";

const FIGURES = [
  tankFigure,
  numberLineFigure,
  lineFigure,
  diagramFigure,
  circleFigure,
];

describe("figure nodes", () => {
  it("decodes one figure of each of the five components with the props the corpus uses", () => {
    for (const figure of FIGURES) {
      const decoded = decodeStrict(FigureNodeSchema, figure);

      expect(Schema.encodeSync(FigureNodeSchema)(decoded)).toEqual(figure);
    }
  });

  it("requires a text alternative on every figure", () => {
    for (const figure of FIGURES) {
      const { alt: _alt, ...withoutAlt } = figure.attrs;

      expect(
        failsStrict(FigureNodeSchema, { ...figure, attrs: withoutAlt })
      ).toBe(true);
      for (const alt of ["", " "]) {
        expect(
          failsStrict(FigureNodeSchema, {
            ...figure,
            attrs: { ...figure.attrs, alt },
          })
        ).toBe(true);
      }
    }
  });

  it("accepts only the five components and types the props of each", () => {
    expect(
      failsStrict(FigureNodeSchema, {
        ...tankFigure,
        attrs: { ...tankFigure.attrs, component: "Chart" },
      })
    ).toBe(true);
    for (const figure of FIGURES) {
      expect(
        failsStrict(FigureNodeSchema, {
          ...figure,
          attrs: { ...figure.attrs, props: {} },
        })
      ).toBe(true);
      expect(
        failsStrict(FigureNodeSchema, {
          ...figure,
          attrs: {
            ...figure.attrs,
            props: { ...figure.attrs.props, onClick: "alert(1)" },
          },
        })
      ).toBe(true);
    }
    expect(
      failsStrict(FigureNodeSchema, {
        ...diagramFigure,
        attrs: {
          ...diagramFigure.attrs,
          props: { ...diagramFigure.attrs.props, chart: "" },
        },
      })
    ).toBe(true);
  });

  it("holds the caption as rich text or null", () => {
    for (const caption of [[text("Tangki")], null]) {
      expect(
        failsStrict(FigureNodeSchema, {
          ...tankFigure,
          attrs: { ...tankFigure.attrs, caption },
        })
      ).toBe(false);
    }
    for (const caption of [[], "Tangki"]) {
      expect(
        failsStrict(FigureNodeSchema, {
          ...tankFigure,
          attrs: { ...tankFigure.attrs, caption },
        })
      ).toBe(true);
    }
  });
});

describe("MathVisual props", () => {
  const { height: _height, ...fewer } = tankProps.labels;
  const extra = { depth: [text("d")] };

  it("needs one rich label for each label anchor of the scene", () => {
    expect(failsStrict(MathVisualPropsSchema, tankProps)).toBe(false);
    for (const labels of [
      fewer,
      { ...tankProps.labels, ...extra },
      { ...fewer, ...extra },
    ]) {
      expect(failsStrict(MathVisualPropsSchema, { ...tankProps, labels })).toBe(
        true
      );
    }
  });

  it("reuses the strict scene contract", () => {
    expect(
      failsStrict(MathVisualPropsSchema, {
        ...tankProps,
        scene: { ...tankProps.scene, space: "line" },
      })
    ).toBe(true);
  });
});

describe("NumberLine props", () => {
  const [first, second] = numberLineProps.segments;

  it("writes infinity as a word, because JSON cannot hold it", () => {
    expect(failsStrict(NumberLinePropsSchema, numberLineProps)).toBe(false);
    for (const start of [Number.NEGATIVE_INFINITY, "infinity"]) {
      expect(
        failsStrict(NumberLinePropsSchema, {
          ...numberLineProps,
          segments: [{ ...first, start }],
        })
      ).toBe(true);
    }
  });

  it("keeps a segment and the visible range running upward", () => {
    expect(
      failsStrict(NumberLinePropsSchema, {
        ...numberLineProps,
        segments: [{ ...second, end: -4, start: 7 }],
      })
    ).toBe(true);
    expect(
      failsStrict(NumberLinePropsSchema, {
        ...numberLineProps,
        segments: [{ ...second, end: 7, start: 7 }],
      })
    ).toBe(false);
    expect(
      failsStrict(NumberLinePropsSchema, {
        ...numberLineProps,
        max: -5,
        min: 9,
      })
    ).toBe(true);
    const { max: _max, min: _min, ...withoutRange } = numberLineProps;

    expect(failsStrict(NumberLinePropsSchema, withoutRange)).toBe(false);
  });

  it("allows a background of transparent only, because color carries no meaning", () => {
    expect(
      failsStrict(NumberLinePropsSchema, {
        ...numberLineProps,
        segments: [{ ...second, backgroundColor: "#ff0000" }],
      })
    ).toBe(true);
  });
});

describe("LineEquation props", () => {
  const [first, second] = lineProps.data;

  it("needs every point index and label place to name a point", () => {
    expect(failsStrict(LineEquationPropsSchema, lineProps)).toBe(false);
    for (const line of [
      { ...second, pointIndices: [0, 4] },
      { ...first, labels: [{ at: 4, text: [text("D")] }] },
    ]) {
      expect(
        failsStrict(LineEquationPropsSchema, { ...lineProps, data: [line] })
      ).toBe(true);
    }
    expect(
      failsStrict(LineEquationPropsSchema, {
        ...lineProps,
        data: [{ ...first, labels: [{ text: [text("D")] }] }],
      })
    ).toBe(false);
    expect(
      failsStrict(LineEquationPropsSchema, {
        ...lineProps,
        data: [{ color: "#9333ea", points: [{ x: 0, y: 0, z: 0 }] }],
      })
    ).toBe(false);
  });

  it("leaves out the circle shapes that only lessons draw", () => {
    expect(
      failsStrict(LineEquationPropsSchema, {
        ...lineProps,
        data: [
          {
            color: "#9333ea",
            kind: "circle-arc",
            radius: 1,
            startDegrees: 0,
            sweepDegrees: 90,
          },
        ],
      })
    ).toBe(true);
  });
});

describe("images", () => {
  const image = {
    alt: "Sebuah tangki kubus",
    asset: "asset-tank",
    height: 240,
    width: 320,
  };

  it("needs a text alternative and a pixel size", () => {
    const { alt: _alt, ...withoutAlt } = image;
    const { width: _width, ...withoutWidth } = image;

    expect(failsStrict(ImageSchema, image)).toBe(false);
    for (const input of [
      withoutAlt,
      withoutWidth,
      { ...image, height: 0 },
      { ...image, width: 1.5 },
    ]) {
      expect(failsStrict(ImageSchema, input)).toBe(true);
    }
  });
});
