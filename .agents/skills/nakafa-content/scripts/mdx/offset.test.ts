import { assert, it } from "@effect/vitest";

import { renderedStaticStringRange } from "#nakafa-content/mdx/offset";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { staticStringCandidates } from "#nakafa-content/mdx/static";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

/** Reads the exact rendered range produced by a real parsed MDX expression. */
function expressionRange(source: string) {
  const expression = parseLessonMdx(source).children?.[0]?.data?.estree;
  assert.ok(expression);
  const [candidate] = staticStringCandidates(expression);
  assert.ok(candidate);
  return renderedStaticStringRange(candidate, source).rendered;
}

it("combines static string parts without counting their source syntax", () => {
  for (const source of ['{"An" + "da"}', `{\`An\${"da"}\`}`]) {
    assert.deepEqual(expressionRange(source), {
      offsets: [0, 1]
        .map((index) => source.indexOf("An") + index)
        .concat([0, 1].map((index) => source.indexOf("da") + index)),
      text: "Anda",
    });
  }
  assert.deepEqual(expressionRange('{""}'), { offsets: [], text: "" });
});

it("maps escaped code points to the start of their authored escape", () => {
  const source = String.raw`{"\x41\u006E\u{64}a"}`;
  assert.deepEqual(expressionRange(source), {
    offsets: [
      source.indexOf("\\x"),
      source.indexOf("\\u006E"),
      source.indexOf("\\u{"),
      source.indexOf("a"),
    ],
    text: "Anda",
  });
  const astral = String.raw`{"\u{1F600}\tAnda"}`;
  assert.deepEqual(expressionRange(astral), {
    offsets: [
      astral.indexOf("\\u"),
      astral.indexOf("\\u"),
      astral.indexOf("\\t"),
      ...[0, 1, 2, 3].map((index) => astral.indexOf("Anda") + index),
    ],
    text: "😀\tAnda",
  });
});

it("maps continuation and template newlines through the installed JavaScript parser", () => {
  for (const newline of ["\n", "\r", "\r\n", "\u2028", "\u2029"]) {
    const source = `{"An\\${newline}da"}`;
    assert.deepEqual(expressionRange(source), {
      offsets: [
        source.indexOf("An"),
        source.indexOf("An") + 1,
        source.indexOf("da"),
        source.indexOf("da") + 1,
      ],
      text: "Anda",
    });
  }
  for (const newline of ["\r", "\r\n"]) {
    const source = `{\`An${newline}da\`}`;
    assert.deepEqual(expressionRange(source), {
      offsets: [
        source.indexOf("An"),
        source.indexOf("An") + 1,
        source.indexOf("\r"),
        source.indexOf("da"),
        source.indexOf("da") + 1,
      ],
      text: "An\nda",
    });
  }
});

it("restores authored positions after MDX removes continuation indentation", () => {
  const sources = [
    "<Callout\n  description={`Panduan\n    Anda dapat mencoba ini.`}\n/>",
    '<Callout\n  description={"Panduan \\\n    Anda dapat mencoba ini."}\n/>',
    "> <Callout title={`Panduan\n> Anda dapat mencoba ini.`} />",
    "> <Callout title={`Panduan\r\n> Anda dapat mencoba ini.`} />",
  ];
  for (const source of sources) {
    const offset = source.indexOf("Anda");
    const lineStart = source.lastIndexOf("\n", offset) + 1;
    assert.deepEqual(findLessonVoiceIssues("id", source), [
      {
        column: offset - lineStart + 1,
        excerpt: source.slice(lineStart).split("\n")[0]?.trim(),
        line: source.slice(0, lineStart).split("\n").length,
        rule: "indonesian-formal-learner-address",
      },
    ]);
  }
});
