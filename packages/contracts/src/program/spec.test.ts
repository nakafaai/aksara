import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import {
  canonicalizeLearningProgram,
  LearningProgramSchema,
  ProgramNavigationIconKeySchema,
  ProgramNavigationLevelSchema,
} from "#contracts/program/spec";

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
  translations: [
    {
      appLocale: "en",
      publicSlug: "merdeka",
      title: "Kurikulum Merdeka",
    },
    {
      appLocale: "id",
      publicSlug: "merdeka",
      title: "Kurikulum Merdeka",
    },
  ],
  version: { label: "Indonesia" },
} as const;

const goldenFull = Schema.decodeSync(LearningProgramSchema)({
  defaultCoverageStatus: "available",
  displayOrder: 3,
  iconKey: "mathematics",
  key: "matematika-dasar",
  kind: "institution-program",
  navigation: { levels: ["topic", "subject", "unit"], model: "track-topic" },
  provider: { homeCountry: "ZZ", kind: "institution", name: "Lembaga Uji é" },
  recommendedCountry: "ZZ",
  sources: [
    {
      label: "Zeta sumber é",
      retrievedAt: "2026-06-14",
      reviewAfter: "2027-01-01",
      type: "institution-document",
      url: "https://example.test/zeta",
    },
    {
      label: "Alpha source",
      retrievedAt: "2026-06-15",
      type: "official-portal",
      url: "https://example.test/alpha",
    },
  ],
  translations: [
    {
      appLocale: "en",
      publicSlug: "basic-mathematics",
      title: "Basic Mathematics é",
    },
    {
      appLocale: "id",
      publicSlug: "matematika-dasar",
      title: "Matematika Dasar",
    },
    {
      appLocale: "de",
      publicSlug: "grundlagen-mathematik",
      title: "Grundlagen Mathematik",
    },
  ],
  version: { endsAt: "2027-12-31", label: "2026/2027", startsAt: "2026-07-01" },
});
const goldenMinimal = Schema.decodeSync(LearningProgramSchema)({
  defaultCoverageStatus: "planned",
  displayOrder: 1,
  iconKey: "school",
  key: "minimal-program",
  kind: "custom-program",
  navigation: { levels: ["lesson"], model: "course-unit-lesson" },
  provider: { kind: "learner", name: "Pembelajar" },
  sources: [
    {
      label: "Editorial",
      retrievedAt: "2026-01-02",
      type: "nakafa-editorial",
      url: "https://example.test/editorial",
    },
  ],
  translations: [
    {
      appLocale: "en",
      publicSlug: "minimal-program",
      title: "Minimal Program",
    },
  ],
  version: { label: "Current" },
});
const goldenMixed = Schema.decodeSync(LearningProgramSchema)({
  ...goldenMinimal,
  displayOrder: 2,
  key: "mixed-program",
  provider: { kind: "official", name: "Kementerian Contoh" },
  recommendedCountry: "DE",
  sources: [
    {
      label: "Portal",
      retrievedAt: "2026-03-04",
      reviewAfter: "2026-12-31",
      type: "official-portal",
      url: "https://example.test/portal",
    },
  ],
  version: { label: "2026", startsAt: "2026-01-01" },
});

describe("learning program golden canonical bytes", () => {
  it("pins the canonical bytes of a program with every optional field", () => {
    expect(canonicalizeLearningProgram(goldenFull)).toBe(
      '{"defaultCoverageStatus":"available","displayOrder":3,"iconKey":"mathematics","key":"matematika-dasar","kind":"institution-program","navigation":{"levels":["topic","subject","unit"],"model":"track-topic"},"provider":{"homeCountry":"ZZ","kind":"institution","name":"Lembaga Uji é"},"recommendedCountry":"ZZ","sources":[{"label":"Zeta sumber é","retrievedAt":"2026-06-14","reviewAfter":"2027-01-01","type":"institution-document","url":"https://example.test/zeta"},{"label":"Alpha source","retrievedAt":"2026-06-15","type":"official-portal","url":"https://example.test/alpha"}],"translations":[{"appLocale":"en","publicSlug":"basic-mathematics","title":"Basic Mathematics é"},{"appLocale":"id","publicSlug":"matematika-dasar","title":"Matematika Dasar"},{"appLocale":"de","publicSlug":"grundlagen-mathematik","title":"Grundlagen Mathematik"}],"version":{"endsAt":"2027-12-31","label":"2026/2027","startsAt":"2026-07-01"}}'
    );
  });

  it("pins the canonical bytes of a program without optional fields", () => {
    expect(canonicalizeLearningProgram(goldenMinimal)).toBe(
      '{"defaultCoverageStatus":"planned","displayOrder":1,"iconKey":"school","key":"minimal-program","kind":"custom-program","navigation":{"levels":["lesson"],"model":"course-unit-lesson"},"provider":{"kind":"learner","name":"Pembelajar"},"sources":[{"label":"Editorial","retrievedAt":"2026-01-02","type":"nakafa-editorial","url":"https://example.test/editorial"}],"translations":[{"appLocale":"en","publicSlug":"minimal-program","title":"Minimal Program"}],"version":{"label":"Current"}}'
    );
  });

  it("pins the canonical bytes of a program with a mixed set of optional fields", () => {
    expect(canonicalizeLearningProgram(goldenMixed)).toBe(
      '{"defaultCoverageStatus":"planned","displayOrder":2,"iconKey":"school","key":"mixed-program","kind":"custom-program","navigation":{"levels":["lesson"],"model":"course-unit-lesson"},"provider":{"kind":"official","name":"Kementerian Contoh"},"recommendedCountry":"DE","sources":[{"label":"Portal","retrievedAt":"2026-03-04","reviewAfter":"2026-12-31","type":"official-portal","url":"https://example.test/portal"}],"translations":[{"appLocale":"en","publicSlug":"minimal-program","title":"Minimal Program"}],"version":{"label":"2026","startsAt":"2026-01-01"}}'
    );
  });
});

describe("learning program contract", () => {
  it("decodes real localized program metadata and canonicalizes optional fields", () => {
    const program = Schema.decodeSync(LearningProgramSchema)(source);
    const canonical = canonicalizeLearningProgram(program);

    expect(JSON.parse(canonical)).toEqual(source);
    expect(ProgramNavigationLevelSchema.literals).toContain("domain");
    expect(ProgramNavigationIconKeySchema.literals).toContain("certificate");
  });

  it("omits absent country and source dates from canonical bytes", () => {
    const program = Schema.decodeSync(LearningProgramSchema)({
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

    const startsOnly = Schema.decodeSync(LearningProgramSchema)({
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

  it("requires localized program identity in canonical app-locale order", () => {
    const canonical = Schema.decodeSync(LearningProgramSchema)(source);
    const reordered = {
      ...canonical,
      translations: [canonical.translations[1], canonical.translations[0]],
    };

    expect(
      Exit.isFailure(Schema.decodeUnknownExit(LearningProgramSchema)(reordered))
    ).toBe(true);
  });

  it.each([
    ["invalid program key", { key: "Merdeka" }],
    [
      "duplicate locale",
      { translations: [source.translations[0], source.translations[0]] },
    ],
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
    const result = Schema.decodeUnknownExit(LearningProgramSchema)({
      ...source,
      ...change,
    });

    expect(Exit.isFailure(result)).toBe(true);
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
