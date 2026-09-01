import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { checkLessonRoot, runCli } from "#nakafa-content/lesson-voice";

const EMPTY_ROOT_ERROR = /No lesson locale files found/;

test("scans every locale sibling below a lesson root", () => {
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
test("rejects an empty lesson root", () => {
  const root = mkdtempSync(join(tmpdir(), "nakafa-lesson-voice-empty-"));
  try {
    assert.throws(() => checkLessonRoot(root), EMPTY_ROOT_ERROR);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
});
test("review signals do not block the default checker", () => {
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
test("proven regressions still block the default checker", () => {
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
