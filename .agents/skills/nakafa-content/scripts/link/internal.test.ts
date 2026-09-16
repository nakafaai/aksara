import { assert, it } from "@effect/vitest";

import {
  findInternalLinkIssues,
  isInternalDestination,
} from "#nakafa-content/link/internal";
import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";

/** Names every issue a lesson source produces, in source order. */
const rules = (source: string): string[] =>
  findInternalLinkIssues(source).map(({ rule }) => rule);

it("rejects a link label that names no destination concept", () => {
  assert.deepEqual(
    findInternalLinkIssues(
      "Selesaikan latihan pada [tautan ini](/id/materi/matematika/kuartil-data-kelompok) sebelum melanjutkan."
    ),
    [
      {
        column: 25,
        excerpt:
          "Selesaikan latihan pada [tautan ini](/id/materi/matematika/kuartil-data-kelompok) sebelum melanjutkan.",
        line: 1,
        rule: "internal-link-generic-label",
      },
    ]
  );

  assert.deepEqual(
    rules(
      "Mainkan [Hier klicken:](/de/faecher/mathematik/quadratische-funktion)."
    ),
    ["internal-link-generic-label"]
  );
});

it("rejects a block whose visible content is only internal links", () => {
  assert.deepEqual(
    rules(
      [
        "[Mean](/id/materi/matematika/statistika-dasar/mean-rata-rata-atau-rata-rata)",
        "",
        "- [Kuartil](/id/materi/matematika/statistika-dasar/kuartil-data-kelompok), [Median](/id/materi/matematika/statistika-dasar/median-data-kelompok)",
        "",
        "**[Persentil](/id/materi/matematika/statistika-dasar/persentil-data-kelompok)**",
      ].join("\n")
    ),
    [
      "internal-link-only-block",
      "internal-link-only-block",
      "internal-link-only-block",
    ]
  );
});

it("rejects a heading that only announces navigation", () => {
  assert.deepEqual(
    findInternalLinkIssues(
      [
        "## Lihat juga",
        "",
        "Teks pengantar.",
        "",
        "## Aturan Turunan",
        "",
      ].join("\n")
    ),
    [
      {
        column: 1,
        excerpt: "## Lihat juga",
        line: 1,
        rule: "internal-link-navigation-heading",
      },
    ]
  );

  assert.deepEqual(rules("## Siehe auch\n\nText."), [
    "internal-link-navigation-heading",
  ]);
});

it("keeps woven internal links, external links, and named labels valid", () => {
  assert.deepEqual(
    findInternalLinkIssues(
      "Perubahan yang melebarkan atau menyempitkan grafik dibahas terpisah pada [dilatasi horizontal](/id/materi/matematika/transformasi-fungsi/dilatasi-horizontal) dan [dilatasi vertikal](/id/materi/matematika/transformasi-fungsi/dilatasi-vertikal), sedangkan urutan pengerjaan saat beberapa transformasi dipakai bersamaan dibahas pada [kombinasi transformasi fungsi](/id/materi/matematika/transformasi-fungsi/kombinasi-transformasi-fungsi)."
    ),
    []
  );

  assert.deepEqual(
    findInternalLinkIssues(
      "Kamu sudah mengenal [kuartil](/id/materi/matematika/statistika-dasar/kuartil-data-kelompok) yang membagi data terurut menjadi empat bagian."
    ),
    []
  );

  assert.deepEqual(
    findInternalLinkIssues(
      "Baca [tautan ini](https://numpy.org/doc/stable/) sebelum mulai."
    ),
    []
  );

  assert.deepEqual(
    findInternalLinkIssues(
      "Baca [tautan ini](//www.rechtschreibrat.com/regeln/) sebelum mulai."
    ),
    []
  );

  assert.deepEqual(
    findInternalLinkIssues(
      "## Operasi Matriks terkait Dilatasi terhadap Sebarang Titik\n\nTitik bergerak."
    ),
    []
  );
});

