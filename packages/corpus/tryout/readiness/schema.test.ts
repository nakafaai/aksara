import { it } from "@effect/vitest";
import { Effect } from "effect";
import { describe, expect } from "vitest";

import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

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
      blueprint: {
        cognitiveLevels: [{ editorialMinimum: 1, key: "textual" }],
        contentDomains: [{ editorialMinimum: 1, key: "informational-text" }],
        evidenceKey: "official-source",
        groupedStimulusEditorialMinimum: 0,
        responseMinimums: [
          { editorialMinimum: 1, kind: "single-choice" as const },
        ],
        topics: [
          {
            cognitiveLevels: ["textual"],
            contentDomains: ["informational-text"],
            editorialMinimum: 1,
            key: "explicit-information",
          },
        ],
      },
      key: "general-reasoning",
      order: 1,
      questionCount: official(30),
      timeLimitSeconds: official(1800),
    },
  ],
  sourceRevision: "2026-08-30",
  trackKey: "2027",
} as const;

describe("assessment readiness schema", () => {
  it.effect("decodes one evidence-complete readiness contract", () =>
    Effect.gen(function* () {
      const readiness = yield* defineAssessmentReadiness(readinessInput);

      expect(readiness).toMatchObject({
        countryKey: "indonesia",
        examKey: "snbt",
        trackKey: "2027",
      });
    })
  );

  it.effect("rejects unordered, duplicate, or unresolved evidence", () =>
    Effect.gen(function* () {
      const [section] = readinessInput.sections;
      const duplicate = defineAssessmentReadiness({
        ...readinessInput,
        evidence: [readinessInput.evidence[0], readinessInput.evidence[0]],
      }).pipe(Effect.flip);
      const unordered = defineAssessmentReadiness({
        ...readinessInput,
        sections: [
          section,
          {
            key: "quantitative-knowledge",
            order: 3,
            questionCount: {
              provenance: { kind: "editorial" as const },
              value: 20,
            },
            timeLimitSeconds: official(1200),
          },
        ],
      }).pipe(Effect.flip);
      const unresolved = defineAssessmentReadiness({
        ...readinessInput,
        sections: [
          {
            ...section,
            questionCount: {
              provenance: {
                evidenceKey: "missing-source",
                kind: "official" as const,
              },
              value: 30,
            },
          },
        ],
      }).pipe(Effect.flip);
      const failures = yield* Effect.all([duplicate, unordered, unresolved]);

      expect(
        failures.every(({ _tag }) => _tag === "AssessmentReadinessDecodeError")
      ).toBe(true);
    })
  );

  it.effect("rejects duplicate or undeclared blueprint topic mappings", () =>
    Effect.gen(function* () {
      const [section] = readinessInput.sections;
      const { blueprint } = section;
      const [topic] = blueprint.topics;
      const duplicate = defineAssessmentReadiness({
        ...readinessInput,
        sections: [
          {
            ...section,
            blueprint: {
              ...blueprint,
              topics: [{ ...topic, cognitiveLevels: ["textual", "textual"] }],
            },
          },
        ],
      }).pipe(Effect.flip);
      const undeclaredCognitiveLevel = defineAssessmentReadiness({
        ...readinessInput,
        sections: [
          {
            ...section,
            blueprint: {
              ...blueprint,
              topics: [{ ...topic, cognitiveLevels: ["inferential"] }],
            },
          },
        ],
      }).pipe(Effect.flip);
      const undeclaredContentDomain = defineAssessmentReadiness({
        ...readinessInput,
        sections: [
          {
            ...section,
            blueprint: {
              ...blueprint,
              topics: [{ ...topic, contentDomains: ["literary-text"] }],
            },
          },
        ],
      }).pipe(Effect.flip);
      const failures = yield* Effect.all([
        duplicate,
        undeclaredCognitiveLevel,
        undeclaredContentDomain,
      ]);

      expect(
        failures.every(({ _tag }) => _tag === "AssessmentReadinessDecodeError")
      ).toBe(true);
    })
  );
});
