import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick an item.")], title: [text("Lab")] };

/** The words of one item: its name, what it is for and how to handle it. */
function entry(name: string) {
  return {
    care: [text(`Handle the ${name} with care.`)],
    name,
    use: [text(`What the ${name} is for.`)],
  };
}

describe("lab equipment lab", () => {
  const { props } = assessmentVisuals.LabEquipmentLab;
  const lab = {
    ...card,
    items: ["beaker", "goggles", "eyewash"],
    labels: {
      care: "How to handle it",
      categories: {
        apparatus: "Apparatus",
        protective: "Personal protection",
        safety: "Safety equipment",
      },
      category: "Group",
      item: "Item",
      items: {
        beaker: entry("Beaker"),
        eyewash: entry("Eyewash station"),
        goggles: entry("Safety goggles"),
      },
      use: "What it's for",
      view: "A corner of a school biology lab",
    },
  };

  it("checks a lab whose items are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    const single = {
      ...lab,
      items: ["microscope"],
      labels: {
        ...lab.labels,
        items: { microscope: entry("Light microscope") },
      },
    };
    expect(decodeStrict(props, single)).toEqual(single);
  });

  it("refuses no item, an unknown item or an item named twice", () => {
    expect(failsStrict(props, { ...lab, items: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, items: ["kettle"] })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        items: ["beaker", "beaker", "goggles", "eyewash"],
      })
    ).toBe(true);
  });

  it("refuses an item without words, or words for an item the lab does not show", () => {
    const { eyewash: _eyewash, ...missing } = lab.labels.items;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, items: missing } })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          items: { ...lab.labels.items, gloves: entry("Gloves") },
        },
      })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("LabEquipmentLab", lab)).toEqual([]);
  });
});
