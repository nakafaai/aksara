import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { indexQuestionBanks } from "#corpus/question-bank/path";
import { discoverQuestionSources } from "#corpus/question-bank/source";
import { corpusRoot, questionLayer } from "#corpus/test/question-layer";
import { snbtReadiness } from "#corpus/tryout/indonesia/snbt/readiness";
import { tkaReadiness } from "#corpus/tryout/indonesia/tka/readiness";
import {
  validateAssessmentReadinessEntries,
  validateAssessmentReadinessRegistry,
} from "#corpus/tryout/readiness/registry";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

/** Loads all explicit readiness, hierarchy, and physical item facts once. */
const loadReadinessRegistry = Effect.fn(
  "AksaraCorpus.test.loadReadinessRegistry"
)(function* () {
  const sources = yield* decodeTryoutRegistry();
  const banks = yield* indexQuestionBanks(sources);
  const questions = yield* discoverQuestionSources(corpusRoot, banks).pipe(
    Effect.provide(questionLayer)
  );
  const readiness = yield* Effect.all([snbtReadiness, tkaReadiness]);
  return { questions, readiness, sources };
});

describe("assessment readiness registry", () => {
  it.effect("owns one complete gate for every active assessment", () =>
    Effect.gen(function* () {
      const { questions, readiness, sources } = yield* loadReadinessRegistry();

      expect(
        yield* validateAssessmentReadinessEntries(readiness, sources, questions)
      ).toEqual(readiness);
      expect(
        yield* validateAssessmentReadinessRegistry(sources, questions)
      ).toEqual(readiness);
    })
  );

  it.effect("rejects duplicate, missing, and orphaned readiness owners", () =>
    Effect.gen(function* () {
      const { questions, readiness, sources } = yield* loadReadinessRegistry();
      const [snbt, tka] = readiness;
      const snbtSource = yield* Effect.fromNullishOr(
        sources.find(({ examKey }) => examKey === "snbt")
      );
      const failures = yield* Effect.all([
        validateAssessmentReadinessEntries(
          [snbt, snbt, tka],
          sources,
          questions
        ).pipe(Effect.flip),
        validateAssessmentReadinessEntries([snbt], sources, questions).pipe(
          Effect.flip
        ),
        validateAssessmentReadinessEntries(
          [snbt, tka],
          [snbtSource],
          questions
        ).pipe(Effect.flip),
      ]);

      expect(failures).toEqual([
        expect.objectContaining({
          _tag: "AssessmentReadinessRegistryError",
          count: 2,
          identity: "indonesia\0snbt",
        }),
        expect.objectContaining({
          _tag: "AssessmentReadinessRegistryError",
          count: 0,
          identity: "indonesia\0tka",
        }),
        expect.objectContaining({
          _tag: "AssessmentReadinessRegistryError",
          count: 0,
          identity: "indonesia\0tka",
        }),
      ]);
    })
  );
});
