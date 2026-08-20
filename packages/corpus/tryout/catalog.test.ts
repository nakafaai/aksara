import {
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import {
  projectCandidateTryoutCatalog,
  projectTryoutCatalog,
} from "#corpus/tryout/catalog";
import { decodeTryoutLocaleRegistry } from "#corpus/tryout/locale-registry";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

/** Returns one nested source node or fails the test setup explicitly. */
function requireNode<Value>(value: Value | undefined, label: string): Value {
  if (value === undefined) {
    throw new Error(`Expected ${label}.`);
  }
  return value;
}

describe("tryout catalog", () => {
  it("projects exact localized hierarchy counts and route ownership", async () => {
    const rows = await Effect.runPromise(
      Effect.flatMap(decodeTryoutRegistry(), (sources) =>
        projectTryoutCatalog(sources)
      )
    );
    const counts = Object.fromEntries(
      ["country", "exam", "track", "set", "section"].map((kind) => [
        kind,
        rows.filter((row) => row.kind === kind).length,
      ])
    );

    expect(rows).toHaveLength(54);
    expect(counts).toEqual({
      country: 2,
      exam: 4,
      section: 34,
      set: 10,
      track: 4,
    });
    expect(
      rows.filter(
        (row) =>
          row.kind === "section" &&
          row.examKey === "tka" &&
          row.publicPath === undefined
      )
    ).toHaveLength(6);
  });

  it("maps invalid derived hierarchy counts to a typed catalog error", async () => {
    const sources = await Effect.runPromise(decodeTryoutRegistry());
    const snbt = requireNode(
      sources.find(({ examKey }) => examKey === "snbt"),
      "SNBT source"
    );
    const track = requireNode(snbt.tracks[0], "SNBT track");
    const set = requireNode(track.sets[0], "SNBT set");
    const section = requireNode(set.sections[0], "SNBT section");
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
    const failure = await Effect.runPromise(
      projectTryoutCatalog([
        invalidSnbt,
        ...sources.filter(({ examKey }) => examKey !== "snbt"),
      ]).pipe(Effect.flip)
    );

    expect(failure._tag).toBe("TryoutCatalogDecodeError");
  });

  it("preserves an authored country description when present", async () => {
    const sources = await Effect.runPromise(decodeTryoutRegistry());
    const source = requireNode(sources[0], "try-out source");
    const description = "Official Indonesian assessment catalog.";
    const rows = await Effect.runPromise(
      projectTryoutCatalog([
        {
          ...source,
          countryTranslations: {
            ...source.countryTranslations,
            en: { ...source.countryTranslations.en, description },
          },
        },
      ])
    );

    expect(rows).toContainEqual(
      expect.objectContaining({ appLocale: "en", description, kind: "country" })
    );
  });

  it("projects a complete German candidate hierarchy without activation", async () => {
    const rows = await Effect.runPromise(
      Effect.flatMap(decodeTryoutLocaleRegistry(), (sources) =>
        projectCandidateTryoutCatalog(sources)
      )
    );

    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every(({ appLocale }) => appLocale === "de")).toBe(true);
    expect(rows.find(({ kind }) => kind === "exam")).toMatchObject({
      publicPath: "try-out/indonesien/snbt",
      title: "SNBT",
    });
  });

  it("projects the permanent German overlay through the active publication seam", async () => {
    const sources = await Effect.runPromise(decodeTryoutRegistry());
    const rows = await Effect.runPromise(
      projectTryoutCatalog(
        sources,
        ActiveAppLocaleListSchema.make([AppLocaleSchema.make("de")])
      )
    );

    expect(rows.every(({ appLocale }) => appLocale === "de")).toBe(true);
    expect(rows.find(({ kind }) => kind === "exam")).toMatchObject({
      publicPath: "try-out/indonesien/snbt",
    });
  });
});
