import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

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

describe("tryout registry", () => {
  it("loads only the reviewed SNBT and TKA sources in stable order", async () => {
    const sources = await loadRegistry();

    expect(sources.map(({ examKey }) => examKey)).toEqual(["snbt", "tka"]);
    expect(sources.map(({ sourceRevision }) => sourceRevision)).toEqual([
      "2026-07-05",
      "2026-07-05",
    ]);
  });

  it("rejects strict input, duplicate exams, and country conflicts", async () => {
    const sources = await loadRegistry();
    const first = requireNode(sources[0], "first try-out source");
    const second = requireNode(sources[1], "second try-out source");
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
                ...second.countryTranslations.en,
                title: `${second.countryTranslations.en.title} conflict`,
              },
            },
          },
        ]).pipe(Effect.flip),
      ])
    );

    expect(failures.map(({ _tag }) => _tag)).toEqual([
      "TryoutRegistryDecodeError",
      "TryoutRegistryConflictError",
      "TryoutRegistryConflictError",
    ]);
    expect(failures[1]).toMatchObject({ kind: "exam" });
    expect(failures[2]).toMatchObject({ kind: "country" });
  });
});