it("treats code, math, images, and unresolved references as real content", () => {
  assert.deepEqual(
    rules(
      "Gunakan [aturan turunan](/id/materi/matematika/turunan/aturan-turunan) untuk `np.gradient`."
    ),
    []
  );

  assert.deepEqual(
    rules(
      'Lihat [dilatasi horizontal](/id/materi/matematika/transformasi-fungsi/dilatasi-horizontal) pada <InlineMath math="f(x)" />.'
    ),
    []
  );

  assert.deepEqual(
    rules(
      "Bandingkan [elips](/id/materi/matematika/irisan-kerucut/elips) dengan ![pola](/id/materi/matematika/irisan-kerucut/elips.png)."
    ),
    []
  );

  assert.deepEqual(rules("[kuartil][hilang] tanpa definisi."), []);
});

it("scans a block across a hard line break", () => {
  assert.deepEqual(
    findInternalLinkIssues(
      "[Mean](/id/materi/matematika/statistika-dasar/mean-rata-rata-atau-rata-rata)  \n[Kuartil](/id/materi/matematika/statistika-dasar/kuartil-data-kelompok)"
    ),
    [
      {
        column: 1,
        excerpt:
          "[Mean](/id/materi/matematika/statistika-dasar/mean-rata-rata-atau-rata-rata)",
        line: 1,
        rule: "internal-link-only-block",
      },
    ]
  );
});

it("resolves reference-style destinations and empty labels", () => {
  assert.deepEqual(
    rules(
      [
        "Bagian ini merangkum [kuartil][q] beserta perhitungannya.",
        "",
        "[q]: /id/materi/matematika/statistika-dasar/kuartil-data-kelompok",
      ].join("\n")
    ),
    []
  );

  assert.deepEqual(
    rules(["[kuartil][q]", "", "[q]: /id/materi/x"].join("\n")),
    ["internal-link-only-block"]
  );

  assert.deepEqual(rules("[](/id/materi/matematika/statistika-dasar/mean)"), [
    "internal-link-generic-label",
  ]);
});

it("recognizes only authored same-site destinations", () => {
  assert.equal(isInternalDestination("/id/materi/matematika"), true);
  assert.equal(isInternalDestination("/en/subjects/mathematics"), true);
  assert.equal(isInternalDestination("//example.org/page"), false);
  assert.equal(isInternalDestination("https://example.org/page"), false);
  assert.equal(isInternalDestination("en/subjects/mathematics"), false);
});

it("tolerates nodes without a resolved position or string value", () => {
  const tree: MdxNode = {
    children: [
      { depth: 2, type: "heading" },
      { depth: 2, position: { start: { line: 1 } }, type: "heading" },
      { type: "link", url: "/id/materi/x" },
      {
        children: [
          {
            position: { end: { offset: 1 }, start: { offset: 0 } },
            type: "text",
            value: 5,
          },
          { position: { start: { column: 1, line: 1 } }, type: "text" },
        ],
        position: { start: { column: 1, line: 1 } },
        type: "paragraph",
      },
    ],
    type: "root",
  };

  assert.deepEqual(
    findInternalLinkIssues("teks", tree).map(({ rule }) => rule),
    []
  );
  assert.deepEqual(findInternalLinkIssues("teks", parseLessonMdx("teks")), []);
});

it("tolerates a root without children and a block beyond the source", () => {
  assert.deepEqual(findInternalLinkIssues("", { type: "root" }), []);

  const beyondSource: MdxNode = {
    children: [
      {
        children: [
          {
            children: [
              {
                position: { end: { offset: 4 }, start: { offset: 0 } },
                type: "text",
                value: "Mean",
              },
            ],
            position: { end: { offset: 12 }, start: { offset: 0 } },
            type: "link",
            url: "/id/materi/x",
          },
        ],
        position: { start: { column: 1, line: 9 } },
        type: "paragraph",
      },
      { position: { start: { column: 1, line: 12 } }, type: "paragraph" },
    ],
    type: "root",
  };

  assert.deepEqual(findInternalLinkIssues("Mean", beyondSource), [
    {
      column: 1,
      excerpt: "",
      line: 9,
      rule: "internal-link-only-block",
    },
  ]);
});
