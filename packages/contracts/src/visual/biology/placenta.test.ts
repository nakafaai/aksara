import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Record } from "effect";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

/** Plain words for every identifier, so a test names fixed parts in one line. */
function words(...ids: readonly string[]) {
  return Record.fromEntries(
    Arr.map(ids, (id): readonly [string, string] => [id, id])
  );
}

describe("placenta lab", () => {
  const { props } = assessmentVisuals.PlacentaLab;
  const lab = {
    ...card,
    labels: {
      direction: [text("Direction")],
      how: [text("How it crosses")],
      parts: words(
        "placenta",
        "cord",
        "artery",
        "vein",
        "villus",
        "capillary",
        "maternal",
        "wall",
        "amnion",
        "foetus"
      ),
      substance: "Substance",
      substances: {
        bloodCells: {
          direction: [text("Neither way")],
          how: [text("Too big to cross")],
          name: "Blood cells",
        },
        oxygen: {
          direction: [text("Mother to foetus")],
          how: [text("Diffusion")],
          name: "Oxygen",
        },
      },
      view: "A placenta cut open",
    },
    substances: ["oxygen", "bloodCells"],
  };

  it("checks a lab whose substances each have their words", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses a substance without words, or one listed twice", () => {
    expect(
      failsStrict(props, {
        ...lab,
        substances: ["oxygen", "bloodCells", "urea"],
      })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, substances: ["oxygen", "oxygen"] })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("PlacentaLab", lab)).toEqual([]);
  });
});
