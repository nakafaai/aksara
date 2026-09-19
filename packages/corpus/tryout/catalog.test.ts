import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import {
  projectTryoutCatalog,
  TryoutCatalogDecodeError,
} from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

describe("tryout catalog", () => {
  it.effect(
    "derives graph identity from source keys for routes and internal entries",
    () =>
      Effect.gen(function* () {
        const catalog = yield* Effect.flatMap(
          decodeTryoutRegistry(),
          projectTryoutCatalog
        );
        const trackEn = yield* Effect.fromNullishOr(
          catalog.find(
            (row) =>
              row.kind === "track" &&
              row.examKey === "tka" &&
              row.trackKey === "compulsory-mathematics" &&
              row.appLocale === "en"
          )
        );
        const trackId = yield* Effect.fromNullishOr(
          catalog.find(
            (row) =>
              row.kind === "track" &&
              row.examKey === "tka" &&
              row.trackKey === "compulsory-mathematics" &&
              row.appLocale === "id"
          )
        );
        const internal = yield* Effect.fromNullishOr(
          catalog.find(
            (row) =>
              row.kind === "section" &&
              row.examKey === "tka" &&
              row.sectionKey === "compulsory-mathematics" &&
              row.setKey === "set-1" &&
              row.appLocale === "id"
          )
        );

        expect(trackEn.publicPath).toBe(
          "try-out/indonesia/tka/compulsory-mathematics"
        );
        expect(trackId.publicPath).toBe(
          "try-out/indonesia/tka/matematika-wajib"
        );
        expect(trackEn.graph).toMatchObject({
          conceptId: "concept:tryout:indonesia:tka:compulsory-mathematics",
          learningObjectId:
            "lo:tryout-track:indonesia:tka:compulsory-mathematics",
          lensId: "lens:tryout:indonesia:tka",
        });
        expect(trackId.graph.conceptId).toBe(trackEn.graph.conceptId);
        expect(trackId.graph.assetId).not.toBe(trackEn.graph.assetId);
        expect(internal).toMatchObject({
          graph: {
            conceptId:
              "concept:tryout:indonesia:tka:compulsory-mathematics:compulsory-mathematics",
            learningObjectId:
              "lo:tryout-section:indonesia:tka:compulsory-mathematics:set-1:compulsory-mathematics",
            lensId: "lens:tryout:indonesia:tka",
          },
          visibility: "internal-entry",
        });
        expect("publicPath" in internal).toBe(false);
      }),
    { timeout: 30_000 }
  );

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
