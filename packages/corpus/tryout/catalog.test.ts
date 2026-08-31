import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import {
  projectTryoutCatalog,
  TryoutCatalogDecodeError,
} from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

describe("tryout catalog", () => {
  it.effect(
    "projects exact localized hierarchy counts and route ownership",
    () =>
      Effect.gen(function* () {
        const rows = yield* Effect.flatMap(decodeTryoutRegistry(), (sources) =>
          projectTryoutCatalog(sources)
        );
        const counts = Object.fromEntries(
          ["country", "exam", "track", "set", "section"].map((kind) => [
            kind,
            rows.filter((row) => row.kind === kind).length,
          ])
        );

        expect(rows).toHaveLength(315);
        expect(counts).toEqual({
          country: 3,
          exam: 6,
          section: 237,
          set: 57,
          track: 12,
        });
        expect(
          rows.filter(
            (row) =>
              row.kind === "section" &&
              row.examKey === "tka" &&
              row.publicPath === undefined
          )
        ).toHaveLength(27);
      })
  );

  it.effect(
    "maps invalid derived hierarchy counts to a typed catalog error",
    () =>
      Effect.gen(function* () {
        const sources = yield* decodeTryoutRegistry();
        const snbt = yield* Effect.fromNullishOr(
          sources.find(({ examKey }) => examKey === "snbt")
        );
        const track = yield* Effect.fromNullishOr(snbt.tracks[0]);
        const set = yield* Effect.fromNullishOr(track.sets[0]);
        const section = yield* Effect.fromNullishOr(set.sections[0]);
        const invalidSnbt = {
          ...snbt,
          tracks: [
            {
              ...track,
              sets: [
                {
                  ...set,
                  sections: [
                    { ...section, questionCount: 0 },
                    ...set.sections.slice(1),
                  ],
                },
                ...track.sets.slice(1),
              ],
            },
          ],
        };
        const failure = yield* projectTryoutCatalog([
          invalidSnbt,
          ...sources.filter(({ examKey }) => examKey !== "snbt"),
        ]).pipe(Effect.flip);

        expect(failure).toBeInstanceOf(TryoutCatalogDecodeError);
        expect(failure._tag).toBe("TryoutCatalogDecodeError");
      })
  );

  it.effect("preserves an authored country description when present", () =>
    Effect.gen(function* () {
      const sources = yield* decodeTryoutRegistry();
      const source = yield* Effect.fromNullishOr(sources[0]);
      const english = yield* Effect.fromNullishOr(
        source.countryTranslations.en
      );
      const description = "Official Indonesian assessment catalog.";
      const rows = yield* projectTryoutCatalog([
        {
          ...source,
          countryTranslations: {
            ...source.countryTranslations,
            en: { ...english, description },
          },
        },
      ]);

      expect(rows).toContainEqual(
        expect.objectContaining({
          appLocale: "en",
          description,
          kind: "country",
        })
      );
    })
  );

  it.effect(
    "projects source-owned German copy through the active publication seam",
    () =>
      Effect.gen(function* () {
        const sources = yield* decodeTryoutRegistry();
        const rows = yield* projectTryoutCatalog(sources);

        expect(rows.filter(({ appLocale }) => appLocale === "de")).toHaveLength(
          105
        );
        expect(
          rows.find(
            ({ appLocale, kind }) => appLocale === "de" && kind === "exam"
          )
        ).toMatchObject({
          publicPath: "try-out/indonesien/snbt",
        });
      })
  );
});
