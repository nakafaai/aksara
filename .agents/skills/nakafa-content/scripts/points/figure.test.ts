import { assert, describe, it } from "@effect/vitest";
import { HashSet } from "effect";
import { keptScenes } from "#nakafa-content/points/figure";

describe("kept scenes", () => {
  it("keeps a lesson out of the bar only when it keeps every custom scene", () => {
    /** One lesson's count in English, naming the first `count` scenes. */
    const scenes = (name: string, count: number) => ({
      lesson: name,
      locale: "en",
      scenes: ["ALab", "BLab", "CLab"].slice(0, count),
    });
    const corrected = HashSet.make("l/kept", "l/grown", "l/dropped");

    assert.deepStrictEqual(
      [
        ...keptScenes(
          corrected,
          [scenes("l/kept", 1), scenes("l/grown", 2), scenes("l/dropped", 0)],
          [scenes("l/kept", 1), scenes("l/grown", 1), scenes("l/dropped", 1)]
        ),
      ].sort(),
      ["l/grown", "l/kept"]
    );
  });
});
