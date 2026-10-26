import {
  ACTIVE_APP_LOCALE_CODES,
  type AppLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import {
  Array as Arr,
  Effect,
  FileSystem,
  HashMap,
  Layer,
  Path,
  PlatformError,
  Result,
  Schema,
} from "effect";
import {
  type ItemSource,
  ItemSourceSchema,
  itemVersions,
} from "#corpus/question-bank/item";
import {
  type SetPath,
  SetPathSchema,
  setSourcePath,
} from "#corpus/question-bank/path";

/** The root of every virtual checkout the tests read. */
export const CHECKOUT = "/checkout";

/** The one set of the virtual bank. */
export const TEST_SET = SetPathSchema.make(
  "test-country/test-exam/test-section/test-set"
);

/** A single choice of two options in Indonesian, the first correct. */
export const TEST_ITEM: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Satu" },
        { correct: false, label: "Dua" },
      ],
    },
  },
};

/** One virtual file: its repository path and its text. */
type File = readonly [path: string, text: string];

/** Writes one item as the JSON text that an item module holds. */
const encodeItem = Schema.encodeSync(Schema.fromJsonString(ItemSourceSchema));

/** The text of the item module that holds one item. */
export function itemModule(item: ItemSource) {
  return `import type { ItemSource } from "#corpus/question-bank/item";\n\nconst item: ItemSource = ${encodeItem(item)};\n\nexport default item;\n`;
}

/**
 * The files of one question: its item, its prompt in each language it is
 * asked in, and its explanation in each locale.
 */
export function questionFiles(
  number: number,
  item: ItemSource = TEST_ITEM,
  prompt = `Soal nomor ${number}.`,
  set: SetPath = TEST_SET
): readonly File[] {
  const root = setSourcePath(set, `question-${number}`);
  return [
    [`${root}/item.ts`, itemModule(item)],
    ...Arr.map(
      itemVersions(item.versions),
      ({ language }): File => [`${root}/question.${language}.mdx`, prompt]
    ),
    ...Arr.map(
      ACTIVE_APP_LOCALE_CODES,
      (locale): File => [`${root}/answer.${locale}.mdx`, "Karena."]
    ),
  ];
}

/** The documents of one shared reading in the given languages. */
export function stimulusFiles(
  key: string,
  text: string,
  languages: readonly AppLocaleCode[] = ["id"],
  set: SetPath = TEST_SET
): readonly File[] {
  return Arr.map(
    languages,
    (language): File => [
      setSourcePath(set, key, `stimulus.${language}.mdx`),
      text,
    ]
  );
}

/** One stable missing-path error of the virtual checkout. */
function missing(method: string, path: string) {
  return PlatformError.systemError({
    _tag: "NotFound",
    method,
    module: "FileSystem",
    pathOrDescriptor: path,
  });
}

/**
 * Serves a virtual checkout at the root: each file at its repository path,
 * and each folder listing every file and folder below it, as a recursive
 * listing does.
 */
export function checkoutLayer(files: Iterable<File>) {
  const contents = HashMap.fromIterable(
    Arr.map(
      Arr.fromIterable(files),
      ([path, text]): File => [`${CHECKOUT}/${path}`, text]
    )
  );
  const paths = Arr.fromIterable(HashMap.keys(contents));
  return Layer.merge(
    FileSystem.layerNoop({
      readDirectory: (directory) => {
        const prefix = `${directory}/`;
        const below = Arr.filterMap(paths, (path) =>
          path.startsWith(prefix)
            ? Result.succeed(path.slice(prefix.length))
            : Result.failVoid
        );
        if (!Arr.isReadonlyArrayNonEmpty(below)) {
          return Effect.fail(missing("readDirectory", directory));
        }
        return Effect.succeed(
          Arr.dedupe(
            Arr.flatMap(below, (file) => {
              const segments = file.split("/");
              return Arr.map(Arr.range(1, segments.length), (length) =>
                Arr.join(Arr.take(segments, length), "/")
              );
            })
          )
        );
      },
      readFileString: (file) =>
        Effect.fromOption(HashMap.get(contents, file)).pipe(
          Effect.mapError(() => missing("readFileString", file))
        ),
    }),
    Path.layer
  );
}
