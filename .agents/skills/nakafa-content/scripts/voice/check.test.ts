import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { assert, it } from "@effect/vitest";

import {
  checkLessonRoot,
  collectLessonFiles,
  runCli,
} from "#nakafa-content/voice/check";

const EMPTY_ROOT_ERROR = /No lesson locale files found/;
const PASSING_REPORT_PATTERN = /passed for 1 files/u;
const LESSON_ROOT = join(
  process.cwd(),
  "packages",
  "corpus",
  "material",
  "lesson"
);

it("accepts every current lesson through the production checker", () => {
  const report = checkLessonRoot(LESSON_ROOT);
  assert.ok(report.fileCount > 1000);
  assert.deepEqual(report.issues, []);
}, 90_000);

it("scans every locale sibling below a lesson root", () => {
  const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-voice-"));
  const lesson = join(root, "mathematics", "example");
  mkdirSync(lesson, { recursive: true });

  try {
    writeFileSync(
      join(lesson, "en.mdx"),
      "The condition states when the rule applies.\n"
    );
    writeFileSync(join(lesson, "id.mdx"), "Nilai ini mempengaruhi hasil.\n");
    writeFileSync(
      join(lesson, "de.mdx"),
      "Die Bedingung legt fest, wann das Gesetz gilt.\n"
    );

    assert.deepEqual(checkLessonRoot(root), {
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
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
});

it("keeps rendered copy and destination checks consistent at the complete audit seam", () => {
  const samples = [
    [
      "de",
      "Gib `Die` `Matrizen` `stehen` ein.\n\nSie können nun beide Seiten vergleichen.",
      "german-formal-address",
    ],
    [
      "de",
      "Die `Matrizen` stehen bereit.\n\nSie können anschließend verglichen werden.",
      undefined,
    ],
    [
      "de",
      "Hinweis: [Sie können den Wert prüfen](/de/ergebnis).",
      "german-formal-address",
    ],
    [
      "de",
      "Die Matrizen: [Sie können verglichen werden](/de/matrizen).",
      undefined,
    ],
    [
      "id",
      '<input placeholder={"An" + "da dapat mencoba ini."} />',
      "indonesian-formal-learner-address",
    ],
    [
      "id",
      `<input aria-label={\`An\${"da"} dapat mencoba ini.\`} />`,
      "indonesian-formal-learner-address",
    ],
    ["id", '<input {...(0, { placeholder: "Kamu" })} />', undefined],
    [
      "id",
      '<input {...({ src: "https://example.org/image.png" }, { placeholder: "Kamu" })} />',
      undefined,
    ],
    [
      "id",
      '<input {...(0, { src: "https://example.org/image.png" })} />',
      "external-link-invalid-placement",
    ],
    ["id", "<input {...(0, properties)} />", "external-link-invalid-placement"],
    [
      "id",
      '<Panel content={<input {...(0, { placeholder: "Kamu" })} />} />',
      undefined,
    ],
  ] as const;
  const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-boundaries-"));
  try {
    for (const [index, [locale, source, rule]] of samples.entries()) {
      const lesson = join(root, String(index));
      mkdirSync(lesson);
      writeFileSync(join(lesson, `${locale}.mdx`), source);
      assert.deepEqual(
        checkLessonRoot(lesson).issues.map((issue) => issue.rule),
        rule ? [rule] : [],
        source
      );
    }
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
});

it("collects only supported locale files without following symlinks", () => {
  const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-files-"));
  const nested = join(root, "nested");
  mkdirSync(nested);
  try {
    writeFileSync(join(root, "id.mdx"), "Salin nilai.");
    writeFileSync(join(nested, "de.mdx"), "Kopiere den Wert.");
    writeFileSync(join(root, "fr.mdx"), "Copiez la valeur.");
    writeFileSync(join(root, "notes.txt"), "notes");
    symlinkSync(join(root, "id.mdx"), join(root, "linked.mdx"));

    assert.deepEqual(
      collectLessonFiles(root).map((file) => file.slice(root.length + 1)),
      ["id.mdx", "nested/de.mdx"]
    );
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
});
it("rejects an empty lesson root", () => {
  const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-voice-empty-"));
  try {
    assert.throws(() => checkLessonRoot(root), EMPTY_ROOT_ERROR);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
});
it("review signals do not block the default checker", () => {
  const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-voice-review-"));
  const originalError = console.error;
  const originalLog = console.log;
  console.error = () => undefined;
  console.log = () => undefined;

  try {
    writeFileSync(
      join(root, "id.mdx"),
      "Model ini membuat hubungan lebih nyata.\n"
    );
    assert.equal(runCli(["--root", root]), 0);
    assert.equal(runCli(["--root", root, "--strict-review"]), 1);
  } finally {
    console.error = originalError;
    console.log = originalLog;
    rmSync(root, { force: true, recursive: true });
  }
});
it("proven regressions still block the default checker", () => {
  const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-voice-blocking-"));
  const originalError = console.error;
  const originalLog = console.log;
  console.error = () => undefined;
  console.log = () => undefined;

  try {
    writeFileSync(
      join(root, "id.mdx"),
      "Periksa dulu fungsi yang tersedia sebelum menulis sendiri perhitungannya.\n"
    );
    assert.equal(runCli(["--root", root]), 1);
  } finally {
    console.error = originalError;
    console.log = originalLog;
    rmSync(root, { force: true, recursive: true });
  }
});
it("structural punctuation and contextual regressions block the CLI", () => {
  const samples = [
    ["heading", "## SDG 7 Energy Access\n"],
    ["source heading", "## Sumber\n"],
    ["semicolon", "Hitung nilai pertama; lalu hitung nilai kedua.\n"],
    [
      "context",
      "Hitung ketidakpastian hasil dengan aturan rambatan yang sesuai.\n",
    ],
  ] as const;
  const originalError = console.error;
  const originalLog = console.log;
  console.error = () => undefined;
  console.log = () => undefined;

  try {
    for (const [name, source] of samples) {
      const root = mkdtempSync(join(tmpdir(), `nakafa-lesson-voice-${name}-`));
      try {
        writeFileSync(join(root, "id.mdx"), source);
        assert.equal(runCli(["--root", root]), 1, name);
      } finally {
        rmSync(root, { force: true, recursive: true });
      }
    }
  } finally {
    console.error = originalError;
    console.log = originalLog;
  }
});

it("rejects incomplete and unsupported CLI arguments", () => {
  const originalError = console.error;
  console.error = () => undefined;
  try {
    for (const arguments_ of [
      ["--format"],
      ["--root"],
      ["--format", "xml"],
      ["--unknown"],
      ["--root", join(tmpdir(), "missing-nakafa-lessons")],
    ]) {
      assert.equal(runCli(arguments_), 2);
    }
  } finally {
    console.error = originalError;
  }
});

it("prints clean text and JSON reports", () => {
  const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-output-"));
  const output: string[] = [];
  const originalLog = console.log;
  console.log = (value?: unknown) => output.push(String(value));
  try {
    writeFileSync(
      join(root, "en.mdx"),
      "The value follows from the equation.\n"
    );
    assert.equal(runCli(["--format", "text", "--root", root]), 0);
    assert.match(output.at(-1) ?? "", PASSING_REPORT_PATTERN);
    assert.equal(runCli(["--format", "json", "--root", root]), 0);
    assert.deepEqual(JSON.parse(output.at(-1) ?? "{}"), {
      blockingIssueCount: 0,
      fileCount: 1,
      issues: [],
      reviewIssueCount: 0,
    });
  } finally {
    console.log = originalLog;
    rmSync(root, { force: true, recursive: true });
  }
});

it("runs the checker when the module is the process entrypoint", async () => {
  const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-main-"));
  const originalArgv = process.argv;
  const originalExitCode = process.exitCode;
  const originalLog = console.log;
  console.log = () => undefined;
  try {
    writeFileSync(join(root, "en.mdx"), "The equation gives the value.\n");
    process.argv = [
      process.execPath,
      fileURLToPath(new URL("./check.ts", import.meta.url)),
      "--root",
      root,
    ];
    process.exitCode = undefined;
    vi.resetModules();
    await import("#nakafa-content/voice/check");
    assert.equal(process.exitCode, 0);
  } finally {
    console.log = originalLog;
    process.argv = originalArgv;
    process.exitCode = originalExitCode;
    rmSync(root, { force: true, recursive: true });
  }
});
