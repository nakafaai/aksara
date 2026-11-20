import { AppLocaleCodeSchema } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, FileSystem, Option, Schema } from "effect";
import type { CorpusPage } from "#nakafa-content/heading/identity";
import { outlineHeadings } from "#nakafa-content/heading/outline";
import { metadataString } from "#nakafa-content/mdx/metadata";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { runGit } from "#scripts/git";

/** One lesson section page: `material/lesson/<domain>/<lesson>/<section>/<locale>.mdx`. */
const LESSON_PAGE =
  /^packages\/corpus\/material\/lesson\/[^/]+\/[^/]+\/[^/]+\/(?<locale>[a-z]{2})\.mdx$/u;

/** One article page: `articles/<category>/.../<locale>.mdx`. */
const ARTICLE_PAGE =
  /^packages\/corpus\/articles\/.+\/(?<locale>[a-z]{2})\.mdx$/u;

const isLocale = Schema.is(AppLocaleCodeSchema);

/** A corpus page the outline rules could not parse. */
export class PageParseError extends Schema.TaggedError<
  PageParseError,
  { readonly brand: unique symbol }
>()("PageParseError", { file: Schema.String, message: Schema.String }) {}

/** The kind and the locale of one corpus page. */
const PagePlaceSchema = Schema.Struct({
  kind: Schema.Literals(["article", "lesson"]),
  locale: AppLocaleCodeSchema,
});
export type PagePlace = typeof PagePlaceSchema.Type;

/** Names the kind and the locale of a lesson or article page path. */
export function pageKind(file: string): Option.Option<PagePlace> {
  const lesson = LESSON_PAGE.exec(file)?.groups?.locale;
  const article = ARTICLE_PAGE.exec(file)?.groups?.locale;
  if (lesson !== undefined && isLocale(lesson)) {
    return Option.some({ kind: "lesson", locale: lesson });
  }
  return article !== undefined && isLocale(article)
    ? Option.some({ kind: "article", locale: article })
    : Option.none();
}

/** Parses one source of a known page into what the outline rules read. */
export const parsePage = Effect.fn("AksaraOutline.parsePage")(function* (
  file: string,
  place: PagePlace,
  source: string
) {
  const tree = yield* Effect.try({
    catch: (cause) => new PageParseError({ file, message: String(cause) }),
    try: () => parseLessonMdx(source, file),
  });
  const page: CorpusPage = {
    file,
    page: {
      ...place,
      headings: outlineHeadings(source, tree),
      title: metadataString(tree, "title") ?? "",
      tree,
    },
    source,
  };
  return page;
});

/** Parses one source into a page, or nothing when the path is not a page. */
export const pageOf = Effect.fn("AksaraOutline.pageOf")(function* (
  file: string,
  source: string
) {
  const place = pageKind(file);
  if (Option.isNone(place)) {
    return Option.none<CorpusPage>();
  }
  return Option.some(yield* parsePage(file, place.value, source));
});

/** Reads and parses every lesson and article page among the given files. */
export const corpusPages = Effect.fn("AksaraOutline.corpusPages")(function* (
  files: readonly string[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const pages = yield* Effect.forEach(
    Arr.filter(files, (file) => Option.isSome(pageKind(file))),
    (file) =>
      fileSystem
        .readFileString(file)
        .pipe(Effect.flatMap((source) => pageOf(file, source))),
    { concurrency: 8 }
  );
  return Arr.getSomes(pages);
});

/**
 * Reads one file as it stood at a revision, or nothing when the file did not
 * exist there, such as a page this change adds.
 */
export const sourceAt = Effect.fn("AksaraOutline.sourceAt")(function* (
  revision: string,
  file: string
) {
  const result = yield* runGit(["show", `${revision}:${file}`]);
  return result.exitCode === 0 ? Option.some(result.stdout) : Option.none();
});
