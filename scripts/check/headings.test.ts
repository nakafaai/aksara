import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, HashSet, Path } from "effect";
import { corpusPage } from "#nakafa-content/heading/test";
import { lineFigure } from "#nakafa-content/points/test/lesson";
import { inDirectory, makeRepository } from "#scripts/check/fixture";
import {
  checkHeadings,
  headingOptions,
  OutlinePolicyError,
  outlineFindings,
  outlineReport,
  relabelFindings,
} from "#scripts/check/headings";
import { runGit } from "#scripts/git";

const ROOT = "packages/corpus/material/lesson/math/geometry";

/** A lesson page with a title and headings, each with one paragraph and a core blockquote. */
function page(title: string, headings: readonly string[]): string {
  return Arr.join(
    [
      `export const metadata = { title: "${title}" };`,
      ...Arr.map(
        headings,
        (heading) => `${heading}\n\nSatu paragraf mengajar bagian ini.`
      ),
      `> Aturan ${title} selalu berlaku.`,
    ],
    "\n\n"
  );
}

/** Runs Git in a test repository as a test author. */
const gitIn = (root: string, args: readonly string[]) =>
  runGit(
    ["-c", "user.name=Test", "-c", "user.email=test@example.com", ...args],
    {
      cwd: root,
    }
  );

describe("headingOptions", () => {
  it("reads the base, the whole-corpus flag, and strict review", () => {
    expect(headingOptions([])).toEqual({
      all: false,
      base: "origin/main",
      strictReview: false,
    });
    expect(
      headingOptions(["--all", "--strict-review", "--base", "main"])
    ).toEqual({
      all: true,
      base: "main",
      strictReview: true,
    });
    expect(headingOptions(["--base"]).base).toBe("origin/main");
  });
});

describe("outlineFindings", () => {
  it("reports the page, identity, and skeleton findings of reported pages only", () => {
    const pages = [
      corpusPage("a/id.mdx", "Rotasi", [
        "## Rotasi Titik",
        "## Kesalahan Umum",
        "## Latihan Rotasi",
      ]),
      corpusPage("b/id.mdx", "Refleksi", [
        "## Refleksi Titik",
        "## Kesalahan Membalik",
        "## Latihan Refleksi",
      ]),
    ];
    const findings = outlineFindings(pages, HashSet.make("a/id.mdx"));

    expect(
      Arr.map(findings, ({ file, line, rule }) => `${file}:${line} ${rule}`)
    ).toEqual([
      "a/id.mdx:1 section-count",
      "a/id.mdx:1 heading-density",
      "a/id.mdx:5 generic-heading",
      "a/id.mdx:5 shared-skeleton",
    ]);
  });
});

describe("outlineReport", () => {
  it.effect(
    "fails on blocking findings, and on review findings under strict review",
    () =>
      Effect.gen(function* () {
        const review = [
          { blocking: false, file: "a", line: 1, message: "m", rule: "r" },
        ];
        const blocking = [
          { blocking: true, file: "a", line: 1, message: "m", rule: "b" },
        ];
        const counts = { checked: 1, pages: 2 };
        const loose = headingOptions([]);
        const strict = headingOptions(["--strict-review"]);

        yield* outlineReport(review, loose, counts);
        const failed = yield* Effect.flip(
          outlineReport(blocking, loose, counts)
        );
        const strictFailed = yield* Effect.flip(
          outlineReport(review, strict, counts)
        );

        expect(failed).toBeInstanceOf(OutlinePolicyError);
        expect([failed.blocking, failed.review]).toEqual([1, 0]);
        expect([strictFailed.blocking, strictFailed.review]).toEqual([0, 1]);
      })
  );
});

