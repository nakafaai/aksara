import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

const values = {
  absorbs: "Absorbs",
  cellulose: "Cellulose",
  chitin: "Chitin",
  either: "Either",
  ingests: "Ingests",
  many: "Many",
  no: "No",
  noPeptidoglycan: "No peptidoglycan",
  none: "None",
  one: "One",
  peptidoglycan: "Peptidoglycan",
  photosynthesis: "Photosynthesis",
  tissue: "Tissue",
  yes: "Yes",
};

describe("kingdom sort lab", () => {
  const { props } = assessmentVisuals.KingdomSortLab;
  const lab = {
    ...card,
    labels: {
      checks: {
        cells: "Cells",
        food: "Food",
        nucleus: "Nucleus",
        wall: "Cell wall",
      },
      kingdom: [text("Correct kingdom")],
      kingdoms: {
        animalia: "Animalia",
        archaebacteria: "Archaebacteria",
        eubacteria: "Eubacteria",
        fungi: "Fungi",
        plantae: "Plantae",
        protista: "Protista",
      },
      place: "Place it",
      right: [text("Right")],
      specimen: "Specimen",
      specimens: { hydra: [text("Hydra")], yeast: [text("Yeast")] },
      values,
      view: "A lab bench",
      wrong: [text("Not yet")],
    },
    specimens: ["yeast", "hydra"],
  };
  const {
    kingdom: _kingdom,
    right: _right,
    wrong: _wrong,
    ...quiz
  } = lab.labels;

  it("checks a lab with its feedback, and one with all feedback left out", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
  });

  it("refuses part of the feedback without the rest", () => {
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...quiz, right: [text("Right")] },
      })
    ).toBe(true);
  });

  it("refuses an unnamed specimen or a missing feature value", () => {
    expect(
      failsStrict(props, { ...lab, specimens: ["yeast", "hydra", "fern"] })
    ).toBe(true);
    const { chitin: _chitin, ...fewer } = values;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, values: fewer } })
    ).toBe(true);
  });

  it("reads the feedback as answer state", () => {
    expect(answerState("KingdomSortLab", lab)).toEqual([
      "labels.right",
      "labels.wrong",
      "labels.kingdom",
    ]);
    expect(answerState("KingdomSortLab", { ...lab, labels: quiz })).toEqual([]);
  });
});
