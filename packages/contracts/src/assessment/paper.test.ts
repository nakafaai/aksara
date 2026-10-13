import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { PaperSchema } from "#contracts/assessment/paper";
import { decodeStrict, failsStrict } from "#contracts/test/assessment/document";
import {
  firstPlacement,
  passageReference,
  passageSection,
  snbtPaper,
  tkaSection,
} from "#contracts/test/assessment/exam";
import { hash } from "#contracts/test/assessment/item";

describe("papers", () => {
  it("freezes a manuscript: a profile, sections of places, and the stimuli it uses", () => {
    const decoded = decodeStrict(PaperSchema, snbtPaper);

    expect(decoded.sections).toHaveLength(2);
    expect(Schema.encodeSync(PaperSchema)(decoded)).toEqual(snbtPaper);
  });

  it("points at each item version by family and hash, and carries no answer key", () => {
    for (const placement of [
      { ...firstPlacement, hash: "abc" },
      { ...firstPlacement, correct: ["option-5"] },
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
    expect(failsStrict(PaperSchema, { ...snbtPaper, stimuli: [] })).toBe(false);
  });
});
