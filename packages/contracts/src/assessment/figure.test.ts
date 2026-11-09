import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import {
  FigureNodeSchema,
  ImageSchema,
  MathVisualPropsSchema,
} from "#contracts/assessment/figure";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import {
  diagramFigure,
  regionFigure,
  tankFigure,
  tankProps,
} from "#contracts/test/assessment/figure";

const FIGURES = [tankFigure, regionFigure, diagramFigure];

describe("figure nodes", () => {
  it("decodes a space scene, a plane scene with a caption, and a diagram, with the props the corpus uses", () => {
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

  it("refuses the retired number line, line equation and unit circle, which MathVisual draws", () => {
    for (const component of ["LineEquation", "NumberLine", "UnitCircle"]) {
      expect(
        failsStrict(FigureNodeSchema, {
          ...regionFigure,
          attrs: { ...regionFigure.attrs, component },
        })
      ).toBe(true);
    }
  });

  it("accepts only the three components and types the props of each", () => {
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
