import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("vertebra lab", () => {
  const { props } = assessmentVisuals.VertebraLab;
  const lab = {
    ...card,
    labels: {
      count: [text("How many")],
      fused: [text("Fused")],
      job: [text("Its job")],
      no: [text("no")],
      parts: {
        body: "Body",
        canal: "Neural canal",
        dens: "Dens",
        disc: "Disc",
        facet: "Rib facet",
        foramen: "Artery hole",
        spinous: "Spinous process",
        transverse: "Transverse process",
      },
      region: "Region",
      regions: {
        atlas: { job: [text("Holds up the skull")], name: "Atlas" },
        lumbar: { job: [text("Carries weight")], name: "Lumbar vertebra" },
      },
      view: "A vertebral column",
      yes: [text("yes")],
    },
    regions: ["atlas", "lumbar"],
  };

  it("checks a lab whose picked regions are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses none, an unknown one, or one picked twice", () => {
    expect(failsStrict(props, { ...lab, regions: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, regions: ["neck"] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, regions: [...lab.regions, lab.regions[0]] })
    ).toBe(true);
  });

  it("refuses words missing for a picked one, or words for one not shown", () => {
    expect(
      failsStrict(props, { ...lab, regions: lab.regions.slice(0, 1) })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          regions: {
            ...lab.labels.regions,
            sacral: { job: [text("Fuses")], name: "Sacral" },
          },
        },
      })
    ).toBe(true);
  });

  it("refuses a missing fixed word", () => {
    const { parts: _missing, ...rest } = lab.labels;
    expect(failsStrict(props, { ...lab, labels: rest })).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("VertebraLab", lab)).toEqual([]);
  });
});
