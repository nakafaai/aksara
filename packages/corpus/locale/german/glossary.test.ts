import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  decodeGermanGlossary,
  GermanGlossaryKeySchema,
  requireGermanGlossaryTerm,
} from "#corpus/locale/german/glossary";

describe("German terminology glossary", () => {
  it.effect("owns one canonical evidence-backed terminology inventory", () =>
    Effect.gen(function* () {
      const glossary = yield* decodeGermanGlossary();

      expect(glossary.length).toBeGreaterThan(60);
      expect(glossary.map(({ key }) => key)).toEqual(
        [...glossary.map(({ key }) => key)].sort()
      );
      expect(
        glossary.every(({ sourceUrl }) => sourceUrl.startsWith("https://"))
      ).toBe(true);
    })
  );

  it.effect(
    "pins German public namespaces and natural school terminology",
    () =>
      Effect.gen(function* () {
        const [curriculum, subject, tryout, artificialIntelligence] =
          yield* Effect.all([
            requireGermanGlossaryTerm(
              GermanGlossaryKeySchema.make("curriculum")
            ),
            requireGermanGlossaryTerm(GermanGlossaryKeySchema.make("subject")),
            requireGermanGlossaryTerm(
              GermanGlossaryKeySchema.make("tryout-product")
            ),
            requireGermanGlossaryTerm(
              GermanGlossaryKeySchema.make(
                "artificial-intelligence-data-science"
              )
            ),
          ]);

        expect(curriculum).toMatchObject({
          preferred: "Lehrplan",
          routeSlug: "lehrplaene",
        });
        expect(subject).toMatchObject({
          preferred: "Fach",
          routeSlug: "faecher",
        });
        expect(tryout).toMatchObject({ preferred: "Probetest" });
        expect(artificialIntelligence).toMatchObject({
          routeSlug: "ki-und-data-science",
        });
      })
  );

  it.effect("keeps Quran and accessibility wording explicit", () =>
    Effect.gen(function* () {
      const [quran, skipLink] = yield* Effect.all([
        requireGermanGlossaryTerm(
          GermanGlossaryKeySchema.make("quran-product")
        ),
        requireGermanGlossaryTerm(GermanGlossaryKeySchema.make("skip-link")),
      ]);

      expect(quran).toMatchObject({ preferred: "Quran" });
      expect(skipLink).toMatchObject({
        preferred: "Zum Hauptinhalt springen",
      });
    })
  );

  it.effect("fails typed when an unreviewed term is requested", () =>
    Effect.gen(function* () {
      const error = yield* requireGermanGlossaryTerm(
        GermanGlossaryKeySchema.make("unreviewed-term")
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "GermanGlossaryTermError",
        key: "unreviewed-term",
      });
    })
  );

  it.effect("owns malformed and noncanonical sources as typed failures", () =>
    Effect.gen(function* () {
      const glossary = yield* decodeGermanGlossary();
      const first = yield* Effect.fromNullishOr(glossary[0]);
      const [malformed, duplicate] = yield* Effect.all([
        decodeGermanGlossary(null).pipe(Effect.flip),
        decodeGermanGlossary([first, first]).pipe(Effect.flip),
      ]);

      expect([malformed, duplicate]).toEqual([
        expect.objectContaining({ _tag: "GermanGlossaryError" }),
        expect.objectContaining({ _tag: "GermanGlossaryError" }),
      ]);
      expect(String(duplicate.cause)).toContain(
        "German glossary keys must be unique and canonical."
      );
    })
  );
});
