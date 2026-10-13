import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import {
  AccommodationCatalogSchema,
  ExamProfileSchema,
} from "#contracts/assessment/profile";
import { decodeStrict, failsStrict } from "#contracts/test/assessment/document";
import {
  accommodations,
  choiceDefault,
  partOne,
  partTwo,
  schoolProfile,
  snbtProfile,
  textEntryDefault,
} from "#contracts/test/assessment/exam";
import { allOrNothing, formula } from "#contracts/test/assessment/scoring";

describe("exam profiles", () => {
  it("decodes the profile of UTBK-SNBT with the counts and times of the corpus", () => {
    const decoded = decodeStrict(ExamProfileSchema, snbtProfile);

    expect(decoded.sections).toHaveLength(7);
    expect(decoded.totalSeconds).toBe(195 * 60);
    expect(Schema.encodeSync(ExamProfileSchema)(decoded)).toEqual(snbtProfile);
  });

  it("decodes a school exam that enables tools, breaks, and several interactions", () => {
    const decoded = decodeStrict(ExamProfileSchema, schoolProfile);

    expect(decoded.breaks).toEqual([{ after: "part-one", seconds: 300 }]);
    expect(Schema.encodeSync(ExamProfileSchema)(decoded)).toEqual(
      schoolProfile
    );
  });

  it("names the exam and each section in every language", () => {
    const { de: _de, ...partial } = snbtProfile.names;

    expect(
      failsStrict(ExamProfileSchema, { ...snbtProfile, names: partial })
    ).toBe(true);
    expect(
      failsStrict(ExamProfileSchema, {
        ...schoolProfile,
        sections: [
          { ...partOne, names: { ...partOne.names, en: "" } },
          partTwo,
        ],
      })
    ).toBe(true);
  });

  it("totals the time of its sections", () => {
    expect(
      failsStrict(ExamProfileSchema, { ...snbtProfile, totalSeconds: 11_699 })
    ).toBe(true);
    expect(
      failsStrict(ExamProfileSchema, { ...snbtProfile, totalSeconds: 0 })
    ).toBe(true);
  });

  it("has sections of its own with items, time, navigation, and tools", () => {
    for (const section of [
      { ...partOne, id: partTwo.id },
      { ...partOne, items: 0 },
      { ...partOne, seconds: 0 },
      { ...partOne, navigation: "random" },
      { ...partOne, interactions: [] },
      { ...partOne, interactions: ["choice", "choice"] },
      { ...partOne, interactions: ["upload"] },
      { ...partOne, tools: ["calculator-basic", "calculator-graphing"] },
      { ...partOne, tools: ["abacus"] },
    ]) {
      expect(
        failsStrict(ExamProfileSchema, {
          ...schoolProfile,
          sections: [section, partTwo],
        })
      ).toBe(true);
    }
    expect(
      failsStrict(ExamProfileSchema, { ...snbtProfile, sections: [] })
    ).toBe(true);
  });

  it("puts a break after a section that another section follows, once", () => {
    for (const breaks of [
      [{ after: "part-two", seconds: 300 }],
      [{ after: "part-three", seconds: 300 }],
      [
        { after: "part-one", seconds: 300 },
        { after: "part-one", seconds: 600 },
      ],
      [{ after: "part-one", seconds: 0 }],
    ]) {
      expect(failsStrict(ExamProfileSchema, { ...schoolProfile, breaks })).toBe(
        true
      );
    }
    expect(
      failsStrict(ExamProfileSchema, { ...schoolProfile, breaks: [] })
    ).toBe(false);
  });

  it("sets one default rule for each allowed kind except an extended text", () => {
    for (const defaults of [
      [choiceDefault],
      [
        choiceDefault,
        textEntryDefault,
        { interaction: "order", rule: allOrNothing },
      ],
      [choiceDefault, choiceDefault],
      [choiceDefault, { interaction: "extendedText", rule: allOrNothing }],
      [
        choiceDefault,
        { ...textEntryDefault, rule: { criteria: [], kind: "rubric" } },
      ],
    ]) {
      expect(
        failsStrict(ExamProfileSchema, { ...schoolProfile, defaults })
      ).toBe(true);
    }
  });

  it("keeps the floor of a default rule per part within the points of a field", () => {
    /** Builds the default of a text entry, a field with one part worth 2 points. */
    const fieldDefault = (floor: number) => ({
      interaction: "textEntry",
      rule: { floor, kind: "perPart", pointsPerPart: 2 },
    });

    for (const floor of [0, 2]) {
      expect(
        failsStrict(ExamProfileSchema, {
          ...schoolProfile,
          defaults: [choiceDefault, fieldDefault(floor)],
        })
      ).toBe(false);
    }
    expect(
      failsStrict(ExamProfileSchema, {
        ...schoolProfile,
        defaults: [choiceDefault, fieldDefault(3)],
      })
    ).toBe(true);
  });

  it("has a scale for an IRT or composite score only", () => {
    const { scale: _scale, ...unscaled } = snbtProfile;

    expect(failsStrict(ExamProfileSchema, unscaled)).toBe(true);
    expect(
      failsStrict(ExamProfileSchema, {
        ...schoolProfile,
        scale: { maximum: 100, minimum: 0 },
      })
    ).toBe(true);
    expect(
      failsStrict(ExamProfileSchema, {
        ...snbtProfile,
        scale: { maximum: 0, minimum: 0 },
      })
    ).toBe(true);
    expect(
      failsStrict(ExamProfileSchema, {
        ...snbtProfile,
        report: { sections: true, standardError: false, total: true },
        scale: { maximum: 800, minimum: 200 },
        scoring: { formula, kind: "composite" },
      })
    ).toBe(false);
  });

  it("shows the standard error of an IRT score, and no other", () => {
    expect(
      failsStrict(ExamProfileSchema, {
        ...snbtProfile,
        report: { sections: true, standardError: false, total: true },
      })
    ).toBe(true);
    expect(
      failsStrict(ExamProfileSchema, {
        ...schoolProfile,
        report: { sections: false, standardError: true, total: true },
      })
    ).toBe(true);
  });

  it("reports the total, the sections, or both", () => {
    for (const report of [
      { sections: true, standardError: false, total: false },
      { sections: false, standardError: false, total: true },
    ]) {
      expect(failsStrict(ExamProfileSchema, { ...schoolProfile, report })).toBe(
        false
      );
    }
    expect(
      failsStrict(ExamProfileSchema, {
        ...schoolProfile,
        report: { sections: false, standardError: false, total: false },
      })
    ).toBe(true);
  });

  it("decides what a sampled math verdict does: it scores, or it goes to the teacher", () => {
    const { sampledMath: _sampledMath, ...undecided } = schoolProfile;

    expect(decodeStrict(ExamProfileSchema, snbtProfile).sampledMath).toBe(
      "score"
    );
    expect(decodeStrict(ExamProfileSchema, schoolProfile).sampledMath).toBe(
      "review"
    );
    expect(failsStrict(ExamProfileSchema, undecided)).toBe(true);
    for (const sampledMath of ["sample", "proof", "proofOrSample", "", null]) {
      expect(
        failsStrict(ExamProfileSchema, { ...schoolProfile, sampledMath })
      ).toBe(true);
    }
  });

  it("sets the write allowance and the grace period for every deadline, in whole seconds above zero", () => {
    const { graceSeconds: _grace, ...withoutGrace } = schoolProfile;
    const { writeAllowanceSeconds: _allowance, ...withoutAllowance } =
      schoolProfile;

    expect(decodeStrict(ExamProfileSchema, snbtProfile)).toMatchObject({
      graceSeconds: 120,
      writeAllowanceSeconds: 5,
    });
    expect(failsStrict(ExamProfileSchema, withoutGrace)).toBe(true);
    expect(failsStrict(ExamProfileSchema, withoutAllowance)).toBe(true);
    for (const field of ["graceSeconds", "writeAllowanceSeconds"]) {
      expect(
        failsStrict(ExamProfileSchema, { ...schoolProfile, [field]: 1 })
      ).toBe(false);
      for (const seconds of [0, -1, 1.5, "5", null]) {
        expect(
          failsStrict(ExamProfileSchema, { ...schoolProfile, [field]: seconds })
        ).toBe(true);
      }
    }
  });

  it("accepts a penalized exam with its marks", () => {
    expect(
      failsStrict(ExamProfileSchema, {
        ...schoolProfile,
        scoring: {
          kind: "penalized",
          marks: { blank: 0, correct: 4, wrong: -1 },
        },
      })
    ).toBe(false);
  });
});

describe("accommodations", () => {
  it("lists tools for all, assigned support, and recorded accommodations", () => {
    expect(failsStrict(AccommodationCatalogSchema, accommodations)).toBe(false);
  });

  it("lists each support, tool, and accommodation once", () => {
    for (const change of [
      { assigned: ["high-contrast", "high-contrast"] },
      { assigned: ["braille"] },
      { universal: ["zoom", "zoom"] },
      {
        recorded: [{ kind: "reader" }, { kind: "reader" }],
      },
      { recorded: [{ kind: "extraTime", maxPercent: 0 }] },
      { recorded: [{ kind: "extraBreak", maxSeconds: 0 }] },
      { recorded: [{ kind: "oracle" }] },
    ]) {
      expect(
        failsStrict(AccommodationCatalogSchema, {
          ...accommodations,
          ...change,
        })
      ).toBe(true);
    }
  });
});
