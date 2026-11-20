import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Option, Path } from "effect";
import { inDirectory, makeRepository } from "#scripts/check/fixture";
import {
  corpusPages,
  PageParseError,
  pageKind,
  pageOf,
  sourceAt,
} from "#scripts/check/pages";
import { runGit } from "#scripts/git";

const LESSON = "packages/corpus/material/lesson/math/circle/angle/id.mdx";
const ARTICLE = "packages/corpus/articles/politics/dynasty/asia/en.mdx";

describe("pageKind", () => {
  it("names lesson and article pages with their locale, and nothing else", () => {
    expect(pageKind(LESSON)).toEqual(
      Option.some({ kind: "lesson", locale: "id" })
    );
    expect(pageKind(ARTICLE)).toEqual(
      Option.some({ kind: "article", locale: "en" })
    );
    for (const file of [
      "packages/corpus/material/lesson/math/circle/id.mdx",
      "packages/corpus/material/lesson/math/circle/angle/xx.mdx",
      "packages/corpus/articles/politics/xx.mdx",
      "packages/corpus/pages/privacy-policy/en.mdx",
    ]) {
      expect(Option.isNone(pageKind(file)), file).toBe(true);
    }
  });
});

describe("pageOf", () => {
  it.effect("reads the title and the outline of a page", () =>
    Effect.gen(function* () {
      const page = yield* pageOf(
        LESSON,
        'export const metadata = { title: "Sudut" };\n\n## Busur\n\nTeks.'
      );
      const value = Option.getOrThrow(page);

      expect(value.page.title).toBe("Sudut");
      expect(Arr.map(value.page.headings, ({ words }) => words)).toEqual([
        "Busur",
      ]);
      expect(yield* pageOf("README.md", "# Readme")).toEqual(Option.none());
      expect(
        (yield* pageOf(ARTICLE, "## Untitled")).pipe(Option.getOrThrow).page
          .title
      ).toBe("");
    })
  );

  it.effect("fails with a typed error for a page it cannot parse", () =>
    Effect.gen(function* () {
      const error = yield* Effect.flip(pageOf(LESSON, "<Broken title="));

      expect(error).toBeInstanceOf(PageParseError);
      expect(error.file).toBe(LESSON);
    })
  );
});

describe("corpusPages and sourceAt", () => {
  it.effect(
    "reads every page among the files, and a file as a revision held it",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* makeRepository();
        yield* fileSystem.makeDirectory(path.join(root, path.dirname(LESSON)), {
          recursive: true,
        });
        yield* fileSystem.writeFileString(
          path.join(root, LESSON),
          "## Busur\n"
        );
        yield* fileSystem.writeFileString(path.join(root, "note.md"), "Note\n");
        yield* runGit(["add", "--", "."], { cwd: root });
        yield* runGit(
          [
            "-c",
            "user.name=Test",
            "-c",
            "user.email=test@example.com",
            "commit",
            "--quiet",
            "-m",
            "base",
          ],
          { cwd: root }
        );

        const pages = yield* inDirectory(
          root,
          corpusPages([LESSON, "note.md"])
        );
        expect(Arr.map(pages, ({ file }) => file)).toEqual([LESSON]);
        expect(yield* inDirectory(root, sourceAt("HEAD", LESSON))).toEqual(
          Option.some("## Busur\n")
        );
        expect(
          yield* inDirectory(root, sourceAt("HEAD", "missing.mdx"))
        ).toEqual(Option.none());
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});
