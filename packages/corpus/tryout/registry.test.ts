import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import type { TryoutExamSource } from "#corpus/tryout/schema";

/** Loads the two reviewed try-out programs at the Vitest boundary. */
function loadRegistry() {
  return Effect.runPromise(decodeTryoutRegistry());
}

/** Returns one nested source node or fails the test setup explicitly. */
function requireNode<Value>(value: Value | undefined, label: string): Value {
  if (value === undefined) {
    throw new Error(`Expected ${label}.`);
  }
  return value;
}

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
  it("loads reviewed sources by authored country and exam order", async () => {
    const sources = await loadRegistry();
    const first = requireNode(sources[0], "first try-out source");
    const second = requireNode(sources[1], "second try-out source");
    const reversed = await Effect.runPromise(
      decodeTryoutRegistry([...sources].reverse())
    );
    const orderedCountries = await Effect.runPromise(
      decodeTryoutRegistry([rehomeSource(first, "DE"), first])
    );
    const tiedCountries = await Effect.runPromise(
      decodeTryoutRegistry([first, rehomeSource(first, "DE", 1)])
    );
    const tiedExams = await Effect.runPromise(
      decodeTryoutRegistry([{ ...second, examOrder: 1 }, first])
    );

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
      "2026-07-05",
      "2026-07-05",
    ]);
  });

  it("rejects strict input, duplicate exams, and country conflicts", async () => {
    const sources = await loadRegistry();
    const first = requireNode(sources[0], "first try-out source");
    const second = requireNode(sources[1], "second try-out source");
    const secondEnglish = requireNode(
      second.countryTranslations.en,
      "English country translation"
    );
    const duplicateCountryCode = rehomeSource(first, first.countryCode);
    const failures = await Effect.runPromise(
      Effect.all([
        decodeTryoutRegistry([{ ...first, invented: true }]).pipe(Effect.flip),
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
      ])
    );

    expect(failures.map(({ _tag }) => _tag)).toEqual([
      "TryoutRegistryDecodeError",
      "TryoutRegistryConflictError",
      "TryoutRegistryConflictError",
      "TryoutRegistryConflictError",
    ]);
    expect(failures[1]).toMatchObject({ kind: "exam" });
    expect(failures[2]).toMatchObject({ kind: "country" });
    expect(failures[3]).toMatchObject({
      key: first.countryCode,
      kind: "country",
    });
  });
});
