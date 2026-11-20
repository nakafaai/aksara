import { assert, it } from "@effect/vitest";
import { HashSet } from "effect";
import { findSkeletonFindings } from "#nakafa-content/heading/skeleton";
import { corpusPage } from "#nakafa-content/heading/test";

it("blocks a reported lesson whose scaffold tail another lesson shares, renamed or not", () => {
  const pages = [
    corpusPage("a/id.mdx", "A", [
      "## Rotasi Memutar Titik",
      "## Kesalahan Saat Merotasi",
      "## Latihan Rotasi",
      "### Pembahasan Rotasi",
    ]),
    corpusPage("b/id.mdx", "B", [
      "## Refleksi Membalik Titik",
      "## Kesalahan yang Sering Terjadi",
      "## Latihan",
      "### Pembahasan",
    ]),
    corpusPage("c/id.mdx", "C", ["## Dilatasi", "## Latihan Dilatasi"]),
    corpusPage("d/id.mdx", "D", ["## Latihan Translasi", "## Translasi"]),
    corpusPage(
      "e/en.mdx",
      "E",
      ["## Rotation", "## Common Mistakes", "## Practice"],
      {
        locale: "en",
      }
    ),
    corpusPage("f/id.mdx", "F", ["## Kesalahan Umum", "## Latihan"], {
      kind: "article",
    }),
  ];
  const findings = findSkeletonFindings(
    pages,
    HashSet.make("a/id.mdx", "c/id.mdx", "d/id.mdx", "e/en.mdx")
  );

  assert.deepStrictEqual(
    findings.map(([file, { line, rule }]) => `${file} ${rule} ${line}`),
    ["a/id.mdx shared-skeleton 5"]
  );
  assert.include(
    findings[0]?.[1].message,
    "mistakes > practice, as 1 other page(s)"
  );
  assert.include(findings[0]?.[1].message, "(b/id.mdx)");
});

it("names the first three other pages and counts the rest", () => {
  const pages = ["a", "b", "c", "d", "e"].map((name) =>
    corpusPage(`${name}/id.mdx`, name, [
      `## Topik ${name}`,
      `## Latihan ${name}`,
    ])
  );
  const [finding] = findSkeletonFindings(pages, HashSet.make("a/id.mdx"));

  assert.include(
    finding?.[1].message,
    "(b/id.mdx, c/id.mdx, d/id.mdx, and 1 more)"
  );
});
