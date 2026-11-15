import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Order, Path, Schema } from "effect";
import { inDirectory, makeRepository } from "#scripts/check/fixture";
import {
  ChangedFilesError,
  changedFiles,
  checkVisuals,
  corpusSources,
  sourcesToCheck,
  VisualPolicyError,
  visualFindings,
  visualReport,
} from "#scripts/check/visuals";
import { runGit } from "#scripts/git";

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

  it.effect("reports a card whose description only repeats its title", () =>
    Effect.gen(function* () {
      expect(
        yield* visualFindings(
          "c.mdx",
          '<Card title="Tempe" description="Tempe." />\n'
        )
      ).toEqual([
        { file: "c.mdx", finding: "1:1 Card description repeats its title" },
      ]);
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

      if (!Schema.is(VisualPolicyError)(failure)) {
        return yield* Effect.die(failure);
      }
      expect(Arr.map(failure.findings, (finding) => finding.file)).toContain(
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

/** Runs Git in a test repository as a test author, so a commit needs no global identity. */
const gitIn = (root: string, args: readonly string[]) =>
  runGit(
    ["-c", "user.name=Test", "-c", "user.email=test@example.com", ...args],
    { cwd: root }
  );

describe("sourcesToCheck", () => {
  const files = [
    "packages/corpus/material/lesson/a/en.mdx",
    "packages/corpus/material/lesson/b/en.mdx",
    "packages/compiler/src/policy/math.ts",
  ];

  it("reads only the sources a change below the corpus alone touched", () => {
    expect(
      sourcesToCheck(files, [
        "packages/corpus/material/lesson/b/en.mdx",
        "packages/corpus/material/registry.ts",
      ])
    ).toEqual(["packages/corpus/material/lesson/b/en.mdx"]);
    expect(sourcesToCheck(files, [])).toEqual([]);
  });

  it("reads every source when the change reaches beyond the corpus", () => {
    expect(
      sourcesToCheck(files, [
        "packages/corpus/material/lesson/b/en.mdx",
        "packages/compiler/src/policy/math.ts",
      ])
    ).toEqual([
      "packages/corpus/material/lesson/a/en.mdx",
      "packages/corpus/material/lesson/b/en.mdx",
    ]);
  });
});

describe("changedFiles", () => {
  it.effect(
    "lists what a change committed, staged, edited and added since its merge base",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* makeRepository();
        /** Writes a file whose text is its own name. */
        const write = (file: string) =>
          fileSystem.writeFileString(path.join(root, file), `${file}\n`);
        for (const file of ["kept.mdx", "edited.mdx", "staged.mdx"]) {
          yield* write(file);
        }
        yield* gitIn(root, [
          "add",
          "--",
          "kept.mdx",
          "edited.mdx",
          "staged.mdx",
        ]);
        yield* gitIn(root, ["commit", "--quiet", "-m", "base"]);
        yield* gitIn(root, ["branch", "base"]);
        yield* write("committed.mdx");
        yield* gitIn(root, ["add", "--", "committed.mdx"]);
        yield* gitIn(root, ["commit", "--quiet", "-m", "change"]);
        yield* fileSystem.writeFileString(
          path.join(root, "staged.mdx"),
          "staged again\n"
        );
        yield* gitIn(root, ["add", "--", "staged.mdx"]);
        yield* fileSystem.writeFileString(
          path.join(root, "edited.mdx"),
          "edited again\n"
        );
        yield* write("added.mdx");

        expect(
          Arr.sort(yield* inDirectory(root, changedFiles("base")), Order.String)
        ).toEqual(["added.mdx", "committed.mdx", "edited.mdx", "staged.mdx"]);

        const missing = yield* Effect.flip(
          inDirectory(root, changedFiles("missing"))
        );
        expect(missing).toBeInstanceOf(ChangedFilesError);
        expect(missing.message).toContain("git merge-base missing HEAD failed");
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});

describe("checkVisuals", () => {
  it.effect(
    "reads the sources a corpus change touched, and every source once the change reaches beyond the corpus",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* makeRepository();
        const lesson = "packages/corpus/material/lesson";
        yield* fileSystem.makeDirectory(path.join(root, lesson), {
          recursive: true,
        });
        // A source main already carries, which the policy now rejects.
        yield* fileSystem.writeFileString(
          path.join(root, lesson, "old.mdx"),
          ROUNDED
        );
        yield* gitIn(root, ["add", "--", "."]);
        yield* gitIn(root, ["commit", "--quiet", "-m", "base"]);
        yield* gitIn(root, ["branch", "base"]);
        yield* fileSystem.writeFileString(
          path.join(root, lesson, "new.mdx"),
          EXACT
        );
        yield* inDirectory(root, checkVisuals("base"));

        yield* fileSystem.writeFileString(path.join(root, "policy.ts"), "");
        const rejected = yield* inDirectory(root, checkVisuals("base")).pipe(
          Effect.as(Arr.empty<string>()),
          Effect.catchTag("VisualPolicyError", (error) =>
            Effect.succeed(Arr.map(error.findings, (finding) => finding.file))
          )
        );
        expect(rejected).toContain(`${lesson}/old.mdx`);
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});
