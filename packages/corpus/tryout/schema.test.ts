import { Effect, Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { importCorpusModules } from "#corpus/test/imports";
import {
  defineTryoutExamSource,
  TryoutExamSourceSchema,
} from "#corpus/tryout/schema";

type TryoutExamInput = typeof TryoutExamSourceSchema.Encoded;
type TryoutSectionInput =
  TryoutExamInput["tracks"][number]["sets"][number]["sections"][number];

const section = {
  key: "general-reasoning",
  order: 1,
  questionCount: 20,
  questionSourcePath:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
  routeSlugs: { en: "general-reasoning", id: "penalaran-umum" },
  timeLimitSeconds: 1800,
  translations: {
    en: { title: "General Reasoning" },
    id: { title: "Penalaran Umum" },
  },
} as const;

const tryoutSource = {
  countryCode: "ID",
  countryKey: "indonesia",
  countryRouteSlugs: { en: "indonesia", id: "indonesia" },
  countryTranslations: {
    en: { title: "Indonesia" },
    id: { title: "Indonesia" },
  },
  examKey: "snbt",
  examRouteSlugs: { en: "snbt", id: "snbt" },
  examTranslations: {
    en: { title: "SNBT" },
    id: { title: "SNBT" },
  },
  scoringStrategy: "irt",
  sourceRevision: "2026-07-05",
  tracks: [
    {
      key: "2027",
      kind: "year",
      order: 1,
      routeSlugs: { en: "2027", id: "2027" },
      sets: [
        {
          key: "set-1",
          order: 1,
          routeSlugs: { en: "set-1", id: "set-1" },
          sections: [section],
          translations: {
            en: { title: "Set 1" },
            id: { title: "Set 1" },
          },
        },
      ],
      translations: {
        en: { title: "Year 2027" },
        id: { title: "Tahun 2027" },
      },
    },
  ],
} as const;

/** Builds one direct-entry section from the same reviewed section fields. */
function directEntrySection(key: string = section.key): TryoutSectionInput {
  return { ...section, key, visibility: "internal-entry" };
}

/** Builds one ordinary visible section from the same reviewed fields. */
function visibleSection(key: string = section.key): TryoutSectionInput {
  return { ...section, key };
}

/** Replaces the bounded set sections while retaining all other real fields. */
function withSections(sections: readonly TryoutSectionInput[]) {
  return {
    ...tryoutSource,
    tracks: [
      {
        ...tryoutSource.tracks[0],
        sets: [{ ...tryoutSource.tracks[0].sets[0], sections }],
      },
    ],
  };
}

describe("tryout schema", () => {
  it("decodes visible and single direct-entry try-out sources", () => {
    const visible = defineTryoutExamSource(tryoutSource);
    const directEntry = defineTryoutExamSource(
      withSections([directEntrySection()])
    );

    expect(visible.tracks[0]?.sets[0]?.sections[0]?.visibility).toBe("visible");
    expect(directEntry.tracks[0]?.sets[0]?.sections[0]?.visibility).toBe(
      "internal-entry"
    );
  });

  it.each([
    {
      field: "exam key",
      input: { ...tryoutSource, examKey: "SNBT" },
      message: "Invalid try-out key.",
    },
    {
      field: "country code",
      input: { ...tryoutSource, countryCode: "indonesia" },
      message: "Invalid country code.",
    },
    {
      field: "source path",
      input: withSections([
        { ...section, questionSourcePath: "tryout/indonesia/snbt/set-1" },
      ]),
      message: "Invalid try-out question source path.",
    },
  ])("rejects an invalid $field", ({ input, message }) => {
    const result = Schema.decodeUnknownEither(TryoutExamSourceSchema)(input);

    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(ParseResult.TreeFormatter.formatErrorSync(result.left)).toContain(
        message
      );
    }
  });

  it.each([
    {
      name: "one direct-entry section beside a visible section",
      sections: [
        directEntrySection(),
        visibleSection("quantitative-reasoning"),
      ],
    },
    {
      name: "multiple direct-entry sections",
      sections: [
        directEntrySection(),
        directEntrySection("quantitative-reasoning"),
      ],
    },
  ])("rejects $name", ({ sections }) => {
    const result = Schema.decodeUnknownEither(TryoutExamSourceSchema)(
      withSections(sections)
    );

    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(ParseResult.TreeFormatter.formatErrorSync(result.left)).toContain(
        "Internal-entry try-out sections must be the only section in a set."
      );
    }
  });

  it("loads every authored try-out catalog module", async () => {
    const files = await Effect.runPromise(
      importCorpusModules("tryout/**/*.ts", ["tryout/schema.ts"])
    );

    expect(files).toHaveLength(2);
  });
});
