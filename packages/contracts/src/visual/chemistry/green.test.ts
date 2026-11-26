import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore green chemistry principles.")],
  title: [text("Green chemistry lab")],
};

describe("atom economy reactor lab", () => {
  const { props } = assessmentVisuals.AtomEconomyReactorLab;
  const lab = {
    ...card,
    labels: {
      atomEconomy: [text("Atom economy")],
      parts: {
        byproductWaste: "Byproduct waste",
        desiredProduct: "Desired product",
        reactantFeed: "Reactants",
        reactorChamber: "Reactor",
      },
      route: "Synthesis route",
      routes: {
        addition: {
          economy: [text("100%")],
          name: "Addition",
          wasteNote: [text("Zero byproduct atoms.")],
        },
        substitution: {
          economy: [text("58%")],
          name: "Substitution",
          wasteNote: [text("Forms salt byproduct.")],
        },
      },
      view: "3D atom economy synthesis reactor",
      wasteNote: [text("Waste stream")],
    },
    routes: ["addition", "substitution"],
  };
  const { atomEconomy: _ae, wasteNote: _w, ...quiz } = lab.labels;

  it("decodes atom economy lab and tracks atomEconomy and wasteNote as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("AtomEconomyReactorLab", lab)).toEqual([
      "labels.atomEconomy",
      "labels.wasteNote",
    ]);
    expect(
      answerState("AtomEconomyReactorLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched synthesis routes", () => {
    expect(failsStrict(props, { ...lab, routes: ["addition"] })).toBe(true);
  });
});

describe("green catalyst cycle lab", () => {
  const { props } = assessmentVisuals.GreenCatalystCycleLab;
  const lab = {
    ...card,
    cycles: { max: 10, min: 1, value: 4 },
    labels: {
      cycles: "Batch cycles",
      eFactor: [text("E-factor")],
      mode: "Catalysis mode",
      modes: {
        heterogeneous: {
          eFactor: [text("0.4 kg waste / kg product")],
          name: "Heterogeneous catalyst",
          recoveryNote: [text("Filtered and reused across cycles.")],
        },
        stoichiometric: {
          eFactor: [text("6.5 kg waste / kg product")],
          name: "Stoichiometric reagent",
          recoveryNote: [text("Consumed in every batch.")],
        },
      },
      parts: {
        catalystBed: "Catalyst bed",
        productOut: "Product stream",
        reactantStream: "Reactant feed",
        recoveryLoop: "Recovery loop",
        wasteBin: "Waste collector",
      },
      recoveryNote: [text("Catalyst recovery")],
      view: "3D green catalyst recovery loop",
    },
    modes: ["stoichiometric", "heterogeneous"],
  };
  const { eFactor: _ef, recoveryNote: _rn, ...quiz } = lab.labels;

  it("decodes green catalyst cycle lab and tracks eFactor and recoveryNote as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("GreenCatalystCycleLab", lab)).toEqual([
      "labels.eFactor",
      "labels.recoveryNote",
    ]);
    expect(
      answerState("GreenCatalystCycleLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid cycles slider or mismatched modes", () => {
    expect(
      failsStrict(props, { ...lab, cycles: { max: 5, min: 5, value: 5 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, modes: ["heterogeneous"] })).toBe(true);
  });
});
