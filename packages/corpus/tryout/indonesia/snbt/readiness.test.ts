import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Option } from "effect";

import { snbtReadiness } from "#corpus/tryout/indonesia/snbt/readiness";
import { snbtTryoutSource } from "#corpus/tryout/indonesia/snbt/source";

describe("SNBT readiness", () => {
  it.effect(
    "pins the complete current official baseline for the 2027 track",
    () =>
      Effect.gen(function* () {
        const readiness = yield* snbtReadiness;

        expect(readiness).toMatchObject({
          countryKey: "indonesia",
          evidence: [
            {
              key: "snpmb-2026",
              label: "Paparan Informasi SNPMB 2026",
              retrievedAt: "2026-08-30",
            },
          ],
          examKey: "snbt",
          trackKey: "2027",
        });
        expect(
          Arr.map(
            readiness.sections,
            ({ key, order, questionCount, timeLimitSeconds }) => ({
              key,
              order,
              questionCount: questionCount.value,
              timeLimitSeconds: timeLimitSeconds.value,
            })
          )
        ).toEqual([
          {
            key: "general-reasoning",
            order: 1,
            questionCount: 30,
            timeLimitSeconds: 1800,
          },
          {
            key: "general-knowledge-and-understanding",
            order: 2,
            questionCount: 20,
            timeLimitSeconds: 900,
          },
          {
            key: "reading-comprehension-and-writing",
            order: 3,
            questionCount: 20,
            timeLimitSeconds: 1500,
          },
          {
            key: "quantitative-knowledge",
            order: 4,
            questionCount: 20,
            timeLimitSeconds: 1200,
          },
          {
            key: "literacy-in-indonesian",
            order: 5,
            questionCount: 30,
            timeLimitSeconds: 2550,
          },
          {
            key: "literacy-in-english",
            order: 6,
            questionCount: 20,
            timeLimitSeconds: 1200,
          },
          {
            key: "mathematical-reasoning",
            order: 7,
            questionCount: 20,
            timeLimitSeconds: 2550,
          },
        ]);
        expect(
          Arr.reduce(
            readiness.sections,
            0,
            (total, section) => total + section.questionCount.value
          )
        ).toBe(160);
        expect(
          Arr.reduce(
            readiness.sections,
            0,
            (total, section) => total + section.timeLimitSeconds.value
          )
        ).toBe(195 * 60);
      })
  );

  it.effect("keeps every active 2027 set aligned with that baseline", () =>
    Effect.gen(function* () {
      const source = yield* snbtTryoutSource;
      const track = yield* Effect.fromOption(
        Arr.findFirst(source.tracks, ({ key }) => key === "2027")
      );

      expect(track.sets).toHaveLength(10);
      expect(Arr.map(track.sets, ({ key }) => key)).toEqual(
        Array.from({ length: 10 }, (_, index) => `set-${index + 1}`)
      );
      expect(
        Arr.every(
          track.sets,
          (set) =>
            Arr.reduce(
              set.sections,
              0,
              (total, section) => total + section.questionCount
            ) === 160 &&
            Arr.reduce(
              set.sections,
              0,
              (total, section) => total + section.timeLimitSeconds
            ) ===
              195 * 60
        )
      ).toBe(true);
      expect(
        Option.getOrUndefined(
          Option.map(Arr.head(track.sets), (set) =>
            Arr.map(set.sections, ({ key }) => key)
          )
        )
      ).toEqual([
        "general-reasoning",
        "general-knowledge-and-understanding",
        "reading-comprehension-and-writing",
        "quantitative-knowledge",
        "literacy-in-indonesian",
        "literacy-in-english",
        "mathematical-reasoning",
      ]);
    })
  );
});
