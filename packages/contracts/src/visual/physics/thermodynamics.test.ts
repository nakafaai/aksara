import { describe, expect, it } from "@effect/vitest";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState } from "#contracts/visual/catalog";
import { thermodynamicsVisuals } from "#contracts/visual/physics/thermodynamics";

const thermodynamics = thermodynamicsVisuals(RichTextSchema);

describe("GasProcessLab", () => {
  const lab = {
    description: [text("Pick a process, then drag point 2 on the diagram.")],
    labels: {
      endPressure: "End pressure",
      endState: [text("State 2 (end)")],
      endVolume: "End volume",
      energy: "Energy in this process",
      heat: [text("Heat into the gas")],
      internal: [text("Change in internal energy")],
      law: [text("What this process keeps")],
      pressureAxis: [text("p (kPa)")],
      process: "Process",
      processes: {
        adiabatic: "Adiabatic",
        isobaric: "Isobaric",
        isochoric: "Isochoric",
        isothermal: "Isothermal",
      },
      startState: [text("State 1 (start)")],
      viewLabel: "A cylinder of gas with a piston beside its p-V diagram",
      volumeAxis: [text("V (L)")],
      work: [text("Work done by the gas")],
    },
    moles: 0.4,
    processes: [
      { process: "isobaric", volume: { end: 15, max: 20, min: 5 } },
      { pressure: { end: 160, max: 200, min: 40 }, process: "isochoric" },
      { process: "isothermal", volume: { end: 20, max: 20, min: 5 } },
      { process: "adiabatic", volume: { end: 20, max: 20, min: 5 } },
    ],
    showValues: true,
    start: { pressure: 100, volume: 10 },
    title: [text("Gas processes and the first law")],
  };
  /** Whether the lab refuses its props with one change applied. */
  const fails = (change: object) =>
    failsStrict(thermodynamics.GasProcessLab.props, { ...lab, ...change });

  it("takes a gas, its start and the processes to offer", () => {
    expect(decodeStrict(thermodynamics.GasProcessLab.props, lab)).toEqual(lab);
  });

  it("takes a start given by temperature, and a diatomic gamma", () => {
    const change = { gamma: 1.4, start: { temperature: 300, volume: 10 } };
    expect(
      decodeStrict(thermodynamics.GasProcessLab.props, { ...lab, ...change })
    ).toEqual({ ...lab, ...change });
  });

  it("refuses a process offered twice, or an end outside its range", () => {
    expect(fails({ processes: [...lab.processes, lab.processes[0]] })).toBe(
      true
    );
    expect(
      fails({
        processes: [
          { process: "isobaric", volume: { end: 25, max: 20, min: 5 } },
        ],
      })
    ).toBe(true);
    expect(
      fails({
        processes: [
          { process: "isobaric", volume: { end: 10, max: 10, min: 10 } },
        ],
      })
    ).toBe(true);
  });

  it("refuses an isochoric process set by volume, a gas of no amount, and a gamma of 1 or less", () => {
    expect(
      fails({
        processes: [
          { process: "isochoric", volume: { end: 15, max: 20, min: 5 } },
        ],
      })
    ).toBe(true);
    expect(fails({ moles: 0 })).toBe(true);
    expect(fails({ gamma: 1 })).toBe(true);
  });

  it("holds the worked values as answer state", () => {
    expect(answerState("GasProcessLab", lab)).toEqual(["showValues"]);
    expect(answerState("GasProcessLab", { ...lab, showValues: false })).toEqual(
      []
    );
  });
});
