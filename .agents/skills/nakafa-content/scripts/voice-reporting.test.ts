import assert from "node:assert/strict";
import test from "node:test";

import { findLessonVoiceIssues } from "#nakafa-content/voice-scan";

test("reviews a measurement reporting command without a real task", () => {
  const samples = {
    de: "Gib die Fläche des Flaschendeckels mit ihrer Unsicherheit so an.",
    en: "Report the bottle-cap area with its uncertainty as follows.",
    id: "Laporkan luas tutup botol beserta ketidakpastiannya sebagai berikut.",
  };

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["contextless-measurement-reporting-imperative"]
    );
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "NOAA melaporkan bahwa suhu rata-rata permukaan laut meningkat."
    ),
    []
  );

  const realTasks = {
    de: "Gib die gemessene Fläche mit ihrer Unsicherheit im Antwortfeld an.",
    en: "Report the measured area with its uncertainty in the answer box.",
    id: "Laporkan luas hasil pengukuran beserta ketidakpastiannya pada kolom jawaban.",
  };
  for (const [locale, source] of Object.entries(realTasks)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }

  assert.deepEqual(
    findLessonVoiceIssues(
      "id",
      "Dengan memakai sebaran sampel sebagai konvensi ketidakpastian dalam soal ini, luas tutup botol dapat ditulis dalam bentuk berikut."
    ),
    []
  );
});

test("reviews a reporting transition split across a paragraph line", () => {
  const source = [
    "Laporkan luas tutup botol beserta",
    "ketidakpastiannya sebagai berikut.",
  ].join("\n");

  assert.deepEqual(
    findLessonVoiceIssues("id", source).map(({ rule }) => rule),
    ["contextless-measurement-reporting-imperative"]
  );
});
