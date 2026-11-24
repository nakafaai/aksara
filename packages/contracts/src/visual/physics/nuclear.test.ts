import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Compare nuclear stability across mass numbers.")],
  title: [text("Nuclear binding curve lab")],
};

describe("nuclear binding curve lab", () => {
  const { props } = assessmentVisuals.NuclearBindingCurveLab;
  const lab = {
    ...card,
    labels: {
      bindingPerNucleon: [text("Binding energy per nucleon")],
      massDefect: [text("Mass defect")],
      nuclide: "Nuclide",
      nuclides: {
        deuterium: "Deuterium-2",
        helium4: "Helium-4",
        iron56: "Iron-56",
        uranium235: "Uranium-235",
      },
      parts: {
        fissionZone: "Heavy fission zone",
        fusionZone: "Light fusion zone",
        ironPeak: "Iron-56 stability peak",
        neutron: "Neutron",
        proton: "Proton",
      },
      process: "Nuclear reaction",
      processes: {
        fission: {
          detail: [text("Heavy nucleus splits toward iron-56")],
          name: "Fission",
        },
        fusion: {
          detail: [text("Light nuclei combine toward helium-4")],
          name: "Fusion",
        },
      },
      stability: [text("Nuclear stability")],
      view: "Nucleon cluster and binding-energy curve",
    },
    nuclides: ["deuterium", "helium4", "iron56", "uranium235"],
    processes: ["fusion", "fission"],
  };
  const { bindingPerNucleon: _bind, massDefect: _defect, ...quiz } = lab.labels;

  it("decodes nuclear binding lab and tracks bindingPerNucleon and massDefect as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("NuclearBindingCurveLab", lab)).toEqual([
      "labels.bindingPerNucleon",
      "labels.massDefect",
    ]);
    expect(
      answerState("NuclearBindingCurveLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched nuclides or nuclear processes", () => {
    expect(failsStrict(props, { ...lab, nuclides: ["iron56"] })).toBe(true);
    expect(failsStrict(props, { ...lab, processes: ["fusion"] })).toBe(true);
  });
});
