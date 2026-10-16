import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Schema } from "effect";

import {
  ItemFamilySchema,
  ItemSchema,
  ItemVersionSchema,
} from "#contracts/assessment/item";
import { MAX_RECORD_BYTES } from "#contracts/assessment/record";
import { arabicFamily, arabicVersion } from "#contracts/test/assessment/arabic";
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
  choiceInteraction,
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
import { recordOfBytes } from "#contracts/test/assessment/record";
import { perPart } from "#contracts/test/assessment/scoring";
import {
  tkaChoice,
  tkaMatrix,
  tkaMultiple,
  tkaMultipleEnglish,
  tkaMultipleExplanation,
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

  it("is a record of its own: a hash, a language, no answer key, and no explanation", () => {
    const { hash: _hash, ...unhashed } = tkaMultiple;

    expect(failsStrict(ItemVersionSchema, unhashed)).toBe(true);
    for (const change of [
      { hash: "abc" },
      { deliveryLanguage: "en_US" },
      { correct: ["option-2"] },
      // The explanation is a record of its own, named by the hash of the version.
      { explanation: tkaMultipleExplanation.document },
    ]) {
      expect(
        failsStrict(ItemVersionSchema, { ...tkaMultiple, ...change })
      ).toBe(true);
    }
  });
});

describe("an item version is written in any content language", () => {
  it("accepts an Arabic version, which the app locales do not include", () => {
    expect(
      decodeStrict(ItemVersionSchema, arabicVersion).deliveryLanguage
    ).toBe("ar");
    expect(
      failsStrict(ItemSchema, {
        family: arabicFamily,
        versions: [arabicVersion],
      })
    ).toBe(false);
  });

  it("refuses a language that is not a canonical tag", () => {
    for (const deliveryLanguage of ["AR", "en_US", "iw", "", "x"]) {
      expect(
        failsStrict(ItemVersionSchema, { ...arabicVersion, deliveryLanguage })
      ).toBe(true);
    }
  });

  it("rejects two versions of one family in one canonical language", () => {
    expect(
      failsStrict(ItemSchema, {
        family: arabicFamily,
        versions: [arabicVersion, { ...arabicVersion, hash: hash("c") }],
      })
    ).toBe(true);
  });
});

describe("an item version is one row in Convex", () => {
  it("fits 1 MiB with its hash, to the byte", () => {
    /** Builds a version of a choice whose prompt holds the given text. */
    const prompting = (filler: string) =>
      versionOf(
        choiceInteraction,
        doc(paragraph(text(filler)), place("answer")),
        "id"
      );

    expect(
      failsStrict(ItemVersionSchema, recordOfBytes(prompting, MAX_RECORD_BYTES))
    ).toBe(false);
    expect(
      failsStrict(
        ItemVersionSchema,
        recordOfBytes(prompting, MAX_RECORD_BYTES + 1)
      )
    ).toBe(true);
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
