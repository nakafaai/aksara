import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick a plane.")], title: [text("Lab")] };

const body = {
  pair: "Direction pair",
  pairs: {
    front: { meaning: [text("Front or back")], name: "Anterior and posterior" },
    limb: {
      meaning: [text("Near or far from the joint")],
      name: "Proximal and distal",
    },
    side: {
      meaning: [text("Near or far from the midline")],
      name: "Medial and lateral",
    },
    vertical: {
      meaning: [text("Head or feet")],
      name: "Superior and inferior",
    },
  },
  plane: "Plane",
  planes: {
    frontal: { name: "Frontal plane", separates: [text("Front and back")] },
    sagittal: { name: "Sagittal plane", separates: [text("Left and right")] },
    transverse: {
      name: "Horizontal plane",
      separates: [text("Upper and lower")],
    },
  },
};

const stem = {
  section: "Section",
  sections: {
    longitudinal: "Longitudinal section",
    transverse: "Transverse section",
  },
};

describe("body planes lab", () => {
  const { props } = assessmentVisuals.BodyPlanesLab;
  const words = {
    position: "Cut position",
    subject: "Specimen",
    view: "A human body with a cutting plane",
  };
  const lab = {
    ...card,
    labels: {
      ...words,
      ...body,
      ...stem,
      subjects: { body: "Human body", stem: "Dicot stem" },
    },
    subjects: ["body", "stem"],
  };

  it("checks the body and the stem together, and each alone with its own words", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    const bodyOnly = {
      ...card,
      labels: { ...words, ...body, subjects: { body: "Human body" } },
      subjects: ["body"],
    };
    expect(decodeStrict(props, bodyOnly)).toEqual(bodyOnly);
    const stemOnly = {
      ...card,
      labels: { ...words, ...stem, subjects: { stem: "Dicot stem" } },
      subjects: ["stem"],
    };
    expect(decodeStrict(props, stemOnly)).toEqual(stemOnly);
  });

  it("refuses the body without its planes, or the stem without its sections", () => {
    const { planes: _planes, ...noPlanes } = lab.labels;
    expect(failsStrict(props, { ...lab, labels: noPlanes })).toBe(true);
    const { sections: _sections, ...noSections } = lab.labels;
    expect(failsStrict(props, { ...lab, labels: noSections })).toBe(true);
  });

  it("refuses words for a subject the lab does not show", () => {
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, subjects: { body: "Human body" } },
        subjects: ["body"],
      })
    ).toBe(true);
  });

  it("refuses no subject or one listed twice", () => {
    expect(failsStrict(props, { ...lab, subjects: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, subjects: ["body", "body"] })).toBe(
      true
    );
  });

  it("holds no answer state", () => {
    expect(answerState("BodyPlanesLab", lab)).toEqual([]);
  });
});
