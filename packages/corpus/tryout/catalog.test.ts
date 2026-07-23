import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
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
      Effect.flatMap(decodeTryoutRegistry(), projectTryoutCatalog)
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
});
