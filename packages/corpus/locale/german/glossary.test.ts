import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeGermanGlossary,
  GermanGlossaryKeySchema,
  requireGermanGlossaryTerm,
} from "#corpus/locale/german/glossary";

describe("German terminology glossary", () => {
  it("owns one canonical evidence-backed terminology inventory", async () => {
    const glossary = await Effect.runPromise(decodeGermanGlossary());

    expect(glossary.length).toBeGreaterThan(60);
    expect(glossary.map(({ key }) => key)).toEqual(
      [...glossary.map(({ key }) => key)].sort()
    );
    expect(
      glossary.every(({ sourceUrl }) => sourceUrl.startsWith("https://"))
    ).toBe(true);
  });

  it("pins German public namespaces and natural school terminology", async () => {
    await expect(
      Effect.runPromise(
        requireGermanGlossaryTerm(GermanGlossaryKeySchema.make("curriculum"))
      )
    ).resolves.toMatchObject({
      preferred: "Lehrplan",
      routeSlug: "lehrplaene",
    });
    await expect(
      Effect.runPromise(
        requireGermanGlossaryTerm(GermanGlossaryKeySchema.make("subject"))
      )
    ).resolves.toMatchObject({ preferred: "Fach", routeSlug: "faecher" });
    await expect(
      Effect.runPromise(
        requireGermanGlossaryTerm(
          GermanGlossaryKeySchema.make("tryout-product")
        )
      )
    ).resolves.toMatchObject({ preferred: "Probetest" });
    await expect(
      Effect.runPromise(
        requireGermanGlossaryTerm(
          GermanGlossaryKeySchema.make("artificial-intelligence-data-science")
        )
      )
    ).resolves.toMatchObject({ routeSlug: "ki-und-data-science" });
  });

  it("keeps Quran and accessibility wording explicit", async () => {
    await expect(
      Effect.runPromise(
        requireGermanGlossaryTerm(GermanGlossaryKeySchema.make("quran-product"))
      )
    ).resolves.toMatchObject({ preferred: "Quran" });
    await expect(
      Effect.runPromise(
        requireGermanGlossaryTerm(GermanGlossaryKeySchema.make("skip-link"))
      )
    ).resolves.toMatchObject({ preferred: "Zum Hauptinhalt springen" });
  });

  it("fails typed when an unreviewed term is requested", async () => {
    await expect(
      Effect.runPromise(
        requireGermanGlossaryTerm(
          GermanGlossaryKeySchema.make("unreviewed-term")
        ).pipe(Effect.flip)
      )
    ).resolves.toMatchObject({
      _tag: "GermanGlossaryTermError",
      key: "unreviewed-term",
    });
  });

  it("owns malformed and noncanonical sources as typed failures", async () => {
    const glossary = await Effect.runPromise(decodeGermanGlossary());
    const [first] = glossary;
    if (first === undefined) {
      throw new Error("Expected the nonempty German glossary.");
    }
    const [malformed, duplicate] = await Promise.all([
      Effect.runPromise(decodeGermanGlossary(null).pipe(Effect.flip)),
      Effect.runPromise(decodeGermanGlossary([first, first]).pipe(Effect.flip)),
    ]);

    expect([malformed, duplicate]).toEqual([
      expect.objectContaining({ _tag: "GermanGlossaryError" }),
      expect.objectContaining({ _tag: "GermanGlossaryError" }),
    ]);
    expect(String(duplicate.cause)).toContain(
      "German glossary keys must be unique and canonical."
    );
  });
});
