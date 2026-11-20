import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("An impulse releases acetylcholine.")],
  title: [text("Acetylcholine Across a Synapse")],
};

describe("synapse lab", () => {
  it("checks a synapse with its parts named and every drug offered named", () => {
    const { props } = assessmentVisuals.SynapseLab;
    const lab = {
      ...card,
      drugs: ["nicotine", "curare", "organophosphate", "botulinum"],
      labels: {
        drug: "Drug",
        drugs: {
          botulinum: "Botulinum toxin",
          curare: "Curare",
          nicotine: "Nicotine",
          organophosphate: "Organophosphate",
        },
        fires: [text("Fires an impulse")],
        none: "None",
        parts: {
          channel: [text("Calcium channel")],
          cleft: [text("Synaptic cleft")],
          enzyme: [text("Acetylcholinesterase")],
          mitochondrion: [text("Mitochondrion")],
          receptor: [text("Acetylcholine receptor")],
          transporter: [text("Choline transporter")],
          vesicle: [text("Synaptic vesicle")],
        },
        potential: [text("Postsynaptic potential")],
        rate: "Impulses per second",
        rests: [text("Stays at rest")],
        response: [text("Next neuron")],
        transmitter: [text("Acetylcholine molecules in the cleft")],
        view: "A synapse between two neurons",
      },
    };
    const { drugs: _drugs, ...plain } = lab;
    const { drugs: _names, ...unnamed } = lab.labels;

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, plain)).toEqual(plain);
    expect(decodeStrict(props, { ...plain, labels: unnamed })).toEqual({
      ...plain,
      labels: unnamed,
    });
    expect(failsStrict(props, { ...lab, labels: unnamed })).toBe(true);
    expect(failsStrict(props, { ...lab, drugs: ["caffeine"] })).toBe(true);
    expect(failsStrict(props, { ...lab, drugs: [] })).toBe(true);
    const { vesicle: _vesicle, ...partial } = lab.labels.parts;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, parts: partial } })
    ).toBe(true);
    expect(answerState("SynapseLab", lab)).toEqual([]);
  });
});
