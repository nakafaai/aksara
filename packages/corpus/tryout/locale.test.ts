import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";

import {
  composeTryoutLocaleExam,
  TryoutLocaleExamSchema,
  TryoutLocaleOwnershipError,
} from "#corpus/tryout/locale";
import { decodeTryoutLocaleRegistry } from "#corpus/tryout/locale-registry";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

type LocalizedTryoutSource = Effect.Success<
  ReturnType<typeof decodeTryoutLocaleRegistry>
>[number];

/** Requires one German map value from an already composed locale source. */
function german(source: object) {
  const value = Object.entries(source).find(([key]) => key === "de")?.[1];
  if (value === undefined) {
    throw new Error("Expected German locale copy.");
  }
  return value;
}

/** Reconstructs the reviewed overlay shape from one composed real source. */
function localeSource(source: LocalizedTryoutSource) {
  return Schema.decodeSync(TryoutLocaleExamSchema)({
    appLocale: "de",
    country: {
      key: source.countryKey,
      routeSlug: german(source.countryRouteSlugs),
      translation: german(source.countryTranslations),
    },
    exam: {
      key: source.examKey,
      routeSlug: german(source.examRouteSlugs),
      translation: german(source.examTranslations),
    },
    tracks: source.tracks.map((track) => ({
      key: track.key,
      routeSlug: german(track.routeSlugs),
      sets: track.sets.map((set) => ({
        key: set.key,
        routeSlug: german(set.routeSlugs),
        sections: set.sections.map((section) => ({
          key: section.key,
          routeSlug: german(section.routeSlugs),
          translation: german(section.translations),
        })),
        translation: german(set.translations),
      })),
      translation: german(track.translations),
    })),
  });
}

describe("try-out locale composition", () => {
  it("composes the exact real German hierarchy", async () => {
    const [active] = await Effect.runPromise(decodeTryoutRegistry());
    const [localized] = await Effect.runPromise(decodeTryoutLocaleRegistry());
    if (!(active && localized)) {
      throw new Error("Expected one real try-out source.");
    }
    const composed = await Effect.runPromise(
      composeTryoutLocaleExam(active, localeSource(localized))
    );

    expect(composed).toMatchObject({
      examKey: active.examKey,
      overlayAppLocale: "de",
    });
    expect(Object.keys(composed.examTranslations)).toContain("de");
  });

  it("rejects every mismatched stable hierarchy level", async () => {
    const [active] = await Effect.runPromise(decodeTryoutRegistry());
    const [localized] = await Effect.runPromise(decodeTryoutLocaleRegistry());
    if (!(active && localized)) {
      throw new Error("Expected one real try-out source.");
    }
    const candidate = localeSource(localized);
    const [track] = candidate.tracks;
    const [set] = track?.sets ?? [];
    if (!(track && set)) {
      throw new Error("Expected one real try-out hierarchy.");
    }
    const inputs = [
      [
        "country",
        { ...candidate, country: { ...candidate.country, key: "germany" } },
      ],
      ["exam", { ...candidate, exam: { ...candidate.exam, key: "abitur" } }],
      ["track", { ...candidate, tracks: [] }],
      [
        "set",
        {
          ...candidate,
          tracks: [{ ...track, sets: [] }, ...candidate.tracks.slice(1)],
        },
      ],
      [
        "section",
        {
          ...candidate,
          tracks: [
            {
              ...track,
              sets: [{ ...set, sections: [] }, ...track.sets.slice(1)],
            },
            ...candidate.tracks.slice(1),
          ],
        },
      ],
    ] as const;

    const errors = await Effect.runPromise(
      Effect.forEach(inputs, ([, input]) =>
        composeTryoutLocaleExam(active, input).pipe(Effect.flip)
      )
    );
    expect(errors).toHaveLength(inputs.length);
    for (const [index, [scope]] of inputs.entries()) {
      expect(errors[index]).toBeInstanceOf(TryoutLocaleOwnershipError);
      expect(errors[index]).toMatchObject({ scope });
    }
  });
});
