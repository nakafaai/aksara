import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import { AppLocaleSchema } from "#contracts/locale";
import { CurriculumRouteSchema } from "#contracts/program/curriculum";
import { canonicalizeProgramSnapshotRow } from "#contracts/program/snapshot/row";
import {
  canonicalizeLearningProgram,
  LearningProgramSchema,
} from "#contracts/program/spec";
import {
  makeTestCurriculumRoot,
  makeTestProgram,
} from "#contracts/test/program";

describe("program snapshot row contract", () => {
  it("canonicalizes both row kinds and optional program fields", () => {
    const base = makeTestProgram(1);
    const complete = Schema.decodeSync(LearningProgramSchema)({
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
    const route = Schema.decodeSync(CurriculumRouteSchema)(
      makeTestCurriculumRoot(base, AppLocaleSchema.make("en"))
    );
    expect(JSON.parse(canonicalizeLearningProgram(base))).not.toHaveProperty(
      "recommendedCountry"
    );
    expect(JSON.parse(canonicalizeLearningProgram(complete))).toMatchObject({
      provider: { homeCountry: "ID" },
      recommendedCountry: "ID",
      version: { endsAt: "2027-12-31", startsAt: "2026-01-01" },
    });
    expect(
      canonicalizeProgramSnapshotRow({ kind: "program", row: complete })
    ).toContain('"kind":"program"');
    expect(
      canonicalizeProgramSnapshotRow({ kind: "curriculum", row: route })
    ).toContain('"kind":"curriculum"');
  });

  it("rejects duplicated or unordered translation locales", () => {
    const program = makeTestProgram(1);
    const result = Schema.decodeUnknownExit(LearningProgramSchema)({
      ...program,
      translations: [program.translations[1], program.translations[0]],
    });
    if (Exit.isSuccess(result)) {
      throw new Error("Expected unordered program translations.");
    }
    expect(String(result.cause)).toContain(
      "Program translations must use unique canonical app-locale order."
    );
  });
});
