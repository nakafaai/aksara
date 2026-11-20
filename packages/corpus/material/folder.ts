import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import {
  Array as Arr,
  Effect,
  FileSystem,
  HashSet,
  Order,
  Path,
  Schema,
} from "effect";

import {
  type LessonMaterialSource,
  LessonModuleSchema,
  LessonSectionModuleSchema,
} from "#corpus/material/schema";
import {
  type ConstantModule,
  readConstantModule,
} from "#corpus/module/constant";

/** The folder, below the checkout root, whose domain folders hold one folder per lesson. */
const LESSON_ROOT = "packages/corpus/material/lesson";

/**
 * Each lesson folder registers its lesson in a typed `source.ts`, and each of
 * its section folders registers that section in a typed `section.ts`. The
 * compiler checks both as they are written; the corpus reads their literals
 * without evaluating code, as it reads question items.
 */
const LESSON_MODULE = {
  binding: "lesson",
  typeModule: "#corpus/material/schema",
  typeName: "LessonModule",
} as const satisfies ConstantModule;
const SECTION_MODULE = {
  binding: "section",
  typeModule: "#corpus/material/schema",
  typeName: "LessonSection",
} as const satisfies ConstantModule;
const LESSON_FILE = "source.ts";
const SECTION_FILE = "section.ts";

/** Why a lesson or section folder cannot register its material. */
const MaterialFolderReasonSchema = Schema.Literals([
  "unreadable",
  "missing",
  "invalid",
  "misplaced",
  "sections",
]);

/**
 * A lesson or section folder cannot register its material: the folder cannot be
 * read, its module is missing or not a typed literal of its contract, it names
 * another folder than its own, or the lesson's section list and its section
 * folders differ.
 */
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
  const refusal = new MaterialFolderError({
    folder: CorpusSourcePathSchema.make(folder),
    reason: "unreadable",
  });
  const names = yield* fileSystem
    .readDirectory(path.join(checkoutRoot, folder))
    .pipe(Effect.mapError(() => refusal));
  const folders = yield* Effect.filter(names, (name) =>
    fileSystem.stat(path.join(checkoutRoot, folder, name)).pipe(
      Effect.map(({ type }) => type === "Directory"),
      Effect.mapError(() => refusal)
    )
  );
  return Arr.sort(folders, Order.String);
});

/** Reads and strictly decodes one typed data module of a material folder. */
const readMaterialModule = Effect.fn("AksaraCorpus.readMaterialModule")(
  function* <S extends Schema.Top>(
    checkoutRoot: string,
    folder: typeof CorpusSourcePathSchema.Type,
    file: string,
    shape: ConstantModule,
    schema: S
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    /** The typed refusal of this folder for one reason. */
    const failure = (reason: typeof MaterialFolderReasonSchema.Type) =>
      new MaterialFolderError({ folder, reason });
    const source = yield* fileSystem
      .readFileString(path.join(checkoutRoot, folder, file), "utf8")
      .pipe(Effect.mapError(() => failure("missing")));
    const literal = yield* readConstantModule(shape, {
      fileName: `${folder}/${file}`,
      source,
    });
    if (literal === undefined) {
      return yield* failure("invalid");
    }
    return yield* Schema.decodeEffect(schema)(literal, {
      onExcessProperty: "error",
    }).pipe(Effect.mapError(() => failure("invalid")));
  }
);

/**
 * Reads one lesson from its folder: its typed lesson module, which must name
 * this folder, and the typed module of every section it lists, whose folders
 * must be exactly the lesson's section folders. Both parts are decoded strictly,
 * so together they are the lesson the catalog has always held.
 */
const readLesson = Effect.fn("AksaraCorpus.readLesson")(function* (
  checkoutRoot: string,
  domain: string,
  lesson: string
) {
  const folder = CorpusSourcePathSchema.make(
    `${LESSON_ROOT}/${domain}/${lesson}`
  );
  const authored = yield* readMaterialModule(
    checkoutRoot,
    folder,
    LESSON_FILE,
    LESSON_MODULE,
    LessonModuleSchema
  );
  const placed =
    authored.key === `lesson.${domain}.${lesson}` &&
    authored.domain === domain &&
    authored.slug === lesson &&
    authored.assetRoot === `material/lesson/${domain}/${lesson}`;
  if (!placed) {
    return yield* new MaterialFolderError({ folder, reason: "misplaced" });
  }
  const folders = yield* listFolders(checkoutRoot, folder);
  const listed = HashSet.fromIterable(authored.sections);
  if (
    HashSet.size(listed) !== authored.sections.length ||
    !HashSet.isSubset(HashSet.fromIterable(folders), listed) ||
    !HashSet.isSubset(listed, HashSet.fromIterable(folders))
  ) {
    return yield* new MaterialFolderError({ folder, reason: "sections" });
  }
  const sections = yield* Effect.forEach(authored.sections, (slug) =>
    Effect.map(
      readMaterialModule(
        checkoutRoot,
        CorpusSourcePathSchema.make(`${folder}/${slug}`),
        SECTION_FILE,
        SECTION_MODULE,
        LessonSectionModuleSchema
      ),
      (section) => ({ ...section, slug })
    )
  );
  const source: LessonMaterialSource = { ...authored, sections };
  return source;
});

/**
 * Discovers every lesson from its folder: each domain folder below the lesson
 * root holds one folder per lesson, and each lesson folder holds one lesson
 * file. Lessons come back in key order, so adding a lesson changes no shared file.
 */
export const discoverMaterialSources = Effect.fn(
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
}, Effect.provide(TypeScriptParser.layer));
