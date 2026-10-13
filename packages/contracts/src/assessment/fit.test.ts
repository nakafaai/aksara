import { describe, expect, it } from "@effect/vitest";

import { ItemVersionSchema } from "#contracts/assessment/item";
import {
  doc,
  failsStrict,
  paragraph,
  place,
  placeInline,
  text,
} from "#contracts/test/assessment/document";
import {
  choiceInteraction,
  extendedTextInteraction,
  gapMatchInteraction,
  inlineChoiceInteraction,
  matchInteraction,
  mathEntryInteraction,
  numericEntryInteraction,
  textEntryInteraction,
} from "#contracts/test/assessment/interaction";
import { hash } from "#contracts/test/assessment/item";
import {
  allOrNothing,
  perPart,
  rubricRule,
} from "#contracts/test/assessment/scoring";

/** Builds one version of a test item around one interaction and its prompt. */
function versionOf(interaction: object, prompt: unknown, extra: object = {}) {
  return {
    deliveryLanguage: "id",
    family: "test-item",
    hash: hash("1"),
    interactions: [interaction],
    prompt,
    scoring: [],
    ...extra,
  };
}

const ANSWER_ONLY = doc(paragraph(text("Pilih satu.")), place("answer"));

describe("an item version places its interactions in its prompt", () => {
  it("places a choice once, as a block", () => {
    expect(
      failsStrict(ItemVersionSchema, versionOf(choiceInteraction, ANSWER_ONLY))
    ).toBe(false);
    for (const prompt of [
      doc(paragraph(text("Pilih satu."))),
      doc(place("answer"), place("answer")),
      doc(paragraph(placeInline("answer"))),
      doc(paragraph(text("Pilih satu.")), place("other")),
      doc(place("answer"), place("other")),
    ]) {
      expect(
        failsStrict(ItemVersionSchema, versionOf(choiceInteraction, prompt))
      ).toBe(true);
    }
  });

  it("places a field in a line of text or as a block, with no gap", () => {
    for (const interaction of [
      textEntryInteraction,
      numericEntryInteraction,
      mathEntryInteraction,
      inlineChoiceInteraction,
    ]) {
      for (const prompt of [
        doc(paragraph(text("Isi "), placeInline(interaction.id))),
        doc(place(interaction.id)),
      ]) {
        expect(
          failsStrict(ItemVersionSchema, versionOf(interaction, prompt))
        ).toBe(false);
      }
      expect(
        failsStrict(
          ItemVersionSchema,
          versionOf(
            interaction,
            doc(paragraph(placeInline(interaction.id, "gap-1")))
          )
        )
      ).toBe(true);
    }
  });

  it("places a gap match once for each gap, in the text", () => {
    const gaps = doc(
      paragraph(text("Now is the "), placeInline("quote", "gap-1")),
      paragraph(text("Made glorious "), placeInline("quote", "gap-2"))
    );

    expect(
      failsStrict(ItemVersionSchema, versionOf(gapMatchInteraction, gaps))
    ).toBe(false);
    for (const prompt of [
      doc(paragraph(placeInline("quote", "gap-1"))),
      doc(
        paragraph(placeInline("quote", "gap-1")),
        paragraph(placeInline("quote", "gap-1"))
      ),
      doc(
        paragraph(placeInline("quote", "gap-1")),
        paragraph(placeInline("quote", "gap-3"))
      ),
      doc(
        paragraph(placeInline("quote", "gap-1")),
        paragraph(placeInline("quote")),
        place("quote")
      ),
      doc(place("quote")),
    ]) {
      expect(
        failsStrict(ItemVersionSchema, versionOf(gapMatchInteraction, prompt))
      ).toBe(true);
    }
  });

  it("gives each interaction its own identifier, and at least one interaction", () => {
    expect(
      failsStrict(ItemVersionSchema, {
        ...versionOf(choiceInteraction, ANSWER_ONLY),
        interactions: [choiceInteraction, choiceInteraction],
      })
    ).toBe(true);
    expect(
      failsStrict(ItemVersionSchema, {
        ...versionOf(
          choiceInteraction,
          doc(place("answer"), place("capitals"))
        ),
        interactions: [choiceInteraction, matchInteraction],
      })
    ).toBe(false);
    expect(
      failsStrict(ItemVersionSchema, {
        ...versionOf(choiceInteraction, ANSWER_ONLY),
        interactions: [],
      })
    ).toBe(true);
  });

  it("keeps the explanation free of interactions", () => {
    expect(
      failsStrict(ItemVersionSchema, {
        ...versionOf(choiceInteraction, ANSWER_ONLY),
        explanation: doc(paragraph(text("Karena itu.")), place("answer")),
      })
    ).toBe(true);
    expect(
      failsStrict(ItemVersionSchema, {
        ...versionOf(choiceInteraction, ANSWER_ONLY),
        explanation: doc(paragraph(text("Karena itu."))),
      })
    ).toBe(false);
  });
});

describe("an item version scores its interactions with rules that fit", () => {
  it("lets the exam profile set the rule when the item sets none", () => {
    expect(
      failsStrict(ItemVersionSchema, versionOf(choiceInteraction, ANSWER_ONLY))
    ).toBe(false);
  });

  it("lets an item set a rule that fits, once for each interaction", () => {
    for (const rule of [allOrNothing, perPart]) {
      expect(
        failsStrict(ItemVersionSchema, {
          ...versionOf(choiceInteraction, ANSWER_ONLY),
          scoring: [{ interaction: "answer", rule }],
        })
      ).toBe(false);
    }
    expect(
      failsStrict(ItemVersionSchema, {
        ...versionOf(choiceInteraction, ANSWER_ONLY),
        scoring: [
          { interaction: "answer", rule: allOrNothing },
          { interaction: "answer", rule: perPart },
        ],
      })
    ).toBe(true);
  });

  it("rejects a rule for an interaction the item does not have, and a rubric for a choice", () => {
    for (const scoring of [
      [{ interaction: "other", rule: allOrNothing }],
      [{ interaction: "answer", rule: rubricRule }],
    ]) {
      expect(
        failsStrict(ItemVersionSchema, {
          ...versionOf(choiceInteraction, ANSWER_ONLY),
          scoring,
        })
      ).toBe(true);
    }
  });

  it("scores an extended text by a rubric that the item carries", () => {
    const essay = versionOf(
      extendedTextInteraction,
      doc(paragraph(text("Jelaskan.")), place("essay"))
    );

    expect(failsStrict(ItemVersionSchema, essay)).toBe(true);
    expect(
      failsStrict(ItemVersionSchema, {
        ...essay,
        scoring: [{ interaction: "essay", rule: allOrNothing }],
      })
    ).toBe(true);
    expect(
      failsStrict(ItemVersionSchema, {
        ...essay,
        scoring: [{ interaction: "essay", rule: rubricRule }],
      })
    ).toBe(false);
  });
});