describe("checkHeadings and relabelFindings", () => {
  it.effect(
    "holds the pages a change touched to the rules and flags a heading-only rename",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* makeRepository();
        /** Writes one file of the test repository. */
        const write = (file: string, text: string) =>
          fileSystem.writeFileString(path.join(root, file), text);
        for (const folder of ["rotation", "reflection", "dilation"]) {
          yield* fileSystem.makeDirectory(path.join(root, ROOT, folder), {
            recursive: true,
          });
        }
        const sections = [
          "## Busur Satu",
          "### Arah Putar",
          "### Besar Sudut",
          "## Busur Dua",
          "## Busur Tiga",
          "## Busur Empat",
        ];
        yield* write(
          `${ROOT}/rotation/id.mdx`,
          page("Rotasi", [...sections, "## Latihan"])
        );
        yield* write(
          `${ROOT}/reflection/id.mdx`,
          page("Refleksi", [
            "## Cermin Satu",
            "### Sumbu Datar",
            "### Sumbu Tegak",
            "## Cermin Dua",
            "## Cermin Tiga",
            "## Cermin Empat",
          ])
        );
        yield* gitIn(root, ["add", "--", "."]);
        yield* gitIn(root, ["commit", "--quiet", "-m", "base"]);
        yield* gitIn(root, ["branch", "base"]);

        const options = headingOptions(["--base", "base"]);
        yield* inDirectory(root, checkHeadings(options));

        yield* write(
          `${ROOT}/rotation/id.mdx`,
          page("Rotasi", [...sections, "## Latihan Rotasi"])
        );
        yield* write(
          `${ROOT}/dilation/id.mdx`,
          page("Dilatasi", [
            "## Busur Satu",
            "### Faktor Besar",
            "### Faktor Kecil",
            "## Skala Dua",
            "## Skala Tiga",
            "## Skala Empat",
          ])
        );
        const failed = yield* Effect.flip(
          inDirectory(root, checkHeadings(options))
        );
        expect(failed).toBeInstanceOf(OutlinePolicyError);
        expect(failed).toMatchObject({ blocking: 2, review: 0 });

        const strict = yield* Effect.flip(
          inDirectory(
            root,
            checkHeadings(
              headingOptions(["--base", "base", "--all", "--strict-review"])
            )
          )
        );
        expect(strict).toBeInstanceOf(OutlinePolicyError);
        expect(strict).not.toMatchObject({ review: 0 });

        const renamed = page("Rotasi", [...sections, "## Latihan Rotasi"]);
        const mirrored = page("Refleksi", [
          "## Cermin Pertama",
          "### Sumbu Datar",
          "### Sumbu Tegak",
          "## Cermin Dua",
          "## Cermin Tiga",
          "## Cermin Empat",
        ]);
        const pages = [
          {
            ...corpusPage(`${ROOT}/rotation/id.mdx`, "Rotasi", []),
            source: renamed,
          },
          {
            ...corpusPage(`${ROOT}/reflection/id.mdx`, "Refleksi", []),
            source: mirrored,
          },
          corpusPage(`${ROOT}/missing/id.mdx`, "Baru", ["## Baru"]),
        ];
        const relabel = yield* inDirectory(
          root,
          relabelFindings(
            pages,
            HashSet.fromIterable(Arr.map(pages, ({ file }) => file)),
            "base"
          )
        );
        expect(Arr.map(relabel, ({ rule }) => rule)).toEqual([
          "heading-only-change",
        ]);
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});

describe("revisedPages", () => {
  it.effect(
    "leaves out a page whose change only corrects its figures and holds it once its text changes",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* makeRepository();
        /** Writes one page of the test repository. */
        const write = (folder: string, text: string) =>
          fileSystem.writeFileString(
            path.join(root, ROOT, folder, "id.mdx"),
            text
          );
        const sections = ["## Busur Satu", "## Busur Dua", "## Busur Tiga"];
        /** The rotation page, its figure's line through (x, 1). */
        const rotation = (x: number, ...more: readonly string[]) =>
          `${page("Rotasi", [...sections, ...more])}\n\n${lineFigure(x)}\n`;
        for (const folder of ["rotation", "dilation"]) {
          yield* fileSystem.makeDirectory(path.join(root, ROOT, folder), {
            recursive: true,
          });
        }
        // Both pages head a section "Busur Satu": a finding the base keeps until a revision.
        yield* write("rotation", rotation(1));
        yield* write("dilation", page("Dilatasi", ["## Busur Satu"]));
        yield* gitIn(root, ["add", "--", "."]);
        yield* gitIn(root, ["commit", "--quiet", "-m", "base"]);
        yield* gitIn(root, ["branch", "base"]);
        const options = headingOptions(["--base", "base"]);

        yield* write("rotation", rotation(2));
        yield* inDirectory(root, checkHeadings(options));

        yield* write("rotation", rotation(2, "## Busur Empat"));
        const revised = yield* Effect.flip(
          inDirectory(root, checkHeadings(options))
        );
        expect(revised).toBeInstanceOf(OutlinePolicyError);
        expect(revised).not.toMatchObject({ blocking: 0 });
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});
