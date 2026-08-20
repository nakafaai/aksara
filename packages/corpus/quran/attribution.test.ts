import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import {
  quranSourceAttributionFor,
  quranSourceAttributionsFor,
} from "#corpus/quran/attribution";
import { authoringQuranSourceAttribution } from "#corpus/quran/attribution/source";

describe("Quran source attribution", () => {
  it("selects only source identities and copy visible to one locale set", async () => {
    const active = await Effect.runPromise(
      quranSourceAttributionsFor(ACTIVE_APP_LOCALES)
    );

    expect(active).toHaveLength(6);
    expect(active.every(({ copy }) => copy.length === 3)).toBe(true);
  });

  it("fails typed when source or localized copy ownership is not exact", async () => {
    const source = authoringQuranSourceAttribution("quranenc-german");
    const [firstCopy] = source.copy;
    const failures = await Promise.all([
      Effect.runPromise(
        quranSourceAttributionFor(
          "quranenc-german",
          ACTIVE_APP_LOCALES,
          []
        ).pipe(Effect.flip)
      ),
      Effect.runPromise(
        quranSourceAttributionFor("quranenc-german", ACTIVE_APP_LOCALES, [
          source,
          source,
        ]).pipe(Effect.flip)
      ),
      Effect.runPromise(
        quranSourceAttributionFor("quranenc-german", ACTIVE_APP_LOCALES, [
          { ...source, copy: [firstCopy] },
        ]).pipe(Effect.flip)
      ),
      Effect.runPromise(
        quranSourceAttributionFor("quranenc-german", ACTIVE_APP_LOCALES, [
          { ...source, copy: [firstCopy, firstCopy] },
        ]).pipe(Effect.flip)
      ),
    ]);

    expect(failures.map(({ reason }) => reason)).toEqual([
      "missing-source",
      "duplicate-source",
      "missing-copy",
      "duplicate-copy",
    ]);
  });
});
