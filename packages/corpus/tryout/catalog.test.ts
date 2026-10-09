import { describe, expect, it } from "@effect/vitest";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { deliveryLanguageForPolicy } from "@nakafa/aksara-contracts/tryout/language";
import {
  Array as Arr,
  Effect,
  HashSet,
  Option,
  Order,
  Record as Rec,
  Schema,
} from "effect";
import {
  projectTryoutCatalog,
  TryoutCatalogDecodeError,
} from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

/** SNBT literacy in English and the TKA English subject are assessed in English. */
const ENGLISH_SECTIONS = HashSet.make(
  "english-language",
  "literacy-in-english"
);

describe("tryout catalog", () => {
  it.effect(
    "derives graph identity from source keys for routes and internal entries",
    () =>
      Effect.gen(function* () {
        const catalog = yield* Effect.flatMap(
          decodeTryoutRegistry(),
          projectTryoutCatalog
        );
        const trackEn = yield* Effect.fromOption(
          Arr.findFirst(
            catalog,
            (row) =>
              row.kind === "track" &&
              row.examKey === "tka" &&
              row.trackKey === "compulsory-mathematics" &&
              row.appLocale === "en"
          )
        );
        const trackId = yield* Effect.fromOption(
          Arr.findFirst(
            catalog,
            (row) =>
              row.kind === "track" &&
              row.examKey === "tka" &&
              row.trackKey === "compulsory-mathematics" &&
              row.appLocale === "id"
          )
        );
        const internal = yield* Effect.fromOption(
          Arr.findFirst(
            catalog,
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
        const counts = Rec.fromEntries(
          Arr.map(["country", "exam", "track", "set", "section"], (kind) => [
            kind,
            Arr.filter(rows, (row) => row.kind === kind).length,
          ])
        );

        expect(rows).toHaveLength(321);
        expect(counts).toEqual({
          country: 3,
          exam: 6,
          section: 240,
          set: 60,
          track: 12,
        });
        expect(
          Arr.filter(
            rows,
            (row) =>
              row.kind === "section" &&
              row.examKey === "tka" &&
              row.publicPath === undefined
          )
        ).toHaveLength(30);
      })
  );

  it.effect("keeps exam language independent of every app locale", () =>
    Effect.gen(function* () {
      const sources = yield* decodeTryoutRegistry();
      const sections = Arr.flatMap(sources, (source) =>
        Arr.flatMap(source.tracks, (track) =>
          Arr.flatMap(track.sets, (set) => set.sections)
        )
      );
      expect(sections).toHaveLength(80);
      for (const section of sections) {
        for (const locale of ACTIVE_APP_LOCALES) {
          expect(
            deliveryLanguageForPolicy(section.languagePolicy, locale)
          ).toBe(HashSet.has(ENGLISH_SECTIONS, section.key) ? "en" : "id");
        }
      }
    })
  );

  it.effect(
    "maps invalid derived hierarchy counts to a typed catalog error",
    () =>
      Effect.gen(function* () {
        const sources = yield* decodeTryoutRegistry();
        const snbt = yield* Effect.fromOption(
          Arr.findFirst(sources, ({ examKey }) => examKey === "snbt")
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
                    ...Arr.drop(set.sections, 1),
                  ],
                },
                ...Arr.drop(track.sets, 1),
              ],
            },
          ],
        };
        const failure = yield* projectTryoutCatalog([
          invalidSnbt,
          ...Arr.filter(sources, ({ examKey }) => examKey !== "snbt"),
        ]).pipe(Effect.flip);

        expect(failure).toBeInstanceOf(TryoutCatalogDecodeError);
        expect(failure._tag).toBe("TryoutCatalogDecodeError");
      })
  );

  it.effect("signs institution tracks and penalized section marks", () =>
    Effect.gen(function* () {
      const sources = yield* decodeTryoutRegistry();
      const tka = yield* Effect.fromOption(
        Arr.findFirst(sources, ({ examKey }) => examKey === "tka")
      );
      const marks = { blank: 0, correct: 4, wrong: -1 };
      const rows = yield* projectTryoutCatalog([
        {
          ...tka,
          scoringStrategy: "penalized",
          tracks: Arr.map(tka.tracks, (track) => ({
            ...track,
            kind: "institution",
            sets: Arr.map(track.sets, (set) => ({
              ...set,
              sections: Arr.map(set.sections, (section) => ({
                ...section,
                marks,
              })),
            })),
          })),
        },
      ]);
      const facts = HashSet.fromIterable(
        Arr.map(rows, (row) => {
          if (row.kind === "section") {
            return Schema.encodeSync(Schema.fromJsonString(Schema.Unknown))(
              row.marks
            );
          }
          if (row.kind === "track") {
            return row.trackKind;
          }
          return row.kind === "country" ? "country" : row.scoringStrategy;
        })
      );

      expect(Arr.sort(facts, Order.String)).toEqual([
        "country",
        "institution",
        "penalized",
        yield* Schema.encodeEffect(Schema.fromJsonString(Schema.Unknown))(
          marks
        ),
      ]);
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

        expect(
          Arr.filter(rows, ({ appLocale }) => appLocale === "de")
        ).toHaveLength(107);
        expect(
          Option.getOrUndefined(
            Arr.findFirst(
              rows,
              ({ appLocale, kind }) => appLocale === "de" && kind === "exam"
            )
          )
        ).toMatchObject({
          publicPath: "try-out/indonesien/snbt",
        });
      })
  );
});
