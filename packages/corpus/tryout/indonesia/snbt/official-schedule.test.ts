import { it } from "@effect/vitest";
import { Effect } from "effect";
import { describe, expect } from "vitest";
import { snbtOfficialSchedule } from "#corpus/tryout/indonesia/snbt/official-schedule";
import { snbtTryoutSource } from "#corpus/tryout/indonesia/snbt/source";

describe("SNBT official schedule", () => {
  it.effect(
    "pins the complete latest published baseline for the 2027 track",
    () =>
      Effect.gen(function* () {
        const schedule = yield* snbtOfficialSchedule;

        expect(schedule).toMatchObject({
          basis: {
            label: "Framework UTBK-SNBT 2026",
            retrievedAt: "2026-08-30",
            url: "https://snpmb.id/fr/",
          },
          countryKey: "indonesia",
          examKey: "snbt",
          trackKey: "2027",
        });
        expect(
          schedule.sections.map(
            ({ key, order, questionCount, timeLimitSeconds }) => ({
              key,
              order,
              questionCount,
              timeLimitSeconds,
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
            key: "general-knowledge",
            order: 2,
            questionCount: 20,
            timeLimitSeconds: 900,
          },
          {
            key: "reading-and-writing-skills",
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
            key: "indonesian-language",
            order: 5,
            questionCount: 30,
            timeLimitSeconds: 2550,
          },
          {
            key: "english-language",
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
          schedule.sections.reduce(
            (total, section) => total + section.questionCount,
            0
          )
        ).toBe(160);
        expect(
          schedule.sections.reduce(
            (total, section) => total + section.timeLimitSeconds,
            0
          )
        ).toBe(195 * 60);
      })
  );

  it.effect("validates every active 2027 set against that schedule", () =>
    Effect.gen(function* () {
      const source = yield* snbtTryoutSource;
      const track = yield* Effect.fromNullishOr(
        source.tracks.find(({ key }) => key === "2027")
      );

      expect(track.sets).toHaveLength(2);
      expect(
        track.sets.map((set) => ({
          questionCount: set.sections.reduce(
            (total, section) => total + section.questionCount,
            0
          ),
          sectionKeys: set.sections.map(({ key }) => key),
          setKey: set.key,
          timeLimitSeconds: set.sections.reduce(
            (total, section) => total + section.timeLimitSeconds,
            0
          ),
        }))
      ).toEqual([
        {
          questionCount: 160,
          sectionKeys: [
            "general-reasoning",
            "general-knowledge",
            "reading-and-writing-skills",
            "quantitative-knowledge",
            "indonesian-language",
            "english-language",
            "mathematical-reasoning",
          ],
          setKey: "set-1",
          timeLimitSeconds: 195 * 60,
        },
        {
          questionCount: 160,
          sectionKeys: [
            "general-reasoning",
            "general-knowledge",
            "reading-and-writing-skills",
            "quantitative-knowledge",
            "indonesian-language",
            "english-language",
            "mathematical-reasoning",
          ],
          setKey: "set-2",
          timeLimitSeconds: 195 * 60,
        },
      ]);
    })
  );
});
