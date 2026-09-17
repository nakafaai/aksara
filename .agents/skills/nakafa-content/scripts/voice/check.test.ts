import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { NodeFileSystem } from "@effect/platform-node";
import { assert, it } from "@effect/vitest";
import { Effect, type FileSystem, type Scope } from "effect";

import {
  checkLessonRoot,
  collectLessonFiles,
  runCli,
  runMain,
} from "#nakafa-content/voice/check";
import type { LessonVoiceCheckError } from "#nakafa-content/voice/error";

const PASSING_REPORT_PATTERN = /passed for 1 files/u;
const LESSON_ROOT = join(process.cwd(), "packages/corpus/material/lesson");
const ARTICLE_ROOT = join(process.cwd(), "packages/corpus/articles");

type TestServices = FileSystem.FileSystem | Scope.Scope;

/** Registers one scoped filesystem-backed checker test with live services. */
const checkTest = (
  name: string,
  self: Effect.Effect<void, LessonVoiceCheckError, TestServices>,
  timeout?: number
): void => {
  it.effect(
    name,
    () => Effect.scoped(Effect.provide(self, NodeFileSystem.layer)),
    timeout
  );
};

/** Flips an expected checker failure into the typed error, dying on success. */
const flipFailure = <A>(
  self: Effect.Effect<A, LessonVoiceCheckError, FileSystem.FileSystem>
): Effect.Effect<LessonVoiceCheckError, never, FileSystem.FileSystem> =>
  Effect.matchEffect(self, {
    onFailure: (error) => Effect.succeed(error),
    onSuccess: () => Effect.die("Expected the checker to fail"),
  });

/** Creates a temporary lesson root and removes it afterwards. */
const temporaryRoot = (
  entries: Record<string, string>,
  setup: (root: string) => void = () => undefined
): Effect.Effect<string, never, Scope.Scope> =>
  Effect.acquireRelease(
    Effect.sync(() => {
      const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-voice-"));
      for (const [path, source] of Object.entries(entries)) {
        const file = join(root, path);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, source);
      }
      setup(root);
      return root;
    }),
    (root) => Effect.sync(() => rmSync(root, { force: true, recursive: true }))
  );

checkTest(
  "accepts every current authored scope through the production checker",
  Effect.gen(function* () {
    for (const [root, minimum] of [
      [LESSON_ROOT, 1000],
      [ARTICLE_ROOT, 21],
    ] as const) {
      const report = yield* checkLessonRoot(root);
      assert.ok(report.fileCount >= minimum);
      assert.deepEqual(report.issues, []);
    }
  }),
  90_000
);

checkTest(
  "scans every locale sibling below a lesson root",
  Effect.gen(function* () {
    const root = yield* temporaryRoot({
      "mathematics/example/de.mdx":
        "Die Bedingung legt fest, wann das Gesetz gilt.\n",
      "mathematics/example/en.mdx":
        "The condition states when the rule applies.\n",
      "mathematics/example/id.mdx": "Nilai ini mempengaruhi hasil.\n",
    });
    assert.deepEqual(yield* checkLessonRoot(root), {
      fileCount: 3,
      issues: [
        {
          column: 11,
          excerpt: "Nilai ini mempengaruhi hasil.",
          file: "mathematics/example/id.mdx",
          line: 1,
          locale: "id",
          rule: "indonesian-nonstandard-mempengaruhi",
        },
      ],
    });
  })
);

checkTest(
  "keeps rendered copy and destination checks consistent at the complete audit seam",
  Effect.gen(function* () {
    const samples = [
      [
        "de",
        "Gib `Die` `Matrizen` `stehen` ein.\n\nSie können nun beide Seiten vergleichen.",
        "german-formal-address",
      ],
      [
        "id",
        '<input placeholder={"An" + "da dapat mencoba ini."} />',
        "indonesian-formal-learner-address",
      ],
      [
        "id",
        '<input {...(0, { src: "https://example.org/image.png" })} />',
        "external-link-invalid-placement",
      ],
      [
        "id",
        "<input {...(0, properties)} />",
        "external-link-invalid-placement",
      ],
    ] as const;
    for (const [index, [locale, source, rule]] of samples.entries()) {
      const root = yield* temporaryRoot({
        [`${index}/${locale}.mdx`]: source,
      });
      const rules = (yield* checkLessonRoot(
        join(root, String(index))
      )).issues.map((issue) => issue.rule);
      assert.deepEqual(rules, [rule], source);
    }
  })
);

