import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { assert, it } from "@effect/vitest";
import { Effect, type Scope } from "effect";
import { runMain } from "#nakafa-content/math/fix";
import { capture } from "#nakafa-content/points/test/console";

/** Creates a temporary content root and removes it afterwards. */
const temporaryRoot = (
  entries: Record<string, string>
): Effect.Effect<string, never, Scope.Scope> =>
  Effect.acquireRelease(
    Effect.sync(() => {
      const root = mkdtempSync(join(tmpdir(), "nakafa-math-fix-"));
      for (const [path, source] of Object.entries(entries)) {
        const file = join(root, path);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, source);
      }
      return root;
    }),
    (root) => Effect.sync(() => rmSync(root, { force: true, recursive: true }))
  );

/** Reads one file below a root. */
function read(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8");
}

it.effect("wraps every quantity below a root and lists what it left", () =>
  Effect.gen(function* () {
    const root = yield* temporaryRoot({
      "bank/set-1/question-1/answer.en.mdx": "It costs 3,5 units.\n",
      "bank/set-1/question-1/question.id.mdx":
        'Bilangan <InlineMath math="n" /> bersisa 2 jika dibagi 5.\n',
      "notes.txt": "5 apples\n",
      "pages/about/id.mdx": "Ada 5 soal.\n",
    });
    const { code, log } = yield* capture(runMain([root]));
    assert.equal(code, 0);
    assert.equal(
      read(root, "bank/set-1/question-1/question.id.mdx"),
      'Bilangan <InlineMath math="n" /> bersisa <InlineMath math="2" /> jika dibagi <InlineMath math="5" />.\n'
    );
    assert.equal(read(root, "pages/about/id.mdx"), "Ada 5 soal.\n");
    assert.deepEqual(log, [
      "math/fix wrapped 2 numbers in 1 of 2 files; 1 left for a person (ambiguous separators, a string prop, or a number alone on its line):",
      `${join(root, "bank/set-1/question-1/answer.en.mdx")}:1:10 It costs 3,5 units.`,
    ]);
  }).pipe(Effect.scoped)
);

it.effect("rewrites one named file and skips pages and unlocalized files", () =>
  Effect.gen(function* () {
    const root = yield* temporaryRoot({
      "lesson/en.mdx": "Take 2 steps.\n",
      "pages/home/en.mdx": "Read 5 lessons.\n",
      "README.mdx": "5 apples\n",
    });
    const { code, log } = yield* capture(
      runMain([
        join(root, "lesson/en.mdx"),
        join(root, "pages/home/en.mdx"),
        join(root, "README.mdx"),
      ])
    );
    assert.equal(code, 0);
    assert.equal(
      read(root, "lesson/en.mdx"),
      'Take <InlineMath math="2" /> steps.\n'
    );
    assert.equal(read(root, "README.mdx"), "5 apples\n");
    assert.deepEqual(log, [
      "math/fix wrapped 1 numbers in 1 of 1 files; 0 left for a person (ambiguous separators, a string prop, or a number alone on its line):",
    ]);
  }).pipe(Effect.scoped)
);

it.effect("refuses a rewrite that would turn a number into its own block", () =>
  Effect.gen(function* () {
    const root = yield* temporaryRoot({ "lesson/id.mdx": "- - 5\n" });
    const { code, error } = yield* capture(runMain([root]));
    assert.equal(code, 1);
    assert.equal(read(root, "lesson/id.mdx"), "- - 5\n");
    assert.deepEqual(error, [
      `${join(root, "lesson/id.mdx")}: refused, the rewrite would not read back as written; wrap its numbers by hand`,
    ]);
  }).pipe(Effect.scoped)
);

it.effect("fails with usage, parse, read, and write errors", () =>
  Effect.gen(function* () {
    const root = yield* temporaryRoot({
      "broken/id.mdx": "Teks <InlineMath math=\n",
      "locked/id.mdx": "Ada 5 soal.\n",
    });
    mkdirSync(join(root, "folder/id.mdx"), { recursive: true });
    chmodSync(join(root, "locked/id.mdx"), 0o444);
    const usage = yield* capture(runMain([]));
    const broken = yield* capture(runMain([join(root, "broken")]));
    const folder = yield* capture(runMain([join(root, "folder/id.mdx")]));
    const locked = yield* capture(runMain([join(root, "locked")]));
    chmodSync(join(root, "locked/id.mdx"), 0o644);
    assert.deepEqual(
      [usage.code, broken.code, folder.code, locked.code],
      [2, 2, 2, 2]
    );
    assert.include(usage.error.join("\n"), "Usage: math/fix.ts");
    assert.include(broken.error.join("\n"), "Cannot parse");
    assert.include(folder.error.join("\n"), "Cannot read");
    assert.include(locked.error.join("\n"), "Cannot write");
  }).pipe(Effect.scoped)
);

it.effect("runs when the module is the process entrypoint", () =>
  Effect.gen(function* () {
    const root = yield* temporaryRoot({ "lesson/en.mdx": "Take 2 steps.\n" });
    yield* Effect.acquireRelease(
      Effect.sync(() => {
        const original = {
          argv: process.argv,
          exitCode: process.exitCode,
          log: console.log,
        };
        console.log = () => undefined;
        process.argv = [
          process.execPath,
          fileURLToPath(new URL("./fix.ts", import.meta.url)),
          root,
        ];
        process.exitCode = undefined;
        vi.resetModules();
        return original;
      }),
      (original) =>
        Effect.sync(() => {
          console.log = original.log;
          process.argv = original.argv;
          process.exitCode = original.exitCode;
        })
    );
    yield* Effect.promise(() => import("#nakafa-content/math/fix"));
    yield* Effect.promise(() =>
      vi.waitFor(() => {
        assert.equal(process.exitCode, 0);
      })
    );
    assert.equal(
      read(root, "lesson/en.mdx"),
      'Take <InlineMath math="2" /> steps.\n'
    );
  }).pipe(Effect.scoped)
);
