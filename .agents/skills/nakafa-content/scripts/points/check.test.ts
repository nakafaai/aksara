import { fileURLToPath } from "node:url";
import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Effect } from "effect";
import { runMain } from "#nakafa-content/points/check";
import { capture } from "#nakafa-content/points/test/console";
import {
  COMPUTED_CURVE,
  curveWith,
  lesson,
  PASTED_CURVE,
} from "#nakafa-content/points/test/lesson";
import {
  commitAll,
  createRepository,
  git,
  writeFiles,
} from "#nakafa-content/points/test/repository";

/** Real Git repositories take longer than a pure unit test on a busy runner. */
const GIT_TIMEOUT = 30_000;

const FAILED_SUMMARY =
  /^Points check found 1 finding\(s\) in 1 of 1 files, compared with [0-9a-f]{7}\.$/u;
const PASSED_SUMMARY =
  /^Points check passed for 1 files and compared 1 changed files with [0-9a-f]{7}\.$/u;
const ROOT = "packages/corpus/material/lesson/mathematics/parabola";
const LESSON = `${ROOT}/en.mdx`;
const SIBLING = `${ROOT}/id.mdx`;

/** Runs the gate over the lesson folder with its repository as the root. */
const check = Effect.fn("PointsTest.check")(
  (root: string, ...options: readonly string[]) =>
    capture(runMain([ROOT, "--base", "HEAD", ...options], root))
);

/** Commits one lesson with the given visuals and returns its repository. */
const commitLesson = Effect.fn("PointsTest.commitLesson")(function* (
  ...visuals: readonly string[]
) {
  const root = yield* createRepository();
  yield* writeFiles(root, { [LESSON]: lesson(...visuals) });
  yield* commitAll(root, "base lesson");
  return root;
});

vi.setConfig({ testTimeout: GIT_TIMEOUT });

