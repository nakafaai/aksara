import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem } from "effect";
import {
  corpusSources,
  VisualPolicyError,
  visualFindings,
  visualReport,
} from "#scripts/check/visuals";

/** One plane scene whose diagonal ends at the given x and a labelled point at 3.85. */
function scene(x: string) {
  return `<MathVisual
  title={<>Delta</>}
  description={<>A scene with two close coordinates.</>}
  labels={{ end: <>End</> }}
  scene={{
    space: "plane",
    frame: { kind: "cartesian", x: { min: -1, max: 8 }, y: { min: -1, max: 5 } },
    view: { kind: "fit", padding: 0.2 },
    objects: [
      { id: "line", kind: "segment", from: { x: 0, y: 0 }, to: { x: ${x}, y: 2.2 }, appearance: "primary" },
      { id: "end", kind: "point", at: { x: 3.85, y: 2.2 }, appearance: "primary" },
    ],
    labels: [{ key: "end", objectId: "end", at: { x: 3.85, y: 2.2 }, placement: "below" }],
  }}
/>
`;
}

const EXACT = scene("3.85");
const ROUNDED = scene("(0) + 0.55 * ((7) - (0))");
const SPREAD = "<MathVisual {...props} />\n";

/** A scene finding: line, column, the scene path ending in x, then its message. */
const SCENE_FINDING = /^\d+:\d+ \S+\.x \S/u;

/** A source finding: line, column, then its reason. */
const SOURCE_FINDING = /^\d+:\d+ [a-z-]+$/u;

describe("corpusSources", () => {
  it("keeps only the MDX sources of the corpus", () => {
    expect(
      corpusSources([
        "packages/corpus/material/lesson/a/en.mdx",
        "packages/corpus/articles/b/id.mdx",
        "packages/corpus/material/schema.ts",
        "packages/compiler/src/test/baseline/a/en.mdx",
        "docs/note.mdx",
      ])
    ).toEqual([
      "packages/corpus/material/lesson/a/en.mdx",
      "packages/corpus/articles/b/id.mdx",
    ]);
  });
});

describe("visualFindings", () => {
  it.effect("accepts a scene whose equal coordinates are written alike", () =>
    Effect.gen(function* () {
      expect(yield* visualFindings("a.mdx", EXACT)).toEqual([]);
    })
  );

  it.effect(
    "names the line, column and scene path of a coordinate a rounding error away from another",
    () =>
      Effect.gen(function* () {
        const findings = yield* visualFindings("a.mdx", ROUNDED);

        expect(findings.length).toBeGreaterThan(0);
        expect(findings[0]?.file).toBe("a.mdx");
        expect(findings[0]?.finding).toMatch(SCENE_FINDING);
      })
  );

  it.effect("reports a source-level finding by its reason", () =>
    Effect.gen(function* () {
      const findings = yield* visualFindings("b.mdx", SPREAD);

      expect(findings.length).toBeGreaterThan(0);
      expect(findings[0]?.finding).toMatch(SOURCE_FINDING);
    })
  );
});

describe("visualReport", () => {
  /** A file system that serves the given sources by path. */
  const files = (sources: Record<string, string>) =>
    FileSystem.layerNoop({
      readFileString: (path) => Effect.succeed(sources[path] ?? ""),
    });

  it.effect("passes when every corpus source is accepted", () =>
    visualReport([
      "packages/corpus/material/lesson/a/en.mdx",
      "packages/corpus/material/schema.ts",
    ]).pipe(
      Effect.provide(
        files({ "packages/corpus/material/lesson/a/en.mdx": EXACT })
      )
    )
  );

  it.effect("fails with every finding when a corpus source is rejected", () =>
    Effect.gen(function* () {
      const failure = yield* Effect.flip(
        visualReport([
          "packages/corpus/material/lesson/a/en.mdx",
          "packages/corpus/material/lesson/b/en.mdx",
        ])
      );

      expect(failure).toBeInstanceOf(VisualPolicyError);
      expect(failure.findings.map(({ file }) => file)).toContain(
        "packages/corpus/material/lesson/b/en.mdx"
      );
    }).pipe(
      Effect.provide(
        files({
          "packages/corpus/material/lesson/a/en.mdx": EXACT,
          "packages/corpus/material/lesson/b/en.mdx": ROUNDED,
        })
      )
    )
  );
});
