import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore manufactured substances in industry.")],
  title: [text("Manufactured substances lab")],
};

describe("alloy slip plane lab", () => {
  const { props } = assessmentVisuals.AlloySlipPlaneLab;
  const lab = {
    ...card,
    labels: {
      hardnessNote: [text("Hardness")],
      metal: "Metal or alloy",
      metals: {
        pureIron: {
          hardnessNote: [text("Soft and malleable.")],
          name: "Pure iron",
          structureNote: [text("Uniform layers slide easily.")],
        },
        steel: {
          hardnessNote: [text("Hard and strong.")],
          name: "Steel (Fe + C)",
          structureNote: [text("Carbon atoms block slip planes.")],
        },
      },
      parts: {
        foreignAtom: "Alloy atom",
        hostAtom: "Host metal atom",
        shearArrow: "Shear force",
        slipPlane: "Slip plane",
      },
      shearForce: "Shear stress",
      structureNote: [text("Atomic structure")],
      view: "3D metal and alloy slip-plane lattice",
    },
    metals: ["pureIron", "steel"],
    shearForce: { max: 100, min: 0, value: 40 },
  };
  const { hardnessNote: _h, structureNote: _s, ...quiz } = lab.labels;

  it("decodes alloy slip plane lab and tracks hardnessNote and structureNote as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("AlloySlipPlaneLab", lab)).toEqual([
      "labels.hardnessNote",
      "labels.structureNote",
    ]);
    expect(answerState("AlloySlipPlaneLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses invalid shear slider or mismatched metals", () => {
    expect(
      failsStrict(props, {
        ...lab,
        shearForce: { max: 50, min: 50, value: 50 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, metals: ["steel"] })).toBe(true);
  });
});

describe("contact sulfuric tower lab", () => {
  const { props } = assessmentVisuals.ContactSulfuricTowerLab;
  const lab = {
    ...card,
    labels: {
      conditions: [text("Operating conditions")],
      equation: [text("Stage equation")],
      parts: {
        absorptionTower: "Absorption tower",
        acidPipe: "H2SO4 outlet",
        burner: "Sulfur burner",
        oleumTank: "Oleum tank",
        vanadiumBed: "V2O5 catalyst bed",
      },
      stage: "Process stage",
      stages: {
        catalyticOxidation: {
          conditions: [text("450 C, 1 atm, V2O5")],
          equation: [text("2SO2 + O2 <-> 2SO3")],
          name: "Catalytic oxidation",
        },
        oleumAbsorption: {
          conditions: [text("Dissolved in conc. H2SO4")],
          equation: [text("SO3 + H2SO4 -> H2S2O7")],
          name: "Oleum absorption",
        },
      },
      view: "3D Contact sulfuric acid tower",
    },
    stages: ["catalyticOxidation", "oleumAbsorption"],
  };
  const { conditions: _c, equation: _e, ...quiz } = lab.labels;

  it("decodes contact tower lab and tracks conditions and equation as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("ContactSulfuricTowerLab", lab)).toEqual([
      "labels.conditions",
      "labels.equation",
    ]);
    expect(
      answerState("ContactSulfuricTowerLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched stages", () => {
    expect(failsStrict(props, { ...lab, stages: ["catalyticOxidation"] })).toBe(
      true
    );
  });
});

describe("glass ceramic lattice lab", () => {
  const { props } = assessmentVisuals.GlassCeramicLatticeLab;
  const lab = {
    ...card,
    labels: {
      material: "Material",
      materials: {
        advancedCeramic: {
          name: "Advanced ceramic",
          propertyNote: [text("Extreme heat and wear resistance.")],
          useNote: [text("Engine turbines and cutting blades.")],
        },
        borosilicateGlass: {
          name: "Borosilicate glass",
          propertyNote: [text("Low thermal expansion.")],
          useNote: [text("Laboratory beakers and cookware.")],
        },
      },
      parts: {
        boronNode: "Boron oxide node",
        clayLayer: "Aluminosilicate sheet",
        crystalGrain: "Crystalline grain",
        silicaTetrahedron: "SiO4 tetrahedron",
      },
      propertyNote: [text("Key property")],
      useNote: [text("Typical use")],
      view: "3D glass and ceramic microstructure",
    },
    materials: ["borosilicateGlass", "advancedCeramic"],
  };
  const { propertyNote: _p, useNote: _u, ...quiz } = lab.labels;

  it("decodes glass ceramic lab and tracks propertyNote and useNote as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("GlassCeramicLatticeLab", lab)).toEqual([
      "labels.propertyNote",
      "labels.useNote",
    ]);
    expect(
      answerState("GlassCeramicLatticeLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched materials", () => {
    expect(
      failsStrict(props, { ...lab, materials: ["borosilicateGlass"] })
    ).toBe(true);
  });
});
