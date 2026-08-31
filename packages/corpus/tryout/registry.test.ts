import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import {
  decodeTryoutRegistry,
  TryoutRegistryConflictError,
  TryoutRegistryDecodeError,
} from "#corpus/tryout/registry";
import type { TryoutExamSource } from "#corpus/tryout/schema";

/** Rehomes one decoded source to test cross-country registry ownership. */
function rehomeSource(
  source: TryoutExamSource,
  countryCode: string,
  countryOrder = 2
) {
  const sourcePrefix = `question-bank/tryout/${source.countryKey}/${source.examKey}/`;
  const targetPrefix = "question-bank/tryout/germany/abitur/";
  return {
    ...source,
    countryCode,
    countryKey: "germany",
    countryOrder,
    countryRevision: "test",
    countryRouteSlugs: { en: "germany", id: "jerman" },
    countryTranslations: {
      en: { title: "Germany" },
      id: { title: "Jerman" },
    },
    examKey: "abitur",
    examOrder: 1,
    examRouteSlugs: { en: "abitur", id: "abitur" },
    examTranslations: {
      en: { title: "Abitur" },
      id: { title: "Abitur" },
    },
    tracks: source.tracks.map((track) => ({
      ...track,
      sets: track.sets.map((set) => ({
        ...set,
        sections: set.sections.map((section) => ({
          ...section,
          questionSourcePath: section.questionSourcePath.replace(
            sourcePrefix,
            targetPrefix
          ),
        })),
      })),
    })),
  };
}

describe("tryout registry", () => {
  it.effect("loads reviewed sources by authored country and exam order", () =>
    Effect.gen(function* () {
      const sources = yield* decodeTryoutRegistry();
      const first = yield* Effect.fromNullishOr(sources[0]);
      const second = yield* Effect.fromNullishOr(sources[1]);
      const reversed = yield* decodeTryoutRegistry([...sources].reverse());
      const orderedCountries = yield* decodeTryoutRegistry([
        rehomeSource(first, "DE"),
        first,
      ]);
      const tiedCountries = yield* decodeTryoutRegistry([
        first,
        rehomeSource(first, "DE", 1),
      ]);
      const tiedExams = yield* decodeTryoutRegistry([
        { ...second, examOrder: 1 },
        first,
      ]);

      expect(sources.map(({ examKey }) => examKey)).toEqual(["snbt", "tka"]);
      expect(
        sources.map(({ countryOrder, examOrder }) => [countryOrder, examOrder])
      ).toEqual([
        [1, 1],
        [1, 2],
      ]);
      expect(reversed.map(({ examKey }) => examKey)).toEqual(["snbt", "tka"]);
      expect(orderedCountries.map(({ countryKey }) => countryKey)).toEqual([
        "indonesia",
        "germany",
      ]);
      expect(tiedCountries.map(({ countryKey }) => countryKey)).toEqual([
        "germany",
        "indonesia",
      ]);
      expect(tiedExams.map(({ examKey }) => examKey)).toEqual(["snbt", "tka"]);
      expect(sources.map(({ sourceRevision }) => sourceRevision)).toEqual([
        "2026-08-30",
        "2026-08-31",
      ]);
    })
  );

  it.effect(
    "rejects strict input, duplicate exams, and country conflicts",
    () =>
      Effect.gen(function* () {
        const sources = yield* decodeTryoutRegistry();
        const first = yield* Effect.fromNullishOr(sources[0]);
        const second = yield* Effect.fromNullishOr(sources[1]);
        const secondEnglish = yield* Effect.fromNullishOr(
          second.countryTranslations.en
        );
        const duplicateCountryCode = rehomeSource(first, first.countryCode);
        const [
          decodeFailure,
          duplicateExamFailure,
          countryFactsFailure,
          countryCodeFailure,
        ] = yield* Effect.all([
          decodeTryoutRegistry([{ ...first, invented: true }]).pipe(
            Effect.flip
          ),
          decodeTryoutRegistry([first, first]).pipe(Effect.flip),
          decodeTryoutRegistry([
            first,
            {
              ...second,
              countryTranslations: {
                ...second.countryTranslations,
                en: {
                  ...secondEnglish,
                  title: `${secondEnglish.title} conflict`,
                },
              },
            },
          ]).pipe(Effect.flip),
          decodeTryoutRegistry([first, duplicateCountryCode]).pipe(Effect.flip),
        ]);

        expect(decodeFailure).toBeInstanceOf(TryoutRegistryDecodeError);
        expect(decodeFailure._tag).toBe("TryoutRegistryDecodeError");
        expect(duplicateExamFailure).toBeInstanceOf(
          TryoutRegistryConflictError
        );
        expect(duplicateExamFailure).toMatchObject({
          _tag: "TryoutRegistryConflictError",
          kind: "exam",
        });
        expect(countryFactsFailure).toBeInstanceOf(TryoutRegistryConflictError);
        expect(countryFactsFailure).toMatchObject({
          _tag: "TryoutRegistryConflictError",
          kind: "country",
        });
        expect(countryCodeFailure).toBeInstanceOf(TryoutRegistryConflictError);
        expect(countryCodeFailure).toMatchObject({
          _tag: "TryoutRegistryConflictError",
          key: first.countryCode,
          kind: "country",
        });
      })
  );
});