layer(NodeServices.layer, { excludeTestServices: true })(
  "points gate",
  (it) => {
    it.effect("fails a lesson that pastes a vertex list", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE, COMPUTED_CURVE);
        yield* writeFiles(root, {
          [LESSON]: lesson(COMPUTED_CURVE, PASTED_CURVE),
        });
        const result = yield* check(root);

        assert.strictEqual(result.code, 1);
        assert.strictEqual(result.error.length, 2);
        assert.match(
          result.error[0] ?? "",
          new RegExp(
            `^${LESSON}:\\d+:\\d+ \\[literal-points\\] 9 literal points`
          )
        );
        assert.match(result.error[1] ?? "", FAILED_SUMMARY);
      })
    );

    it.effect("fails a six-digit coordinate and names its position", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE);
        const rounded = curveWith("[{ x: 0.707107, y: 0.707107, z: 0 }]");
        const source = lesson(COMPUTED_CURVE, rounded);
        yield* writeFiles(root, { [LESSON]: source });
        const result = yield* check(root);

        const line = source
          .split("\n")
          .findIndex((entry) => entry.includes("0.707107"));
        assert.strictEqual(result.code, 1);
        assert.strictEqual(
          result.error[0]?.startsWith(`${LESSON}:${line + 1}:`),
          true
        );
        assert.include(result.error[0], "[long-decimal] x: 0.707107");
      })
    );

    it.effect("fails a lesson that loses a LineEquation against its base", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE, COMPUTED_CURVE);
        yield* writeFiles(root, { [LESSON]: lesson(COMPUTED_CURVE) });
        const result = yield* check(root);

        assert.strictEqual(result.code, 1);
        assert.strictEqual(
          result.error[0],
          `${LESSON}:1:1 [interactive-visuals-fell] interactive visuals fell from 2 to 1 (LineEquation 2 to 1): a revision never removes 3D or animation`
        );
      })
    );

    it.effect("passes a lesson that gains a LineEquation", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE);
        yield* writeFiles(root, {
          [LESSON]: lesson(COMPUTED_CURVE, COMPUTED_CURVE),
        });
        const result = yield* check(root);

        assert.strictEqual(result.code, 0);
        assert.deepStrictEqual(result.error, []);
        assert.match(result.log[0] ?? "", PASSED_SUMMARY);
      })
    );

    it.effect("compares with origin/main when no base is given", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE, COMPUTED_CURVE);
        const base = yield* git(root, "rev-parse", "HEAD");
        yield* git(root, "update-ref", "refs/remotes/origin/main", base);
        yield* writeFiles(root, { [LESSON]: lesson(COMPUTED_CURVE) });
        const result = yield* capture(runMain([ROOT], root));

        assert.strictEqual(result.code, 1);
        assert.include(result.error[0], "[interactive-visuals-fell]");
        assert.include(result.error[1], `compared with ${base.slice(0, 7)}`);
      })
    );

    it.effect("compares only files that exist on the base", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE, COMPUTED_CURVE);
        yield* writeFiles(root, {
          [SIBLING]: lesson("A new lesson without visuals."),
        });
        const result = yield* check(root);

        assert.strictEqual(result.code, 0);
        assert.include(
          result.log[0],
          "passed for 2 files and compared 0 changed files"
        );
      })
    );

    it.effect("compares a renamed lesson with the file it came from", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE, COMPUTED_CURVE);
        yield* git(root, "mv", LESSON, SIBLING);
        yield* writeFiles(root, { [SIBLING]: lesson(COMPUTED_CURVE) });
        const result = yield* check(root);

        assert.strictEqual(result.code, 1);
        assert.strictEqual(
          result.error[0],
          `${SIBLING}:1:1 [interactive-visuals-fell] interactive visuals fell from 2 to 1 (LineEquation 2 to 1): a revision never removes 3D or animation`
        );
      })
    );

    it.effect("passes a renamed lesson that keeps every visual", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE, COMPUTED_CURVE);
        yield* git(root, "mv", LESSON, SIBLING);
        const result = yield* check(root);

        assert.strictEqual(result.code, 0);
        assert.include(
          result.log[0],
          "passed for 1 files and compared 1 changed files"
        );
      })
    );

    it.effect("does not blame a branch for visuals that landed on main", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE);
        yield* git(root, "switch", "--quiet", "--create", "feature");
        yield* git(root, "switch", "--quiet", "main");
        yield* writeFiles(root, {
          [LESSON]: lesson(COMPUTED_CURVE, COMPUTED_CURVE),
        });
        yield* commitAll(root, "main adds a visual");
        yield* git(root, "switch", "--quiet", "feature");
        const result = yield* capture(runMain([ROOT, "--base", "main"], root));

        assert.strictEqual(result.code, 0);
        assert.include(result.log[0], "compared 0 changed files");
      })
    );

    it.effect("checks a file target and the whole repository", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE);
        yield* writeFiles(root, { [LESSON]: lesson(PASTED_CURVE) });
        const file = yield* capture(runMain([LESSON, "--base", "HEAD"], root));
        const everything = yield* capture(
          runMain([".", "--base", "HEAD"], root)
        );

        assert.strictEqual(file.code, 1);
        assert.include(file.error[0], "[literal-points]");
        assert.strictEqual(everything.code, 1);
        assert.include(everything.error[0], "[literal-points]");
        assert.include(everything.error.at(-1), "of 1 files");
      })
    );

    it.effect("exits with 2 and names the reason of every typed failure", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE);
        yield* writeFiles(root, { "empty/readme.md": "No lessons here.\n" });
        const result = yield* capture(
          Effect.all([
            runMain([], root),
            runMain(["missing", "--base", "HEAD"], root),
            runMain(["empty", "--base", "HEAD"], root),
            runMain([ROOT, "--base", "origin/missing"], root),
          ])
        );

        assert.deepStrictEqual(result.code, [2, 2, 2, 2]);
        assert.deepStrictEqual(
          result.error.map((line) => line.split("]")[0]),
          [
            "PointsCheckError [invalid-arguments",
            "PointsCheckError [unreadable-entry",
            "PointsCheckError [empty-targets",
            "PointsCheckError [unknown-base",
          ]
        );
      })
    );

    it.effect("fails with a typed error for a document it cannot parse", () =>
      Effect.gen(function* () {
        const root = yield* commitLesson(COMPUTED_CURVE);
        yield* writeFiles(root, { [LESSON]: lesson("<LineEquation title=") });
        const head = yield* check(root);
        yield* commitAll(root, "broken lesson");
        yield* writeFiles(root, { [LESSON]: lesson(COMPUTED_CURVE) });
        const base = yield* capture(runMain([ROOT, "--base", "HEAD"], root));

        assert.strictEqual(head.code, 2);
        assert.include(
          head.error[0],
          `[unparseable-document]: Cannot parse ${LESSON}`
        );
        assert.strictEqual(base.code, 2);
        assert.match(
          base.error[0] ?? "",
          new RegExp(`Cannot parse ${LESSON} at [0-9a-f]{7}`)
        );
      })
    );

    it.effect("runs when the module is the process entrypoint", () =>
      Effect.gen(function* () {
        yield* Effect.acquireRelease(
          Effect.sync(() => {
            const original = {
              argv: process.argv,
              error: console.error,
              exitCode: process.exitCode,
            };
            console.error = () => undefined;
            process.argv = [
              process.execPath,
              fileURLToPath(new URL("./check.ts", import.meta.url)),
              "--unknown",
            ];
            process.exitCode = undefined;
            vi.resetModules();
            return original;
          }),
          (original) =>
            Effect.sync(() => {
              console.error = original.error;
              process.argv = original.argv;
              process.exitCode = original.exitCode;
            })
        );
        yield* Effect.promise(() => import("#nakafa-content/points/check"));
        yield* Effect.promise(() =>
          vi.waitFor(
            () => {
              assert.equal(process.exitCode, 2);
            },
            { timeout: GIT_TIMEOUT }
          )
        );
      })
    );
  }
);
