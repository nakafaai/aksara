import { assert, it } from "@effect/vitest";
import { HashSet } from "effect";
import { findIdentityFindings } from "#nakafa-content/heading/identity";
import { corpusPage } from "#nakafa-content/heading/test";

/** The file, rule, and line of every identity finding of the reported pages. */
function identity(
  pages: readonly ReturnType<typeof corpusPage>[],
  report: readonly string[]
): string[] {
  return findIdentityFindings(pages, HashSet.fromIterable(report)).map(
    ([file, { line, rule }]) => `${file} ${rule} ${line}`
  );
}

it("compares a reported page with every page of its locale", () => {
  const pages = [
    corpusPage("a/id.mdx", "Sudut Pusat", [
      "## Busur dan Sudut",
      "## Sudut Keliling",
    ]),
    corpusPage("b/id.mdx", "Sudut Keliling", [
      "## Busur  dan sudut",
      "## Tali Busur",
    ]),
    corpusPage("c/id.mdx", "sudut pusat", ["## Garis Singgung"]),
    corpusPage("d/en.mdx", "Sudut Pusat", ["## Busur dan Sudut"], {
      locale: "en",
    }),
  ];

  assert.deepStrictEqual(identity(pages, ["a/id.mdx"]), [
    "a/id.mdx title-unique 1",
    "a/id.mdx heading-unique 1",
    "a/id.mdx heading-names-lesson 5",
  ]);
  assert.deepStrictEqual(identity(pages, ["d/en.mdx"]), []);
});

it("names the first three other places and counts the rest", () => {
  const pages = ["a", "b", "c", "d", "e"].map((name) =>
    corpusPage(`${name}/id.mdx`, `Judul ${name}`, ["## Latihan Bersama"])
  );
  const [first] = findIdentityFindings(pages, HashSet.make("a/id.mdx"));

  assert.include(
    first?.[1].message,
    "b/id.mdx:1, c/id.mdx:1, d/id.mdx:1, and 1 more"
  );
});

it("skips a heading or title that folds to nothing", () => {
  const pages = [
    corpusPage("a/id.mdx", "", ["## ?"]),
    corpusPage("b/id.mdx", "", ["## !"]),
  ];

  assert.deepStrictEqual(identity(pages, ["a/id.mdx"]), []);
});

it("exempts an article's standard scientific section names, and nothing else", () => {
  /** Builds one English article page titled by its own path. */
  const article = (file: string, headings: readonly string[]) =>
    corpusPage(file, file, headings, { kind: "article", locale: "en" });
  const pages = [
    article("a/en.mdx", [
      "## Abstract",
      "## Problem Statement",
      "## Dynasties",
    ]),
    article("b/en.mdx", [
      "## Abstract",
      "## Problem Statement",
      "## Dynasties",
    ]),
    corpusPage("c/en.mdx", "C", ["## Introduction", "## Abstract"], {
      locale: "en",
    }),
    corpusPage("d/en.mdx", "D", ["## Introduction"], { locale: "en" }),
  ];

  assert.deepStrictEqual(identity(pages, ["a/en.mdx", "c/en.mdx"]), [
    "a/en.mdx heading-unique 9",
    "c/en.mdx heading-unique 1",
  ]);
});
