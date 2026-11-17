import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Array as Arr, Effect, FileSystem, Order, Path, Schema } from "effect";

import type { MaterialEntry } from "#corpus/material/registry";
import {
  type LessonMaterialSource,
  LessonMaterialSourceSchema,
} from "#corpus/material/schema";

/** The folder, below the checkout root, whose domain folders hold one folder per lesson. */
const LESSON_ROOT = "packages/corpus/material/lesson";

/** The file in a lesson folder that registers the lesson: its key, routes, sections and translations. */
const LESSON_FILE = "lesson.json";

/** An injected material source catalog failed strict decoding. */
export class MaterialCatalogError extends Schema.TaggedError<
  MaterialCatalogError,
  { readonly brand: unique symbol }
>()("MaterialCatalogError", { cause: Schema.Unknown }) {}

/** Why a lesson folder cannot register its lesson. */
const MaterialFolderReasonSchema = Schema.Literals([
  "missing",
  "unreadable",
  "invalid",
  "misplaced",
]);

/** A lesson folder lacks its lesson file, or the file names another folder than its own. */
export class MaterialFolderError extends Schema.TaggedError<
  MaterialFolderError,
  { readonly brand: unique symbol }
>()("MaterialFolderError", {
  folder: CorpusSourcePathSchema,
  reason: MaterialFolderReasonSchema,
}) {}

/** Lists the folder names directly below one folder of the checkout, in code-unit order. */
const listFolders = Effect.fn("AksaraCorpus.listMaterialFolders")(function* (
  checkoutRoot: string,
  folder: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const names = yield* fileSystem
    .readDirectory(path.join(checkoutRoot, folder))
    .pipe(
      Effect.mapError(
        () =>
          new MaterialFolderError({
            folder: CorpusSourcePathSchema.make(folder),
            reason: "unreadable",
          })
      )
    );
  return Arr.sort(names, Order.String);
});

/**
 * Reads and strictly decodes one lesson's file, and requires that its key and
 * asset root name the folder it sits in, so a lesson is registered exactly where
 * it lives and two folders can never claim one key.
 */
const readLesson = Effect.fn("AksaraCorpus.readLesson")(function* (
  checkoutRoot: string,
  domain: string,
  lesson: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const folder = CorpusSourcePathSchema.make(
    `${LESSON_ROOT}/${domain}/${lesson}`
  );
  /** The typed refusal of this lesson folder for one reason. */
  const failure = (reason: typeof MaterialFolderReasonSchema.Type) =>
    new MaterialFolderError({ folder, reason });
  const text = yield* fileSystem
    .readFileString(path.join(checkoutRoot, folder, LESSON_FILE), "utf8")
    .pipe(Effect.mapError(() => failure("missing")));
  const source = yield* Schema.decodeEffect(
    Schema.fromJsonString(LessonMaterialSourceSchema)
  )(text, { onExcessProperty: "error" }).pipe(
    Effect.mapError(() => failure("invalid"))
  );
  const placed =
    source.key === `lesson.${domain}.${lesson}` &&
    source.domain === domain &&
    source.slug === lesson &&
    source.assetRoot === `material/lesson/${domain}/${lesson}`;
  return placed ? source : yield* failure("misplaced");
});

/**
 * Discovers every lesson from its folder: each domain folder below the lesson
 * root holds one folder per lesson, and each lesson folder holds one lesson
 * file. Lessons come back in key order, so adding a lesson changes no shared file.
 */
const discoverMaterialSources = Effect.fn(
  "AksaraCorpus.discoverMaterialSources"
)(function* (checkoutRoot: string) {
  const domains = yield* listFolders(checkoutRoot, LESSON_ROOT);
  const sources = yield* Effect.forEach(domains, (domain) =>
    Effect.flatMap(
      listFolders(checkoutRoot, `${LESSON_ROOT}/${domain}`),
      (lessons) =>
        Effect.forEach(lessons, (lesson) =>
          readLesson(checkoutRoot, domain, lesson)
        )
    )
  );
  return Arr.sort(
    Arr.flatten(sources),
    Order.mapInput(Order.String, (source: LessonMaterialSource) => source.key)
  );
});

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
