import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("sea name lab", () => {
  const { props } = assessmentVisuals.SeaNameLab;
  const lab = {
    ...card,
    animals: ["dugong", "jellyfish"],
    labels: {
      animal: "Animal",
      group: [text("What it really is")],
      groups: { dugong: [text("A mammal")], jellyfish: [text("A cnidarian")] },
      language: "Language",
      languages: { english: "English", malay: "Malay" },
      names: {
        dugong: { english: "Sea cow", malay: "Duyung" },
        jellyfish: { english: "Jellyfish", malay: "Obor-obor" },
      },
      scientific: "Scientific name",
      view: "A shallow sea",
    },
    languages: ["malay", "english"],
  };
  const { groups: _groups, ...quiz } = lab.labels;

  it("checks every animal named in every language, with and without the groups", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
  });

  it("refuses an animal missing a language, or a language not shown", () => {
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          names: { ...lab.labels.names, dugong: { malay: "Duyung" } },
        },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, languages: ["malay"] })).toBe(true);
  });

  it("refuses groups that miss an animal", () => {
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, groups: { dugong: [text("A mammal")] } },
      })
    ).toBe(true);
  });

  it("reads the groups as answer state", () => {
    expect(answerState("SeaNameLab", lab)).toEqual(["labels.groups"]);
    expect(answerState("SeaNameLab", { ...lab, labels: quiz })).toEqual([]);
  });
});
