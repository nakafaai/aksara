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
  snbtQuestion10,
  snbtQuestion11,
  snbtQuestion12,
} from "#contracts/test/assessment/passage";
import {
  tkaMatrix,
  tkaMultiple,
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
