import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import { PageKeySchema } from "@nakafa/aksara-contracts/projection/page";
import { isLowerKebab } from "@nakafa/aksara-contracts/text/syntax";
import { Effect, Schema } from "effect";
import { localizedSourceMapSchema } from "#corpus/locale/source";

/** Checks the stable two-segment grammar of one public page source root. */
function isPageRoot(sourceRoot: string) {
  const [family, pageKey, remainder] = sourceRoot.split("/");
  return (
    family === "pages" &&
    pageKey !== undefined &&
    isLowerKebab(pageKey) &&
    remainder === undefined
  );
}

/** Source path containing every localized body for one stable public page. */
export const PageRootSchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isPageRoot, {
      description: "Public page source path.",
      identifier: "PageRoot",
      message: "Invalid public page source root.",
    })
  )
);

/** Complete reviewed source contract for one localized public page family. */
export const PageSourceSchema = Schema.Struct({
  pageKey: PageKeySchema,
  publicPaths: localizedSourceMapSchema(PublicPathSchema),
  sourceRoot: PageRootSchema,
});
export type PageSource = typeof PageSourceSchema.Type;
export type PageSourceInput = typeof PageSourceSchema.Encoded;

/** One authored public page source failed strict source decoding. */
export class PageSourceError extends Schema.TaggedError<PageSourceError>()(
  "PageSourceError",
  {
    cause: Schema.Unknown,
    sourceRoot: Schema.String,
  }
) {}

/** Lazily decodes one reviewed public page at its source-module seam. */
export const definePageSource = Effect.fn("AksaraCorpus.definePageSource")(
  function* (input: PageSourceInput) {
    return yield* Schema.decodeEffect(PageSourceSchema)(input, {
      onExcessProperty: "error",
    }).pipe(
      Effect.mapError(
        (cause) =>
          new PageSourceError({
            cause,
            sourceRoot: input.sourceRoot,
          })
      )
    );
  }
);
