import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  canonicalizeLearningProgram,
  LearningProgramSchema,
  ProgramNavigationIconKeySchema,
  ProgramNavigationLevelSchema,
} from "#contracts/program/spec";
import { reverseObjectKeys } from "#contracts/test/order";

const source = {
  defaultCoverageStatus: "partial",
  displayOrder: 10,
  iconKey: "school",
  key: "merdeka",
  kind: "school-curriculum",
  navigation: {
    levels: ["stage", "class", "subject", "topic"],
    model: "curriculum-tree",
  },
  provider: {
    homeCountry: "ID",
    kind: "official",
    name: "Kemendikdasmen",
  },
  recommendedCountry: "ID",
  sources: [
    {
      label: "Capaian Pembelajaran dan ATP",
      retrievedAt: "2026-06-14",
      reviewAfter: "2027-01-01",
      type: "official-policy",
      url: "https://guru.kemendikdasmen.go.id/kurikulum/",
    },
  ],
  translations: {
    en: { publicSlug: "merdeka", title: "Kurikulum Merdeka" },
    id: { publicSlug: "merdeka", title: "Kurikulum Merdeka" },
  },
  version: { label: "Indonesia" },
} as const;

describe("learning program contract", () => {
  it("decodes real localized program metadata and canonicalizes optional fields", () => {
    const program = Schema.decodeUnknownSync(LearningProgramSchema)(source);
    const canonical = canonicalizeLearningProgram(program);

    expect(JSON.parse(canonical)).toEqual(source);
    expect(ProgramNavigationLevelSchema.literals).toContain("domain");
    expect(ProgramNavigationIconKeySchema.literals).toContain("certificate");
  });

  it("omits absent country and source dates from canonical bytes", () => {
    const program = Schema.decodeUnknownSync(LearningProgramSchema)({
      ...source,
      provider: { kind: "official", name: "Provider" },
      recommendedCountry: undefined,
      sources: [
        {
          label: "Portal",
          retrievedAt: "2026-06-14",
          type: "official-portal",
          url: "https://example.test/source",
        },
      ],
      version: {
        endsAt: "2027-12-31",
        label: "2026",
      },
    });

    expect(JSON.parse(canonicalizeLearningProgram(program))).toMatchObject({
      provider: { kind: "official", name: "Provider" },
      sources: [{ label: "Portal", retrievedAt: "2026-06-14" }],
      version: {
        endsAt: "2027-12-31",
        label: "2026",
      },
    });
    expect(canonicalizeLearningProgram(program)).not.toContain("reviewAfter");

    const startsOnly = Schema.decodeUnknownSync(LearningProgramSchema)({
      ...source,
      version: {
        label: "2026",
        startsAt: "2026-01-01",
      },
    });
    expect(JSON.parse(canonicalizeLearningProgram(startsOnly)).version).toEqual(
      {
        label: "2026",
        startsAt: "2026-01-01",
      }
    );
  });

  it("keeps localized program identity independent of object insertion order", () => {
    const canonical = Schema.decodeUnknownSync(LearningProgramSchema)(source);
    const reordered = {
      ...canonical,
      translations: reverseObjectKeys(canonical.translations),
    };

    expect(Object.keys(reordered.translations)).toEqual(["id", "en"]);
    expect(canonicalizeLearningProgram(reordered)).toBe(
      canonicalizeLearningProgram(canonical)
    );
  });

  it.each([
    ["invalid program key", { key: "Merdeka" }],
    ["missing locale", { translations: { en: source.translations.en } }],
    [
      "unsafe URL",
      { sources: [{ ...source.sources[0], url: "http://x.test" }] },
    ],
    [
      "reversed dates",
      {
        version: {
          endsAt: "2026-01-01",
          label: "invalid",
          startsAt: "2027-01-01",
        },
      },
    ],
    [
      "empty navigation",
      { navigation: { levels: [], model: "curriculum-tree" } },
    ],
  ])("rejects %s", (_, change) => {
    const result = Schema.decodeUnknownEither(LearningProgramSchema)({
      ...source,
      ...change,
    });

    expect(Either.isLeft(result)).toBe(true);
    if ("key" in change) {
      expect(String(result)).toContain("Invalid learning program key.");
    }
    if ("version" in change && change.version && "startsAt" in change.version) {
      expect(String(result)).toContain(
        "Expected a coherent learning program date window."
      );
    }
  });
});
