import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Schema } from "effect";

import {
  ItemVersionSchema,
  StimulusReferenceSchema,
} from "#contracts/assessment/item";
import {
  PaperSchema,
  PaperStimuliMismatchError,
  verifyPaperStimuli,
} from "#contracts/assessment/paper";
import { decodeStrict, failsStrict } from "#contracts/test/assessment/document";
import {
  firstPlacement,
  passageReference,
  passageSection,
  snbtPaper,
  tkaPaper,
  tkaSection,
} from "#contracts/test/assessment/exam";
import { hash } from "#contracts/test/assessment/item";
import {
  bilingualKeys,
  bilingualPaper,
  bilingualPlacement,
  bilingualVersions,
  choice,
  keyOf,
  places,
  reorderedKeys,
  text,
} from "#contracts/test/assessment/languages";
import {
  snbtQuestion10,
  snbtQuestion11,
  snbtQuestion12,
} from "#contracts/test/assessment/passage";
import {
  tkaMatrix,
  tkaMultiple,
  tkaMultipleEnglish,
  tkaMultipleExplanation,
} from "#contracts/test/assessment/tka";

describe("papers", () => {
  it("freezes a manuscript: a profile, sections of places, and the stimuli it uses", () => {
    const decoded = decodeStrict(PaperSchema, snbtPaper);

    expect(decoded.sections).toHaveLength(2);
    expect(Schema.encodeSync(PaperSchema)(decoded)).toEqual(snbtPaper);
  });

  it("points at each item version by family and hash, and carries no answer key and no explanation", () => {
    for (const placement of [
      { ...firstPlacement, hash: "abc" },
      { ...firstPlacement, correct: ["option-5"] },
      { ...firstPlacement, explanation: tkaMultipleExplanation.document },
    ]) {
      expect(
        failsStrict(PaperSchema, {
          ...snbtPaper,
          sections: [
            { ...passageSection, placements: [placement] },
            tkaSection,
          ],
        })
      ).toBe(true);
    }
    expect(
      failsStrict(PaperSchema, { ...snbtPaper, key: { answers: [] } })
    ).toBe(true);
    expect(
      failsStrict(PaperSchema, {
        ...snbtPaper,
        explanation: tkaMultipleExplanation,
      })
    ).toBe(true);
  });

  it("follows a profile by identifier and hash", () => {
    expect(
      failsStrict(PaperSchema, {
        ...snbtPaper,
        profile: { id: snbtPaper.profile.id },
      })
    ).toBe(true);
    expect(
      failsStrict(PaperSchema, {
        ...snbtPaper,
        profile: { ...snbtPaper.profile, hash: "7" },
      })
    ).toBe(true);
  });

  it("puts each section and each item in one place only", () => {
    expect(
      failsStrict(PaperSchema, {
        ...snbtPaper,
        sections: [
          passageSection,
          { ...tkaSection, section: passageSection.section },
        ],
      })
    ).toBe(true);
    expect(
      failsStrict(PaperSchema, {
        ...snbtPaper,
        sections: [
          passageSection,
          { ...tkaSection, placements: [firstPlacement] },
        ],
      })
    ).toBe(true);
    expect(failsStrict(PaperSchema, { ...snbtPaper, sections: [] })).toBe(true);
    expect(
      failsStrict(PaperSchema, {
        ...snbtPaper,
        sections: [{ ...passageSection, placements: [] }, tkaSection],
      })
    ).toBe(true);
  });

  it("lists each stimulus version once, and a stimulus in two languages as two versions", () => {
    expect(
      failsStrict(PaperSchema, {
        ...snbtPaper,
        stimuli: [passageReference, passageReference],
      })
    ).toBe(true);
    expect(
      failsStrict(PaperSchema, {
        ...snbtPaper,
        stimuli: [passageReference, { ...passageReference, hash: hash("b") }],
      })
    ).toBe(false);
  });

  it("lists no stimulus version when its items share no reading", () => {
    expect(failsStrict(PaperSchema, tkaPaper)).toBe(false);
  });
});

