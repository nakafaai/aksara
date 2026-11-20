import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, FileSystem, Path, Schema } from "effect";

import { discoverMaterialSources } from "#corpus/material/folder";
import type { MaterialEntry } from "#corpus/material/registry";
import { LessonMaterialSourceSchema } from "#corpus/material/schema";

/** An injected material source catalog failed strict decoding. */
export class MaterialCatalogError extends Schema.TaggedError<
  MaterialCatalogError,
  { readonly brand: unique symbol }
>()("MaterialCatalogError", { cause: Schema.Unknown }) {}

/**
 * Where a material catalog comes from: the lesson folders of a checkout, or a
 * catalog a test or preview injects whole.
 */
export const MaterialOriginSchema = Schema.Union([
  Schema.Struct({ checkoutRoot: Schema.String }),
  Schema.Struct({ sources: Schema.Unknown }),
]);
export type MaterialOrigin = typeof MaterialOriginSchema.Type;

/** Composes every lesson of a checkout, or an injected catalog, into one canonical material catalog. */
export const decodeMaterialSources = Effect.fn(
  "AksaraCorpus.decodeMaterialSources"
)(function* (origin: MaterialOrigin) {
  if ("checkoutRoot" in origin) {
    return yield* discoverMaterialSources(origin.checkoutRoot);
  }
  return yield* Schema.decodeUnknownEffect(
    Schema.Array(LessonMaterialSourceSchema)
  )(origin.sources, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialCatalogError({
          cause,
        })
    )
  );
});

/** Reading one reviewed corpus source failed through Effect Platform. */
export class MaterialReadError extends Schema.TaggedError<
  MaterialReadError,
  { readonly brand: unique symbol }
>()("MaterialReadError", {
  cause: Schema.Unknown,
  sourcePath: CorpusSourcePathSchema,
}) {}

/** The authored MDX body that a material document adds to its registry entry. */
const MaterialDocumentBodySchema = Schema.Struct({ rawMdx: Schema.String });

/** Complete authored material document passed to release preparation. */
export type MaterialDocumentSource = Omit<MaterialEntry, "assetRoot"> &
  typeof MaterialDocumentBodySchema.Type;

/** Reads one registry-owned source without escaping the supplied checkout root. */
export const readMaterialDocument = Effect.fn(
  "AksaraCorpus.readMaterialDocument"
)(function* (corpusRoot: string, entry: MaterialEntry) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const absolutePath = path.join(corpusRoot, entry.sourcePath);
  const rawMdx = yield* fileSystem
    .readFileString(absolutePath, "utf8")
    .pipe(
      Effect.mapError(
        (cause) =>
          new MaterialReadError({ cause, sourcePath: entry.sourcePath })
      )
    );
  const { assetRoot: _assetRoot, ...document } = entry;
  return {
    ...document,
    rawMdx,
  } satisfies MaterialDocumentSource;
});
