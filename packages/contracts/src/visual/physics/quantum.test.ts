import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore quantum behaviour.")],
  title: [text("Quantum physics lab")],
};

describe("de Broglie matter wave lab", () => {
  const { props } = assessmentVisuals.DeBroglieMatterWaveLab;
  const lab = {
    ...card,
    labels: {
      diffraction: [text("Ring spacing")],
      momentum: [text("Particle momentum")],
      particle: "Particle",
      particles: { electron: "Electron", neutron: "Neutron" },
      parts: {
        diffractionRings: "Diffraction rings",
        electronGun: "Electron gun",
        graphiteTarget: "Graphite target",
        matterWave: "Matter wave",
        screen: "Fluorescent screen",
      },
      view: "Electron diffraction apparatus",
      voltage: "Accelerating voltage",
      wavelength: [text("de Broglie wavelength")],
    },
    particles: ["electron", "neutron"],
    voltage: { max: 10, min: 1, value: 4 },
  };
  const { diffraction: _diff, wavelength: _wl, ...quiz } = lab.labels;

  it("decodes matter wave lab and tracks diffraction and wavelength as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("DeBroglieMatterWaveLab", lab)).toEqual([
      "labels.diffraction",
      "labels.wavelength",
    ]);
    expect(
      answerState("DeBroglieMatterWaveLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid voltage sliders or mismatched particle names", () => {
    expect(
      failsStrict(props, { ...lab, voltage: { max: 5, min: 5, value: 5 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, voltage: { max: 10, min: 1, value: 12 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, particles: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, particles: ["electron"] })).toBe(true);
  });
});

describe("Planck blackbody lab", () => {
  const { props } = assessmentVisuals.PlanckBlackbodyLab;
  const lab = {
    ...card,
    labels: {
      model: "Radiation model",
      models: {
        classical: "Classical Rayleigh-Jeans",
        planck: "Planck quantum",
      },
      parts: {
        cavity: "Heated cavity",
        classicalCurve: "Classical curve",
        peakMarker: "Wien peak",
        planckCurve: "Planck curve",
        visibleBand: "Visible spectrum",
      },
      peakWavelength: [text("Peak wavelength")],
      photonEnergy: [text("Peak photon energy")],
      spectrum: [text("Spectral radiance")],
      temperature: "Temperature (K)",
      view: "Blackbody cavity and spectrum",
    },
    models: ["planck", "classical"],
    temperature: { max: 6000, min: 1500, value: 3500 },
  };
  const { peakWavelength: _peak, photonEnergy: _photon, ...quiz } = lab.labels;

  it("decodes blackbody lab and marks peak wavelength and photon energy as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("PlanckBlackbodyLab", lab)).toEqual([
      "labels.peakWavelength",
      "labels.photonEnergy",
    ]);
    expect(answerState("PlanckBlackbodyLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses invalid temperatures or mismatched radiation models", () => {
    expect(
      failsStrict(props, {
        ...lab,
        temperature: { max: 3000, min: 4000, value: 3500 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, models: ["planck"] })).toBe(true);
  });
});