describe("the stimuli a paper lists", () => {
  const passagePaper = decodeStrict(PaperSchema, snbtPaper);
  const decodedTkaPaper = decodeStrict(PaperSchema, tkaPaper);
  const passageVersions = Arr.map(
    [snbtQuestion10, snbtQuestion11, snbtQuestion12],
    (version) => decodeStrict(ItemVersionSchema, version)
  );
  const tkaVersions = Arr.map([tkaMultiple, tkaMatrix], (version) =>
    decodeStrict(ItemVersionSchema, version)
  );

  it.effect("are the stimulus versions that its items use, each once", () =>
    Effect.gen(function* () {
      yield* verifyPaperStimuli(passagePaper, [
        ...passageVersions,
        ...tkaVersions,
      ]);
      yield* verifyPaperStimuli(decodedTkaPaper, tkaVersions);
    })
  );

  it.effect("must include a stimulus version that its items use", () =>
    Effect.gen(function* () {
      const error = yield* verifyPaperStimuli(
        { ...passagePaper, stimuli: [] },
        [...passageVersions, ...tkaVersions]
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(PaperStimuliMismatchError);
      expect(error).toMatchObject({ missing: [passageReference], unused: [] });
    })
  );

  it.effect("must not include a stimulus version that no item uses", () =>
    Effect.gen(function* () {
      const error = yield* verifyPaperStimuli(
        { ...decodedTkaPaper, stimuli: passagePaper.stimuli },
        tkaVersions
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(PaperStimuliMismatchError);
      expect(error).toMatchObject({ missing: [], unused: [passageReference] });
    })
  );

  it.effect("name a stimulus version by identifier and hash", () =>
    Effect.gen(function* () {
      const other = { ...passageReference, hash: hash("b") };
      const error = yield* verifyPaperStimuli(
        {
          ...passagePaper,
          stimuli: [decodeStrict(StimulusReferenceSchema, other)],
        },
        [...passageVersions, ...tkaVersions]
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        missing: [passageReference],
        unused: [other],
      });
    })
  );
});

describe("paper places in several languages", () => {
  it("places one item in every language of its section, in the section's order", () => {
    expect(failsStrict(PaperSchema, bilingualPaper)).toBe(false);
    for (const versions of [
      [bilingualPlacement.versions[0]],
      Arr.reverse(bilingualPlacement.versions),
      [bilingualPlacement.versions[0], bilingualPlacement.versions[0]],
    ]) {
      expect(
        failsStrict(PaperSchema, {
          ...bilingualPaper,
          sections: [
            {
              ...bilingualPaper.sections[0],
              placements: [{ ...bilingualPlacement, versions }],
            },
          ],
        })
      ).toBe(true);
    }
    expect(
      failsStrict(PaperSchema, {
        ...bilingualPaper,
        sections: [{ ...bilingualPaper.sections[0], languages: ["id", "id"] }],
      })
    ).toBe(true);
  });

  it.effect(
    "holds an item whose versions differ only in words, and refuses one that differs in more",
    () =>
      Effect.gen(function* () {
        const keys = [
          keyOf(tkaMultiple.hash, choice),
          keyOf(tkaMultipleEnglish.hash, choice),
        ];

        expect(yield* places([tkaMultiple, tkaMultipleEnglish], keys)).toBe(
          "held"
        );
        expect(
          yield* places(
            [tkaMultiple, { ...tkaMultipleEnglish, deliveryLanguage: "ms" }],
            keys
          )
        ).toBe("version");
        expect(yield* places([tkaMultiple], keys)).toBe("version");
        expect(
          yield* places(
            [
              tkaMultiple,
              {
                ...tkaMultipleEnglish,
                interactions: [
                  { ...tkaMultipleEnglish.interactions[0], maxChoices: 4 },
                ],
              },
            ],
            keys
          )
        ).toBe("structure");
      })
  );

  it.effect(
    "keys a typed answer in each language's words, and every other answer the same in all",
    () =>
      Effect.gen(function* () {
        const reasons = yield* Effect.forEach(
          [
            bilingualKeys(text(["segitiga"]), text(["triangle"])),
            bilingualKeys(text(["segitiga"]), text(["triangle"], false)),
            bilingualKeys(choice, { ...choice, correct: ["option-2"] }),
            [keyOf(tkaMultiple.hash, choice)],
            reorderedKeys(),
          ],
          (keys) => places(bilingualVersions, keys)
        );

        expect(reasons).toEqual(["held", "key", "key", "key", "held"]);
      })
  );
});
