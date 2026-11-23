import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("animal locomotion lab", () => {
  const { props } = assessmentVisuals.AnimalLocomotionLab;
  const lab = {
    ...card,
    labels: {
      against: [text("Pushes against")],
      animal: "Animal",
      animals: {
        bird: {
          against: [text("Air")],
          name: "Bird",
          skeleton: [text("Endoskeleton")],
        },
        earthworm: {
          against: [text("Soil")],
          name: "Earthworm",
          skeleton: [text("Hydrostatic skeleton")],
        },
      },
      contracting: [text("Contracting now")],
      muscles: {
        circular: "Circular",
        extensor: "Extensor",
        flexor: "Flexor",
        left: "Left myotomes",
        longitudinal: "Longitudinal",
        pectoralis: "Pectoralis major",
        right: "Right myotomes",
        supracoracoideus: "Supracoracoideus",
      },
      parts: {
        chaetae: "Chaetae",
        femur: "Femur",
        fin: "Tail fin",
        fluid: "Fluid",
        keel: "Keel",
        myotome: "Myotome",
        tibia: "Tibia",
      },
      skeleton: [text("Kind of skeleton")],
      view: "An animal moving",
    },
    animals: ["earthworm", "bird"],
  };

  it("checks a lab whose picked animals are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses none, an unknown one, or one picked twice", () => {
    expect(failsStrict(props, { ...lab, animals: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, animals: ["snake"] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, animals: [...lab.animals, lab.animals[0]] })
    ).toBe(true);
  });

  it("refuses words missing for a picked one, or words for one not shown", () => {
    expect(
      failsStrict(props, { ...lab, animals: lab.animals.slice(0, 1) })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          animals: {
            ...lab.labels.animals,
            fish: {
              against: [text("Water")],
              name: "Fish",
              skeleton: [text("Endoskeleton")],
            },
          },
        },
      })
    ).toBe(true);
  });

  it("refuses a missing fixed word", () => {
    const { muscles: _missing, ...rest } = lab.labels;
    expect(failsStrict(props, { ...lab, labels: rest })).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("AnimalLocomotionLab", lab)).toEqual([]);
  });
});
