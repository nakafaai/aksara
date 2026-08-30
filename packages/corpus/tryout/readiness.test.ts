import { it } from "@effect/vitest";
import { Effect } from "effect";
import { describe, expect } from "vitest";

import {
  defineAssessmentReadiness,
  validateAssessmentSourceReadiness,
} from "#corpus/tryout/readiness";
import { defineTryoutExamSource } from "#corpus/tryout/schema";

const sections = [
  {
    key: "general-reasoning",
    languagePolicy: { kind: "app-locale" as const },
    order: 1,
    questionCount: 30,
    questionSourcePath:
      "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
    rendererDomain: "snbt-general",
    routeSlugs: { en: "general-reasoning", id: "penalaran-umum" },
    timeLimitSeconds: 1800,
    translations: {
      en: { title: "General Reasoning" },
      id: { title: "Penalaran Umum" },
    },
  },
  {
    key: "quantitative-knowledge",
    languagePolicy: { kind: "app-locale" as const },
    order: 2,
    questionCount: 20,
    questionSourcePath:
      "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1",
    rendererDomain: "snbt-quant",
    routeSlugs: {
      en: "quantitative-knowledge",
      id: "pengetahuan-kuantitatif",
    },
    timeLimitSeconds: 1200,
    translations: {
      en: { title: "Quantitative Knowledge" },
      id: { title: "Pengetahuan Kuantitatif" },
    },
  },
] as const;

const sourceInput = {
  countryCode: "ID",
  countryKey: "indonesia",
  countryOrder: 1,
  countryRevision: "2026-08-30",
  countryRouteSlugs: { en: "indonesia", id: "indonesia" },
  countryTranslations: {
    en: { title: "Indonesia" },
    id: { title: "Indonesia" },
  },
  examKey: "snbt",
  examOrder: 1,
  examRouteSlugs: { en: "snbt", id: "snbt" },
  examTranslations: {
    en: { title: "SNBT" },
    id: { title: "SNBT" },
  },
  scoringStrategy: "irt",
  sourceRevision: "2026-08-30",
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
          sections,
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

/** Binds one fixture value to its fixture-owned official evidence. */
const official = (value: number) => ({
  provenance: { evidenceKey: "official-source", kind: "official" as const },
  value,
});
const readinessInput = {
  countryKey: "indonesia",
  evidence: [
    {
      key: "official-source",
      label: "Official source",
      retrievedAt: "2026-08-30",
      url: "https://example.edu/official",
    },
  ],
  examKey: "snbt",
  sections: [
    {
      key: "general-reasoning",
      order: 1,
      questionCount: official(30),
      timeLimitSeconds: official(1800),
    },
    {
      key: "quantitative-knowledge",
      order: 2,
      questionCount: { provenance: { kind: "editorial" as const }, value: 20 },
      timeLimitSeconds: official(1200),
    },
  ],
  sourceRevision: "2026-08-30",
  trackKey: "2027",
} as const;

describe("assessment readiness", () => {
  it.effect(
    "validates every active set against one evidence-complete gate",
    () =>
      Effect.gen(function* () {
        const source = yield* defineTryoutExamSource(sourceInput);
        const readiness = yield* defineAssessmentReadiness(readinessInput);

        expect(
          yield* validateAssessmentSourceReadiness(source, readiness)
        ).toBe(source);
      })
  );

  it.effect.each([
    {
      expected: "30",
      field: "questionCount",
      source: {
        ...sourceInput,
        tracks: [
          {
            ...sourceInput.tracks[0],
            sets: [
              {
                ...sourceInput.tracks[0].sets[0],
                sections: [{ ...sections[0], questionCount: 20 }, sections[1]],
              },
            ],
          },
        ],
      },
    },
    {
      expected: "1800",
      field: "timeLimitSeconds",
      source: {
        ...sourceInput,
        tracks: [
          {
            ...sourceInput.tracks[0],
            sets: [
              {
                ...sourceInput.tracks[0].sets[0],
                sections: [
                  { ...sections[0], timeLimitSeconds: 2700 },
                  sections[1],
                ],
              },
            ],
          },
        ],
      },
    },
    {
      expected: "2026-08-30",
      field: "sourceRevision",
      source: { ...sourceInput, sourceRevision: "2026-08-29" },
    },
  ])("rejects active $field drift", ({ expected, field, source: input }) =>
    Effect.gen(function* () {
      const source = yield* defineTryoutExamSource(input);
      const readiness = yield* defineAssessmentReadiness(readinessInput);
      const failure = yield* validateAssessmentSourceReadiness(
        source,
        readiness
      ).pipe(Effect.flip);

      expect(failure).toMatchObject({
        _tag: "AssessmentReadinessMismatchError",
        expected,
        field,
      });
    })
  );

  it.effect("rejects missing tracks, sets, and sections", () =>
    Effect.gen(function* () {
      const readiness = yield* defineAssessmentReadiness(readinessInput);
      const trackSource = yield* defineTryoutExamSource({
        ...sourceInput,
        tracks: [{ ...sourceInput.tracks[0], key: "2028" }],
      });
      const setsSource = yield* defineTryoutExamSource({
        ...sourceInput,
        tracks: [{ ...sourceInput.tracks[0], sets: [] }],
      });
      const sectionSource = yield* defineTryoutExamSource({
        ...sourceInput,
        tracks: [
          {
            ...sourceInput.tracks[0],
            sets: [
              {
                ...sourceInput.tracks[0].sets[0],
                sections: [sections[0]],
              },
            ],
          },
        ],
      });
      const [track, sets, section] = yield* Effect.all([
        validateAssessmentSourceReadiness(trackSource, readiness).pipe(
          Effect.flip
        ),
        validateAssessmentSourceReadiness(setsSource, readiness).pipe(
          Effect.flip
        ),
        validateAssessmentSourceReadiness(sectionSource, readiness).pipe(
          Effect.flip
        ),
      ]);

      expect([track.field, sets.field, section.field]).toEqual([
        "trackKey",
        "activeSets",
        "sectionKey",
      ]);
    })
  );

  it.effect("rejects unordered, duplicate, or unresolved evidence", () =>
    Effect.gen(function* () {
      const duplicate = defineAssessmentReadiness({
        ...readinessInput,
        evidence: [readinessInput.evidence[0], readinessInput.evidence[0]],
      }).pipe(Effect.flip);
      const unordered = defineAssessmentReadiness({
        ...readinessInput,
        sections: [
          readinessInput.sections[0],
          { ...readinessInput.sections[1], order: 3 },
        ],
      }).pipe(Effect.flip);
      const unresolved = defineAssessmentReadiness({
        ...readinessInput,
        sections: [
          {
            ...readinessInput.sections[0],
            questionCount: {
              provenance: {
                evidenceKey: "missing-source",
                kind: "official" as const,
              },
              value: 30,
            },
          },
          readinessInput.sections[1],
        ],
      }).pipe(Effect.flip);
      const failures = yield* Effect.all([duplicate, unordered, unresolved]);

      expect(
        failures.every(({ _tag }) => _tag === "AssessmentReadinessDecodeError")
      ).toBe(true);
    })
  );
});
