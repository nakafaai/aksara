import {
  doc,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { hash, NAME, plainPart } from "#contracts/test/assessment/item";

/**
 * Test-only wrong-parts rule of a complex item with more than five statements
 * and more than two options: 2 points with no wrong statement, 1 point with one
 * or two, and 0 with more.
 */
export const akmRule = {
  bands: [
    { points: 2, wrong: 0 },
    { points: 1, wrong: 2 },
  ],
  kind: "wrongParts",
};

/**
 * Test-only item of six statements, each with three options, scored by the
 * wrong-parts rule. Its words are test values.
 */
export const akmVersion = {
  deliveryLanguage: "id",
  family: "test/akm-complex-item",
  hash: hash("8"),
  interactions: [
    {
      columns: [
        plainPart("column-1", "Test option A"),
        plainPart("column-2", "Test option B"),
        plainPart("column-3", "Test option C"),
      ],
      id: "categories",
      kind: "matrix",
      label: NAME,
      shuffle: false,
      statements: [
        plainPart("statement-1", "Test-only statement 1."),
        plainPart("statement-2", "Test-only statement 2."),
        plainPart("statement-3", "Test-only statement 3."),
        plainPart("statement-4", "Test-only statement 4."),
        plainPart("statement-5", "Test-only statement 5."),
        plainPart("statement-6", "Test-only statement 6."),
      ],
    },
  ],
  prompt: doc(paragraph(text("Test-only prompt.")), place("categories")),
  scoring: [{ interaction: "categories", rule: akmRule }],
};
