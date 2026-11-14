import { chmodSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { NodeFileSystem } from "@effect/platform-node";
import { assert, it } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  type FileSystem,
  Schema,
  type Scope,
} from "effect";

import { loggedLines } from "#nakafa-content/points/test/console";
import {
  checkLessonRoot,
  collectLessonFiles,
  runCli,
  runMain,
} from "#nakafa-content/voice/check";
import type { LessonVoiceCheckError } from "#nakafa-content/voice/error";
import { corpusParts } from "#nakafa-content/voice/test/corpus";
import { temporaryRoot } from "#nakafa-content/voice/test/root";

const PASSING_REPORT_PATTERN = /passed for 3 files/u;
const JSON_TEXT = Schema.fromJsonString(Schema.Unknown);

type TestServices = FileSystem.FileSystem | Scope.Scope;

/** Registers one scoped filesystem-backed checker test with live services. */
const checkTest = (
  name: string,
  self: Effect.Effect<void, LessonVoiceCheckError, TestServices>,
  timeout?: number
): void =>
  it.effect(
    name,
    () => Effect.scoped(Effect.provide(self, NodeFileSystem.layer)),
    timeout
  );

/**
 * The corpus whose every root must pass the gate. A root is checked in parts,
 * the directories a number of levels below it, one test per part: the lesson
 * root as one test took 130 to 205 seconds for 1,560 files and outgrew its
 * timeout, while a part holds one topic or one try-out section and stays far
 * inside it however many parts the corpus gains.
 */
const CORPUS = join(process.cwd(), "packages/corpus");

for (const [root, depth, minimum] of [
  ["material/lesson", 2, 1149],
  ["articles", 0, 21],
  ["pages", 0, 18],
  ["question-bank", 4, 7300],
] as const) {
  const parts = corpusParts(join(CORPUS, root), depth);
  checkTest(
    `splits ${root} into parts that hold every document`,
    Effect.gen(function* () {
      const documents = yield* collectLessonFiles(join(CORPUS, root));
      const held = yield* Effect.forEach(parts, collectLessonFiles);
      assert.ok(documents.length >= minimum);
      assert.strictEqual(Arr.flatten(held).length, documents.length);
    })
  );
  for (const part of parts) {
    checkTest(
      `checks every current document in ${relative(CORPUS, part)}`,
      Effect.gen(function* () {
        const report = yield* checkLessonRoot(part);
        assert.deepEqual(report.issues, []);
      }),
      60_000
    );
  }
}

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
    const unreadable = yield* temporaryRoot(
      { "en.mdx": "The value follows from the equation.\n" },
      (root) => chmodSync(join(root, "en.mdx"), 0o000)
    );
    const cases: [
      string,
      Effect.Effect<unknown, LessonVoiceCheckError, TestServices>,
    ][] = [
      ["empty-root", checkLessonRoot(yield* temporaryRoot({}))],
      [
        "unparseable-document",
        checkLessonRoot(
          yield* temporaryRoot({ "en.mdx": "<Highlight>oops\n" })
        ),
      ],
      ["unreadable-entry", checkLessonRoot(unreadable)],
      ["invalid-arguments", runCli(["--format", "xml"])],
      [
        "unreadable-entry",
        runCli(["--root", join(tmpdir(), "missing-nakafa-lessons")]),
      ],
    ];
    for (const [reason, operation] of cases) {
      const failure = yield* operation.pipe(Effect.flip, Effect.orDie);
      assert.equal(failure.reason, reason);
    }
    assert.equal(yield* runMain(["--unknown"]), 2);
  })
);

checkTest(
  "checker exit tiers follow blocking and strict review",
  Effect.gen(function* () {
    /** Runs one fixture through the CLI with silenced logs. */
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
    const root = yield* temporaryRoot({
      "answer.en.mdx": "A vector has **magnitude and direction**.",
      "en.mdx": '**Magnitude** is the length.\n\n<BlockMath math="A=3" />',
      "question.en.mdx": "**A quoted question remains exactly as written.**",
    });
    assert.equal(yield* runCli(["--format", "text", "--root", root]), 0);
    assert.match((yield* loggedLines).at(-1) ?? "", PASSING_REPORT_PATTERN);
    assert.equal(yield* runCli(["--format", "json", "--root", root]), 0);
    const json = yield* Effect.orDie(
      Schema.decodeEffect(JSON_TEXT)((yield* loggedLines).at(-1) ?? "{}")
    );
    assert.deepEqual(json, {
      blockingIssueCount: 0,
      fileCount: 3,
      issues: [],
      reviewIssueCount: 0,
    });
    const report = yield* checkLessonRoot(root, true);
    assert.equal(report.pedagogy?.length, 2);
    assert.equal(
      report.pedagogy?.some(({ file }) => file === "question.en.mdx"),
      false
    );
    assert.equal(yield* runCli(["--root", root, "--pedagogy-review"]), 0);
    const logs = yield* loggedLines;
    assert.ok(
      logs.some((line) =>
        line.includes("answer.en.mdx:1 [manual] prose-without-representation")
      )
    );
    assert.ok(logs.at(-1)?.includes("contextual review"));
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
