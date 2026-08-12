import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { CurriculumRouteV4Schema } from "#contracts/program/curriculum";
import {
  canonicalizeLearningProgramV4,
  canonicalizeProgramSnapshotV4Row,
  LearningProgramV4Schema,
} from "#contracts/program/v4";
import {
  makeTestCurriculumRoot,
  makeTestProgram,
} from "#contracts/test/program";

/** Converts one historical test program into explicit current translations. */
function currentProgram(index: number) {
  const program = makeTestProgram(index);
  return Schema.decodeUnknownSync(LearningProgramV4Schema)({
    ...program,
    translations: [
      { appLocale: "en", ...program.translations.en },
      { appLocale: "id", ...program.translations.id },
    ],
  });
}

describe("program v4 row contract", () => {
  it("canonicalizes both row kinds and every optional program field", () => {
    const base = currentProgram(1);
    const complete = Schema.decodeUnknownSync(LearningProgramV4Schema)({
      ...base,
      provider: { ...base.provider, homeCountry: "ID" },
      recommendedCountry: "ID",
      sources: [
        {
          ...base.sources[0],
          reviewAfter: "2027-01-01",
        },
      ],
      version: {
        endsAt: "2027-12-31",
        label: base.version.label,
        startsAt: "2026-01-01",
      },
    });
    const route = Schema.decodeUnknownSync(CurriculumRouteV4Schema)(
      makeTestCurriculumRoot(makeTestProgram(1), "en")
    );
    expect(JSON.parse(canonicalizeLearningProgramV4(base))).not.toHaveProperty(
      "recommendedCountry"
    );
    expect(JSON.parse(canonicalizeLearningProgramV4(complete))).toMatchObject({
      provider: { homeCountry: "ID" },
      recommendedCountry: "ID",
      version: { endsAt: "2027-12-31", startsAt: "2026-01-01" },
    });
    expect(
      canonicalizeProgramSnapshotV4Row({ kind: "program-v4", row: complete })
    ).toContain('"kind":"program-v4"');
    expect(
      canonicalizeProgramSnapshotV4Row({ kind: "curriculum-v4", row: route })
    ).toContain('"kind":"curriculum-v4"');
  });

  it("rejects duplicated or unordered translation locales", () => {
    const program = currentProgram(1);
    const result = Schema.decodeUnknownEither(LearningProgramV4Schema)({
      ...program,
      translations: [program.translations[1], program.translations[0]],
    });
    if (Either.isRight(result)) {
      throw new Error("Expected unordered current program translations.");
    }

    expect(ParseResult.TreeFormatter.formatErrorSync(result.left)).toContain(
      "Program translations must use unique canonical app-locale order."
    );
  });
});
