import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick an accident.")], title: [text("Lab")] };

describe("spill response lab", () => {
  const { props } = assessmentVisuals.SpillResponseLab;
  const lab = {
    ...card,
    incidents: ["eye", "glass"],
    labels: {
      incident: "Accident",
      incidents: {
        eye: "Chemical splashed in the eye",
        glass: "Broken glass beaker",
      },
      step: [text("Step")],
      steps: {
        eye: {
          alert: [text("Call your teacher and go to the eyewash.")],
          help: [text("Get medical help.")],
          open: [text("Hold the eyelids open.")],
          rinse: [text("Rinse for at least 15 minutes.")],
        },
        glass: {
          alert: [text("Tell your teacher.")],
          box: [text("Put the pieces in the broken glass box.")],
          sweep: [text("Sweep up the pieces.")],
        },
      },
      view: "A lab bench with the chosen accident",
    },
  };

  it("checks every incident with its full response", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses no incident, an unknown one, or one listed twice", () => {
    expect(failsStrict(props, { ...lab, incidents: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, incidents: ["flood"] })).toBe(true);
    expect(failsStrict(props, { ...lab, incidents: ["eye", "eye"] })).toBe(
      true
    );
  });

  it("refuses an incident without its response, or a response missing a stage", () => {
    const { glass: _glass, ...steps } = lab.labels.steps;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, steps } })
    ).toBe(true);
    const { rinse: _rinse, ...eye } = lab.labels.steps.eye;
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, steps: { ...lab.labels.steps, eye } },
      })
    ).toBe(true);
  });

  it("refuses a response for an incident the lab does not show", () => {
    expect(
      failsStrict(props, {
        ...lab,
        incidents: ["eye"],
        labels: { ...lab.labels, incidents: { eye: "Eye" } },
      })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("SpillResponseLab", lab)).toEqual([]);
  });
});
