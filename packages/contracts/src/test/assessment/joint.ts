import {
  doc,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { hash, plainPart, singleChoice } from "#contracts/test/assessment/item";

/** Test-only answer of a two-tier item: a choice of two test options. */
export const answerInteraction = singleChoice([
  plainPart("option-1", "Test answer 1"),
  plainPart("option-2", "Test answer 2"),
]);

/** Test-only reason of a two-tier item: a choice of two test options. */
export const reasonInteraction = {
  ...singleChoice([
    plainPart("option-1", "Test reason 1"),
    plainPart("option-2", "Test reason 2"),
  ]),
  id: "reason",
};

/**
 * Test-only joint rule of a two-tier item: 2 points when the answer and its
 * reason are both correct, and 1 point when only the answer is correct.
 */
export const twoTierJoint = {
  levels: [
    { correct: ["answer", "reason"], points: 2 },
    { correct: ["answer"], points: 1 },
  ],
};

/**
 * Test-only two-tier item: an answer, then its reason, scored by one joint rule.
 * Its words are test values.
 */
export const twoTierVersion = {
  deliveryLanguage: "en",
  family: "test/two-tier-item",
  hash: hash("e"),
  interactions: [answerInteraction, reasonInteraction],
  joint: twoTierJoint,
  prompt: doc(
    paragraph(text("Test-only prompt: an answer, then its reason.")),
    place("answer"),
    place("reason")
  ),
  scoring: [],
};