checkTest(
  "collects only supported locale files without following symlinks",
  Effect.gen(function* () {
    const root = yield* temporaryRoot(
      {
        "answer.en.mdx": "Copy the value.",
        "fr.mdx": "Copiez la valeur.",
        "id.mdx": "Salin nilai.",
        "nested/de.mdx": "Kopiere den Wert.",
        "notes.txt": "notes",
      },
      (directory) =>
        symlinkSync(join(directory, "id.mdx"), join(directory, "linked.mdx"))
    );
    assert.deepEqual(
      (yield* collectLessonFiles(root)).map((file) =>
        file.slice(root.length + 1)
      ),
      ["answer.en.mdx", "id.mdx", "nested/de.mdx"]
    );
  })
);

checkTest(
  "typed checker failures carry machine-readable reasons",
  Effect.gen(function* () {
    const empty = yield* flipFailure(checkLessonRoot(yield* temporaryRoot({})));
    assert.equal(empty.reason, "empty-root");
    assert.ok(empty.detail.includes("No lesson locale files found"));
    assert.equal(
      (yield* flipFailure(
        checkLessonRoot(yield* temporaryRoot({ "en.mdx": "<Highlight>oops\n" }))
      )).reason,
      "unparseable-document"
    );
    const unreadable = yield* temporaryRoot(
      { "en.mdx": "The value follows from the equation.\n" },
      (root) => chmodSync(join(root, "en.mdx"), 0o000)
    );
    assert.equal(
      (yield* flipFailure(checkLessonRoot(unreadable))).reason,
      "unreadable-entry"
    );
    assert.equal(
      (yield* flipFailure(runCli(["--format", "xml"]))).reason,
      "invalid-arguments"
    );
    assert.equal(
      (yield* flipFailure(
        runCli(["--root", join(tmpdir(), "missing-nakafa-lessons")])
      )).reason,
      "unreadable-entry"
    );
    assert.equal(yield* runMain(["--unknown"]), 2);
  })
);

checkTest(
  "checker exit tiers follow blocking and strict review",
  Effect.gen(function* () {
    /** Runs one fixture through the CLI with silenced output. */
    const run = (entries: Record<string, string>, arguments_: string[]) =>
      Effect.flatMap(temporaryRoot(entries), (root) =>
        runCli(["--root", root, ...arguments_])
      );
    assert.equal(
      yield* run({ "id.mdx": "Model ini membuat hubungan lebih nyata.\n" }, []),
      0
    );
    assert.equal(
      yield* run({ "id.mdx": "Model ini membuat hubungan lebih nyata.\n" }, [
        "--strict-review",
      ]),
      1
    );
    assert.equal(
      yield* run(
        {
          "id.mdx":
            "Periksa dulu fungsi yang tersedia sebelum menulis sendiri perhitungannya.\n",
        },
        []
      ),
      1
    );
  })
);

checkTest(
  "prints clean text and JSON reports",
  Effect.gen(function* () {
    const logs: string[] = [];
    yield* Effect.acquireRelease(
      Effect.sync(() => {
        const originalLog = console.log;
        console.log = (value?: unknown) => logs.push(String(value));
        return originalLog;
      }),
      (originalLog) =>
        Effect.sync(() => {
          console.log = originalLog;
        })
    );
    const output = logs;
    const root = yield* temporaryRoot({
      "en.mdx": "The value follows from the equation.\n",
    });
    assert.equal(yield* runCli(["--format", "text", "--root", root]), 0);
    assert.match(output.at(-1) ?? "", PASSING_REPORT_PATTERN);
    assert.equal(yield* runCli(["--format", "json", "--root", root]), 0);
    assert.deepEqual(JSON.parse(output.at(-1) ?? "{}"), {
      blockingIssueCount: 0,
      fileCount: 1,
      issues: [],
      reviewIssueCount: 0,
    });
  })
);

checkTest(
  "runs the checker when the module is the process entrypoint",
  Effect.gen(function* () {
    const root = yield* temporaryRoot({
      "en.mdx": "The equation gives the value.\n",
    });
    yield* Effect.acquireRelease(
      Effect.sync(() => {
        const originalArgv = process.argv;
        const originalExitCode = process.exitCode;
        const originalLog = console.log;
        console.log = () => undefined;
        process.argv = [
          process.execPath,
          fileURLToPath(new URL("./check.ts", import.meta.url)),
          "--root",
          root,
        ];
        process.exitCode = undefined;
        vi.resetModules();
        return { originalArgv, originalExitCode, originalLog };
      }),
      ({ originalArgv, originalExitCode, originalLog }) =>
        Effect.sync(() => {
          console.log = originalLog;
          process.argv = originalArgv;
          process.exitCode = originalExitCode;
        })
    );
    yield* Effect.promise(() => import("#nakafa-content/voice/check"));
    yield* Effect.promise(() =>
      vi.waitFor(() => {
        assert.equal(process.exitCode, 0);
      })
    );
  })
);
