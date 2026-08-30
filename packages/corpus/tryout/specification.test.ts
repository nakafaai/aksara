import { it } from "@effect/vitest";
import { Effect } from "effect";
import { describe, expect } from "vitest";
import { defineTryoutExamSource } from "#corpus/tryout/schema";
import {
  defineAssessmentSpecification,
  validateAssessmentSpecification,
} from "#corpus/tryout/specification";

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
          sections: [
            {
              key: "general-reasoning",
              order: 1,
              questionCount: 30,
              questionSourcePath:
                "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
              rendererDomain: "snbt-general",
              routeSlugs: {
                en: "general-reasoning",
                id: "penalaran-umum",
              },
              timeLimitSeconds: 1800,
              translations: {
                en: { title: "General Reasoning" },
                id: { title: "Penalaran Umum" },
              },
            },
            {
              key: "quantitative-knowledge",
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
          ],
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

const specificationInput = {
  basis: {
    label: "Official SNBT 2026 framework",
    retrievedAt: "2026-08-30",
    url: "https://snpmb.id/fr/",
  },
  countryKey: "indonesia",
  examKey: "snbt",
  sections: [
    {
      key: "general-reasoning",
      order: 1,
      questionCount: 30,
      timeLimitSeconds: 1800,
    },
    {
      key: "quantitative-knowledge",
      order: 2,
      questionCount: 20,
      timeLimitSeconds: 1200,
    },
  ],
  trackKey: "2027",
} as const;

describe("assessment specification", () => {
  it.effect(
    "validates every active set against one exact official schedule",
    () =>
      Effect.gen(function* () {
        const source = yield* defineTryoutExamSource(sourceInput);
        const specification =
          yield* defineAssessmentSpecification(specificationInput);

        expect(
          yield* validateAssessmentSpecification(source, specification)
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
                sections: [
                  {
                    ...sourceInput.tracks[0].sets[0].sections[0],
                    questionCount: 20,
                  },
                  sourceInput.tracks[0].sets[0].sections[1],
                ],
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
                  {
                    ...sourceInput.tracks[0].sets[0].sections[0],
                    timeLimitSeconds: 2700,
                  },
                  sourceInput.tracks[0].sets[0].sections[1],
                ],
              },
            ],
          },
        ],
      },
    },
  ])(
    "rejects a set whose $field drifts from the specification",
    ({ expected, field, source: driftedSource }) =>
      Effect.gen(function* () {
        const source = yield* defineTryoutExamSource(driftedSource);
        const specification =
          yield* defineAssessmentSpecification(specificationInput);
        const failure = yield* validateAssessmentSpecification(
          source,
          specification
        ).pipe(Effect.flip);

        expect(failure).toMatchObject({
          _tag: "AssessmentSpecificationMismatchError",
          expected,
          field,
          scope: "snbt:2027:set-1:general-reasoning",
        });
      })
  );

  it.effect("rejects a specification without an active target track", () =>
    Effect.gen(function* () {
      const source = yield* defineTryoutExamSource(sourceInput);
      const specification = yield* defineAssessmentSpecification({
        ...specificationInput,
        trackKey: "2028",
      });
      const failure = yield* validateAssessmentSpecification(
        source,
        specification
      ).pipe(Effect.flip);

      expect(failure).toMatchObject({
        _tag: "AssessmentSpecificationMismatchError",
        actual: "missing",
        expected: "2028",
        field: "trackKey",
        scope: "snbt",
      });
    })
  );

  it.effect.each([
    {
      section: { ...specificationInput.sections[0], order: 3 },
    },
    {
      section: { ...specificationInput.sections[1], order: 3 },
    },
  ])("strictly rejects a non-canonical section schedule", ({ section }) =>
    Effect.gen(function* () {
      const failure = yield* defineAssessmentSpecification({
        ...specificationInput,
        sections: [specificationInput.sections[0], section],
      }).pipe(Effect.flip);

      expect(failure).toMatchObject({
        _tag: "AssessmentSpecificationDecodeError",
      });
      expect(String(failure.cause)).toContain(
        "Assessment sections must have unique keys and sequential order."
      );
    })
  );

  it.effect.each([
    {
      actual: "0",
      field: "activeSetCount",
      sets: [],
    },
    {
      actual: "missing",
      field: "sectionKey",
      sets: [
        {
          ...sourceInput.tracks[0].sets[0],
          sections: [sourceInput.tracks[0].sets[0].sections[0]],
        },
      ],
    },
  ])(
    "rejects an incomplete active schedule at $field",
    ({ actual, field, sets }) =>
      Effect.gen(function* () {
        const source = yield* defineTryoutExamSource({
          ...sourceInput,
          tracks: [{ ...sourceInput.tracks[0], sets }],
        });
        const specification =
          yield* defineAssessmentSpecification(specificationInput);
        const failure = yield* validateAssessmentSpecification(
          source,
          specification
        ).pipe(Effect.flip);

        expect(failure).toMatchObject({
          _tag: "AssessmentSpecificationMismatchError",
          actual,
          field,
        });
      })
  );
});
