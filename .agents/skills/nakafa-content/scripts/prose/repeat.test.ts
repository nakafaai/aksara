import { assert, describe, it } from "@effect/vitest";
import { HashSet } from "effect";
import type { CorpusPage } from "#nakafa-content/heading/identity";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findRepeatFindings, proseBlocks } from "#nakafa-content/prose/repeat";

/** Builds one corpus page from its source, an Indonesian lesson unless told otherwise. */
function page(
  file: string,
  source: string,
  options: {
    readonly kind?: "article" | "lesson";
    readonly locale?: "en" | "id";
  } = {}
): CorpusPage {
  return {
    file,
    page: {
      headings: [],
      kind: options.kind ?? "lesson",
      locale: options.locale ?? "id",
      title: file,
      tree: parseLessonMdx(source),
    },
    source,
  };
}

/** The file, line, and rule of every repetition finding of the reported pages. */
function repeats(
  pages: readonly CorpusPage[],
  report: readonly string[]
): string[] {
  return findRepeatFindings(pages, HashSet.fromIterable(report)).map(
    ([file, { line, rule }]) => `${file}:${line} ${rule}`
  );
}

const SHARED =
  "Kesalahan pertama paling sering muncul saat tanda dipindahkan ke ruas lain.";

/** Thirty distinct words without punctuation, one sentence and one paragraph. */
const PARAGRAPH = Array.from({ length: 30 }, (_, index) => `kata${index}`).join(
  " "
);

describe("proseBlocks", () => {
  it("reads paragraphs, list items, quotes, and layout text, never headings, code, tables, or props", () => {
    const source = [
      "## Judul Bagian",
      'Nilai <InlineMath math="x" /> dan `kode` **tebal**.\\\nBaris kedua.',
      "```py\nprint(1)\n```",
      "- Butir daftar.",
      "> Kutipan.",
      "| a |\n| - |\n| sel |",
      "<ContentStack>\n\nTeks dalam tata letak.\n\n</ContentStack>",
      '<MathVisual title="Judul visual" />',
    ].join("\n\n");

    assert.deepStrictEqual(
      proseBlocks(parseLessonMdx(source)).map(({ line, text }) => [
        line,
        text.replace(/ +/gu, " ").trim(),
      ]),
      [
        [3, "Nilai ⁣ dan kode tebal.Baris kedua."],
        [10, "Butir daftar."],
        [12, "Kutipan."],
        [20, "Teks dalam tata letak."],
      ]
    );
  });

  it("reads the line of a paragraph without a position as the first", () => {
    assert.deepStrictEqual(
      proseBlocks({
        children: [{ type: "text", value: "Teks." }],
        type: "paragraph",
      }),
      [{ line: 1, text: "Teks." }]
    );
  });
});

describe("findRepeatFindings", () => {
  it("blocks a reported lesson that repeats a long sentence from another lesson of its locale", () => {
    const pages = [
      page("a/id.mdx", `Pembuka singkat.\n\n${SHARED} Lalu kita cek.`),
      page("b/id.mdx", `Awal.\n\n${SHARED}`),
      page("c/en.mdx", SHARED, { locale: "en" }),
      page("d/id.mdx", SHARED, { kind: "article" }),
      page("e/id.mdx", "Jadi, x sama dengan empat."),
      page("f/id.mdx", "Jadi, x sama dengan empat."),
    ];

    assert.deepStrictEqual(
      repeats(pages, ["a/id.mdx", "c/en.mdx", "e/id.mdx"]),
      ["a/id.mdx:3 repeated-sentence"]
    );
    assert.include(
      findRepeatFindings(pages, HashSet.make("b/id.mdx"))[0]?.[1].message,
      "also stands in a/id.mdx."
    );
  });

  it("blocks a paragraph that shares half its five-word runs with another lesson's", () => {
    const reworded = PARAGRAPH.replace("kata29", "lain").replace(
      "kata0",
      "awal"
    );
    const looser = PARAGRAPH.replace("kata29", "lain")
      .replace("kata10", "lain")
      .replace("kata0", "awal");
    const pages = [
      page("a/id.mdx", PARAGRAPH),
      page("e/id.mdx", looser),
      page("b/id.mdx", reworded),
      page(
        "c/id.mdx",
        `kata0 kata1 kata2 kata3 kata4 kata5 lain ${"kata ".repeat(13)}`
      ),
    ];

    assert.deepStrictEqual(repeats(pages, ["a/id.mdx", "c/id.mdx"]), [
      "a/id.mdx:1 repeated-paragraph",
    ]);
    assert.include(
      findRepeatFindings(pages, HashSet.make("a/id.mdx"))[0]?.[1].message,
      "86% of its wording with b/id.mdx:1."
    );
  });

  it("never compares a page with itself", () => {
    const pages = [page("a/id.mdx", `${PARAGRAPH}\n\n${PARAGRAPH}`)];

    assert.deepStrictEqual(repeats(pages, ["a/id.mdx"]), []);
  });

  it("ignores a five-word run that more than fifty paragraphs share", () => {
    const common = "satu dua tiga empat lima";
    const pages = Array.from({ length: 52 }, (_, index) =>
      page(
        `p${index}/id.mdx`,
        `${common} ${Array.from({ length: 20 }, (__, word) => `w${index}x${word}`).join(" ")}`
      )
    );

    assert.deepStrictEqual(repeats(pages, ["p0/id.mdx"]), []);
  });

  it("names the first three other files and counts the rest", () => {
    const pages = ["a", "b", "c", "d", "e"].map((name) =>
      page(`${name}/id.mdx`, SHARED)
    );
    const [first] = findRepeatFindings(pages, HashSet.make("a/id.mdx"));

    assert.include(
      first?.[1].message,
      "b/id.mdx, c/id.mdx, d/id.mdx, and 1 more"
    );
  });
});
