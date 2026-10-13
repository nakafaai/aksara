import { Array as Arr } from "effect";

import { text } from "#contracts/test/assessment/document";
import { NAME, plainPart, singleChoice } from "#contracts/test/assessment/item";

/** Adds a limit to a part, as a match or a gap match does. */
function limited(id: string, value: string, maxMatches: number) {
  return { ...plainPart(id, value), maxMatches };
}

/** A choice of three options. */
export const choiceInteraction = singleChoice([
  plainPart("option-1", "Bandung"),
  plainPart("option-2", "Jakarta"),
  plainPart("option-3", "Surabaya"),
]);

/** Statements by columns, as a True or False table. */
export const matrixInteraction = {
  columns: [plainPart("column-1", "Benar"), plainPart("column-2", "Salah")],
  id: "table",
  kind: "matrix",
  label: NAME,
  shuffle: false,
  statements: [
    plainPart("statement-1", "Air mendidih pada 100 derajat"),
    plainPart("statement-2", "Es lebih padat daripada air"),
  ],
};

/** Countries matched to capitals, each used once. */
export const matchInteraction = {
  id: "capitals",
  kind: "match",
  label: NAME,
  shuffle: true,
  sources: [
    limited("country-1", "Indonesia", 1),
    limited("country-2", "Jerman", 1),
  ],
  targets: [
    limited("capital-1", "Jakarta", 1),
    limited("capital-2", "Berlin", 1),
  ],
};

/** Three steps, all of which are ordered. */
export const orderInteraction = {
  id: "steps",
  items: [
    plainPart("step-1", "Campur"),
    plainPart("step-2", "Panaskan"),
    plainPart("step-3", "Dinginkan"),
  ],
  kind: "order",
  label: NAME,
  maxChoices: 3,
  minChoices: 3,
  shuffle: true,
};

/** A drop-down of cities. */
export const inlineChoiceInteraction = {
  id: "city",
  kind: "inlineChoice",
  label: NAME,
  options: [
    { id: "city-1", label: [text("Jakarta")] },
    { id: "city-2", label: [text("Bandung")] },
  ],
  shuffle: false,
};

/** A short typed answer. */
export const textEntryInteraction = {
  expectedLength: 15,
  id: "capital",
  kind: "textEntry",
  label: NAME,
};

/** A typed number with a unit and fractions. */
export const numericEntryInteraction = {
  acceptsFractions: true,
  id: "volume",
  kind: "numericEntry",
  label: NAME,
  unit: "dm3",
};

/** A typed expression. The interaction holds no policy for a sampled verdict. */
export const mathEntryInteraction = {
  id: "expression",
  kind: "mathEntry",
  label: NAME,
};

/** The image of a body with two areas to select. */
export const bodyImage = {
  alt: "A drawing of a torso",
  asset: "asset-torso",
  height: 400,
  width: 300,
};

/** One area of each of two shapes on the image. */
export const hotspotInteraction = {
  areas: [
    { coords: [120, 80, 30], id: "area-1", label: "Heart", shape: "circle" },
    { coords: [10, 20, 100, 160], id: "area-2", label: "Lung", shape: "rect" },
  ],
  id: "organs",
  image: bodyImage,
  kind: "hotspot",
  label: NAME,
  maxChoices: 1,
  minChoices: 1,
};

/** Fill the gaps of a quote from the seasons. */
export const gapMatchInteraction = {
  choices: [
    { id: "word-1", label: [text("winter")], maxMatches: 1 },
    { id: "word-2", label: [text("summer")], maxMatches: 1 },
  ],
  gaps: [{ id: "gap-1" }, { id: "gap-2" }],
  id: "quote",
  kind: "gapMatch",
  label: NAME,
  shuffle: false,
};

/** Place two points on a plane. */
export const graphPointInteraction = {
  count: 2,
  frame: { kind: "cartesian", x: { max: 5, min: -5 }, y: { max: 5, min: -5 } },
  id: "plot",
  kind: "graphPoint",
  label: NAME,
  placing: "points",
  snap: 1,
};

/** A long answer. */
export const extendedTextInteraction = {
  expectedLines: 8,
  id: "essay",
  kind: "extendedText",
  label: NAME,
};

/** One interaction of every kind, in the order of the contract. */
export const ALL_INTERACTIONS = Arr.make(
  choiceInteraction,
  matrixInteraction,
  matchInteraction,
  orderInteraction,
  inlineChoiceInteraction,
  textEntryInteraction,
  numericEntryInteraction,
  mathEntryInteraction,
  hotspotInteraction,
  gapMatchInteraction,
  graphPointInteraction,
  extendedTextInteraction
);
