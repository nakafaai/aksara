import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Schema } from "effect";

import {
  canSitInText,
  InteractionKindSchema,
  InteractionSchema,
} from "#contracts/assessment/interaction";
import { decodeContract } from "#contracts/decode";
import { ContractDecodeError } from "#contracts/errors";
import { decodeStrict, failsStrict } from "#contracts/test/assessment/document";
import {
  ALL_INTERACTIONS,
  choiceInteraction,
  extendedTextInteraction,
  gapMatchInteraction,
  graphPointInteraction,
  hotspotInteraction,
  inlineChoiceInteraction,
  matchInteraction,
  mathEntryInteraction,
  matrixInteraction,
  numericEntryInteraction,
  orderInteraction,
  textEntryInteraction,
} from "#contracts/test/assessment/interaction";

const KINDS = Arr.map(
  ALL_INTERACTIONS,
  (interaction) => decodeStrict(InteractionSchema, interaction).kind
);

describe("interactions", () => {
  it("decodes one interaction of each of the twelve kinds and encodes it back", () => {
    expect(KINDS).toHaveLength(12);
    for (const interaction of ALL_INTERACTIONS) {
      const decoded = decodeStrict(InteractionSchema, interaction);

      expect(Schema.encodeSync(InteractionSchema)(decoded)).toEqual(
        interaction
      );
    }
  });

  it("reads the kinds from the interactions themselves", () => {
    for (const kind of KINDS) {
      expect(Schema.is(InteractionKindSchema)(kind)).toBe(true);
    }
    for (const kind of ["upload", "audio", "single-choice", ""]) {
      expect(Schema.is(InteractionKindSchema)(kind)).toBe(false);
      expect(failsStrict(InteractionSchema, { kind })).toBe(true);
    }
  });

  it("holds no answer key", () => {
    const [option] = choiceInteraction.options;
    const [city] = inlineChoiceInteraction.options;

    for (const input of [
      { ...choiceInteraction, correct: ["option-2"] },
      {
        ...choiceInteraction,
        options: [{ ...option, isCorrect: true }, ...choiceInteraction.options],
      },
      {
        ...matrixInteraction,
        answers: [{ column: "column-1", statement: "statement-1" }],
      },
      {
        ...matchInteraction,
        pairs: [{ source: "country-1", target: "capital-1" }],
      },
      { ...orderInteraction, sequence: ["step-1", "step-2", "step-3"] },
      {
        ...inlineChoiceInteraction,
        options: [
          { ...city, isCorrect: true },
          ...inlineChoiceInteraction.options,
        ],
      },
      { ...textEntryInteraction, acceptedAnswers: ["Jakarta"] },
      { ...numericEntryInteraction, value: "6" },
      {
        ...numericEntryInteraction,
        tolerance: { kind: "absolute", value: "0.1" },
      },
      { ...mathEntryInteraction, expression: "x+1" },
      { ...hotspotInteraction, correct: ["area-1"] },
      { ...gapMatchInteraction, pairs: [{ choice: "word-1", gap: "gap-1" }] },
      { ...graphPointInteraction, points: [{ x: 1, y: 2 }] },
      { ...extendedTextInteraction, criteria: [] },
    ]) {
      expect(failsStrict(InteractionSchema, input)).toBe(true);
    }
  });

  it.effect("fails with the contract error that names the key field", () =>
    Effect.gen(function* () {
      const error = yield* decodeContract(
        InteractionSchema,
        "AssessmentInteraction",
        { ...choiceInteraction, correct: ["option-2"] }
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(ContractDecodeError);
      expect(error.contract).toBe("AssessmentInteraction");
      expect(error.message).toContain("correct");
    })
  );

  it("needs an identifier and a label for screen readers on every kind", () => {
    for (const interaction of ALL_INTERACTIONS) {
      const { id: _id, ...anonymous } = interaction;
      const { label: _label, ...unnamed } = interaction;

      expect(failsStrict(InteractionSchema, anonymous)).toBe(true);
      expect(failsStrict(InteractionSchema, unnamed)).toBe(true);
      expect(
        failsStrict(InteractionSchema, { ...interaction, label: " " })
      ).toBe(true);
      expect(
        failsStrict(InteractionSchema, { ...interaction, id: "Option 1" })
      ).toBe(true);
    }
  });

  it("lets only the four fields sit inside a line of text", () => {
    expect(Arr.filter(KINDS, (kind) => canSitInText(kind))).toEqual([
      "inlineChoice",
      "textEntry",
      "numericEntry",
      "mathEntry",
    ]);
  });
});
