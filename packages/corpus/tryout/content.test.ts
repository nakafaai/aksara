import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { corpusRoot, questionLayer } from "#corpus/test/question-layer";
import { loadTryoutContent } from "#corpus/tryout/content";

const QUESTION_METADATA_PATTERN = /^export const metadata = \{[\s\S]*?\};\s*/u;

describe("tryout content", () => {
  it.effect(
    "projects one discovered question source set into entries and placements",
    () =>
      Effect.gen(function* () {
        const content = yield* loadTryoutContent(corpusRoot).pipe(
          Effect.provide(questionLayer)
        );

        expect(content.entries).toHaveLength(9920);
        expect(content.projection.placements).toHaveLength(5475);
        expect(
          content.entries.filter(({ bodyKind }) => bodyKind === "question")
        ).toHaveLength(4310);
        expect(
          content.entries.filter(({ bodyKind }) => bodyKind === "answer")
        ).toHaveLength(5610);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "keeps every active prompt body unique within its authored locale",
    () =>
      Effect.gen(function* () {
        const content = yield* loadTryoutContent(corpusRoot);
        const activeEntryIdentities = new Set(
          content.projection.placements.map(
            ({ questionArtifactLocale, questionContentKey }) =>
              `${questionContentKey}\0${questionArtifactLocale}`
          )
        );
        const activeQuestionEntries = content.entries.filter(
          ({ artifactLocale, bodyKind, contentKey }) =>
            bodyKind === "question" &&
            activeEntryIdentities.has(`${contentKey}\0${artifactLocale}`)
        );
        const fingerprints = activeQuestionEntries.map(
          ({ artifactLocale, sourcePath }) =>
            `${artifactLocale}\0${readFileSync(
              resolve(corpusRoot, sourcePath),
              "utf8"
            )
              .replace(QUESTION_METADATA_PATTERN, "")
              .trim()}`
        );

        expect(
          new Set(
            content.projection.placements.map(
              ({ questionContentKey }) => questionContentKey
            )
          ).size
        ).toBe(1825);
        expect(activeQuestionEntries).toHaveLength(4175);
        expect(new Set(fingerprints).size).toBe(fingerprints.length);
      }).pipe(Effect.provide(questionLayer)),
    { timeout: 30_000 }
  );
});
