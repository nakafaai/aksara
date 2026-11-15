import { assert, it } from "@effect/vitest";
import { findClockMathIssues } from "#nakafa-content/math/clock";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** The line and column of every clock-in-math finding in one MDX source. */
function findings(locale: LessonVoiceLocale, source: string): string[] {
  return findClockMathIssues(locale, source, parseLessonMdx(source)).map(
    ({ column, line, rule }) => `${rule} ${line}:${column}`
  );
}

it("finds a braced clock time in every locale", () => {
  assert.deepEqual(
    findings(
      "en",
      'From <InlineMath math="19{:}00" /> to <InlineMath math="20{:}24" />.'
    ),
    ["clock-time-math 1:24", "clock-time-math 1:57"]
  );
  assert.deepEqual(
    findings("id", 'Pukul <InlineMath math="16{.}00" /> tepat.'),
    ["clock-time-math 1:25"]
  );
  assert.deepEqual(findings("de", '<InlineMath math={"7{:}15"} /> Uhr'), [
    "clock-time-math 1:20",
  ]);
});

it("finds a clock time inside a longer formula", () => {
  assert.deepEqual(
    findings("en", '<BlockMath math="\\text{time}&=08{:}00+10\\text{ min}" />'),
    ["clock-time-math 1:31"]
  );
});

it("finds a dotted time only where a point is no decimal mark", () => {
  const source = 'Pukul <InlineMath math="07.00" />.';
  assert.deepEqual(findings("id", source), ["clock-time-math 1:25"]);
  assert.deepEqual(findings("de", source), ["clock-time-math 1:25"]);
  assert.deepEqual(
    findings("en", 'It took <InlineMath math="19.25" /> hours.'),
    []
  );
  assert.deepEqual(
    findings("ms", 'Jumlah <InlineMath math="10.30" /> kg.'),
    []
  );
});

it("keeps durations, ratios, decimals, and thousands as quantities", () => {
  const source = [
    'Perbandingan <InlineMath math="9:25" /> dan <InlineMath math="3 : 5" />.',
    'Harga <InlineMath math="\\text{Rp}1{.}250" />, luas <InlineMath math="2{,}45" />, nilai <InlineMath math="3.14" />.',
    'Selama <InlineMath math="84" /> menit, sejak pukul 16.00.',
  ].join("\n");
  assert.deepEqual(findings("id", source), []);
});

it("reads only math props that hold a value", () => {
  const source = [
    '<MathVisual title="Pukul 07.00" />',
    "<InlineMath math />",
    '<InlineMath math={"08{:}00"} />',
  ].join("\n");
  assert.deepEqual(findings("id", source), ["clock-time-math 3:20"]);
});
