import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { FigureNodeSchema, ImageSchema } from "#contracts/assessment/figure";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { diagramFigure, tankFigure } from "#contracts/test/assessment/figure";

const FIGURES = [tankFigure, diagramFigure];

/** A lab of the catalog, placed as a figure the way a lesson places it. */
const labFigure = {
  attrs: {
    alt: "A rocket that passes gates once every second.",
    caption: null,
    component: "AccelerationLab",
    props: {
      description: [text("Compare the gaps between the gates.")],
      labels: {
        chooseCase: "Choose a motion",
        factLabels: {
          acceleration: [text("Acceleration")],
          finalVelocity: [text("Final velocity")],
          initialVelocity: [text("Initial velocity")],
          timeStep: [text("Time step")],
        },
        scenarioNames: {
          "slow-down": [text("Slowing down")],
          "speed-up": [text("Speeding up")],
          steady: [text("Steady")],
        },
        viewLabel: "Rocket view",
      },
      title: [text("Rocket acceleration")],
    },
  },
  type: "figure",
};

describe("figure nodes", () => {
  it("decodes a figure of any catalog component, a lab as well as a chart", () => {
    for (const figure of [...FIGURES, labFigure]) {
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

  it("names a figure of the catalog, never markup or an unknown component", () => {
    for (const component of ["Highlight", "BlockMath", "Unknown"]) {
      expect(
        failsStrict(FigureNodeSchema, {
          ...tankFigure,
          attrs: { ...tankFigure.attrs, component },
        })
      ).toBe(true);
    }
  });

  it("checks the props of each figure against its catalog schema", () => {
    for (const figure of [...FIGURES, labFigure]) {
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
