import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Schema } from "effect";

import {
  ItemFamilySchema,
  ItemSchema,
  ItemVersionSchema,
} from "#contracts/assessment/item";
import {
  decodeStrict,
  doc,
  failsStrict,
  paragraph,
  place,
  placeInline,
  text,
} from "#contracts/test/assessment/document";
import { passageReference } from "#contracts/test/assessment/exam";
import {
  hotspotInteraction,
  numericEntryInteraction,
} from "#contracts/test/assessment/interaction";
import { hash, plainPart } from "#contracts/test/assessment/item";
import {
  PASSAGE_ID,
  passageFamilies,
  snbtQuestion10,
  snbtQuestion11,
  snbtQuestion12,
} from "#contracts/test/assessment/passage";
import { perPart } from "#contracts/test/assessment/scoring";
import {
  tkaChoice,
  tkaMatrix,
  tkaMultiple,
  tkaMultipleEnglish,
  tkaMultipleFamily,
} from "#contracts/test/assessment/tka";

const FAMILY = tkaMultipleFamily;

/** Builds one version of a test item around one interaction and its prompt. */
function versionOf(interaction: object, prompt: unknown, language: string) {
  return {
    deliveryLanguage: language,
    family: "test-item",
    hash: hash("1"),
    interactions: [interaction],
    prompt,
    scoring: [],
  };
}

describe("item versions of today's corpus", () => {
  it("decodes a single-choice SNBT question, a TKA multiple choice, and a TKA True or False table", () => {
    for (const version of [snbtQuestion10, tkaMultiple, tkaMatrix]) {
      const decoded = decodeStrict(ItemVersionSchema, version);

      expect(Schema.encodeSync(ItemVersionSchema)(decoded)).toEqual(version);
    }
  });

  it("refers to the shared passage by identifier and hash from each of three questions", () => {
    const versions = [snbtQuestion10, snbtQuestion11, snbtQuestion12];

    expect(passageFamilies).toHaveLength(3);
    for (const version of versions) {
      expect(decodeStrict(ItemVersionSchema, version).stimulus).toEqual(
        passageReference
      );
    }
    for (const family of passageFamilies) {
      expect(decodeStrict(ItemFamilySchema, family).stimulus).toBe(PASSAGE_ID);
    }
  });

  it("carries the blueprint facts of the family, and none when the corpus has none", () => {
    expect(decodeStrict(ItemFamilySchema, FAMILY).blueprint?.competency).toBe(
      "geometry-measurement"
    );
    expect(
      decodeStrict(ItemFamilySchema, { id: tkaMultiple.family }).blueprint
    ).toBeUndefined();
    expect(
      failsStrict(ItemFamilySchema, {
        ...FAMILY,
        blueprint: { cognitiveLevel: "reasoning", topic: "geometry" },
      })
    ).toBe(true);
  });

  it("is a record of its own: a hash, a language, and no answer key", () => {
    const { hash: _hash, ...unhashed } = tkaMultiple;

    expect(failsStrict(ItemVersionSchema, unhashed)).toBe(true);
    for (const change of [
      { hash: "abc" },
      { deliveryLanguage: "fr" },
      { correct: ["option-2"] },
    ]) {
      expect(
        failsStrict(ItemVersionSchema, { ...tkaMultiple, ...change })
      ).toBe(true);
    }
  });
});

describe("a family has one structure in every language", () => {
  it("accepts versions that differ in words only", () => {
    expect(
      failsStrict(ItemSchema, {
        family: FAMILY,
        versions: [tkaMultiple, tkaMultipleEnglish],
      })
    ).toBe(false);
  });

  it("rejects versions of a different interaction structure", () => {
    const { options } = tkaChoice;
    const [option] = options;

    for (const changed of [
      { ...tkaChoice, maxChoices: 4, options: Arr.take(options, 4) },
      {
        ...tkaChoice,
        options: Arr.append(options, plainPart("option-6", "x")),
      },
      {
        ...tkaChoice,
        options: Arr.prepend(Arr.drop(options, 1), {
          ...option,
          id: "choice-1",
        }),
      },
      { ...tkaChoice, maxChoices: 4 },
      { ...tkaChoice, minChoices: 2 },
      { ...tkaChoice, shuffle: true },
      { ...tkaChoice, id: "other" },
    ]) {
      const english = {
        ...tkaMultipleEnglish,
        interactions: [changed],
        prompt: doc(
          paragraph(text("Test-only prompt (en).")),
          place(changed.id)
        ),
      };

      // Each version is valid on its own, so only the structure can reject the pair.
      expect(failsStrict(ItemVersionSchema, english)).toBe(false);
      expect(
        failsStrict(ItemSchema, {
          family: FAMILY,
          versions: [tkaMultiple, english],
        })
      ).toBe(true);
    }
  });

  it("rejects versions that score differently", () => {
    expect(
      failsStrict(ItemSchema, {
        family: FAMILY,
        versions: [
          tkaMultiple,
          {
            ...tkaMultipleEnglish,
            scoring: [{ interaction: "statements", rule: perPart }],
          },
        ],
      })
    ).toBe(true);
  });

  it("does not count a label, a text alternative, or a unit as structure", () => {
    /** Builds a numeric entry version that shows the given unit. */
    const withUnit = (unit: string, language: string) =>
      versionOf(
        { ...numericEntryInteraction, unit },
        doc(paragraph(placeInline("volume"))),
        language
      );
    /** Builds a hotspot version whose image has the given text alternative. */
    const withAlt = (alt: string, language: string) =>
      versionOf(
        { ...hotspotInteraction, image: { ...hotspotInteraction.image, alt } },
        doc(place("organs")),
        language
      );

    expect(
      failsStrict(ItemSchema, {
        family: { id: "test-item" },
        versions: [withUnit("liter", "id"), withUnit("Liter", "en")],
      })
    ).toBe(false);
    expect(
      failsStrict(ItemSchema, {
        family: { id: "test-item" },
        versions: [withAlt("A torso", "en"), withAlt("Ein Oberkoerper", "de")],
      })
    ).toBe(false);
  });

  it("rejects a version of another family or another shared reading", () => {
    for (const other of [
      { ...tkaMultipleEnglish, family: `${tkaMultiple.family}-other` },
      { ...tkaMultipleEnglish, stimulus: { hash: hash("a"), id: PASSAGE_ID } },
    ]) {
      expect(
        failsStrict(ItemSchema, {
          family: FAMILY,
          versions: [tkaMultiple, other],
        })
      ).toBe(true);
    }
    expect(
      failsStrict(ItemSchema, {
        family: { ...FAMILY, stimulus: PASSAGE_ID },
        versions: [tkaMultiple],
      })
    ).toBe(true);
  });

  it("rejects two versions in one language, and an item without a version", () => {
    expect(
      failsStrict(ItemSchema, {
        family: FAMILY,
        versions: [
          tkaMultiple,
          { ...tkaMultipleEnglish, deliveryLanguage: "id" },
        ],
      })
    ).toBe(true);
    expect(failsStrict(ItemSchema, { family: FAMILY, versions: [] })).toBe(
      true
    );
  });

  it("accepts the three questions of the shared passage, each with the stimulus of its family", () => {
    for (const [questionFamily, version] of Arr.zip(passageFamilies, [
      snbtQuestion10,
      snbtQuestion11,
      snbtQuestion12,
    ])) {
      expect(
        failsStrict(ItemSchema, {
          family: questionFamily,
          versions: [version],
        })
      ).toBe(false);
    }
  });
});
