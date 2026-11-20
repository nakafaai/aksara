import { describe, expect, it } from "@effect/vitest";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState } from "#contracts/visual/catalog";
import { numeralVisuals } from "#contracts/visual/mathematics/numeral";

const numeral = numeralVisuals(RichTextSchema);

describe("AbacusBaseLab", () => {
  const lab = {
    bases: [10, 2, 5, 8],
    description: [text("Set a number and watch each spike hold one digit.")],
    labels: {
      base: "Base",
      decimal: [text("Value in base ten")],
      digits: [text("Numeral")],
      expanded: [text("Expanded form")],
      value: "Number",
      viewLabel: "A spike abacus with four spikes",
    },
    showReadout: true,
    title: [text("A spike abacus in any base")],
    value: 1999,
  };

  it("takes the bases to offer and a number the first base can hold", () => {
    expect(decodeStrict(numeral.AbacusBaseLab.props, lab)).toEqual(lab);
  });

  it("refuses a base beyond ten, a repeated base, and a number too large", () => {
    expect(
      failsStrict(numeral.AbacusBaseLab.props, { ...lab, bases: [16] })
    ).toBe(true);
    expect(
      failsStrict(numeral.AbacusBaseLab.props, { ...lab, bases: [10, 10] })
    ).toBe(true);
    expect(
      failsStrict(numeral.AbacusBaseLab.props, { ...lab, bases: [2, 10] })
    ).toBe(true);
    expect(
      failsStrict(numeral.AbacusBaseLab.props, { ...lab, value: 10_000 })
    ).toBe(true);
  });

  it("holds the readout as answer state", () => {
    expect(answerState("AbacusBaseLab", lab)).toEqual(["showReadout"]);
    expect(
      answerState("AbacusBaseLab", { ...lab, showReadout: false })
    ).toEqual([]);
  });
});

describe("BinaryLampLab", () => {
  const lab = {
    bits: 6,
    description: [text("Each lamp is a power of two.")],
    labels: {
      binary: [text("Base two")],
      decimal: [text("Base ten")],
      grouped: [text("Grouped reading")],
      grouping: "Read the bits",
      groups: {
        none: "One by one",
        pairs: "Pairs, base 4",
        triples: "Threes, base 8",
      },
      value: "Number",
      viewLabel: "A panel of six lamps",
    },
    showReadout: true,
    title: [text("Lamps that count in base two")],
    value: 45,
  };

  it("takes a row of lamps and a number it can show", () => {
    expect(decodeStrict(numeral.BinaryLampLab.props, lab)).toEqual(lab);
  });

  it("refuses a row the panel cannot hold and a number too large", () => {
    expect(failsStrict(numeral.BinaryLampLab.props, { ...lab, bits: 9 })).toBe(
      true
    );
    expect(
      failsStrict(numeral.BinaryLampLab.props, { ...lab, value: 64 })
    ).toBe(true);
  });

  it("holds the readout as answer state", () => {
    expect(answerState("BinaryLampLab", lab)).toEqual(["showReadout"]);
    expect(
      answerState("BinaryLampLab", { ...lab, showReadout: false })
    ).toEqual([]);
  });
});

describe("BundleCountLab", () => {
  const lab = {
    bases: [5, 8, 2],
    description: [text("Tie the sticks into bundles and read the digits.")],
    labels: {
      base: "Base",
      count: "Sticks",
      ladder: [text("Repeated division")],
      numeral: [text("In the new base")],
      viewLabel: "A desk of sticks, bundles, boxes and trays",
    },
    showReadout: true,
    title: [text("Bundling a count into base five")],
    value: 237,
  };

  it("takes the bases to offer and a count the first base can hold", () => {
    expect(decodeStrict(numeral.BundleCountLab.props, lab)).toEqual(lab);
  });

  it("refuses a base beyond nine, a repeated base, and a count too large", () => {
    expect(
      failsStrict(numeral.BundleCountLab.props, { ...lab, bases: [10] })
    ).toBe(true);
    expect(
      failsStrict(numeral.BundleCountLab.props, { ...lab, bases: [5, 5] })
    ).toBe(true);
    expect(
      failsStrict(numeral.BundleCountLab.props, { ...lab, bases: [2, 5] })
    ).toBe(true);
    expect(
      failsStrict(numeral.BundleCountLab.props, { ...lab, value: 301 })
    ).toBe(true);
  });

  it("holds the readout as answer state", () => {
    expect(answerState("BundleCountLab", lab)).toEqual(["showReadout"]);
    expect(
      answerState("BundleCountLab", { ...lab, showReadout: false })
    ).toEqual([]);
  });
});
